import styled from 'styled-components';

export const Container = styled.div`
    width:100%;
    height: 100vh;
    margin:auto;
    display:flex;
`

export const Form = styled.form`
    background-color: black;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    color: white;
    width:300px;
    margin:auto;
`;
export const InputLabel = styled.label`
    flex: 1;
    margin: 10px;
`;
export const InputTitle = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
`;

export const Input = styled.input`
    width: 95%;
    height: 30px;
    padding: 0 5px;
    margin-bottom:10px;
    border: 1px solid lightblue;
    border-radius: 5px;
    &:focus  {
        outline: none;
    }
`;

export const Error = styled.p`
    width: 95%;
    border-radius: 5px;
    background-color:red;
    padding: 5px;
    margin: 5px 0;
    font-size: 14px;
    font-weight:bold;
`

export const Button = styled.button`
    padding: 5px 40px;
    margin: 15px auto 0;
    display: flex;
    border: none;
    border-radius: 5px;
    background-color:#64B83C;
    font-weight: bold;
    font-size: 16px;
    color: white;
    cursor: pointer;
    transition: .3s;

    &:hover {
        background-color: #4B8A2D;

    }
`;