import React from 'react';
import styled from 'styled-components';
import Link from '../Link';

const StyledLink = styled(Link)`
  transition: .3s;
  &:hover {
    opacity: .5;
  }
`;

const SVG = styled.svg`
  vertical-align: middle;
`;

export default function BackLinkArrow({ href }) {
  return (
    <StyledLink href={href} style={{ width: '24px', height: '24px', display: 'inline-block'}} >
      <SVG xmls="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="white">
        <path fillRule="evenodd" clipRule="evenodd" d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59" />
      </SVG>
    </StyledLink>
  );
}