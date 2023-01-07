import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';
export default function Day({ day, selectedDateBox, setSelectedDateBox }) {
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    if(selectedDateBox === day) {
      setIsSelected(true);
    }else{
      setIsSelected(false);
    } 
  }, [selectedDateBox]);
  return (
    <>
      { isSelected ? (
        <DateBoxSelected onClick={() => setSelectedDateBox(0)}>
          <TypographyDate variant="caption">{ format(day, 'eee, dd/MM ', { locale: ptBR }) }</TypographyDate>
        </DateBoxSelected>
      ):(
        <DateBox onClick={() => setSelectedDateBox(day)}>
          <TypographyDate variant="caption">{ format(day, 'eee, dd/MM ', { locale: ptBR }) }</TypographyDate>
        </DateBox>
      )}
    </>
  );
}

const DateBox = styled.div`
  width: 158px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-top: 23px;
  margin-right: 17px;
`;

const DateBoxSelected = styled.div`
  width: 158px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFD37D;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-top: 23px;
  margin-right: 17px;
`;

const TypographyDate = styled(Typography)`
  color: #000000;
  text-transform: capitalize;
`;
