// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/Borderless.sol";

contract BorderlessDeployment is Script {
    function run() external {
        // Start broadcasting transactions
        vm.startBroadcast();

        // Deploy the Borderless Stablecoin contract with the owner address
        BorderlessStablecoin stablecoin = new BorderlessStablecoin(msg.sender);

        // Optionally, mint tokens to the owner's address
        stablecoin.mint(msg.sender, 1000000 * 10 ** stablecoin.decimals());

        // End broadcasting
        vm.stopBroadcast();
    }
}
