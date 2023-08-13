import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { TrashOutline } from 'react-ionicons'
import ReactDOMServer from 'react-dom/server';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'
import { simpleModal } from '../modais';
import axios from 'axios'

export default function DataTablePrestadores(props) {
    const iconHtml = ReactDOMServer.renderToString(<TrashOutline />)
	const { telaAcesso, setTelaAcesso, logado, setLogado, categorias, setCategorias, loggedUser, setLoggedUser } = useAuth();

    const [prestadores, setPrestadores] = useState()

    useEffect(() => {
		logado && axios.get('http://localhost:5000/prestadores', {
            headers: {
                    'Authorization': `Bearer ${loggedUser.token}`,
                    'categoriaId': props.categoriaId
                }}).then(res => {
                    console.log(res.data)
                    setPrestadores(res.data)
                }).catch(err => {
                    console.error(err.response)
                    simpleModal("Ocorreu algum erro de comunicação com o servidor", "error")
                })
	}, [])

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
            name: '',
            cell: row => (
                <IconContainer>
                    <StyledTrashIcon color={'red'} />
                </IconContainer>
            ),
            width: `2em`
        },
    ];

    // const data = prestadores.map((prestador, i) => ({
    //     id: prestador.id,
    //     nome: prestador.nome,
    //     email: prestador.email
    // }))
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
    };
    return (
        <StyledDataTable
            columns={columns}
            data={prestadores}
            customStyles={customStyles}
        />
    );
};

const StyledDataTable = styled(DataTable)`
    font-size: 16px;
    background-color: RGB(250, 250, 251) !important;
    border: 1px solid black;
    border-radius: 10px;
    padding: 1em;

`
const IconContainer = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;

`;
const StyledTrashIcon = styled(TrashOutline)`
    cursor: pointer;
    margin: auto;
`