// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import statements
import "forge-std/Script.sol";
import "../src/BorderlessToken.sol";

contract Deploy is Script {
    function run() external {
        // Load environment variables
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address operatorAddress = vm.envAddress("OPERATOR_ADDRESS");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the contract with zero initial supply
        BorderlessToken token = new BorderlessToken(0);

        // Grant OPERATOR_ROLE to the operator
        token.grantRole(token.OPERATOR_ROLE(), operatorAddress);

        // Output the deployed contract address
        console.log("BorderlessToken deployed at:", address(token));

        // Stop broadcasting transactions
        vm.stopBroadcast();
    }
}
