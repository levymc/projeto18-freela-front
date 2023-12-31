import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import Collapse from 'react-bootstrap/Collapse';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { simpleModal } from './modais';
import { useAuth } from '../components/AuthContext';
import axios from 'axios'

export default function CollapsedBtns (props) {
	const { telaAcesso, setTelaAcesso, logado, setLogado, categorias, setCategorias, loggedUser, setLoggedUser } = useAuth();

    const navigateTo = useNavigate()
    
    return (
        <Collapse in={props.open}>
            <CollapsedDiv id={props.idCollapsed}>
                {props.subBtns.map((element, i) => {
                    return (
                            <Button 
                                key = {i}
                                id = {element.idSubBtn}
                                last = {element.last ? `1px solid #fafafb6c` : '0'}
                                onClick = {() => navigateTo(element.onClick)}
                            >{element.subText}</Button>
                    )
                })}
            </CollapsedDiv>
        </Collapse>
)
}

const Button = styled.button`
    width: 100%;
    background-color: transparent;
    border-top: 1px solid #fafafb6c; 
    border-left: 0; border-right: 0;
    border-radius: 0;
    border-bottom: ${props => (props.last )}; 
    position: relative;
    display: flex;
    align-items: center;
`;

const CollapsedDiv = styled.div`
    padding: 0.5em;
    border-top: 1px solid #fafafb6c; 
    color: #dadada;
`
