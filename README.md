# 🚢 Borderless: Tokenizing the Maritime Supply Chain

## 🔭 Project Overview

**Borderless** is revolutionizing the $500B maritime services industry by introducing a tokenized payment system. Our solution is built to make cross-border transactions more accessible, efficient, and cost-effective for key maritime players, including port agents, ship charters, and suppliers. By leveraging blockchain technology, we aim to solve the issues of delayed payments and uncertain cash flows that plague the current maritime ecosystem.

This project was developed for **ETHKL 2024**, where we are competing in both the **major track** and the **Manta Network bounty**.

🤔 Why Borderless? 

- **Fast Settlement:** Tokenized money enables near-instantaneous settlement, speeding up payment processes.
- **Lower Costs:** Borderless eliminates the costly intermediaries involved in traditional cross-border payments.
- **Improved Cash Flow:** With tokens tied 1:1 to fiat money, maritime agents and suppliers can track and redeem payments with full transparency.

## 🏗️ Built On Next.js

This project is built using **Next.js**, providing a robust and scalable framework for the development of a fast and secure application. With server-side rendering, Borderless ensures seamless interactions and optimal performance across various platforms and devices.

## 💸 Seamless Token Transfers

Borderless is designed to facilitate **seamless token transfers**, allowing ship agents, charters, and suppliers to exchange value easily. The process is integrated into the platform’s backend, offering a smooth user experience without exposing users to blockchain complexities.

- **Token Standard:** ERC20, a well-established standard for creating fungible tokens.
- **Extended Roles:** The smart contract incorporates extended roles that enable authorized parties to mint and burn tokens on behalf of users. This ensures the flexibility needed to manage the lifecycle of tokens while maintaining security and user trust.

## 📝 Features

- **Seamless Token Transfer:** Facilitates fast and cost-effective cross-border payments within the maritime supply chain.
- **Mint & Burn Capabilities:** Uses an ERC20 token with extended roles to enable minting and burning tokens for users, enhancing efficiency in managing digital assets.
- **1:1 Fiat Peg:** Ensures that every token is backed by fiat money, giving users confidence in the stability of the token.

## 👩🏻‍💻 Technologies Used

- **Next.js** for the frontend and server-side rendering
- **Solidity** for the smart contract development
- **Foundry** for deploying and testing smart contracts
- **ERC20** token standard with extended role functionalities
- **Web3.js** for interacting with the Ethereum blockchain

## 🔗 Smart Contract

The Borderless ERC20 contract is designed to support the minting and burning of tokens:

- **Minting:** Authorized ship agents can mint tokens to represent the prepaid amounts deposited by ship charters.
- **Burning:** Tokens can be burned when port suppliers redeem them for fiat money, ensuring smooth off-ramping.

**Smart Contract Address:** [0x5543005f3aA8716EE90b627aa9Ae52AB4127Ab93](https://etherscan.io/address/0x5543005f3aA8716EE90b627aa9Ae52AB4127Ab93)

## 🚀 Getting Started

To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git
   ```
2. Navigate to the project directory:
   ```bash
   cd borderless-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000 in your browser to view the project.

## Contribution
We welcome contributions! Please submit a pull request or open an issue if you find any bugs or have feature requests.
