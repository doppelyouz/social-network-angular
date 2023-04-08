import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms"

import { RegisterComponent } from "src/app/auth/components/register/register.component";
import { LoginComponent } from "src/app/auth/components/login/login.component";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { AuthService } from "./services/auth.service";
import { EffectsModule } from "@ngrx/effects";
import { RegisterEffect } from "./store/effects/register.effect";
import { BackendErrorsMessagesModule } from "../shared/modules/backendErrorMessages/backendErrorMessages.module";
import { LoginEffect } from "./store/effects/login.effect";
import { GetCurrentUserEffect } from "./store/effects/getCurrentUser.effect";
import { PersistanceService } from "../shared/services/persistance.service";

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
]

@NgModule({
    declarations: [RegisterComponent, LoginComponent],
    providers: [AuthService, PersistanceService],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([RegisterEffect, LoginEffect, GetCurrentUserEffect]),
        BackendErrorsMessagesModule
    ]
})
export class AuthModule {

}
