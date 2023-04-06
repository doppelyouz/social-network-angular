import { Component, Input, OnInit } from "@angular/core";
import { BackendErrorsInterface } from "src/app/shared/backendErrors.interface";

@Component({
  selector: 'app-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backengErrorMessages.component.scss'],
})
export class BackendErrorsMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface

  errorMessages: string[]

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map((name: string) => {
      const messages = this.backendErrorsProps[name].join(', ');

      return `${name} ${messages}`
    })
  }
}