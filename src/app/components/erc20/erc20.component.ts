import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tm-erc20',
  templateUrl: './erc20.component.html',
  styleUrls: ['./erc20.component.scss'],
})
export class Erc20Component implements OnInit {
  public erc20FormGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.erc20FormGroup = this.fb.group({
      name: ['', [Validators.required]],
      symbol: ['', [Validators.required]],
      supply: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    // Todo deploy token
  }
}
