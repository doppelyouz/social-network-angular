import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { CurrentUserInterface } from "src/app/shared/currentUser.interface";
import { PersistanceService } from "../../services/persistance.service";
import { getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction } from "../actions/getCurrentUser.action";

@Injectable()
export class GetCurrentUserEffect {
    getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
        ofType(getCurrentUserAction),
        switchMap(() => {
          const token = this.persistanceService.get('accessToken')
          if(token) {
            return of(getCurrentUserFailureAction())
          }
            return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
                    return getCurrentUserSuccessAction({currentUser})
                }),
                catchError(() => {
                    return of(getCurrentUserFailureAction())
                })
            )
        })
      )
    )

    constructor(
      private actions$: Actions,
      private authService: AuthService,
      private persistanceService: PersistanceService
    ) {}
}
