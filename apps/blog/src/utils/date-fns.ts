import { format } from 'date-fns';

export function fromat_MMMM_dd_yyy(date: Date) {
  return format(date, 'MMMM dd, yyyy');
}
