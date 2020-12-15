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
    let minutes = Math.floor(value%60);
    value = value/60;
    let hours = Math.floor(value%24);
    value = value/24;
    let day = Math.floor(value%30);
    value = value/30;
    let month = Math.floor(value%12);
    value = value/12;
    let year = Math.floor(value)

    let arrayD=[year,month,day,hours,minutes,seconds,miliseconds];
    let arrayS=['Years','Months','Days', 'Hours', 'Minutes', 'Seconds', 'miliseconds'];
    let resultAmount='';

    for(let i = 0; i<arrayD.length; i++){
      if (arrayD[i] != 0 && (arrayS[i]=='Years'||arrayS[i]=='Months')){
        resultAmount+=arrayD[i]+arrayS[i]+'/';
      }
      else if (arrayD[i] != 0 && arrayS[i]=='Days'){
        resultAmount+=arrayD[i]+arrayS[i]+'  ';
      }
      else if(arrayD[i] !=0 && !(arrayS[i]=='Years'||arrayS[i]=='Months'||arrayS[i]=='Days')){
        resultAmount+=arrayD[i]+arrayS[i]+':';
      }
      else{ resultAmount = '0000/00/00 00:00:00'}
    }
    return resultAmount;
  }
}