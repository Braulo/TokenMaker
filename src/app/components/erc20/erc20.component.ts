import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BigNumber, ethers } from 'ethers';
import {
  abi,
  bytecode,
} from '../../../../artifacts/contracts/ERC20Token.sol/ERC20Token.json';
import { WalletService } from '../../services/wallet-service/wallet.service';
import copy from 'copy-to-clipboard';

@Component({
  selector: 'tm-erc20',
  templateUrl: './erc20.component.html',
  styleUrls: ['./erc20.component.scss'],
})
export class Erc20Component implements OnInit {
  public erc20FormGroup: FormGroup;
  public tokenAddress: string;
  public isLoading: boolean = false;

  constructor(private fb: FormBuilder, private walletService: WalletService) {}

  ngOnInit(): void {
    this.erc20FormGroup = this.fb.group({
      name: ['', [Validators.required]],
      symbol: ['', [Validators.required]],
      supply: ['', [Validators.required]],
    });
  }

  async onSubmit(): Promise<void> {
    const name = this.erc20FormGroup.get('name').value;
    const symbol = this.erc20FormGroup.get('symbol').value;
    const supply = this.erc20FormGroup.get('supply').value;
    this.isLoading = true;

    try {
      const signer = this.walletService.provider.getSigner();
      const erc20Contract = new ethers.ContractFactory(abi, bytecode, signer);
      const contract = await erc20Contract.deploy(
        name,
        symbol,
        BigNumber.from(supply)
      );
      await contract.deployed();
      this.tokenAddress = contract.address;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  copyAddress(): void {
    copy(this.tokenAddress);
  }
}
