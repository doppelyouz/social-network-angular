import { Injectable } from "@angular/core";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { Observable, map } from "rxjs";
import { CurrentUserInterface } from "../../shared/currentUser.interface";
import { HttpClient } from '@angular/common/http'
import { apiUrl } from "src/apiUrl";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    getUser(response: AuthResponseInterface): CurrentUserInterface {
      return response.user
    }

    register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
        return this.http
            .post<AuthResponseInterface>(apiUrl + '/users', data)
            .pipe(map(this.getUser))
    }

    login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
        const url = apiUrl + '/users/login';

        return this.http
            .post<AuthResponseInterface>(url, data)
            .pipe(map(this.getUser))
    }

    getCurrentUser(): Observable<CurrentUserInterface> {
      const url = apiUrl + '/user';

      return this.http.get(url).pipe(map(this.getUser))
    }
}
