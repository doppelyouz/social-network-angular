import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { registerAction } from '../../store/actions/register.action';
import { Observable } from 'rxjs';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/currentUser.interface';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { BackendErrorsInterface } from 'src/app/shared/backendErrors.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
    form: FormGroup;
    isSubmitting$: Observable<boolean>
    backendErrors$: Observable<BackendErrorsInterface | null>

    constructor(private fb: FormBuilder, private store: Store, private authService: AuthService) {}

    ngOnInit(): void {
       this.initializeForm()
       this.initializeValues()
    }

    initializeValues():void {
      this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
      this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
    }

    initializeForm(): void {
      this.form = this.fb.group({
        username: '',
        email: '',
        password: ''
      })
    }

    onSubmit(): void {
      const request: RegisterRequestInterface = {
        user: this.form.value
      }
      this.store.dispatch(registerAction({request}))
    }
}
