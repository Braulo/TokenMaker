import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { ERC721Token } from 'typechain';

describe('ERC721Token', function () {
  let tokenContract: ERC721Token;
  let accounts: SignerWithAddress[];
  const name = 'TestNFTCollection';
  const symbol = 'TST';
  const desciption = 'Test Description';

  beforeEach(async () => {
    const TokenContract = await ethers.getContractFactory('ERC721Token');
    tokenContract = await TokenContract.deploy(name, symbol, desciption, [
      0x12,
    ]);
    await tokenContract.deployed();
    accounts = await ethers.getSigners();
  });
});
