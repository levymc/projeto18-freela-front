import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Search } from 'react-ionicons'
import Carousel from 'react-bootstrap/Carousel'
import { useAuth } from '../components/AuthContext'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function Cadastro() {
	const { telaAcesso, setTelaAcesso, logado, setLogado } = useAuth();

    const [ cepValue, setCepValue ] = useState("") 
    const [ achouCep, setAchouCep ] = useState(false)
    const [ userAddress, setUserAddess ] = useState({})

    const handleCepChange = (event) => {
        let newCepValue = event.target.value.slice(0, 9).replace(/[^0-9-]/g, "");
        if (newCepValue.length < 8 && newCepValue.length > 6) {
            newCepValue = newCepValue.slice(0, 5) + '-' + newCepValue.slice(5)
        }
        setCepValue(newCepValue)
    }

    const handleCepApi = () => {
        axios.get(`https://viacep.com.br/ws/${cepValue.replace("-","")}/json/`).then(res => {
            console.log(res.data)
            setAchouCep(true)
            setUserAddess(res.data)
        }).catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        console.log(cepValue)
    }, [cepValue])

    

	return (
		<Div height={'100vh'}>
			<Body achou={achouCep} onClick={() => {setLogado(!logado)}}>
                <SCForm >
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Nome" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="emailCad">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                
                    
                    <Form.Group className="mb-3" controlId="passwordCad">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Senha" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confPassCad">
                        <Form.Label>Confirme sua senha</Form.Label>
                        <Form.Control type="password" placeholder="Confirme sua senha" />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="cep">
                        <Form.Label>CEP</Form.Label>
                        <InputGroup>
                            <IconWrapper 
                                tamanho = {cepValue.length}
                                onClick={handleCepApi}
                            >
                                {cepValue.length >= 9 && <SearchIcon color="#000" />}
                            </IconWrapper>
                            <Form.Control
                                type="text"
                                placeholder="CEP"
                                value={cepValue}
                                onChange={handleCepChange}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="numEnd">
                        <Form.Label>Número Moradia</Form.Label>
                        <Form.Control type="text" placeholder="Número Moradia" />
                    </Form.Group>

                    { achouCep && 
                        <>
                            <Form.Group className="mb-3" controlId="numEnd">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control type="text" value={userAddress.localidade} readOnly/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="numEnd">
                                <Form.Label>Número Moradia</Form.Label>
                                <Form.Control type="text" placeholder="Número Moradia" />
                            </Form.Group>
                        </>
                    }


                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Lembrar conta" />
                    </Form.Group>

                    <SubmitBtn variant="primary" type="submit">
                        Cadastrar
                    </SubmitBtn>
                </SCForm>
			</Body>
		</Div>
	);
}

const SubmitBtn = styled(Button)`
    position:absolute;
    bottom: -2em;
    right: 0;
    width: 10em;
`

const SCForm = styled(Form)`
    position: relative;
    width: 80%;
    margin: auto;
    margin-top: 4em;
    display: grid;
    gap: 1em;
    grid-template-columns: 1fr 1fr;
    align-items: center;
`


const Div = styled.div`
    display: flex;
    justify-content: center;
    overflow-y: auto;
    width: 100%;
    min-height: 100vh;
    height: auto;
	background-color: RGB(0, 26, 61);
    margin-bottom: 4em;
`;

const Body = styled.div`
    position: absolute;
    top: 14em;
    /* padding-bottom: 3em; */
    height: 80vh;
    width: 40vw;
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
const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: ${props => props.tamanho === 9 ? "10px" : 0};;
`;

const InputGroup = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const SearchIcon = styled(Search)`
    height: 20px;
    width: 20px;
    cursor: pointer;
`;
