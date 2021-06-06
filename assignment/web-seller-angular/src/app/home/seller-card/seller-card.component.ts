import { first } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '@app/_services';

@Component({
  selector: 'app-seller-card',
  templateUrl: './seller-card.component.html'
})
export class SellerCardComponent implements OnInit {

  @Input() sellerData: any = [];
  loadData = false;
  constructor(private userService: UserService) { }

  ngOnInit() { }

  submitAppointment(requestData: any) {
    this.loadData = true;
    this.userService.acceptRejectAppointment(requestData).subscribe(response => {
      // this.sellerData = this.sellerData.filter(e1 => e1._id != requestData._id);
      this.loadData = false;
      this.userService.loadData$.next(true);
    });
  }

}
