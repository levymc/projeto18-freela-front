import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel'
import { useAuth } from '../components/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { simpleModal } from '../components/modais'
import ReactLoading from 'react-loading';



export default function Perfil() {
	const { telaAcesso, setTelaAcesso, logado, setLogado, loggedUser, setLoggedUser } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(null)

    const navigateTo = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        logado ? axios.get(`http://localhost:5000/user`, {
            headers: {
                'Authorization': `Bearer ${loggedUser.token}`
            }}).then(res => {
                // navigateTo('/perfil')
                console.log(res.data)
                setUserData(res.data)
        }).catch(err => {
            console.error(err.response)
			simpleModal("Ocorreu algum erro de comunicação com o servidor", "error")
        })
        : simpleModal("Você deve estar logado para acessar", "warning")
    }, []);

    // useEffect(() => {
    //     if (!telaAcesso) {
    //         navigateTo('/');
    //     }
    // }, [telaAcesso]);
    

    return (
        <Div>
            <Body>
                <Column>
                    {!userData ? (
                        <ReactLoading type="spin" color="white" height={667} width={375} />
                    ) : (
                        <SCForm>
                            {isEditing ? (
                                <>
                                    <Form.Group className="mb-3" id="nomeContainer" controlId="nome">
                                        <Form.Label>Nome:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={userData && userData.nome}
                                            onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" id="emailContainer" controlId="email">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={userData && userData.email}
                                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="endereco">
                                        <Form.Label>Endereço:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={userData && userData.endereco}
                                            onChange={(e) => setUserData({ ...userData, endereco: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="numEnd">
                                        <Form.Label>Número:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={userData && userData.numEnd}
                                            onChange={(e) => setUserData({ ...userData, numEnd: e.target.value })}
                                        />
                                    </Form.Group>
                                    
                                </>
                            ) : (
                                <>
                                    <div>
                                        <span>Nome: {userData.nome}</span>
                                    </div>
                                    <div>
                                        <span>Email: {userData.email}</span>
                                    </div>
                                </>
                            )}

                            <SubmitBtn
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsEditing(!isEditing);
                                }}
                                variant="primary"
                                type="submit"
                            >
                                {isEditing ? "Salvar" : "Editar"}
                            </SubmitBtn>
                        </SCForm>
                    )}
                </Column>
            </Body>
        </Div>
    );
}


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
const Column = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: 2fr; /* Uma coluna */
    gap: 2em; /* Espaço entre os elementos */

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr; /* Duas colunas com largura igual */
    }
`;


const SubmitBtn = styled(Button)`
    position:relative;
    bottom: -5%;
    padding: 0.2em 1.5em 0.2em 1.5em;
    right: -30%;
`

const SCForm = styled(Form)`
    display: flex;
    justify-content: center;
    /* align-items: center; */
    flex-direction: column;
    gap:1em;

    flex: 1;
    display: grid;
    grid-template-columns: 2fr; 

`;
