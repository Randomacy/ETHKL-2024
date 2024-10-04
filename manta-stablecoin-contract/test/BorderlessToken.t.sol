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

        address;
        defaultOperators[0] = operator;

        token = new BorderlessToken(1000 * 10 ** 18, defaultOperators);

        // Assign roles
        token.grantRole(token.MINTER_ROLE(), operator);
    }

    function testInitialSupply() public {
        uint256 balance = token.balanceOf(deployer);
        assertEq(balance, 1000 * 10 ** 18);
    }

    function testMinting() public {
        // Mint tokens to user1 using operator
        vm.prank(operator);
        token.mint(user1, 100 * 10 ** 18, "", "");

        uint256 balance = token.balanceOf(user1);
        assertEq(balance, 100 * 10 ** 18);
    }

    function testOperatorSend() public {
        // Mint tokens to user1 first
        vm.prank(operator);
        token.mint(user1, 100 * 10 ** 18, "", "");

        // Operator transfers tokens from user1 to user2
        vm.prank(operator);
        token.operatorSend(user1, user2, 50 * 10 ** 18, "", "");

        uint256 balanceUser1 = token.balanceOf(user1);
        uint256 balanceUser2 = token.balanceOf(user2);

        assertEq(balanceUser1, 50 * 10 ** 18);
        assertEq(balanceUser2, 50 * 10 ** 18);
    }

    function testOperatorBurn() public {
        // Mint tokens to user1
        vm.prank(operator);
        token.mint(user1, 100 * 10 ** 18, "", "");

        // Operator burns tokens from user1
        vm.prank(operator);
        token.operatorBurn(user1, 50 * 10 ** 18, "", "");

        uint256 balance = token.balanceOf(user1);
        assertEq(balance, 50 * 10 ** 18);
    }

    function testUnauthorizedMint() public {
        // Attempt to mint tokens from an unauthorized account
        vm.prank(user1);
        vm.expectRevert();
        token.mint(user2, 100 * 10 ** 18, "", "");
    }

    function testUnauthorizedBurn() public {
        // Attempt to burn tokens from an unauthorized account
        vm.prank(user1);
        vm.expectRevert();
        token.burnTokens(user1, 50 * 10 ** 18, "", "");
    }
}
