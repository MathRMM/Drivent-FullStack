import styled from 'styled-components';
import { OptionContainer, Subtitle } from './TicketPage';
import SelectBox from './SelectBox';
import { useEffect, useState } from 'react';
import { modality } from '../../../utils/ticketUtils';

export default function ModalityOption({ prices, ticketInfo, setTicketInfo }) {
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption);

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
          option={modality.presential} 
          price={`R$ ${prices.presential}`} 
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        <SelectBox 
          option={modality.online} 
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
