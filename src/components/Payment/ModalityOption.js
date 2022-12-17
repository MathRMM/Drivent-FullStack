import styled from 'styled-components';
import { OptionContainer, Subtitle } from '../../pages/Dashboard/Payment/TicketPage';
import SelectBox from './SelectBox';
import { useEffect, useState } from 'react';

export default function ModalityOption({ prices, ticketInfo, setTicketInfo }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = {
    online: 'Online',
    presential: 'Presencial'
  };

  useEffect(() => {
    if(selectedOption) {
      setTicketInfo({ ...ticketInfo, modality: selectedOption });
    }
  }, [selectedOption]);

  return (
    <OptionContainer>
      <Subtitle variant="h6">Primeiro, escolha sua modalidade de ingresso</Subtitle>
      <SelectBoxesWrapper>
        <SelectBox 
          option={options.presential} 
          price={`R$ ${prices.presential}`} 
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        <SelectBox 
          option={options.online} 
          price={`R$ ${prices.online}`} 
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
