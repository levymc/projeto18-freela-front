import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useAuth } from '../../components/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { simpleModal } from '../../components/modais'
import ReactLoading from 'react-loading'
import UserInfoGrid from './UserInfo'


export default function Perfil() {
	const { telaAcesso, setTelaAcesso, logado, setLogado, loggedUser, setLoggedUser } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(null)

    const navigateTo = useNavigate()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        logado ? axios.get(`${import.meta.env.VITE_API_URL}/user`, {
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

    useEffect(() => {
        if (!logado) {
            navigateTo('/');
        }
    }, [logado]);

    const handleSubmit = async () => {
        axios.put(`${import.meta.env.VITE_API_URL}/editPerfil`, userData.userData, {
                    headers: {
                        'Authorization': `Bearer ${loggedUser.token}`
                    }
                }
            ).then(res => {
                res.status === 204 && simpleModal('Perfil atualizado com sucesso!', 'success')
            }).catch(err => {
                console.error(err.response)
                simpleModal('Ocorreu um erro ao atualizar o perfil', 'error')
            })
    }

    

    return (
        <Div>
            <Body>
                    {!userData ? (
                        <ReactLoading type="spin" color="white" height={667} width={375} />
                    ) : (
                        <SCForm>
                            {isEditing ? (
                                <>
                                    <Column>

                                        <Form.Group className="mb-3" id="nomeContainer" controlId="nome">
                                            <Form.Label>Nome:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={userData && userData.userData.nome}
                                                onChange={(e) =>
                                                    setUserData((prevUserData) => ({
                                                        ...prevUserData,
                                                        userData: {
                                                            ...prevUserData.userData,
                                                            nome: e.target.value,
                                                        },
                                                    }))
                                                }                                                
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" id="emailContainer" controlId="email">
                                            <Form.Label>Email:</Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={userData && userData.userData.email}
                                                onChange={(e) =>
                                                    setUserData((prevUserData) => ({
                                                        ...prevUserData,
                                                        userData: {
                                                            ...prevUserData.userData,
                                                            email: e.target.value,
                                                        },
                                                    }))
                                                }
                                            />
                                        </Form.Group>

                                        
                                    </Column>
                                    <Column>
                                        <Form.Group className="mb-3" controlId="endereco">
                                            <Form.Label>Endereço:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={userData && userData.userData.endereco}
                                                onChange={(e) =>
                                                    setUserData((prevUserData) => ({
                                                        ...prevUserData,
                                                        userData: {
                                                            ...prevUserData.userData,
                                                            endereco: e.target.value,
                                                        },
                                                    }))
                                                }
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="numEnd">
                                            <Form.Label>Número Residência:</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={userData && userData.userData.numEnd}
                                                onChange={(e) =>
                                                    setUserData((prevUserData) => ({
                                                        ...prevUserData,
                                                        userData: {
                                                            ...prevUserData.userData,
                                                            numEnd: e.target.value,
                                                        },
                                                    }))
                                                }
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="tipoConta">
                                            <Form.Label>Tipo Conta:</Form.Label>
                                            <Form.Select 
                                                onChange={(e) =>
                                                    setUserData((prevUserData) => ({
                                                        ...prevUserData,
                                                        userData: {
                                                            ...prevUserData.userData,
                                                            permission: e.target.value,
                                                        },
                                                    }))
                                                }
                                            >
                                                <option value='1' selected={userData.userData.permission == 1}>Cliente</option>
                                                <option value='2' selected={userData.userData.permission == 2}>Prestador</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Column>
                                    
                                </>
                            ) : (
                                <UserInfoGrid 
                                    userData = {userData} 
                                    setUserData = {setUserData}
                                />
                            )}

                            <SubmitBtn
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsEditing(!isEditing)
                                    if (isEditing) {
                                        handleSubmit()
                                    }
                                }}
                                variant="primary"
                                type="submit"
                            >
                                {isEditing ? "Salvar" : "Editar"}
                            </SubmitBtn>
                        </SCForm>
                    )}
                
            </Body>
        </Div>
    );
}


const Div = styled.div`
    display: flex;
    justify-content: center;
    overflow-y: auto;
    width: 50vw;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
`;


const SubmitBtn = styled(Button)`
    /* position:relative;
    bottom: -5%;
    padding: 0.2em 1.5em 0.2em 1.5em;
    right: -30%; */
`

const SCForm = styled(Form)`
    display: flex;
    justify-content: center;
    /* align-items: center; */
    flex-direction: column;
    gap:1em;
    width: 100%;

    flex: 1;
    display: grid;
    grid-template-columns: 2fr; 

`;
