import styled from 'styled-components';
import { Subtitle } from '../../../components/Enum/Texts';

export function ChosenTicket({
  ticket = {
    type: 'Presencial + hotel',
    price: 600,
  },
}) {
  return (
    <>
      <Subtitle>Ingresso escolhido</Subtitle>
      <StyledYellowBox>
        <h3>{ticket.type}</h3>
        <p>R${ticket.price}</p>
      </StyledYellowBox>
    </>
  );
}

const StyledYellowBox = styled.div`
  width: 290px;
  height: 108px;
  background: #ffeed2;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  h3 {
    font-weight: 400;
    font-size: 16px;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    color: #898989;
  }
`;
