import { Period } from '../enums/period';

export const formats = {
  [Period.MINUTE]: 'ddd HH[h]',
  [Period.HOUR]: 'MMM D HH[h]',
  [Period.DAY]: 'MMM D',
};
