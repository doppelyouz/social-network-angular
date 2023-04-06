import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms"

import { RegisterComponent } from "src/app/auth/components/register/register.component";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { AuthService } from "./services/auth.service";
import { EffectsModule } from "@ngrx/effects";
import { RegisterEffect } from "./store/effects/register.effect";
import { BackendErrorsMessagesModule } from "../shared/modules/backendErrorMessages/backendErrorMessages.modue";

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    }
]

@NgModule({
    declarations: [RegisterComponent],
    providers: [AuthService],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([RegisterEffect]),
        BackendErrorsMessagesModule
    ]
})
export class AuthModule {

}
