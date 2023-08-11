import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Menu, ArrowBack, Person, PersonAdd, CartOutline } from 'react-ionicons'
import styled from 'styled-components';
import SideBar from './SideBar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { modalCarrinho, modalHome } from './modais';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export default function Header() {
    const { telaAcesso, setTelaAcesso, logado, setLogado, isOpen, setIsOpen  } = useAuth();
    const [ firstAccess, setFirstAccess ] = useState(false);
    const navigateTo = useNavigate()

    return (
        <>
            { !firstAccess && modalHome(setFirstAccess)} 
            <HeaderContainer>
                <SideBar />
                <DivLogo className="shadow-drop-bottom">
                    <span>Get Serviços</span>
                    <SecEsquerda>
                        {!telaAcesso 
                                        ? <Tooltip arrow title="Menu">
                                            <SCMenuIcon 
                                                onClick={() => setIsOpen(!isOpen)} 
                                                height="30px" width="30px" 
                                                color={`#FFF4F4`}
                                            />
                                        </Tooltip> 
                                        : <StyledLink to="/">
                                        <Tooltip arrow title="Pagina Inicial">
                                            <ArrowBackIcon 
                                                onClick={() => setTelaAcesso(false)} 
                                                height="30px" width="30px"
                                                color={`#FFF4F4`}
                                                cursor={'pointer'}
                                            />
                                            </Tooltip> 
                                        </StyledLink>
                        }
                    </SecEsquerda>
                    <SecDireita>
                        {!telaAcesso 
                            ? <StyledLink to="/login">
                                <Tooltip arrow title="Login">
                                    <PersonIcon 
                                        height="30px" width="30px" 
                                        color={`#FFF4F4`}
                                        onClick={() => setTelaAcesso(true)} 
                                    /></Tooltip> 
                                </StyledLink>
                                : null }
                        {!logado 
                                ? <Tooltip arrow title="Criar conta">
                                    <SCPersonAdd 
                                        color = {`#FFF4F4`}
                                        onClick = { () => navigateTo('/cadastro') }
                                    />
                                </Tooltip>
                                : <Tooltip arrow title="Carrinho">
                                    <CartIcon
                                        height="30px" width="30px" 
                                        color={`#FFF4F4`}
                                        onClick={modalCarrinho}
                                    />
                                </Tooltip>
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

const SCPersonAdd = styled(PersonAddIcon)`
    cursor: pointer;
`

const SCMenuIcon = styled(MenuIcon)`
    cursor: pointer;
`
const CartIcon =styled(ShoppingCartIcon)`
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
    gap: 0.5em;
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