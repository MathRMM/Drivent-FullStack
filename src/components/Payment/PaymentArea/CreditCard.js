import React from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import styled from 'styled-components';
import { useState } from 'react';
import { getCreditCardNameByNumber } from 'creditcard.js';
import { toast } from 'react-toastify';

import { useForm } from '../../../hooks/useForm';
import useTicket from '../../../hooks/api/useTicket';
import cardValidation from './CreditCardValidation';
import useSavePayment from '../../../hooks/api/useSavePaymentCard';

import { Subtitle } from '../../Enum/Texts';
import { FormWrapper } from '../../PersonalInformationForm/FormWrapper';
import { InputWrapper } from '../../PersonalInformationForm/InputWrapper';
import Input from '../../Form/Input';
import { ErrorMsg } from '../../PersonalInformationForm/ErrorMsg';
import MuiButton from '@material-ui/core/Button';

export default function PaymentForm() {
  const { ticket } = useTicket();
  const { payment, createPayment } = useSavePayment();
  const { handleSubmit, handleChange, data, errors, setData, customHandleChange } = useForm({
    initialValues: {
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
    },

    validations: cardValidation,

    onSubmit: async(data) => {
      const newData = {
        ticketId: ticket.id,
        cardData: {
          issuer: getCreditCardNameByNumber(data.number),
          number: data.number,
          name: data.name,
          expirationDate: data.expiry,
          cvv: data.cvc,
        },
      };
      try {
        await createPayment(newData);
        toast('Pagamento realizado');
      } catch (error) {
        toast('Não foi possivel completar o pagameto');
      }
    },
  });

  function handleInputFocus(e) {
    const newFocus = e.target.name;
    setData({
      ...data,
      focus: newFocus,
    });
  }

  return (
    <>
      <Subtitle>Pagamento</Subtitle>
      <FormStyle>
        <Cards cvc={data?.cvc} expiry={data?.expiry} focused={data?.focus} name={data?.name} number={data?.number} />
        <FormWrapper onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              label="Card Number"
              name="number"
              type="text"
              maxLength="16"
              mask="9999 9999 9999 9999"
              onFocus={handleInputFocus}
              value={data?.number.replace(' ', '') || ''}
              onChange={handleChange('number')}
            />
            {errors.number && <ErrorMsg>{errors.number}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Nome"
              name="name"
              type="text"
              onFocus={handleInputFocus}
              value={data?.name || ''}
              onChange={handleChange('name')}
            />
            {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Validade"
              name="expiry"
              type="text"
              maxLength="5"
              mask="99/99"
              onFocus={handleInputFocus}
              value={data?.expiry || ''}
              onChange={handleChange('expiry')}
            />
            {errors.expiry && <ErrorMsg>{errors.expiry}</ErrorMsg>}
          </InputWrapper>
          <InputWrapper>
            <Input
              label="CVC"
              name="cvc"
              type="text"
              maxLength="3"
              mask="999"
              onFocus={handleInputFocus}
              value={data?.cvc || ''}
              onChange={handleChange('cvc')}
            />
            {errors.cvc && <ErrorMsg>{errors.cvc}</ErrorMsg>}
          </InputWrapper>

          <SubmitContainer>
            <Button variant={'contained'} type="submit">
              Finalizar Pagamento
            </Button>
          </SubmitContainer>
        </FormWrapper>
      </FormStyle>
    </>
  );
}

const FormStyle = styled.div`
  display: flex;
  gap: 20px;
  position: relative;
`;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;

const Button = styled(MuiButton)`
  margin-top: 8px !important;
  position: absolute;
  bottom: -60px;
  left: -300px;
`;
