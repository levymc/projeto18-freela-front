import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { TrashOutline } from 'react-ionicons'
import ReactDOMServer from 'react-dom/server';

export default function DataTableCarrinho() {
    const iconHtml = ReactDOMServer.renderToString(<TrashOutline />)

    const columns = [
        {
            name: 'Serviços',
            selector: row => row.title,
        },
        {
            name: 'Valor',
            selector: row => row.year,
        },
        {
            name: 'Prestador',
            selector: row => row.prestador,
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

    const data = [
        {
            id: 1,
            title: 'Serviços',
            year: '1988',
            prestador: 'Frederico',
        },
        {
            id: 2,
            title: 'Valor',
            year: '1984',
            prestador: 'Frederico',
        },
        {
            id: 3,
            title: 'Valor',
            year: '1984',
            prestador: 'Frederico',
        },
    ];
    const customStyles = {
        rows: {
            style: {
                minHeight: '72px',
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px',
                paddingRight: '8px',
                fontSize: '1.6em'
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
            data={data}
            customStyles={customStyles}
        />
    );
};

const StyledDataTable = styled(DataTable)`
    margin-top: 2em; margin-bottom: 2em;
    font-size: 16px;
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