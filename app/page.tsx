"use client";

import React, { useEffect, useMemo, useState, ChangeEvent } from "react";
import { createWalletClient, createPublicClient, custom, http, formatUnits, encodeFunctionData, parseUnits, Address } from "viem";
import { celo } from "viem/chains";

declare global {
  interface Window {
    ethereum?: {
      isMiniPay?: boolean;
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }
}

// Token addresses — use for balances, transfers, approvals
const USDM_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a" as const;

// feeCurrency addresses — use ONLY in the `feeCurrency` transaction field (pay network fee in stablecoin).
// Canonical table: builder-guide.md → Allowed Fee Currencies (Mainnet).
const USDM_FEE_CURRENCY = USDM_ADDRESS;

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
  const [address, setAddress] = useState<Address | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [isMiniPay, setIsMiniPay] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [launchAmount, setLaunchAmount] = useState("");
  const [mounted, setMounted] = useState(false);
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
    setMounted(true);
  }, []);

  useEffect(() => {
    async function connect() {
      if (typeof window === "undefined" || !window.ethereum) {
        setError("No Ethereum provider found.");
        return;
      }

      const mp = window.ethereum.isMiniPay === true;
      setIsMiniPay(mp);

      if (mp) {
        try {
          const client = createWalletClient({
            chain: celo,
            transport: custom(window.ethereum),
          });
          const [addr] = await client.getAddresses();
          if (!addr) return;
          
          setAddress(addr);

          // Fetch USDm balance
          const bal = await (publicClient as any).readContract({
            address: USDM_ADDRESS,
            abi: ERC20_ABI,
            functionName: "balanceOf",
            args: [addr],
          });
          setBalance(formatUnits(bal, 18));
        } catch {
          setError("Failed to connect to MiniPay.");
        }
      }
    }
    if (mounted) {
      connect();
    }
  }, [publicClient, mounted]);

  const handleLaunch = async () => {
    setError("");
    if (!address || !projectName || !launchAmount) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      if (!window.ethereum) {
        setError("No Ethereum provider found.");
        return;
      }

      const client = createWalletClient({
        chain: celo,
        transport: custom(window.ethereum),
      });

      const data = encodeFunctionData({
        abi: ERC20_ABI,
        functionName: "transfer",
        args: ["0x0000000000000000000000000000000000000000" as const, parseUnits(launchAmount, 18)],
      });

      const txHash = await (client.sendTransaction as any)({
        account: address,
        to: USDM_ADDRESS,
        data,
        feeCurrency: USDM_FEE_CURRENCY,
      });

      alert(`Project ${projectName} launched! Tx: ${txHash}`);
      setProjectName("");
      setLaunchAmount("");
    } catch {
      setError("Transaction failed. Please try again.");
    }
  };

  if (!mounted || !isMiniPay) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Celo Launchpad</h1>
          <p>{mounted ? "Please open this app in MiniPay to launch your project." : "Loading..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Celo Launchpad</h1>
        <p className="mb-2">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
        <p className="mb-4">USDm Balance: ${balance}</p>
        
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter project name"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Launch Amount (USDm)</label>
          <input
            type="number"
            value={launchAmount}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setLaunchAmount(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="0.00"
          />
        </div>
        
        <button
          onClick={handleLaunch}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={!projectName || !launchAmount}
        >
          Launch Project
        </button>
      </div>
    </div>
  );
}


