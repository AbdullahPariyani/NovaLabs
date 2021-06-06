import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    loadData$ = new BehaviorSubject<any>(null);
    constructor(private http: HttpClient) { }

    getAll(id) {
        return this.http.post<User[]>(`${environment.apiUrl}/seller/get-all-appointment`, { "sellerId": id._id });
    }

    searchSellerDetails(id) {
        return this.http.post<User[]>(`${environment.apiUrl}/seller/search-seller-details`, { "sellerId": id._id });
    }

    acceptRejectAppointment(data) {
        return this.http.post<User[]>(`${environment.apiUrl}/seller/accept-reject-appointment`, data);
    }
}
