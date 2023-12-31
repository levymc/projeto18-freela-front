import React, { useEffect, useState } from 'react'
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
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios'
import { simpleModal, simpleModalText } from './modais';


export default function Header() {
    const { 
            telaAcesso, setTelaAcesso, 
            logado, setLogado, 
            isOpen, setIsOpen, 
            loggedUser, setLoggedUser, 
            itensCarrinho, setItensCarrinho   
        } = useAuth();
    const [ firstAccess, setFirstAccess ] = useState(null)

    const navigateTo = useNavigate()


    useEffect(() => {
        let timeout
        const handleUserInactive = () => {
            simpleModal("Você ainda está ai?", "question")
            // setLogado(false)
            // setTelaAcesso(true)
            // navigateTo("/login")
        }
        const resetTimeout = () => {
            clearTimeout(timeout)
            timeout = setTimeout(handleUserInactive, 5 * 60 * 1000) // min * seg * ms
        }
        window.addEventListener('mousemove', resetTimeout)
        window.addEventListener('keydown', resetTimeout)
        resetTimeout()
        return () => {
            window.removeEventListener('mousemove', resetTimeout)
            window.removeEventListener('keydown', resetTimeout)
            clearTimeout(timeout)
        }
    }, [])

    const handleLogOut = () => {
        axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${loggedUser.token}`
            }
        }).then(res => {
            navigateTo('/login');
            setTelaAcesso(true);
            setLogado(false);
            setLoggedUser(null);
        }).catch(err => {
            console.error(err.response);
            simpleModal(err.response.data, "error");
        });
    }
    

    const handleFinalizarPedido = () => {
        itensCarrinho.length > 0 && simpleModalText("Serviços solicitados com sucesso! Obrigado por confiar em nós!",
                        "Em breve o prestador irá entrar com contato, via email, para combinarem a data",
                         "success")
        setItensCarrinho([])
    }



    useEffect(() => {
        if (!firstAccess && !telaAcesso) {
            modalHome(setFirstAccess);
        }
    }, [firstAccess, telaAcesso]);

    return (
        <> 
            <HeaderContainer>
                <SideBar />
                <DivLogo className="shadow-drop-bottom">
                    <span onClick={() => console.log(itensCarrinho.length)}>Get Serviços</span>
                    <SecEsquerda>
                        {location.pathname ==='/'
                                        ? <Tooltip arrow title="Menu">
                                            <SCMenuIcon 
                                                onClick={() => setIsOpen(!isOpen)} 
                                                height="30px" width="30px" 
                                                color={`#FFF4F4`}
                                                fontSize='inherit'
                                            />
                                        </Tooltip> 
                                        : <StyledLink to="/">
                                            <Tooltip arrow title="Pagina Inicial">
                                                <ArrowBackIcon 
                                                    onClick={() => {
                                                        setTelaAcesso(false)
                                                        modalHome();
                                                    }
                                                    } 
                                                    height="30px" width="30px"
                                                    fontSize='inherit'
                                                    color={`#FFF4F4`}
                                                    cursor={'pointer'}
                                                />
                                            </Tooltip> 
                                        </StyledLink>
                        }
                    </SecEsquerda>
                    <SecDireita>
                        { logado 
                            ? <>
                                <SCTooltip arrow title="Carrinho">
                                    {itensCarrinho ? (itensCarrinho.length > 0  
                                        ? <section className='cartNumber'>{itensCarrinho.length}</section>
                                        : null) : null
                                    }
                                    <CartIcon
                                        fontSize='inherit'
                                        onClick={() => {
                                            modalCarrinho(itensCarrinho, setItensCarrinho, loggedUser.token).then(res => {
                                                res.isConfirmed && handleFinalizarPedido()
                                            }).catch(err => {
                                                console.error(err)
                                                simpleModal("Ocorreu algum erro no carrinho, tente novamente", "error")
                                            })
                                        }}
                                    />
                                </SCTooltip>
                                <Tooltip arrow title="Deslogar">
                                    <SCLogoutIcon
                                        onClick={handleLogOut}
                                        fontSize='inherit'
                                     />
                                </Tooltip>
                            </>
                            : (!telaAcesso 
                                ? <StyledLink to="/login">
                                    <Tooltip arrow title="Login">
                                        <PersonIcon 
                                            height="30px" width="30px" 
                                            fontSize='inherit'
                                            color={`#FFF4F4`}
                                            onClick={() => setTelaAcesso(true)} 
                                        /></Tooltip> 
                                    </StyledLink>
                                : null) 
                        }
                        {!logado 
                            && <Tooltip arrow title="Criar conta">
                                <SCPersonAdd 
                                    fontSize='inherit'
                                    color = {`#FFF4F4`}
                                    onClick = { () => {
                                        navigateTo('/cadastro')
                                        setTelaAcesso(true)
                                    } }
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

const SCTooltip = styled(Tooltip)`
    position: relative;
`

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
const SCLogoutIcon =styled(LogoutIcon)`
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
    font-size: 40px;
    display: flex;
    align-items: center;
    color:RGB(250, 250, 251);
`
const SecDireita = styled.section`
    position: absolute;
    right: 3vw;
    font-size: 40px;
    display: flex;
    align-items: center;
    color:RGB(250, 250, 251);
    /* font-size: 2em; */
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