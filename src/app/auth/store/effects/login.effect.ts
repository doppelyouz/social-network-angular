import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { CurrentUserInterface } from "src/app/shared/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { loginAction, loginFailureAction, loginSuccessAction } from "../actions/login.action";
import { PersistanceService } from "src/app/shared/services/persistance.service";

@Injectable()
export class LoginEffect {
    login$ = createEffect(() =>
    this.actions$.pipe(
        ofType(loginAction),
        switchMap(({request}) => {
            return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
                    this.persistanceService.set('accessToken', currentUser.token)
                    return loginSuccessAction({currentUser})
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(loginFailureAction({errors: errorResponse.error.errors}))
                })
            )
        })
      )
    )

    loginAfterSubmit$ = createEffect(() =>
        this.actions$.pipe(
          ofType(loginSuccessAction),
          tap(() => {
            this.router.navigateByUrl('/')
          })
        ),
        {dispatch:false}
    )

    constructor(
      private actions$: Actions,
      private authService: AuthService,
      private persistanceService: PersistanceService,
      private router: Router
    ) {}
}
