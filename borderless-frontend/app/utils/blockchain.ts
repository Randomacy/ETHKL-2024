import Web3 from "web3";
import { AbiItem } from "web3-utils";
import BigNumber from "bignumber.js";

// Replace with your actual contract ABI and address
const contractABI: AbiItem[] = [
  {
    type: "constructor",
    inputs: [
      {
        name: "initialSupply",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "DEFAULT_ADMIN_ROLE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "OPERATOR_ROLE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
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
    name: "getRoleAdmin",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "grantRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "hasRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
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
    name: "operatorBurn",
    inputs: [
      {
        name: "from",
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
    name: "operatorMint",
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
    name: "operatorTransfer",
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
    name: "renounceRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "callerConfirmation",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "revokeRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        name: "interfaceId",
        type: "bytes4",
        internalType: "bytes4",
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
    name: "RoleAdminChanged",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "previousAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "newAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleGranted",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleRevoked",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
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
    name: "AccessControlBadConfirmation",
    inputs: [],
  },
  {
    type: "error",
    name: "AccessControlUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
      {
        name: "neededRole",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
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
];
const contractAddress = "0x5543005f3aA8716EE90b627aa9Ae52AB4127Ab93";

// Initialize Web3 with your Ethereum node URL
const web3 = new Web3("https://pacific-rpc.sepolia-testnet.manta.network/http");

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Safely get the private key from environment variables
const getPrivateKey = (): string => {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY is not set in environment variables");
  }
  return privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`;
};

// Create account from private key
let account: ReturnType<typeof web3.eth.accounts.privateKeyToAccount>; // Correct typing
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
      gas: gas.toString(),
      gasPrice: gasPrice.toString(),
    });

    return tx.transactionHash;
  } catch (error) {
    console.error("Error transferring tokens:", error);
    throw error;
  }
}

export async function mintTokens(toAddress: string, amount: string) {
  try {
    const decimals = await contract.methods.decimals().call();
    const amountInSmallestUnit = new BigNumber(amount)
      .multipliedBy(new BigNumber(10).pow(decimals))
      .toFixed(0);

    const gasPrice = await web3.eth.getGasPrice();
    const gas = await contract.methods
      .operatorMint(toAddress, amountInSmallestUnit)
      .estimateGas({ from: account.address });

    const tx = await contract.methods
      .operatorMint(toAddress, amountInSmallestUnit)
      .send({
        from: account.address,
        gas: gas.toString(),
        gasPrice: gasPrice.toString(),
      });

    console.log(`Transaction hash: ${tx.transactionHash}`);
    return tx.transactionHash;
  } catch (error) {
    console.error("Error minting tokens:", error);
    throw error;
  }
}

export async function burnTokens(fromAddress: string, amount: string) {
  try {
    const decimals = await contract.methods.decimals().call();
    const amountInSmallestUnit = new BigNumber(amount)
      .multipliedBy(new BigNumber(10).pow(decimals))
      .toFixed(0); // Converts to smallest unit and ensures no exponential notation

    const gasPrice = await web3.eth.getGasPrice();
    const gas = await contract.methods
      .operatorBurn(fromAddress, amountInSmallestUnit)
      .estimateGas({ from: account.address });

    const tx = await contract.methods
      .operatorBurn(fromAddress, amountInSmallestUnit)
      .send({
        from: account.address,
        gas: gas.toString(),
        gasPrice: gasPrice.toString(),
      });

    console.log(`Transaction hash: ${tx.transactionHash}`);
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
      gas: gas.toString(),
      gasPrice: gasPrice.toString(),
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
        gas: gas.toString(),
        gasPrice: gasPrice.toString(),
      });

    return tx.transactionHash;
  } catch (error) {
    console.error("Error transferring tokens from address:", error);
    throw error;
  }
}

export async function operatorTransferTokens(
  fromAddress: string,
  toAddress: string,
  amount: string
) {
  try {
    const decimals = await contract.methods.decimals().call();
    const amountInSmallestUnit = new BigNumber(amount)
      .multipliedBy(new BigNumber(10).pow(decimals))
      .toFixed(0);

    const gasPrice = await web3.eth.getGasPrice();

    const gas = await contract.methods
      .operatorTransfer(fromAddress, toAddress, amountInSmallestUnit)
      .estimateGas({ from: account.address });

    const tx = await contract.methods
      .operatorTransfer(fromAddress, toAddress, amountInSmallestUnit)
      .send({
        from: account.address,
        gas: gas.toString(),
        gasPrice: gasPrice.toString(),
      });

    console.log(`Transaction hash: ${tx.transactionHash}`);
    return tx.transactionHash;
  } catch (error) {
    console.error("Error transferring tokens:", error);
    throw error;
  }
}
