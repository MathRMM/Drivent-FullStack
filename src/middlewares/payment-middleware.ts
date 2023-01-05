import { isValid, isExpirationDateValid, isSecurityCodeValid, getCreditCardNameByNumber } from "creditcard.js";
import { CardPaymentParams } from "@/services/payments-service";

export function creditCardValidation(cardData: CardPaymentParams): string {
  const expiry = cardData.expirationDate.split("/");
  const isNumberValid = isValid(cardData.number);
  const isExpiryValid = isExpirationDateValid(expiry[0], expiry[1]);
  const isCVVValid = isSecurityCodeValid(cardData.number, cardData.cvv);
  const isIssuerValid = getCreditCardNameByNumber(cardData.number) === cardData.issuer;
  
  if (!isNumberValid || !isExpiryValid || !isCVVValid || !isIssuerValid) throw { name: "UnauthorizedError", message: "cartao invalido" };
  return "ok";
}
