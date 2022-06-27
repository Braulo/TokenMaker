import { Injectable } from '@angular/core';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  public provider: Web3Provider;

  constructor() {}

  async setProvider(): Promise<boolean> {
    try {
      this.provider = new ethers.providers.Web3Provider(
        (window as any).ethereum,
        'any'
      );
      (window as any).ethereum.on('accountsChanged', async () => {
        location.reload();
      });
      (window as any).ethereum.on('chainChanged', async () => {
        location.reload();
      });
      (window as any).ethereum.on('disconnect', async () => {
        location.reload();
      });
      const accounts = await this.provider.listAccounts();
      if (accounts.length == 0) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  async connectWallet(): Promise<boolean> {
    if ((window as any).ethereum) {
      try {
        this.setProvider();

        await this.provider.send('eth_requestAccounts', []);

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      alert('Please download Metamask');
      return false;
    }
  }
}
