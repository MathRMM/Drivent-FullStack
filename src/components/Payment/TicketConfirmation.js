import styled from 'styled-components';
import { useContext } from 'react';
import { toast } from 'react-toastify';

import UserContext from '../../contexts/UserContext';
import useSaveTicket from '../../hooks/api/useSaveTicket';
import { steps } from '../../utils/ticketUtils';

import { OptionContainer, Subtitle } from '../../pages/Dashboard/Payment/TicketPage';
import Typography from '@material-ui/core/Typography';
import { ConfirmationButton } from '../ConfirmationButton';

export default function TicketConfirmation({ price, createTicket, setStep }) {
  const { saveTicketLoading, saveTicket } = useSaveTicket();
  const { userData, setUserData } = useContext(UserContext);
  async function handleClick() {
    const newTicket = await createTicket();

    try {
      const response = await saveTicket(newTicket);
      await setUserData({ ...userData, ticket: response });
      toast('Informações salvas com sucesso!');
      setStep(steps.payment);
    } catch (err) {
      toast('Não foi possível salvar suas informações!');
    }
  }

  return (
    <OptionContainer>
      <Subtitle variant="h6">
        Fechado! O total ficou em <strong>R$ {price}</strong>. Agora é só confirmar:
      </Subtitle>
      <ConfirmationButton type="submit" disabled={saveTicketLoading} onClick={handleClick}>
        <StyledTypography variant="body2">RESERVAR INGRESSO</StyledTypography>
      </ConfirmationButton>
    </OptionContainer>
  );
}

const StyledTypography = styled(Typography)`
  text-align: center !important;
  line-height: 1 !important;
  font-size: 12px !important;
`;
