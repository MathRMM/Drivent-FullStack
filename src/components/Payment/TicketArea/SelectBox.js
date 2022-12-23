import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export default function SelectBox({ 
  option, 
  price,
  selectedOption,
  setSelectedOption,
}) {
  function handleClick(option) {
    setSelectedOption(option);
  }
  
  return (
    <SelectBoxStyle selectedOption={selectedOption} option={option} onClick={() => handleClick(option)}>
      <OptionStyle variant="body1">{option}</OptionStyle>
      <PriceStyle variant="body2">{price}</PriceStyle>

    </SelectBoxStyle>
  );
}

const SelectBoxStyle = styled.div`
    width: 145px;
    height: 145px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #CECECE;
    border-radius: 20px;
    margin-right: 24px;
    cursor: pointer;
    background-color: ${props => props.selectedOption ===  props.option ? '#FFEED2' : 'transparent'};
`;

const OptionStyle = styled(Typography)`
    color: #454545;
    margin-bottom: 3px;
`;

const PriceStyle = styled(Typography)`
    color: #898989;
`;
