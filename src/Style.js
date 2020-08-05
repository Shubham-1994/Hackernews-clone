import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  }
  * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent; /* For some Androids */
  }

  @import url('https://rsms.me/inter/inter.css');
  html {
    font-family: 'Inter', sans-serif;
  }
  @supports (font-variation-settings: normal) {
    html {
      font-family: 'Inter var', sans-serif;
    }
  }
`;


export const TableRow = styled.tr`
&:nth-child(even){background-color: #dddddd};
&:nth-child(odd){background-color: #F6F6EF};
`;

export const Table = styled.table`
font-family: arial, sans-serif;
border-collapse: collapse;
width: 100%;
`
export const TableData = styled.td`
font-size: 14px;
font-weight:bold;
text-align: left;
padding: 8px;
`;
export const TableHead = styled.th`
background-color:#FF6600;
color: #ffffff;
font-size: 12px;
font-weight:700;
text-align: left;
padding: 8px;
`;

export const Url = styled.span`
font-size:12px;
color:grey;
`;

export const Author =styled.span`
font-size:12px;
color:black;
`;

export const Time =styled.span`
font-size:12px;
color:gray;
`;

export const LinkWrapper = styled.div`
display:flex;
justify-content:flex-end;
color:#FF6600;
`;

export const Horizontal=styled.hr`
background-color:#FF6600;
height:2px;
`;

export const HideLink=styled.span`
margin-left: 8px;
font-size: 12px;
cursor:pointer
`;