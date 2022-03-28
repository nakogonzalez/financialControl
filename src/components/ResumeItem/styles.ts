import styled from "styled-components";

export const Container = styled.div`
    flex: 1;
    display:flex;
    margin-bottom: 10px;
`;

export const Title = styled.div`
    text-align: left;
    font-weight: bold;
    color: white;
    margin-bottom: 5px;
    width: 125px;
`;

export const Info = styled.div<{color?: string}>`
    margin-left:10px;
    text-align: center;
    font-weight: bold;
    color: ${props => props.color ?? 'black'};
    margin: auto;
`;