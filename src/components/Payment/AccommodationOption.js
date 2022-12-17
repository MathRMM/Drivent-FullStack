import styled from 'styled-components';
import { OptionContainer, Subtitle } from '../../pages/Dashboard/Payment/TicketPage';
import SelectBox from './SelectBox';
import { useEffect, useState } from 'react';

export default function AccommodationOption({ prices, ticketInfo, setTicketInfo }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = {
    noHotel: 'Sem Hotel',
    hotel: 'Com Hotel'
  };

  useEffect(() => {
    if(selectedOption) {
      setTicketInfo({ ...ticketInfo, accommodation: selectedOption });
    }
  }, [selectedOption]);

  return (
    <OptionContainer>
      <Subtitle variant="h6">Ótimo, agora escolha sua modalidade de hospedagem</Subtitle>
      <SelectBoxesWrapper>
        <SelectBox 
          option={options.noHotel} 
          price={`+ R$ ${prices.noHotel}`} 
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        <SelectBox 
          option={options.hotel} 
          price={`+ R$ ${prices.hotel}`} 
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </SelectBoxesWrapper>
    </OptionContainer>
  );
}

const SelectBoxesWrapper = styled.div`
    display: flex;
`;
