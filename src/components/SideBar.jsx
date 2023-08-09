import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { Close, ChevronForwardOutline, ChevronDownOutline } from 'react-ionicons';
import { useAuth } from './AuthContext';
import Collapse from 'react-bootstrap/Collapse';

export default function SideBar() {
    const { telaAcesso, setTelaAcesso, logado, setLogado, isOpen, setIsOpen } = useAuth();
    const [open, setOpen] = useState(false);

    // const dataBtn = [
    //     {
    //         onClick: setOpen(!open),
    //         ariaControls: "example-collapse-text",
    //         ariaEexpanded: {open},
    //         text: <ButtonColapsavel text="teste1" open={open} />
    //     }
    // ]

    const handleCloseSideBar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <SideBarContainer isOpen={isOpen}>
            <SecIcon>
                <Close
                    onClick={handleCloseSideBar}
                    height="30px" width="30px"
                    color={`#FFF4F4`}
                />
            </SecIcon>
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                Botão 1 {open  
                            ? <SecionArrowIcon><ChevronDownOutline height="30px" width="30px"color={`#FFF4F4`} /></SecionArrowIcon>
                            : <SecionArrowIcon><ChevronForwardOutline height="30px" width="30px"color={`#FFF4F4`} /></SecionArrowIcon>
                        }
            </Button>
            <Collapse in={open}>
                <CollapsedDiv id="example-collapse-text">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                    terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                    labore wes anderson cred nesciunt sapiente ea proident.
                </CollapsedDiv>
            </Collapse>
            <Button>Botão 2</Button>
            <Button>Botão 3</Button>
            <Button last={true}>Botão 4</Button>
        </SideBarContainer>
    );
}

const ButtonColapsavel = (props) => {
    return(
        <>
        {props.text}
        {props.open  
            ? <SecionArrowIcon><ChevronDownOutline height="30px" width="30px"color={`#FFF4F4`} /></SecionArrowIcon>
            : <SecionArrowIcon><ChevronForwardOutline height="30px" width="30px"color={`#FFF4F4`} /></SecionArrowIcon>
        }
        </>
    )
}

const TextoColapsavel = (props) => {
    return (
        <>
        
        </>
    )
}

const SideBarContainer = styled.div`
    position: fixed;
    top: 0;
    left: ${props => (props.isOpen ? '0' : '-18em')};
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

const SecionArrowIcon = styled.section`
    position: absolute;
    right: 1em;
`

const CollapsedDiv = styled.div`
    padding: 1.2em;
    border-top: 1px solid #fafafb6c; 
    color: #dadada;
`
