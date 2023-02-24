import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { format, getHours, parseISO, setHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { IoIosCloseCircleOutline, IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { IoEnterOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useActivities from '../../../hooks/api/useSaveActivitySubscription';
import { toast } from 'react-toastify';
export default function Activity({ activity, duration, eventActivities }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [vacancies, setVacancies] = useState(0);
  const [subscribedActivities, setSubscribedActivities] = useState([]);
  const { createActivity, activityLoading } = useActivities();
  const enrollment = useEnrollment().enrollment;
  useEffect(() => {
    if(enrollment) {
      setIsEmpty(false);
      setIsSubscribed(false);
      let subscribers = activity.Participants.length;
      setVacancies(activity.Vacancies - subscribers);
      (activity.Participants).map((participant) => {
        if(participant.enrollmentId === enrollment.id) {
          setIsSubscribed(true);
        }
      });
      if(vacancies === 0) {
        setIsEmpty(true);
      }
      (eventActivities).map((activityOfAll) => {
        if(activityOfAll.id !== activity.id) {
          (activityOfAll.Participants).map((participant) => {
            if((participant.enrollmentId === enrollment.id)) {
              subscribedActivities.push(activityOfAll);
            }
          });
        }
      });
    }
  }, [enrollment, vacancies]);
  async function handleClick() {
    try {
      let hasConflict = false;
      (subscribedActivities).map((subscribedActivity) => {
        if(((getHours(parseISO(activity.startsAt))+3) >= (getHours(parseISO(subscribedActivity.startsAt))+3)) && ((getHours(parseISO(activity.startsAt))+3) < (getHours(parseISO(subscribedActivity.endsAt))+3))) {
          hasConflict = true;
        }
      });
      if(hasConflict) {
        toast('Já existe atividade inscrita dentro desse horário!');
      }else {
        await createActivity(activity.id);
        toast('Inscrição realizada com sucesso!');
        setIsSubscribed(true);
      }
    } catch (err) {
      toast('Não foi possível realizar a sua inscrição!');
    }
  }
  return (
    <ActivityBox duration={duration} isSubscribed={isSubscribed}>
      <ActivityInformation>
        <TypographyText variant="subtitle2">{activity.name}</TypographyText>
        <TypographyText variant="subtitle2"><p>{ format((setHours(parseISO(activity.startsAt), getHours(parseISO(activity.startsAt))+3)), ' HH:mm ', { locale: ptBR }) } - { format((setHours(parseISO(activity.endsAt), getHours(parseISO(activity.endsAt))+3)), ' HH:mm ') }</p></TypographyText>
      </ActivityInformation>
      <ActivityButton> 
        { isSubscribed ? (
          <SubscribedIcon><IoIosCheckmarkCircleOutline /><p>Inscrito</p></SubscribedIcon>
        ):(
          <>
            { isEmpty ? (
              <EmptyIcon><IoIosCloseCircleOutline /><p>Esgotado</p></EmptyIcon>
            ):(
              <SubscriptionIcon disabled={activityLoading} onClick={handleClick}><IoEnterOutline /><p>{vacancies} vagas</p></SubscriptionIcon> 
            ) }
          </>
        ) }
      </ActivityButton>
    </ActivityBox>
  );
}

const SubscribedIcon = styled.div`
  font-size: 30px;
  color: #078632;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    font-size: 10px;
  }
`;

const SubscriptionIcon = styled.div`
  font-size: 30px;
  color: #078632;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  p {
    font-size: 10px;
  }
`;

const EmptyIcon = styled.div`
  color: #CC6666;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    font-size: 10px;
  }
`;

const ActivityInformation = styled.div`
`;

const ActivityButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 100%;
  border-left: 1px solid #CFCFCF;
`;

const ActivityBox = styled.div`
  background-color: ${props => {if(props.isSubscribed) {return '#D0FFDB';}else{return '#F1F1F1';}}};
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  height: ${props => `${(80*props.duration)+(10*(props.duration-1))}px`};
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
