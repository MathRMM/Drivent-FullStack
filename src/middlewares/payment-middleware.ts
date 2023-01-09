import cardValidator from "card-validator";
import { CardPaymentParams } from "@/services/payments-service";

export function creditCardValidation(cardData: CardPaymentParams): string {
  const isNumberValid = cardValidator.number(cardData.number);
  const isExpiryValid= cardValidator.expirationDate(cardData.expirationDate);
  const isCVVValid = cardValidator.cvv(cardData.cvv);

  console.log(isNumberValid, isExpiryValid, isCVVValid);
  
  if (!isNumberValid.isValid || !isExpiryValid.isValid || !isCVVValid.isValid) throw { name: "UnauthorizedError", message: "cartao invalido" };
  return "ok";
}
