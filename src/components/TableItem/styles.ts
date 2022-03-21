import styled from "styled-components";

export const TableLine = styled.tr`

`;

export const TableColumn = styled.td`
    padding: 10px 0;
`;

export const Button = styled.button`
    width: 100%;
    height: 30px;
    padding: 0 5px;
    border: none;
    border-radius: 5px;
    background-color: red;
    font-weight: bold;
    font-size: 16px;
    color: white;
    cursor: pointer;
    transition: .3s;
    &:hover {
        background-color: red;

    }
`;

export const Category = styled.div<{color: string}>`
display: inline-block;
padding: 5px;
border-radius: 5px;
color: white;
background-color: ${props => props.color};
`;

export const Value = styled.div<{color: string}>`
color: ${props => props.color};
`;