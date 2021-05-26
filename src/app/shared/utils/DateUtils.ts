import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class DateUtils{
    constructor(private datePipe: DatePipe) {}

    public formateDate(date: Date)
    {
       return this.datePipe.transform(date, 'yyyy/MM/dd');
    }
}

