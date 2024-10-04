// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BorderlessStablecoin is ERC20, Ownable {
    constructor(
        address initialOwner
    ) ERC20("Borderless", "BDLS") Ownable(initialOwner) {
        // Initial minting can be done here if needed
    }

    /// @notice Allows the owner to mint new Borderless stablecoins
    /// @param to The address to receive the minted tokens
    /// @param amount The number of tokens to mint
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /// @notice Allows the owner to burn Borderless stablecoins
    /// @param amount The number of tokens to burn
    function burn(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount);
    }
}
