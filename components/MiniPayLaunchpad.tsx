"use client";

import { useEffect, useMemo, useState } from "react";
import { createWalletClient, createPublicClient, custom, http, formatUnits, encodeFunctionData, parseUnits } from "viem";
import { celo } from "viem/chains";

declare global {
  interface Window {
    ethereum?: {
      isMiniPay?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };
  }
}

const USDM_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a" as const;
const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export default function MiniPayLaunchpad() {
  const [address, setAddress] = useState<`0x${string}` | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [isMiniPay, setIsMiniPay] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [launchAmount, setLaunchAmount] = useState("");
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const publicClient = useMemo(
    () =>
      createPublicClient({
        chain: celo,
        transport: http(),
      }),
    []
  );

  useEffect(() => {
    async function connect() {
      if (typeof window === "undefined" || !window.ethereum) {
        setStatus("No Ethereum provider found.");
        return;
      }

      const mp = window.ethereum.isMiniPay === true;
      setIsMiniPay(mp);

      if (!mp) {
        setStatus("Open this page inside MiniPay to use the launchpad.");
        return;
      }

      try {
        const walletClient = createWalletClient({
          chain: celo,
          transport: custom(window.ethereum),
        });
        const [addr] = await walletClient.getAddresses();
        setAddress(addr);
        setStatus("Connected to MiniPay.");

        const bal = await publicClient.readContract({
          address: USDM_ADDRESS,
          abi: ERC20_ABI,
          functionName: "balanceOf",
          args: [addr],
          authorizationList: [],
        });
        setBalance(formatUnits(bal, 18));
      } catch (exc) {
        setError("Unable to connect to MiniPay or read balance.");
      }
    }
    connect();
  }, [publicClient]);

  const handleLaunch = async () => {
    setError("");
    setStatus("");

    if (!address || !projectName || !launchAmount) {
      setError("Fill in the project name and launch amount.");
      return;
    }

    try {
      const walletClient = createWalletClient({
        chain: celo,
        transport: custom(window.ethereum!),
      });

      const data = encodeFunctionData({
        abi: ERC20_ABI,
        functionName: "transfer",
        args: ["0x0000000000000000000000000000000000000000" as const, parseUnits(launchAmount, 18)],
      });

      const txHash = await walletClient.sendTransaction({
        account: address,
        to: USDM_ADDRESS,
        data,
        // @ts-ignore - Celo-specific parameter
        feeCurrency: USDM_ADDRESS,
      });

      setStatus(`Project ${projectName} launched! Tx: ${txHash}`);
    } catch (exc) {
      setError("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">MiniPay Launchpad</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">Launch your Celo project</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Connect with MiniPay and launch a project using a demo Celo transaction flow.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Current status</p>
            <p className="mt-2 text-lg font-medium text-slate-900">{status || "Waiting for MiniPay..."}</p>
          </div>
        </div>
      </div>

      {!isMiniPay && (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-900">
          <p className="font-semibold">MiniPay required</p>
          <p className="mt-1 text-sm text-rose-900/80">Open this page in MiniPay to use the full launchpad experience.</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Launch details</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">Project launch form</h3>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Project Name</label>
              <input
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
                placeholder="Enter project name"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Launch Amount (USDm)</label>
              <input
                type="number"
                value={launchAmount}
                onChange={(event) => setLaunchAmount(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500"
                placeholder="0.00"
              />
            </div>

            {error && <p className="text-sm text-rose-600">{error}</p>}

            <button
              onClick={handleLaunch}
              disabled={!isMiniPay || !projectName || !launchAmount}
              className="inline-flex w-full justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Launch Project
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Connected account</p>
            <p className="mt-3 text-lg font-medium text-slate-900">{address ?? "Not connected"}</p>
            <p className="mt-2 text-sm text-slate-600">USDm balance: {balance}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">What this does</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <li>• Reads your USDm balance from the Celo contract.</li>
              <li>• Builds a demo transaction to launch a project.</li>
              <li>• Uses MiniPay and Celo custom transaction options.</li>
              <li>• Shows browser-only launchpad functionality on the /launch page.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
