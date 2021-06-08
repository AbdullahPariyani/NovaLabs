import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { AuthenticationService, UserService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    appointmentData: any = [];
    searchSellerDetails: any = [];

    sellerData: [];

    constructor(private userService: UserService, private auth: AuthenticationService) { }

    ngOnInit() {
        this.loadData();
        this.loading = true;
        this.auth.currentUser.subscribe((data: any) => {

            if (data) {
                this.sellerData = data.data[0];
                this.userService.loadData$.next(true);
            }
        });
    }

    async loadData() {
        this.userService.loadData$.subscribe(state => {
            if (state && this.sellerData) {
                debugger
                this.userService.getAll(this.sellerData).pipe(first()).subscribe((appointment: any) => {
                    this.loading = false;
                    this.appointmentData = appointment.data.rows;
                });

                this.userService.searchSellerDetails(this.sellerData).pipe(first()).subscribe((details: any) => {
                    this.loading = false;
                    this.searchSellerDetails = details.data.rows;
                });
            }
        });

    }
}
