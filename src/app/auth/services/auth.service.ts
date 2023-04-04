import { Injectable } from "@angular/core";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { Observable, map } from "rxjs";
import { CurrentUserInterface } from "../../shared/currentUser.interface";
import { HttpClient } from '@angular/common/http'
import { apiUrl } from "src/apiUrl";
import { AuthResponseInterface } from "../types/authResponse.interface";

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}
    
    register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
        return this.http
            .post<AuthResponseInterface>(apiUrl + '/users', data)
            .pipe(map((response: AuthResponseInterface) => response.user))
    }
}