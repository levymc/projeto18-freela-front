import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Close, ChevronForwardOutline, ChevronDownOutline } from 'react-ionicons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import SideBarBtn from './SideBarBtn';
import CollapsedBtns from './ColapsedBtns';
import buttons from './dto/buttons';

export default function SideBar() {
    const { isOpen, setIsOpen } = useAuth();

    const buttons = [
        {
            text: "Minha Conta",
            idCollapsed: "btn1",
            subBtns: [
                {
                    idSubBtn: "Meus dados",
                    subText: "Meus Dados",
                    onClick: '/perfil',
                },
                // {
                //     idSubBtn: "Meus pontos",
                //     subText: "Meus Pontos",

                //     last: true
                // },            
            ],
        },
        // {
        //     text: "Histórico de pedidos",
        //     idCollapsed: "btn2",
        // },
        // {
        //     text: "Contatos",
        //     idCollapsed: "btn2",
        //     subBtns: [
        //         {
        //             idSubBtn: "subBtn2",
        //             subText: "Sub Btn2"
        //         },
        //         {
        //             idSubBtn: "subBtn2",
        //             subText: "Sub Btn1"
        //         },
        //         {
        //             idSubBtn: "subBtn3",
        //             subText: "Sub Btn1",
        //             last: true
        //         },
                
        //     ],
        // }
        
    ]

    useEffect(() => {
        const handleOutsideClick = (event) => {
            const sidebar = document.getElementById("sidebar");
            
            if (isOpen && sidebar && !sidebar.contains(event.target)) {
                setIsOpen(false);
            }
        };
    
        document.addEventListener("mousedown", handleOutsideClick);
    
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, setIsOpen]);
    


    return (
        <SideBarContainer id="sidebar" isopen={isOpen ? '0' : '-18em'}>
            <SecIcon>
                <SCClose
                    onClick={() => setIsOpen(false)}
                    height="30px" width="30px"
                    color={`#FFF4F4`}
                />
            </SecIcon>
            {buttons.map((button, i) => {
                return (

                    <SideBarBtn 
                        text = {button.text}
                        idCollapsed = {button.idCollapsed}
                        subBtns = {button.subBtns} 
                        last = {button.last ? true : false}
                        key = {i}
                    />

                )
            })}
        </SideBarContainer>
    );
}

const SideBarContainer = styled.div`
    position: fixed;
    top: 0;
    left: ${props => (props.isopen )};
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

const SCClose = styled(Close)`
    color: #FFF4F4;
    cursor: pointer;
`
