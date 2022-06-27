//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ERC721Token is ERC721 {
  constructor(
    string memory name,
    string memory symbol,
    string memory image
  ) ERC721(name, symbol) {}
}
