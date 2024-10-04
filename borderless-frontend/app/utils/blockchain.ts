import Web3 from "web3";
import { AbiItem } from "web3-utils";

// Replace with your actual contract ABI and address
const contractABI: AbiItem[] = [
  {
    type: "constructor",
    inputs: [
      {
        name: "initialOwner",
        type: "address",
        internalType: "address",
      },
      {
        name: "trustedForwarder",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "burn",
    inputs: [
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isTrustedForwarder",
    inputs: [
      {
        name: "forwarder",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "trustedForwarder",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "ERC20InsufficientAllowance",
    inputs: [
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
      {
        name: "allowance",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "needed",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "ERC20InsufficientBalance",
    inputs: [
      {
        name: "sender",
        type: "address",
        internalType: "address",
      },
      {
        name: "balance",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "needed",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "ERC20InvalidApprover",
    inputs: [
      {
        name: "approver",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ERC20InvalidReceiver",
    inputs: [
      {
        name: "receiver",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ERC20InvalidSender",
    inputs: [
      {
        name: "sender",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ERC20InvalidSpender",
    inputs: [
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
];
const contractAddress = "0xBfB046099a45A6c556aa3B025a4692a17a123632";

// Initialize Web3 with your Ethereum node URL
const web3 = new Web3("https://pacific-rpc.sepolia-testnet.manta.network/http");

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Safely get the private key from environment variables
const getPrivateKey = (): string => {
  const privateKey = process.env.RELAYER_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("RELAYER_PRIVATE_KEY is not set in environment variables");
  }
  // Append '0x' prefix if not present
  return privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`;
};

// Create account from private key
let account;
try {
  const privateKey = getPrivateKey();
  account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);
} catch (error) {
  console.error("Error initializing account:", error);
  throw error;
}

export async function transferTokens(
  fromAddress: string,
  toAddress: string,
  amount: string
) {
  try {
    const amountInWei = web3.utils.toWei(amount, "ether");
    const gasPrice = await web3.eth.getGasPrice();
    const gas = await contract.methods
      .transfer(toAddress, amountInWei)
      .estimateGas({ from: account.address });

    const tx = await contract.methods.transfer(toAddress, amountInWei).send({
      from: account.address,
      gas,
      gasPrice,
    });

    return tx.transactionHash;
  } catch (error) {
    console.error("Error transferring tokens:", error);
    throw error;
  }
}

export async function mintTokens(toAddress: string, amount: string) {
  try {
    const amountInWei = web3.utils.toWei(amount, "ether");
    const gasPrice = await web3.eth.getGasPrice();
    const gas = await contract.methods
      .mint(toAddress, amountInWei)
      .estimateGas({ from: account.address });

    const tx = await contract.methods.mint(toAddress, amountInWei).send({
      from: account.address,
      gas,
      gasPrice,
    });

    return tx.transactionHash;
  } catch (error) {
    console.error("Error minting tokens:", error);
    throw error;
  }
}

export async function burnTokens(fromAddress: string, amount: string) {
  try {
    const amountInWei = web3.utils.toWei(amount, "ether");
    const gasPrice = await web3.eth.getGasPrice();
    const gas = await contract.methods
      .burn(amountInWei)
      .estimateGas({ from: account.address });

    const tx = await contract.methods.burn(amountInWei).send({
      from: account.address,
      gas,
      gasPrice,
    });

    return tx.transactionHash;
  } catch (error) {
    console.error("Error burning tokens:", error);
    throw error;
  }
}

export async function getTokenBalance(address: string): Promise<string> {
  try {
    const balance = await contract.methods.balanceOf(address).call();
    const balanceInEther = web3.utils.fromWei(balance, "ether");
    return parseFloat(balanceInEther).toFixed(2);
  } catch (error) {
    console.error("Error getting token balance:", error);
    throw error;
  }
}

export async function approveTokens(spender: string, amount: string) {
  try {
    const amountInWei = web3.utils.toWei(amount, "ether");
    const gasPrice = await web3.eth.getGasPrice();
    const gas = await contract.methods
      .approve(spender, amountInWei)
      .estimateGas({ from: account.address });

    const tx = await contract.methods.approve(spender, amountInWei).send({
      from: account.address,
      gas,
      gasPrice,
    });

    return tx.transactionHash;
  } catch (error) {
    console.error("Error approving tokens:", error);
    throw error;
  }
}

export async function transferFromTokens(
  fromAddress: string,
  toAddress: string,
  amount: string
) {
  try {
    const amountInWei = web3.utils.toWei(amount, "ether");
    const gasPrice = await web3.eth.getGasPrice();
    const gas = await contract.methods
      .transferFrom(fromAddress, toAddress, amountInWei)
      .estimateGas({ from: account.address });

    const tx = await contract.methods
      .transferFrom(fromAddress, toAddress, amountInWei)
      .send({
        from: account.address,
        gas,
        gasPrice,
      });

    return tx.transactionHash;
  } catch (error) {
    console.error("Error transferring tokens from address:", error);
    throw error;
  }
}
