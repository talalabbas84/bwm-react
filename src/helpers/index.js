import titleize from 'titleize';

export const rentalType = isShared => {
  return isShared ? 'shared' : 'entire';
};

export const toUpperCase = value => (value ? titleize(value) : '');
