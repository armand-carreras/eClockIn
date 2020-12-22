import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalFormat'
})
export class TotalFormatPipe implements PipeTransform {

  transform(value: number): string {
    let miliseconds = Math.floor(value%1000);
    value = value/1000;
    let seconds = Math.floor(value%60);
    value = value/60;
    let minutes = Math.floor(value % 60);
    value = value/60;
    let hours = Math.floor(value%24);
    value = value/24;

    let arrayD=[hours,minutes,seconds];
    let arrayS=['h', 'm', 's'];
    let resultAmount='';

    for(let i = 0; i<arrayD.length; i++){

      if(arrayD[i] !=0 && i<arrayD.length-1){
        resultAmount+=arrayD[i]+arrayS[i]+' ';
      }
      else if(arrayD[i]!=0){
        resultAmount+=arrayD[i]+arrayS[i];
      }
      
    }

    console.log('elapsed',resultAmount);
    return resultAmount;
  }
}