// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/Borderless.sol"; // Adjust the import path as needed
import "@openzeppelin/contracts/access/Ownable.sol"; // Import Ownable to access the custom error

contract BorderlessStablecoinTest is Test {
    BorderlessStablecoin public token;
    address public owner;
    address public user1;
    address public user2;

    function setUp() public {
        // Initialize addresses with valid hexadecimal literals
        owner = address(0xA11CE); // 'A11CE' consists of valid hex digits
        vm.label(owner, "Owner");

        user1 = address(0xB0B); // 'B0B' consists of valid hex digits
        vm.label(user1, "User1");

        user2 = address(0xCAFEBABE); // 'CAFEBABE' consists of valid hex digits
        vm.label(user2, "User2");

        // Deploy the contract with the specified owner
        token = new BorderlessStablecoin(owner);
    }

    /// @dev Test that the initial owner is set correctly
    function testInitialOwner() public {
        assertEq(token.owner(), owner);
    }

    /// @dev Test that the owner can mint tokens
    function testMintByOwner() public {
        uint256 amount = 1000 * 1e18;

        // Simulate owner calling mint
        vm.prank(owner);
        token.mint(user1, amount);

        // Verify the balance of user1
        assertEq(token.balanceOf(user1), amount);
    }

    /// @dev Test that non-owners cannot mint tokens
    function testMintByNonOwner() public {
        uint256 amount = 1000 * 1e18;

        // Expect revert when non-owner tries to mint
        vm.prank(user1);
        vm.expectRevert(
            abi.encodeWithSelector(
                Ownable.OwnableUnauthorizedAccount.selector,
                user1
            )
        );
        token.mint(user1, amount);
    }

    /// @dev Test that the owner can burn tokens
    function testBurnByOwner() public {
        uint256 amount = 1000 * 1e18;

        // Owner mints tokens to themselves
        vm.prank(owner);
        token.mint(owner, amount);

        // Owner burns tokens
        vm.prank(owner);
        token.burn(amount);

        // Verify the owner's balance is zero
        assertEq(token.balanceOf(owner), 0);
    }

    /// @dev Test that the owner can burn tokens
    function testPartialBurnByOwner() public {
        uint256 amount = 1000 * 1e18;

        // Owner mints tokens to themselves
        vm.prank(owner);
        token.mint(owner, amount);

        // Owner burns tokens
        vm.prank(owner);
        token.burn(500 * 1e18);

        // Verify the owner's balance is zero
        assertEq(token.balanceOf(owner), 500 * 1e18);
    }

    /// @dev Test that non-owners cannot burn tokens
    function testBurnByNonOwner() public {
        uint256 amount = 1000 * 1e18;

        // Owner mints tokens to user1
        vm.prank(owner);
        token.mint(user1, amount);

        // Expect revert when non-owner tries to burn
        vm.prank(user1);
        vm.expectRevert(
            abi.encodeWithSelector(
                Ownable.OwnableUnauthorizedAccount.selector,
                user1
            )
        );
        token.burn(amount);
    }

    /// @dev Test token transfer functionality
    function testTransfer() public {
        uint256 amount = 1000 * 1e18;

        // Owner mints tokens to themselves
        vm.prank(owner);
        token.mint(owner, amount);

        // Owner transfers tokens to user1
        vm.prank(owner);
        token.transfer(user1, amount);

        // Verify balances
        assertEq(token.balanceOf(owner), 0);
        assertEq(token.balanceOf(user1), amount);
    }

    /// @dev Test approval and transferFrom functionality
    function testApproveAndTransferFrom() public {
        uint256 amount = 1000 * 1e18;

        // Owner mints tokens to user1
        vm.prank(owner);
        token.mint(user1, amount);

        // User1 approves user2 to spend tokens
        vm.prank(user1);
        token.approve(user2, amount);

        // User2 transfers tokens from user1 to themselves
        vm.prank(user2);
        token.transferFrom(user1, user2, amount);

        // Verify balances
        assertEq(token.balanceOf(user1), 0);
        assertEq(token.balanceOf(user2), amount);
    }
}
