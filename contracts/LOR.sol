// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LORToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("LOR Token", "LOR") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

}