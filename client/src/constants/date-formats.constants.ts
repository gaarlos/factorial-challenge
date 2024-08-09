import { Period } from '../enums/period';

export const formats = {
  [Period.MINUTE]: 'HH:mm',
  [Period.HOUR]: 'MMM D HH[h]',
  [Period.DAY]: 'MMM D',
};
