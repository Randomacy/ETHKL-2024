// script/Borderless.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/Borderless.sol";  // Adjust the path as necessary

contract DeployBorderless is Script {
    function run() external {
        address owner = msg.sender;  // The address deploying the contract
        address trustedForwarder = owner;  // Replace with actual trusted forwarder address

        vm.startBroadcast();  // Starts broadcasting the transaction
        BorderlessStablecoin stablecoin = new BorderlessStablecoin(owner, trustedForwarder);
        vm.stopBroadcast();  // Stops broadcasting the transaction
    }
}
