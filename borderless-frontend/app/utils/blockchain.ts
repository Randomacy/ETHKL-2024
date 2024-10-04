import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

// Replace with your actual contract ABI and address
const contractABI: AbiItem[] = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const contractAddress = '0x0C5d6E1B71f68eBf92c6Ab1e7017c59966F5853F';

// Initialize Web3 with your Ethereum node URL
const web3 = new Web3('https://pacific-rpc.manta.network/http');

const contract = new web3.eth.Contract(contractABI, contractAddress);

export async function transferTokens(fromAddress: string, toAddress: string, amount: string) {
  try {
    const amountInWei = web3.utils.toWei(amount, 'ether');
    const gasPrice = await web3.eth.getGasPrice();
    const gas = await contract.methods.transfer(toAddress, amountInWei).estimateGas({ from: fromAddress });

    const tx = await contract.methods.transfer(toAddress, amountInWei).send({
      from: fromAddress,
      gas,
      gasPrice
    });

    return tx.transactionHash;
  } catch (error) {
    console.error('Error transferring tokens:', error);
    throw error;
  }
}

export async function mintTokens(toAddress: string, amount: string) {
  try {
    const amountInWei = web3.utils.toWei(amount, 'ether');
    const gasPrice = await web3.eth.getGasPrice();
    const gas = await contract.methods.mint(toAddress, amountInWei).estimateGas();

    const tx = await contract.methods.mint(toAddress, amountInWei).send({
      from: await web3.eth.getAccounts().then(accounts => accounts[0]), // Assuming the first account is the contract owner
      gas,
      gasPrice
    });

    return tx.transactionHash;
  } catch (error) {
    console.error('Error minting tokens:', error);
    throw error;
  }
}

export async function burnTokens(fromAddress: string, amount: string) {
  try {
    const amountInWei = web3.utils.toWei(amount, 'ether');
    const gasPrice = await web3.eth.getGasPrice();
    const gas = await contract.methods.burn(fromAddress, amountInWei).estimateGas({ from: fromAddress });

    const tx = await contract.methods.burn(fromAddress, amountInWei).send({
      from: fromAddress,
      gas,
      gasPrice
    });

    return tx.transactionHash;
  } catch (error) {
    console.error('Error burning tokens:', error);
    throw error;
  }
}