import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { Menu, ArrowBack, Person, PersonAdd, CartOutline } from 'react-ionicons'
import styled from 'styled-components';
import SideBar from './SideBar';
import { Link, useLocation } from 'react-router-dom';
import { modalCarrinho, modalHome } from './modais';

export default function Header() {
    const { telaAcesso, setTelaAcesso, logado, setLogado, isOpen, setIsOpen  } = useAuth();
    const [ firstAccess, setFirstAccess ] = useState(false);

    return (
        <>
            { !firstAccess && modalHome(setFirstAccess)} 
            <HeaderContainer>
                <SideBar />
                <DivLogo className="shadow-drop-bottom">
                    <span>Get Samurais</span>
                    <SecEsquerda>
                        {!telaAcesso ? <MenuIcon 
                                            onClick={() => setIsOpen(!isOpen)} 
                                            height="30px" width="30px" 
                                            color={`#FFF4F4`}
                                        /> : 
                                        <StyledLink to="/">
                                            <ArrowBack 
                                                onClick={() => setTelaAcesso(false)} 
                                                height="30px" width="30px"
                                                color={`#FFF4F4`}
                                                cursor={'pointer'}
                                            />
                                        </StyledLink>
                        }
                    </SecEsquerda>
                    <SecDireita>
                        {!telaAcesso 
                            ? <StyledLink to="/login">
                                <Person 
                                    height="30px" width="30px" 
                                    color={`#FFF4F4`}
                                    onClick={() => setTelaAcesso(true)} 
                                />
                                </StyledLink> : null }
                        {!logado 
                                ? <PersonAdd 
                                        height="30px" width="30px" 
                                        color={`#FFF4F4`}
                                />
                                : <CartIcon
                                        height="30px" width="30px" 
                                        color={`#FFF4F4`}
                                        onClick={modalCarrinho}
                                    />
                                    }
                    </SecDireita>
                </DivLogo>
                </HeaderContainer>
            <BordaInferior></BordaInferior>
        </>
    );
}

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit !important; 
    cursor: pointer; 
`;

const MenuIcon = styled(Menu)`
    cursor: pointer;
`
const CartIcon =styled(CartOutline)`
    cursor: pointer;
`

const HeaderContainer = styled.div`
    height: 10vh;
    width: 100%;
    background-color: RGB(0, 96, 177);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Ubuntu', sans-serif;
    position: absolute;
    /* box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); */
    /* border-bottom: 1px solid black; */
`

const SecEsquerda = styled.section`
    position: absolute;
    left: 3vw;
    font-size: 30px;
    display: flex;
    align-items: center;
    color:RGB(250, 250, 251);
`
const SecDireita = styled.section`
    position: absolute;
    right: 3vw;
    font-size: 30px;
    display: flex;
    align-items: center;
    color:RGB(250, 250, 251);
    align-items: center;
    display: flex;
    justify-content: center;
    gap: 1em;
`

const DivLogo = styled.div`
    font-size: 3em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);    
    user-select: none;
    color: #FFF4F4;
    display: flex;
    justify-content: center;
    align-items: center;
    .shadow-drop-bottom {
	-webkit-animation: shadow-drop-bottom 0.4s cubic-bezier(0.950, 0.050, 0.795, 0.035) both;
	        animation: shadow-drop-bottom 0.4s cubic-bezier(0.950, 0.050, 0.795, 0.035) both;
}
`;

const BordaInferior = styled.section`
    background-color: RGB(255, 101, 0);
    height: 5px;
    width: 100%;
    position: absolute;
    top: 10vh;
    left: 0;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`