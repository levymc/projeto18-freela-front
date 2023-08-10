import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel'
import { useAuth } from '../components/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

export default function Home() {
	const { telaAcesso, setTelaAcesso, logado, setLogado } = useAuth();

	return (
		<Div height={'100vh'}>
			<Body onClick={() => {setLogado(!logado)}}>
                <SCForm >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            Seu email nunca será compartilhado.
                        </Form.Text>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Lembrar conta" />
                    </Form.Group>

                    <SubmitBtn variant="primary" type="submit">
                        Entrar
                    </SubmitBtn>

                    <LinkNewAccount to="/login">
                        <span>Clique aqui para criar uma nova conta!!</span>
                    </LinkNewAccount>
                </SCForm>
			</Body>
		</Div>
	);
}

const LinkNewAccount = styled(Link)`
    position: absolute;
    bottom: -4em;
    display: flex;
    justify-content: center;
    color: #1e1eec !important;
    width: 15vw;
    span:hover{
        color: #8484f7 !important;
    }
    span:active{
        color: #d4d4ff !important;
    }
`
const SubmitBtn = styled(Button)`
    position:absolute;
    bottom: -0.5em;
    right: 0;
`

const SCForm = styled(Form)`
    position: relative;
    width: 60%;
    top: 2em;
`

const Div = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: ${props => props.height};
	background-color: RGB(0, 26, 61);
`;

const Body = styled.div`
    position: absolute;
    top: 14em;
	display: flex;
    /* justify-content: center; */
	flex-direction: column;
    align-items: center;
    padding-bottom: 3em;
    height: 42vh;
    width: 30vw;
    background-color: RGB(250, 250, 251);
	box-shadow: 1px 1px 4px 4px rgba(170, 170, 170, 0.212);
    margin: 0 auto;
    padding: 20px; 
    border-radius: 10px;
    color: black;
	.imgSlide{
		width: 900px !important;
		height: 500px !important;
	}
`;
