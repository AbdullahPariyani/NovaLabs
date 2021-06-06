import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-slot-status',
  templateUrl: './seller-slot-status.component.html'
})
export class SellerSlotStatusComponent implements OnInit {

  @Input() sellerSlots: any = [];
  loadData = false;
  constructor() { }

  ngOnInit() {
  }

}
