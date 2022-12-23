import styled from 'styled-components';
import { BsFillCheckCircleFill } from 'react-icons/bs';

import { ChosenTicket } from './ChosenTicket';
import { Subtitle } from '../../Enum/Texts';

export default function PaymentConfirm() {
  const sizeIcon = 40;

  return (
    <>
      <ChosenTicket />
      <Subtitle>Pagamento</Subtitle>
      <StyleConfirm>
        <BsFillCheckCircleFill fontSize={sizeIcon} color='#36B853'/>
        <div>
          <h2>Pagamento confirmado!</h2>
          <p>Prossiga para escolha de hospedagem e ativides</p>
        </div>
      </StyleConfirm>
    </>
  );
}

const StyleConfirm = styled.div`
  display: flex;
  gap: 20px;
`;
