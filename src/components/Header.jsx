import React from 'react';
import { useAuth } from './AuthContext';
import { Menu, ArrowBack } from 'react-ionicons'
import styled from 'styled-components';

export default function Header() {
    const { telaAcesso, setTelaAcesso } = useAuth();
  
    const handleLogoClick = () => {
        setTelaAcesso(!telaAcesso);
    };
  
    return (
        <>
            <HeaderContainer>
            <DivLogo className="shadow-drop-bottom">
                <span onClick={handleLogoClick}>Get Samurais</span>
                <SecEsquerda>
                {telaAcesso ? <Menu height="30px" width="30px" /> : <ArrowBack height="30px" width="30px" />}
                </SecEsquerda>
            </DivLogo>
            </HeaderContainer>
            <BordaInferior></BordaInferior>
        </>
    );
}

const HeaderContainer = styled.div`
    height: 10vh;
    width: 100%;
    background-color: #EAD3C1;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Ubuntu', sans-serif;
    position: absolute;
`

const SecEsquerda = styled.section`
    position: absolute;
    left: 3vw;
    font-size: 30px;
    display: flex;
    align-items: center;
`

const DivLogo = styled.div`
    font-size: 3em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    user-select: none;
    color: #670000;
    display: flex;
    justify-content: center;
    align-items: center;
    .shadow-drop-bottom {
	-webkit-animation: shadow-drop-bottom 0.4s cubic-bezier(0.950, 0.050, 0.795, 0.035) both;
	        animation: shadow-drop-bottom 0.4s cubic-bezier(0.950, 0.050, 0.795, 0.035) both;
}
`;

const BordaInferior = styled.section`
    background-color: #670000;
    height: 10px;
    width: 100%;
    position: absolute;
    top: 10vh;
    left: 0;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`