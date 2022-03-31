import styled from 'styled-components';

export const Container = styled.div`
`;

export const BlockInfo = styled.div`
    padding: 0 10px 0 30px;

`;

export const BlockArea = styled.div`
    padding: 0 30px 0 10px;
    min-width: 1000px;
`;


export const Img = styled.img`
    width: 60px;
    height: 60px;
    padding-top: 20px;
`

export const Button = styled.button`
    padding: 5px 20px;
    position:absolute;
    right: 40px;
    top: 40px;
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

export const Header = styled.div`
    background-color: #111;
    height: 100px;
    text-align: center;
    display: flex;
    justify-content: center;
`;

export const HeaderText = styled.h1`
    margin: 0;
    padding: 30px 30px 0px;
    color: white;
    padding-top: 30px;
`;

export const Body = styled.div`
    margin: 0 auto;
    margin-bottom: 50px;
    display:flex;
    justify-content:center;
`;
