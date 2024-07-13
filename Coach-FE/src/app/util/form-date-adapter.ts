import { MatDateFormats, NativeDateAdapter } from "@angular/material/core";
import { Injectable } from "@angular/core";

@Injectable()
export class FormDateAdapter extends NativeDateAdapter {
  override format(date: Date): string {
    const day: string = date.getDate().toString().padStart(2, '0');
    const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
    const year: number = date.getFullYear();

    return `${day}.${month}.${year}`;
  }
}

export const FORM_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { day: 'short', month: 'short', year: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};
