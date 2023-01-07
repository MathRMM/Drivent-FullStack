import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { eachHourOfInterval, format, getHours, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export default function Activity({ activity, duration }) {
  return (
    <ActivityBox duration={duration}>
      <ActivityInformation>
        <TypographyText variant="subtitle2">{activity.name}</TypographyText>
        <TypographyText variant="subtitle2"><p>{ format(parseISO(activity.startsAt), ' HH:mm ', { locale: ptBR }) } - { format(parseISO(activity.endsAt), ' HH:mm ', { locale: ptBR }) }</p></TypographyText>
      </ActivityInformation>
      <ActivityButton> button </ActivityButton>
    </ActivityBox>
  );
}

const ActivityInformation = styled.div`
`;

const ActivityButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 100%;
  border-left: 1px solid #CFCFCF;
`;

const ActivityBox = styled.div`
  background-color: #F1F1F1;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  height: ${props => `${80*props.duration}px`};
  box-sizing: border-box;
  padding: 15px;
`;

const TypographyText = styled(Typography)`
  font-weight: 700 !important;
  font-size: 12px;
  line-height: 14px;
  color: #343434;
  
  p {
    font-weight: 400 !important;
  }
`;
