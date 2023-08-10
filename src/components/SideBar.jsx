import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { Close, ChevronForwardOutline, ChevronDownOutline } from 'react-ionicons';
import { useAuth } from './AuthContext';
import SideBarBtn from './SideBarBtn';
import CollapsedBtns from './ColapsedBtns';
import buttons from './buttons';

export default function SideBar() {
    const { telaAcesso, setTelaAcesso, logado, setLogado, isOpen, setIsOpen } = useAuth();


    return (
        <SideBarContainer isopen={isOpen}>
            <SecIcon>
                <Close
                    onClick={() => setIsOpen(false)}
                    height="30px" width="30px"
                    color={`#FFF4F4`}
                />
            </SecIcon>
            {buttons.map((button, i) => {
                return (
                    <>
                    <SideBarBtn 
                        text = {button.text}
                        idCollapsed = {button.idCollapsed}
                        subBtns = {button.subBtns} 
                        last = {button.last ? true : false}
                        key = {i}
                    />
                    </>
                )
            })}
        </SideBarContainer>
    );
}

const SideBarContainer = styled.div`
    position: fixed;
    top: 0;
    left: ${props => (props.isopen ? '0' : '-18em')};
    width: 18em;
    height: 100vh;
    background-color: RGB(255, 101, 0);
    transition: left 0.3s ease-in-out; 
    z-index: 1000; 
    /* padding-left: 1em; */
    padding-top: 7em;
    display: flex;
    flex-direction: column;
    /* gap: 1em; */
    align-items: center;
    /* position: relative; */
`;

const SecIcon = styled.section`
    position: absolute;
    top: 2em;
    right: 2em;
`;

const Button = styled.button`
    width: 100%;
    background-color: transparent;
    border-top: 1px solid #fafafb6c; 
    border-left: 0; border-right: 0;
    border-radius: 0;
    border-bottom: ${props => (props.last ? `1px solid #fafafb6c` : '0')}; 
    position: relative;
    display: flex;
    align-items: center;

`;


