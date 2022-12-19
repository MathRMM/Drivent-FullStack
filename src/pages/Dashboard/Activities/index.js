import { useEffect, useState } from 'react';
import useTicket from '../../../hooks/api/useTicket';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useTicketsTypes from '../../../hooks/api/useTicketsTypes';
export default function Activities() {
  const ticket = useTicket().ticket;
  const ticketType = useTicketsTypes().ticketsTypes;
  const [isPaid, setIsPaid] = useState(false);
  const [isRemote, setIsRemote] = useState(false);
  useEffect(() => {
    if(ticket) {
      if(ticket.status === 'RESERVED') {
        setIsPaid(false);
      } else {
        setIsPaid(true);
      }
      for(let i=0; i<ticketType.length; i++) {
        if(ticket.ticketTypeId === ticketType[i].id) {
          if(ticketType[i].isRemote === true) {
            setIsRemote(true);
          }
        }
      }
    }
  }, [ticket]);
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      { isPaid ? (
        <>
          { isRemote ? (
            <CenterWarning>
              <RemoteWarning variant="h6">Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</RemoteWarning>
            </CenterWarning>
          ):(
            <>
              Em breve...
            </>
          )}
        </>
      ):(
        <CenterWarning>
          <PaymentWarning variant="h6">Você precisa ter confirmado pagamento antes de fazer a escolha de atividades.</PaymentWarning>
        </CenterWarning>
      )}
    </>
  );
}

const CenterWarning = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8E8E8E;
`;

const PaymentWarning = styled(Typography)`
  width: 50%;
  color: #8E8E8E;
`;

const RemoteWarning = styled(Typography)`
  width: 60%;
  color: #8E8E8E;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 37px!important;
`;
