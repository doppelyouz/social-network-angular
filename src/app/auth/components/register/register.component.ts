import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { registerAction } from '../../store/actions/register.action';
import { Observable } from 'rxjs';
import { isSubmittingSelector } from '../../store/selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
    form: FormGroup;
    isSubmitting$: Observable<boolean>

    constructor(private fb: FormBuilder, private store: Store) {}

    ngOnInit(): void {
       this.initializeForm()
       this.initializeValues()
    }
    
    initializeValues():void {
      this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    }

    initializeForm(): void {
      this.form = this.fb.group({
        username: '',
        email: '',
        password: ''
      })
    }

    onSubmit(): void {
      this.store.dispatch(registerAction(this.form.value))
    }
}
