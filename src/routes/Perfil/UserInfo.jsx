import React from 'react';
import styled from 'styled-components';

export default function UserInfoGrid (props){
    console.log(props)
    return (
        <Container>
            <InfoContainer>
                <Label>Nome:</Label>
                <Value>{props.userData.nome}</Value>
            </InfoContainer>
            <InfoContainer>
                <Label>Email:</Label>
                <Value>{props.userData.email}</Value>
            </InfoContainer>
            <InfoContainer>
                <Label>Endereço:</Label>
                <Value>{props.userData.endereco}</Value>
            </InfoContainer>
            <InfoContainer>
                <Label>Número Residência:</Label>
                <Value>{props.userData.numEnd}</Value>
            </InfoContainer>
            <InfoContainer>
                <Label>Tipo da Conta:</Label>
                <Value>{props.userData.permission === 1 ? "Cliente" : "Prestador"}</Value>
            </InfoContainer>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.span`
    font-weight: bold;
    margin-right: 0.5em;
`;

const Value = styled.span`
`;

