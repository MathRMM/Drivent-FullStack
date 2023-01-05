import { isValid, isExpirationDateValid } from 'creditcard.js';

const validation = {
  name: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome válido',
    },
  },
  number: {
    custom: {
      isValid: (value) => isValid(value),
      message: 'Digite um numero válido',
    },
  },
  expiry: {
    custom: {
      isValid: (value) => isValidExpiry(value),
      message: 'Digite um data válida',
    },
  },
  cvc: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) >= 3,
      message: 'Digite um código válido',
    },
  },
};

export default validation;

function isValidString(value) {
  return value || value?.trim();
}

function isValidExpiry(expiry) {
  const date = expiry.split('/');
  return isExpirationDateValid(date[0], '20' + date[1]);
}
