export class DateTimeHelper {
  public static setSafeDate(date: Date): Date {
    date.setHours(12, 0, 0, 0);
    return date;
  }

  public static  formatDateToString(date: Date): string {
    console.log(date)
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
