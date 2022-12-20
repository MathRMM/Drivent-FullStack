import { isValid, isExpirationDateValid, isSecurityCodeValid, getCreditCardNameByNumber } from 'creditcard.js';
import dayjs from 'dayjs';

export function CreditValidation({ cvc, expiry, number }) {
  const date = expiry.split('/');
  const validation = {
    validNumber: isValid(number),
    validExpiry: isExpirationDateValid(date[0], '20' + date[1]),
    validCvc: isSecurityCodeValid(number, cvc),
    CardIssuer: getCreditCardNameByNumber(number),
  };
  console.log(validation);
}

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

function isValidCVC(number, cvc) {
  console.log(number, cvc);
  return isSecurityCodeValid(number, cvc);
}
