import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Activity from './Activity';
import { eachHourOfInterval, getDayOfYear, getHours, getYear, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
export default function Place({ place, selectedDateBox, eventActivities }) {
  const [hoursOccupancyState, setHoursOccupancyState] = useState([]);
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    setHoursOccupancyState([]);
    setActivities(place.Activities);
    let hoursOccupancy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    (place.Activities).map((activity) => {
      if((getDayOfYear(parseISO(activity.startsAt)) === getDayOfYear(selectedDateBox)) && (getYear(parseISO(activity.startsAt)) === getYear(selectedDateBox))) {
        const hoursArr = eachHourOfInterval({ start: parseISO(activity.startsAt), end: parseISO(activity.endsAt) });
        for(let i=0; i<hoursArr.length-1; i++) {
          let hourOccupancy = getHours(hoursArr[i])-6;
          hoursOccupancy[hourOccupancy]=activity.id;
          if(i === hoursArr.length-2) {
            setHoursOccupancyState(hoursOccupancy);
          }
        }
      }
    });
  }, [selectedDateBox]);
  return (
    <Flexing>
      <TypographyTitle variant="subtitle1">{place.name}</TypographyTitle>
      <PlaceBox>
        {
          (hoursOccupancyState).map((hasActivity, index) => {
            if((hasActivity === hoursOccupancyState[index-1]) && (hasActivity !== 0)) {
              return <NoneActivity key={index}></NoneActivity>;
            }
            if(hasActivity === 0) {
              return <BlankActivity key={index}></BlankActivity>;
            }else {
              for(let i=0; i<activities.length; i++) {
                if(activities[i].id === hasActivity) {
                  let duration = getHours(parseISO(activities[i].endsAt))-getHours(parseISO(activities[i].startsAt));
                  for(let j=2; j<13; j++) {
                    if(duration === j) {
                      return <Activity key={index} activity={activities[i]} duration={j} eventActivities={eventActivities}/>;
                    }
                  }
                  return <Activity key={index} activity={activities[i]} duration={1} eventActivities={eventActivities}/>;
                }
              }
            }
          })
        }
      </PlaceBox>
    </Flexing>
  );
}

const NoneActivity = styled.div`
`;

const BlankActivity = styled.div`
  height: 80px;
`;

const PlaceBox = styled.div`
  width: 287px;
  box-sizing: border-box;
  border: 1px solid #D7D7D7;
  height: 392px;
  min-height: 100px;
  margin: 13px 0px 13px 0px;
  padding: 10px 10px 0px 10px;
  overflow: scroll;
`;

const Flexing = styled.div`
  display: flex;
  flex-direction: column;
`;

const TypographyTitle = styled(Typography)`
  text-align: center;
  color: #7B7B7B;
`;
