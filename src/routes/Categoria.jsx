import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel'
import { useAuth } from '../components/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { simpleModal } from '../components/modais'
import ReactLoading from 'react-loading';
import iconsList from '../components/dto/menuCategoriaIcons';
import DataTablePrestadores from '../components/dataTables/DataTablePrestador';

export default function Login() {
	const { telaAcesso, setTelaAcesso, logado, setLogado, categorias, setCategorias, loggedUser, setLoggedUser } = useAuth();

    const [ selectPickerValue, setSelectPickerValue ] = useState(null)
    const [ categoriaServicos, setCategoriaServicos ] = useState(null)

    const location = useLocation()
    const navigateTo = useNavigate()    

    const id = location.pathname.split('/categoria/')[1]
    useEffect(() => {
        logado && axios.get(`http://localhost:5000/categoria/${id}`, {
            headers: {
                'Authorization': `Bearer ${loggedUser.token}`
            }}).then(res => {
            console.log(res.data)
            setCategoriaServicos(res.data)
        }).catch(err => {
            console.error(err.response)
			simpleModal("Ocorreu algum erro de comunicação com o servidor", "error")
        })
    },[])

    useEffect(() => {
        if (!logado) {
            navigateTo('/');
        }
    }, [telaAcesso]);
    

	return (
        <>
            { !categoriaServicos 
            ?  <ReactLoading type="spin" color="white" height={667} width={375} />
            : <Div height={'100vh'}>
                    <Body >
                        <h1>Serviços de {categoriaServicos.categoria.descricao}</h1>
                        <Form.Group className="mb-3" controlId="selectPicker">
                            <Form.Label>Selecione abaixo, o tipo de serviço desejado</Form.Label>
                            <Form.Select onChange={(e) => setSelectPickerValue(parseInt(e.target.value))} aria-label="Default select example">
                                <option>Selecione um Serviço</option>
                                {categoriaServicos.servicos.map((servico, i) => {
                                    return (
                                        <option key={i+1} value={servico.id}>{servico.descricao}</option>
                                    )
                                })}
                                <option value={0}>Outro...</option>
                            </Form.Select>
                        </Form.Group>
                        {selectPickerValue === 0 && (
                            <Form.Group className="mb-3" controlId="outroServ">
                                <Form.Label>Descreva o serviço para analisarmos</Form.Label>
                                <Form.Control  as="textarea" rows={3} placeholder="Descrição do serviço" />
                            </Form.Group>
                        )}
                        {selectPickerValue 
                        ? ( <ContainerPrestadores>
                                <DataTablePrestadores categoriaId={id} />
                            </ContainerPrestadores>)
                        : null
                        }
                    </Body>
                </Div>
            }
        </>
		
	);
}

const ContainerPrestadores = styled.div`
    width: 100%;
    margin: auto;
`

const Div = styled.div`
    display: flex;
    justify-content: center;
    overflow-y: auto;
    width: 100%;
    min-height: 100vh;
    height: auto;
	background-color: RGB(0, 26, 61);
    padding-bottom: 5vh;
    overflow-y: hidden;
	padding-top: 20vh;
`;

const Body = styled.div`
	display: flex;
    justify-content: center;
	flex-wrap: wrap;
    flex-direction: column;
	gap: 2em;

    padding: 4em;
    width: 100%;
    height: 60%;
    background-color: RGB(250, 250, 251);
	box-shadow: 1px 1px 4px 4px rgba(170, 170, 170, 0.212); 
    border-radius: 10px;
    color: black;

    h1{
        text-align: center;
    }
`;