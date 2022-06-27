import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { base64 } from 'ethers/lib/utils';
import { WalletService } from '../../services/wallet-service/wallet.service';
import {
  abi,
  bytecode,
} from '../../../../artifacts/contracts/ERC721Token.sol/ERC721Token.json';
import { ethers } from 'ethers';
import copy from 'copy-to-clipboard';

@Component({
  selector: 'tm-erc721',
  templateUrl: './erc721.component.html',
  styleUrls: ['./erc721.component.scss'],
})
export class Erc721Component implements OnInit {
  public erc721FormGroup: FormGroup;
  public image: string;
  public imageByteArray = [];
  public contractAddress: string;
  public isLoading: boolean;

  constructor(private fb: FormBuilder, private walletService: WalletService) {}

  ngOnInit(): void {
    this.erc721FormGroup = this.fb.group({
      collectionName: ['', [Validators.required]],
      collectionSymbol: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  handleInputChange(e: any) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onloadend = (evt) => {
      if (evt.target.readyState === FileReader.DONE) {
        const arrayBuffer = evt.target.result as any,
          array = new Uint8Array(arrayBuffer);
        for (const a of array) {
          this.imageByteArray.push(a);
        }
        this.image =
          'data:image/png;base64,' + base64.encode(this.imageByteArray);
      }
    };
  }

  async onSubmit(): Promise<void> {
    this.isLoading = true;
    const name = this.erc721FormGroup.get('collectionName').value;
    const symbol = this.erc721FormGroup.get('collectionSymbol').value;
    const description = this.erc721FormGroup.get('description').value;

    try {
      const signer = this.walletService.provider.getSigner();
      const erc721Contract = new ethers.ContractFactory(abi, bytecode, signer);
      const contract = await erc721Contract.deploy(
        name,
        symbol,
        description,
        this.imageByteArray
      );
      await contract.deployed();

      this.contractAddress = contract.address;
    } catch (error) {
      console.log('err', error);
    } finally {
      this.isLoading = false;
    }
  }

  copyAddress(): void {
    copy(this.contractAddress);
  }
}
