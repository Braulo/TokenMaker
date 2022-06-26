import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tm-erc721',
  templateUrl: './erc721.component.html',
  styleUrls: ['./erc721.component.scss'],
})
export class Erc721Component implements OnInit {
  public erc721FormGroup: FormGroup;
  public image: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.erc721FormGroup = this.fb.group({
      collectionName: ['', [Validators.required]],
      collectionSymbol: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  handleInputChange(event: any) {
    var file = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(event: any) {
    let reader = event.target;
    this.image = reader.result;
  }

  onSubmit(): void {}
}
