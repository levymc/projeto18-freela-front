import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { TrashOutline } from 'react-ionicons'
import ReactDOMServer from 'react-dom/server';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'
import { simpleModal, simpleModalButton } from '../modais';
import axios from 'axios'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Button } from 'react-bootstrap';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Tooltip from '@mui/material/Tooltip';

export default function DataTablePrestadores(props) {
    const iconHtml = ReactDOMServer.renderToString(<TrashOutline />)
	const { logado, setLogado, loggedUser, setLoggedUser, itensCarrinho, setItensCarrinho } = useAuth();
    const navigateTo = useNavigate()

    const [prestadores, setPrestadores] = useState()

    useEffect(() => {
		logado && axios.get(`${import.meta.env.VITE_API_URL}/prestadores`, {
            headers: {
                    'Authorization': `Bearer ${loggedUser.token}`,
                    'categoriaId': props.categoriaId
                }}).then(res => {
                    // console.log(res.data)
                    setPrestadores(res.data)
                }).catch(err => {
                    console.error(err.response)
                    simpleModal("Ocorreu algum erro de comunicação com o servidor", "error")
                })
	}, [])

    const handleContract = (prestadorId, prestadorName, price) => {
        simpleModalButton("Deseja solicitar o serviço com o prestador: " + prestadorName, "Confirmar", "question").then(res => {
            if(res.isConfirmed){
                axios.post(`${import.meta.env.VITE_API_URL}/solicitarServico`,{
                    categoriaId: props.categoriaId,
                    prestadorId: prestadorId,
                }, {
                    headers: {
                        'Authorization': `Bearer ${loggedUser.token}`,
                    }}).then(res => {
                        res.data.categoriaNome = props.categoriaNome
                        res.data.prestadorName = prestadorName
                        res.data.price = price
                        setItensCarrinho([...itensCarrinho, res.data])
                        navigateTo('/')
                    }).catch(err => {
                        console.error(err.response)
                        simpleModal("Ocorreu algum erro de comunicação com o servidor", "error")
                    })
            }
        }).catch(err => {
            console.error(err)
            simpleModal("Ocorreu algum erro de comunicação com o servidor", "error")
        })
    }


    const columns = [
        {
            name: 'Prestador',
            selector: row => row.nome,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Faixa de Preço Diária',
            selector: row => "R$" + row.precoMin.toFixed(2).replace(".",",") +
                             " ~ " + "R$" + row.precoMax.toFixed(2).replace(".",",") ,
        },
        {
            name: 'Solicitar Serviço',
            cell: row => (
                <SCButton onClick={() => handleContract(
                                                            row.id, 
                                                            row.nome,
                                                            (row.precoMin + row.precoMax).toFixed(2).replace(".",",") 
                                                        )}>Solicitar</SCButton>
            ),
        },
        {
            name: '',
            cell: row => (
                <IconContainer>
                    <Tooltip arrow title="Enviar email para o Prestador">
                        <StyledEmail />
                    </Tooltip>
                </IconContainer>
            ),
            width: `2em`
        },
        
    ]

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px',
                backgroundColor: 'RGB(250, 250, 251)',
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
                fontSize: '1.6em',
                backgroundColor: 'RGB(250, 250, 251)',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
                fontSize: '1.2em'
            },
        },
    }

    return (
        <StyledDataTable
            columns={columns}
            data={prestadores}
            customStyles={customStyles}
        />
    );
};

const SCButton = styled(Button)`
    padding: 5px;
    font-size: 14px;
    font-family: Ubuntu;
    background-color: RGB(255, 101, 0);
    margin: auto;
    border: 0;
`

const StyledDataTable = styled(DataTable)`
    font-size: 16px;
    background-color: RGB(250, 250, 251) !important;
    border: 1px solid black;
    border-radius: 10px;
    padding: 1em;

`
const IconContainer = styled.div`
    left: 0;
    position: absolute;

`;
const StyledEmail = styled(EmailOutlinedIcon)`
    cursor: pointer;
    margin: auto;
    left: -1em;
    position: relative;
    color: #0160B1;
`
const StyledCheck = styled(CheckOutlinedIcon)`
    cursor: pointer;
    margin: auto;
    color: #018001 !important;
`