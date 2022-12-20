import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useHotels from '../../hooks/api/useHotels';
import { NoPaymentMessageWrapper } from './noPaymentMessageWrapper';

export default function Hotels() {
  const { gethotelsData } = useHotels();
  const [data, setData] = useState([]);
  const [isPaymentRequired, setIsPaymentRequired] = useState(false);

  useEffect(() => {
    gethotelsData()
      .then((resp) => {
        const hotelsData = resp.data;
        setData(hotelsData);        
      })
      .catch((err) => {        
        if(err.message === 'Request failed with status code 402') {
          return setIsPaymentRequired(true);
        }
      });
  }, []);

  return( 
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {isPaymentRequired ? <NoPaymentMessageWrapper><div><p>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</p></div></NoPaymentMessageWrapper> : <> Nenhum hotel cadastrado ainda!! </>}
    </>);
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
