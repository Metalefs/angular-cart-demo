import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
// Utility
import { ToastService } from '../shared/utility/toast-service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandler{
  constructor(http:HttpClient,router:Router,
    public toastService: ToastService){
  }

  IgnoreMessages = [
    'One or more validation errors occurred.'
  ]

  handle(error:any){
    this.handleError(error);
  }

  handleError(error: any) {
    let errorMessage:Array<string> = [];

    if(typeof error === 'string')
      errorMessage.push(error);

    //iterates over the error object and gets the values of every key from data property and concatenates them
    if(error.error?.data)
    //recursive function to get errors from the data key in response
      errorMessage.push(this.getErrorMessageFromObject(error.error.data));

    // Get server-side error
    if(error.error)
    {
      if(error.error.message && typeof error.error.message === 'string')
      errorMessage.push(error.error.message);
      if(error.error.error?.message && typeof error.error.error?.message === 'string')
      errorMessage.push(error.error.error.message);
    }
    //Validates if errorMessage is empty or has only white spaces
    if(errorMessage.length === 0 || errorMessage.join("").trim() === "")
      errorMessage.push("Houve um erro inesperado, tente novamente mais tarde.");

    //Remove ignored messages from the error message
    errorMessage = errorMessage.filter((element:string) => {
      if(this.IgnoreMessages)
        return !this.IgnoreMessages.includes(element);
      else
        return true;
    });

    this.toastService.showError(errorMessage.join("<br/>"));
    return throwError(error);
  }

  getErrorMessageFromObject(data:any){
    let errorMessage = "";
    for(let key in data)
    {
      console.log(key, data[key], typeof data[key], Array.isArray(data[key]), data[key] === 'object')
      //Checks if the key is of type string
      if(data[key] && typeof data[key] === 'string')
        errorMessage += data[key]+ "</br>";

      //Checks if the key is of type array
      else if(Array.isArray(data[key]))
        data[key].forEach((element:string) => {
          errorMessage += element+ "<br/>";
        });

      //Checks if the key is of type object
      else if(typeof data[key] === 'object')

      //iterates through all keys in the property recursively
        this.getErrorMessageFromObject(data[key])

    }
    return errorMessage;
  }

}
