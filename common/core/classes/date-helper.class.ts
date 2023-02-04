// Class I/O format: DD.MM.YYYY
// ISO small format: YYYY-MM-DD
export class DateHelper {

  static getTimezoneUTC(): string {
    const offset = new Date().getTimezoneOffset();
    if (offset === 0) {
      return '0';
    }

    const timeZoneOffset = (offset * -1);

    return timeZoneOffset.toString();
  }


  static addZero(nr: number): string {
    if (nr < 0) {
      nr = (nr * -1);
    }
    const n = (nr < 10) ? '0' + nr : nr;

    return n.toString();
  }


  static getNextDay(date: Date = new Date()): Date {
    return this.getPlusDays(1, date);
  }


  static getPlusDays(nrOfDays: number, date: Date = new Date()): Date {
    const nextDate = date;
    nextDate.setDate(date.getDate() + nrOfDays);

    return nextDate;
  }


  static dateToString(date: Date): string {
    return (
      DateHelper.addZero(date.getDate()) +
      '.' +
      DateHelper.addZero(date.getMonth() + 1) +
      '.' +
      date.getFullYear()
    );
  }


  static stringToDate(date: string): Date {
    if (!date) {
      return undefined;
    }
    const splitDate = date.split('.');

    return new Date(Number(splitDate[2]), Number(splitDate[1]) - 1, Number(splitDate[0]));
  }


  static firstDayOfMonth(date: Date): Date {
    const firstDayOfMonth = new Date(date);
    firstDayOfMonth.setDate(1);

    return firstDayOfMonth;
  }


  static lastDayOfMonth(date: Date): Date {
    const lastDayOfMonth = new Date(date);
    lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
    lastDayOfMonth.setDate(0);

    return lastDayOfMonth;
  }


  static isoStringToDate(date: string): Date {
    if (!date) {
      return undefined;
    }

    // This statement is a workaround for situations when typeof date !== 'string'
    if (!date.split) {
      const tomorrow = new Date();
      tomorrow.setDate(new Date().getDate() + 1);
      date = this.dateToIsoString(tomorrow);
    }

    const splitT = date.split('T');
    const splitDate = splitT[0].split('-');

    return new Date(Number(splitDate[0]), Number(splitDate[1]) - 1, Number(splitDate[2]));
  }


  static dateToIsoString(date: Date): string {
    return (
      date.getFullYear() +
      '-' +
      DateHelper.addZero(date.getMonth() + 1) +
      '-' +
      DateHelper.addZero(date.getDate()) +
      'T00:00:00'
    );
  }


  static monthDifference(startDate: Date, endDate: Date): number {
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    const diff = (months < 0) ? (months * -1) : months;

    return diff;
  }


  static getPlusMonths(nrOfMonths: number, date: Date = new Date()): Date {
    const monthsAfterAddition = (date.getMonth() + nrOfMonths);
    const newDate = new Date(date.setMonth(monthsAfterAddition));

    return newDate;
  }


  static getTimeObj(time: string): {hours: number; minutes: number} {
    const tmp = String(time).match(/^(\d+):(\d+)$/);
    const hours = parseInt(tmp[1], 10);
    const minutes = parseInt(tmp[2], 10);

    return {
      hours: hours,
      minutes: minutes,
    };
  }

}
