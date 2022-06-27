//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract ERC721Token is ERC721URIStorage {
  constructor(
    string memory name,
    string memory symbol,
    string memory description,
    bytes memory image
  ) ERC721(name, symbol) {
    _safeMint(msg.sender, 1);
    _setTokenURI(1, constructTokenURI(name, description, image));
  }

  function constructTokenURI(
    string memory name,
    string memory description,
    bytes memory image
  ) private pure returns (string memory) {
    return
      string(
        abi.encodePacked(
          "data:application/json;base64,",
          Base64.encode(
            bytes(
              abi.encodePacked(
                '{"name":"',
                name,
                '", "description":"',
                description,
                '", "image": "',
                "data:image/svg+xml;base64,",
                Base64.encode(image),
                '"}'
              )
            )
          )
        )
      );
  }
}
