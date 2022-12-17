import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { ChosenTicket } from '../../../components/Payment/PaymentArea/ChosenTicket';

export default function Payment() {
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <ChosenTicket ticket={{ type: 'online', price: 600 }} />
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
