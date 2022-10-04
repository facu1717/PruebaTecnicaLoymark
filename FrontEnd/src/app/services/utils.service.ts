import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }



  onlyLetters(event: any) {
    let inp = String.fromCharCode(event.keyCode)
    const pattern: RegExp = /[a-z A-Z áÁàÀéÉèÈíÍìÌóÓòÒúÚùÙÂÃÄÊËÎÏÔÕÖÛÜÝâãäêëîïôõöûüýÿñÑ]/
    if(pattern.test(inp)) {
      return true
    } else{
      event.preventDefault()
      return false
    }
  }

  onlyNumbers(event: any) {
    
    if( event.key == "."  ){
      return true
    }
    else if( !isNaN(event.key) ){
      return true
    }
    else{
      event.preventDefault()
      return false
    }
  }
}
