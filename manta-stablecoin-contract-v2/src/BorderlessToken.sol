// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import statements
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title BorderlessToken - A stablecoin with operator functionality
/// @notice Implements ERC20 with custom operator functions for minting, transferring, and burning
contract BorderlessToken is ERC20, AccessControl {
    // Define roles for access control
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    /// @notice Constructor to initialize the token
    /// @param initialSupply The initial token supply (in smallest unit, e.g., wei)
    constructor(uint256 initialSupply) ERC20("BorderlessToken", "BLT") {
        // Grant roles to the deployer
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(OPERATOR_ROLE, msg.sender);

        // Mint initial supply to the deployer
        _mint(msg.sender, initialSupply);
    }

    /// @notice Operator function to mint new tokens
    /// @param to Recipient address
    /// @param amount Amount of tokens to mint (in smallest unit)
    function operatorMint(address to, uint256 amount) public onlyRole(OPERATOR_ROLE) {
        _mint(to, amount);
    }

    /// @notice Operator function to transfer tokens on behalf of a user
    /// @param from Address from which tokens will be transferred
    /// @param to Recipient address
    /// @param amount Amount of tokens to transfer (in smallest unit)
    function operatorTransfer(address from, address to, uint256 amount) public onlyRole(OPERATOR_ROLE) {
        _transfer(from, to, amount);
    }

    /// @notice Operator function to burn tokens from an account
    /// @param from Address from which tokens will be burned
    /// @param amount Amount of tokens to burn (in smallest unit)
    function operatorBurn(address from, uint256 amount) public onlyRole(OPERATOR_ROLE) {
        _burn(from, amount);
    }

    /// @notice Function to burn tokens from the caller's account
    /// @param amount Amount of tokens to burn (in smallest unit)
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
