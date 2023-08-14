import React, { useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel'
import { useAuth } from '../components/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { simpleModal } from '../components/modais'



export default function Login() {
	const { telaAcesso, setTelaAcesso, logado, setLogado, loggedUser, setLoggedUser } = useAuth();

    const navigateTo = useNavigate()

    const handleSubmit = (data) => {
        axios.post(`${import.meta.env.VITE_API_URL}s/signin`, data).then(res => {
            localStorage.setItem("user", JSON.stringify(res.data));
            setLogado(true)
            setTelaAcesso(false)
            setLoggedUser(res.data);
            simpleModal("Login realizado", "success").then(() => navigateTo('/'))
        }).catch(err => {
            console.error(err.response)
            simpleModal(err.response, "error")
        })
    }

    useEffect(() => {
        if (!telaAcesso) {
            navigateTo('/');
        }
    }, [telaAcesso]);
    

	return (
		<Div >
			<Body onClick={() => {
                console.log(logado, telaAcesso)
            }}>
                <SCForm onSubmit={(event) => {
                    event.preventDefault()
                    const formData = {
                        email: event.target.email.value,
                        password: event.target.password.value,
                    };
                    handleSubmit(formData);
                }}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" />
                        <Form.Text className="text-muted">
                            Seu email nunca será compartilhado.
                        </Form.Text>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Senha" />
                    </Form.Group>

                    <LinkNewAccount to="/cadastro">
                        <span>Clique aqui para criar uma nova conta!!</span>
                    </LinkNewAccount>

                    <SubmitBtn variant="primary" type="submit">
                        Entrar
                    </SubmitBtn>
                    
                </SCForm>
			</Body>
		</Div>
	);
}

const LinkNewAccount = styled(Link)`
    /* position: absolute; */
    /* bottom: -10%; */
    display: flex;
    justify-content: center;
    color: #1e1eec !important;
    width: 20em;
    span:hover{
        color: #8484f7 !important;
    }
    span:active{
        color: #d4d4ff !important;
    }
`
const SubmitBtn = styled(Button)`
    position:relative;
    bottom: -5%;
    padding: 0.2em 1.5em 0.2em 1.5em;
    right: -30%;
`

const SCForm = styled(Form)`
    /* position: relative; */
    /* top: 2em; */
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    .form-control {
        width: 30em !important;
    }
`;


const Div = styled.div`
    display: flex;
    justify-content: center;
    overflow-y: auto;
    width: 40vw;
    min-height: 100vh;
    height: auto;
	background-color: RGB(0, 26, 61);
    padding-bottom: 5vh;
    overflow-y: hidden;
	padding-top: 20vh;
`;

const Body = styled.div`
   /* position: absolute; */
	display: flex;
    justify-content: center;
	flex-wrap: wrap;
	gap: 2em;

    padding: 4em;
    width: 100%;
    height: 60%;
    background-color: RGB(250, 250, 251);
	box-shadow: 1px 1px 4px 4px rgba(170, 170, 170, 0.212); 
    border-radius: 10px;
    color: black;
`;
