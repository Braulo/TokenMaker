import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { ERC20Token } from 'typechain';

describe('ERC20Token', function () {
  let tokenContract: ERC20Token;
  let accounts: SignerWithAddress[];
  const name = 'TestToken';
  const symbol = 'TST';
  const initialSupply = 1000;

  beforeEach(async () => {
    const TokenContract = await ethers.getContractFactory('ERC20Token');
    tokenContract = await TokenContract.deploy(name, symbol, initialSupply);
    await tokenContract.deployed();
    accounts = await ethers.getSigners();
  });

  it('should create a new token', async function () {
    expect(await tokenContract.name()).to.equal(name);
    expect(await tokenContract.symbol()).to.equal(symbol);
  });
});
