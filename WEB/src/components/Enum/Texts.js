import styled from 'styled-components';

export function Subtitle({ children }) {
  return <StyledSubtitle>{children}</StyledSubtitle>;
}

const StyledSubtitle = styled.h2`
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  color: #8e8e8e;
  margin-bottom: 20px !important;
`;
