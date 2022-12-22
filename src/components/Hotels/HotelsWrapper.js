import Rooms from './Rooms';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export default function HotelsWrapper() {
  const hotelId = 2;
  
  return (
    <Rooms hotelId={hotelId}/>
  );
}

const Subtitle = styled(Typography)`
    margin-bottom: 14px!important;
    color: #8E8E8E;
`;

export {
  Subtitle,
};
