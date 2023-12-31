import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Search } from 'react-ionicons'
import Carousel from 'react-bootstrap/Carousel'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { simpleModal } from '../components/modais'

export default function Cadastro() {
	const { telaAcesso, setTelaAcesso, logado, setLogado, categorias, setCategorias } = useAuth();

    const [ cepValue, setCepValue ] = useState("") 
    const [ achouCep, setAchouCep ] = useState(false)
    const [ userAddress, setUserAddess ] = useState({})
    const [cadastrarPrestador, setCadastrarPrestador] = useState(false)
    const [servicoEscolhido, setServicoEscolhido] = useState(false)
    
    const navigateTo = useNavigate()

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

    const handleSubmit = (data) => {

        // validações sobre os inputs
        if (data.password != data.confirmPassword) return simpleModal("As senhas devem ser iguais.", "warning")
        else if (!data.cidade || !data.endereco) return simpleModal("Busque pelo CEP, clique na lupa", "warning")

        axios.post(`${import.meta.env.VITE_API_URL}/signup`, data).then(res => {
            console.log(res.data)
            simpleModal("Usuário criado com sucesso!", "success").then(() => navigateTo('/login'))
        }).catch(err => {
            console.error(err.response)
            simpleModal(err.response.data, "error")
        })
    }

    const handleCheckBox = async (e) => {
        setCadastrarPrestador(e.target.checked)
    }

    // useEffect(() => {
    //     if (!telaAcesso) {
    //         navigateTo('/');
    //     }
    // }, [telaAcesso]);
    

	return (
		<Div height={'100vh'}>
			<Body achou={achouCep}>
            <SCForm onSubmit={(event) => {
                event.preventDefault();
                const formData = {
                    nome: event.target.name.value,
                    email: event.target.email.value,
                    password: event.target.password.value,
                    confirmPassword: event.target.confirmPassword.value,
                    cep: event.target.cep.value.replace("-", ""),
                    numEnd: event.target.numEnd.value ? event.target.numEnd.value : "",
                    endereco: achouCep ? event.target.endereco.value : null,
                    bairro: achouCep ? event.target.bairro.value : null,
                    cidade: achouCep ? event.target.cidade.value : null,
                    estado: achouCep ? event.target.estado.value : null,
                    permission: cadastrarPrestador ? 2 : 1,
                    servico: cadastrarPrestador ? event.target.cadastroPrestadorInput.value : null,
                };
                handleSubmit(formData);
            }}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control required type="text" placeholder="Nome" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" placeholder="Email" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                
                    
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control required type="password" placeholder="Senha" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirme sua senha</Form.Label>
                        <Form.Control required type="password" placeholder="Confirme sua senha" />
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
                        <Form.Control type="number" placeholder="Número Moradia" />
                    </Form.Group>

                    { achouCep && 
                        <>
                            <Form.Group className="mb-3" controlId="endereco">
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control type="text" value={userAddress.logradouro} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="bairro">
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control type="text" value={userAddress.bairro} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="cidade">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control type="text" value={userAddress.localidade} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="estado">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control type="text" value={userAddress.uf} readOnly/>
                            </Form.Group>
                        </>
                    }


                    <Form.Group className="mb-3" controlId="cadastroPrestador">
                        <Form.Check 
                            type="checkbox" 
                            label="Cadastrar como Prestador"
                            onChange={handleCheckBox}
                        />
                    </Form.Group>
                    <SubmitBtn variant="primary" type="submit">
                        Cadastrar
                    </SubmitBtn>
                    {cadastrarPrestador && (
                                <Form.Group className="mb-3" controlId="cadastroPrestadorInput">
                                    <Form.Label>Selecione sua categoria de serviços</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        {categorias.map((cat, i) => {
                                            return (
                                                <option value={cat.id}>{cat.descricao}</option>
                                            )
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            )}
                </SCForm>
			</Body>
		</Div>
	);
}

const SubmitBtn = styled(Button)`
    /* position:absolute;
    bottom: -3em;
    right: 0;
    width: 10em; */
`

const SCForm = styled(Form)`
    position: relative;
    /* width: %; */
    /* margin: auto; */
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
