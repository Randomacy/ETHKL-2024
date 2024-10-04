// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/Borderless.sol";  // Adjust path according to your directory

contract BorderlessStablecoinTest is Test {
    BorderlessStablecoin stablecoin;
    address owner = address(0x123);  // Owner account
    address trustedForwarder = address(0x456);  // Trusted forwarder
    address user1 = address(0x789);  // User1 account
    address user2 = address(0xABC);  // User2 account

    function setUp() public {
        // Deploy the BorderlessStablecoin contract with owner and trustedForwarder
        stablecoin = new BorderlessStablecoin(owner, trustedForwarder);

        // Label addresses to make logs easier to read
        vm.label(owner, "Owner");
        vm.label(trustedForwarder, "Trusted Forwarder");
        vm.label(user1, "User1");
        vm.label(user2, "User2");
    }

    function testMintTokens() public {
        uint256 mintAmount = 1000 ether;

        // Impersonate the owner to mint tokens
        vm.prank(owner);
        stablecoin.mint(user1, mintAmount);

        // Check that user1's balance increased by mintAmount
        assertEq(stablecoin.balanceOf(user1), mintAmount);
    }

    function testTransferTokens() public {
        uint256 mintAmount = 1000 ether;
        uint256 transferAmount = 500 ether;

        // Impersonate the owner to mint tokens
        vm.prank(owner);
        stablecoin.mint(user1, mintAmount);

        // Impersonate user1 to transfer tokens to user2
        vm.prank(user1);
        stablecoin.transfer(user2, transferAmount);

        // Check that user1's balance is reduced and user2's balance increased
        assertEq(stablecoin.balanceOf(user1), mintAmount - transferAmount);
        assertEq(stablecoin.balanceOf(user2), transferAmount);
    }

    function testBurnTokens() public {
        uint256 mintAmount = 1000 ether;

        // Impersonate the owner to mint tokens
        vm.prank(owner);
        stablecoin.mint(owner, mintAmount);

        // Impersonate the owner to burn tokens
        vm.prank(owner);
        stablecoin.burn(mintAmount);

        // Check that owner's balance is zero after burning
        assertEq(stablecoin.balanceOf(owner), 0);
    }
}
