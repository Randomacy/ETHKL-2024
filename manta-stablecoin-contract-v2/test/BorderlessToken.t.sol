// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import statements
import "forge-std/Test.sol";
import "../src/BorderlessToken.sol";

contract BorderlessTokenTest is Test {
    BorderlessToken token;
    address deployer;
    address operator;
    address user1;
    address user2;

    function setUp() public {
        deployer = address(this);
        operator = address(0x1);
        user1 = address(0x2);
        user2 = address(0x3);

        token = new BorderlessToken(1000 * 10 ** 18);

        // Grant OPERATOR_ROLE to the operator
        token.grantRole(token.OPERATOR_ROLE(), operator);
    }

    function testInitialSupply() public view {
        uint256 balance = token.balanceOf(deployer);
        assertEq(balance, 1000 * 10 ** 18);
    }

    function testOperatorMint() public {
        // Operator mints tokens to user1
        vm.prank(operator);
        token.operatorMint(user1, 100 * 10 ** 18);

        uint256 balance = token.balanceOf(user1);
        assertEq(balance, 100 * 10 ** 18);
    }

    function testOperatorTransfer() public {
        // Operator mints tokens to user1
        vm.prank(operator);
        token.operatorMint(user1, 100 * 10 ** 18);

        // Operator transfers tokens from user1 to user2
        vm.prank(operator);
        token.operatorTransfer(user1, user2, 50 * 10 ** 18);

        uint256 balanceUser1 = token.balanceOf(user1);
        uint256 balanceUser2 = token.balanceOf(user2);

        assertEq(balanceUser1, 50 * 10 ** 18);
        assertEq(balanceUser2, 50 * 10 ** 18);
    }

    function testOperatorBurn() public {
        // Operator mints tokens to user1
        vm.prank(operator);
        token.operatorMint(user1, 100 * 10 ** 18);

        // Operator burns tokens from user1
        vm.prank(operator);
        token.operatorBurn(user1, 50 * 10 ** 18);

        uint256 balance = token.balanceOf(user1);
        assertEq(balance, 50 * 10 ** 18);
    }

    function testUserBurn() public {
        // Operator mints tokens to user1
        vm.prank(operator);
        token.operatorMint(user1, 100 * 10 ** 18);

        // User1 burns tokens from their own account
        vm.prank(user1);
        token.burn(50 * 10 ** 18);

        uint256 balance = token.balanceOf(user1);
        assertEq(balance, 50 * 10 ** 18);
    }

    function testUnauthorizedOperatorMint() public {
        // Attempt to mint tokens from an unauthorized account
        vm.prank(user1);
        vm.expectRevert();
        token.operatorMint(user2, 100 * 10 ** 18);
    }

    function testUnauthorizedOperatorTransfer() public {
        // Attempt to transfer tokens from an unauthorized account
        vm.prank(user1);
        vm.expectRevert();
        token.operatorTransfer(user1, user2, 50 * 10 ** 18);
    }

    function testUnauthorizedOperatorBurn() public {
        // Attempt to burn tokens from an unauthorized account
        vm.prank(user1);
        vm.expectRevert();
        token.operatorBurn(user1, 50 * 10 ** 18);
    }
}
