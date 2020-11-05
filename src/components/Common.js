import styled, { css } from 'styled-components'
import { text } from './Typography'
import { P } from './Typography';

const screenBreakpoints = {
  xs: 576,
  mobile: 768,
  tablet: 992,
  desktop: 1200,
}

export const maxWidthMediaQueries = ((size) => {
  return `@media only screen and (max-width: ${screenBreakpoints[size]}px)`
})

export const CardLike = css`
  padding: 2em;
  border-radius: 3px;
  background-color: ${p => p.theme.colors.secondaryBackground};
  margin: 2em 0;
`

export const Card = styled.div`
  ${CardLike};
`

export const Button = styled.a`
  ${text};
  display: block;
  text-decoration: none;
  font-family: 'HK Grotesk';
  font-weight: ${p => p.theme.typography.h2.weight};
  background: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.background};
  text-align: center;
  width: 75px;
  padding: 0.75em 2.5em;
  border-radius: 3px;
  margin: 1em;
`

export const SecondaryButton = styled(Button)`
  background: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.primary};
  border: 1px solid ${p => p.theme.colors.primary};
`

export const SearchBar = styled.input.attrs({
  type: 'text',
})`
  ${CardLike};
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
  color: ${p => p.theme.colors.text};
`

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  ${maxWidthMediaQueries('desktop')} {
    display: block;
  }
`

export const DetailColumn = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0;
  margin-right: 1em;
  padding: 0;

  & > li {
    ${CardLike};
    margin: 0;
    padding: 0.5em 1em;
    margin-bottom: 1em;
    list-style-type: none;
  }
`

export const DetailAnswer = styled(P)`
  margin-bottom: 0.85em;
`
// given array, split into array of chunks of size n 
// "balanced" (subarrays' lengths differ as less as possible) or 
// "even" (all subarrays but the last have the same length):
// https://stackoverflow.com/questions/8188548/splitting-a-js-array-into-n-arrays
export const chunkify = ((a, n, balanced) => {
  if (n < 2)
    return [a];
  var len = a.length,
    out = [],
    i = 0,
    size;
  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, i += size));
    }
  }
  else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, i += size));
    }
  }
  else {
    n--;
    size = Math.floor(len / n);
    if (len % size === 0)
      size--;
    while (i < size * n) {
      out.push(a.slice(i, i += size));
    }
    out.push(a.slice(size * n));
  }
  return out;
});