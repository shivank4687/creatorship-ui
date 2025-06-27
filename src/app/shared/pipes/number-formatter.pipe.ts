import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatter',
  standalone: true, // ✅ this makes it usable directly in imports array
})
export class NumberFormatterPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) return '';

    const num = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(num)) return value.toString();

    if (num < 10000) {
      return num.toLocaleString();
    } else if (num < 1_000_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    } else if (num < 1_000_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
    } else {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
  }
}
