export class DateHelper{
  public static setSafeDate(date: Date): Date {
    date.setHours(12, 0, 0, 0);
    return date;
  }
}
