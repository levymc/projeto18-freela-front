import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { ChevronForwardOutline, ChevronDownOutline } from 'react-ionicons';
import { useAuth } from './AuthContext';
import CollapsedBtns from './ColapsedBtns';


export default function SideBarBtn(props){
    const [ btnOpen, setBtnOpen ] = useState(false)

    return (
        <>
            <Button
                onClick={() => setBtnOpen(!btnOpen)}
                aria-controls= {props.idCollapsed}
                aria-expanded={btnOpen}
            >
                {props.text} {props.subBtns ? (btnOpen
                            ? <SectionArrowIcon><ChevronDownOutline height="30px" width="30px"color={`#FFF4F4`} /></SectionArrowIcon>
                            : <SectionArrowIcon><ChevronForwardOutline height="30px" width="30px"color={`#FFF4F4`} /></SectionArrowIcon>)
                            : null
                        }
            </Button>
            {props.subBtns && <CollapsedBtns 
                                subBtns = {props.subBtns   }
                                idCollapsed = {props.idCollapsed}
                                open = {btnOpen}
                            />
            }
            
        </>
    )
}

const Button = styled.button`
    width: 100%;
    background-color: transparent;
    border-top: 1px solid #fafafb6c; 
    border-left: 0; border-right: 0;
    border-radius: 0;
    border-bottom: 1px solid #fafafb6c;
    position: relative;
    display: flex;
    align-items: center;

`;

const SectionArrowIcon = styled.section`
    position: absolute;
    right: 1em;
`