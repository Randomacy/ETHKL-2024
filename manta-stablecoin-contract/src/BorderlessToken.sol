// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import statements
import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title BorderlessToken - A stablecoin for seamless transactions
/// @notice Implements ERC777 with mint and burn capabilities
contract BorderlessToken is ERC777, AccessControl {
    // Define roles for access control
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /// @notice Constructor to initialize the token
    /// @param initialSupply The initial token supply
    /// @param defaultOperators Addresses with default operator privileges
    constructor(
        uint256 initialSupply,
        address[] memory defaultOperators
    ) ERC777("BorderlessToken", "BLT", defaultOperators) {
        // Grant roles to the deployer
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);

        // Mint initial supply to the deployer
        _mint(msg.sender, initialSupply, "", "");
    }

    /// @notice Mint new tokens
    /// @param to Recipient address
    /// @param amount Amount of tokens to mint
    /// @param userData Data from the user
    /// @param operatorData Data from the operator
    function mint(
        address to,
        uint256 amount,
        bytes memory userData,
        bytes memory operatorData
    ) public onlyRole(MINTER_ROLE) {
        _mint(to, amount, userData, operatorData);
    }

    /// @notice Burn tokens from an account
    /// @param from Address from which tokens will be burned
    /// @param amount Amount of tokens to burn
    /// @param data Data from the user
    /// @param operatorData Data from the operator
    function burnTokens(
        address from,
        uint256 amount,
        bytes memory data,
        bytes memory operatorData
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _burn(from, amount, data, operatorData);
    }
}
