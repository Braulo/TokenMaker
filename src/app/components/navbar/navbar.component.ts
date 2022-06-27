import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet-service/wallet.service';

@Component({
  selector: 'tm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public address: string;
  public connected: boolean = false;
  public networkName: string;

  constructor(private walletService: WalletService) {}

  async ngOnInit() {
    const connected = await this.walletService.setProvider();
    if (connected) {
      this.address = await this.walletService.provider.getSigner().getAddress();
      this.connected = true;
      this.networkName = (await this.walletService.provider.getNetwork()).name;
    }

    this.setTheme(localStorage.getItem('theme') || 'light');
  }

  toggleTheme(): void {
    this.setTheme(localStorage.getItem('theme') === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: string): void {
    document.body.classList.remove(theme === 'light' ? 'dark' : 'light');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme === 'light' ? 'light' : 'dark');
  }

  getCurrentTheme(): string {
    return localStorage.getItem('theme') || '';
  }

  async connectWallet() {
    this.connected = await this.walletService.connectWallet();
    if (this.connected) {
      this.address = await this.walletService.provider.getSigner().getAddress();
      this.networkName = (await this.walletService.provider.getNetwork()).name;
    }
  }
}
