// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract BorderlessStablecoin is ERC20, Ownable, ERC2771Context {
    constructor(
        address initialOwner,
        address trustedForwarder
    ) ERC20("Borderless", "BDLS") ERC2771Context(trustedForwarder) Ownable(initialOwner) {}

    /// @notice Allows the owner to mint new Borderless stablecoins
    /// @param to The address to receive the minted tokens
    /// @param amount The number of tokens to mint
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /// @notice Allows the owner to burn Borderless stablecoins
    /// @param amount The number of tokens to burn
    function burn(uint256 amount) external onlyOwner {
        _burn(msg.sender, amount);
    }

    /// Override the _msgSender function
    function _msgSender() internal view override(Context, ERC2771Context) returns (address sender) {
        return ERC2771Context._msgSender();
    }

    /// Override the _msgData function
    function _msgData() internal view override(Context, ERC2771Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }

    /// Override the _contextSuffixLength function
    function _contextSuffixLength() internal view override(Context, ERC2771Context) returns (uint256) {
        return ERC2771Context._contextSuffixLength();
    }
}
