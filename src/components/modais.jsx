import Swal from 'sweetalert2';
import ReactDOMServer from 'react-dom/server';
import DataTableCarrinho from './DataTableCarrinho';

export const modalCarrinho = () => {
    const dataTableHtml = ReactDOMServer.renderToString(<DataTableCarrinho />);
    
    Swal.fire({

        title: "<strong>Serviços Solicitados!</strong>",
        html: dataTableHtml,
        confirmButtonColor: `RGB(255, 101, 0)`,
        confirmButtonText: "Finalizar pedido",
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        allowEscapeKey: false,
        allowOutsideClick: false,
        padding: '1.5em',
    });
}

export const modalHome = (setFirstAccess) => {
    Swal.fire({
        title: "Seja bem vinda(o) ao Get Samurais!",
        text: "Lugar de felicidade",
        confirmButtonColor: "#FF6500",
        allowEscapeKey: false,
        allowOutsideClick: false,
    }).then(res => {
        res.isConfirmed && setFirstAccess(true)
    })
}

export const modalServico = () => {
    return Swal.fire({
        title: title,
        icon: icon,
        confirmButtonColor: "#FF6500",
        allowEscapeKey: false,
        allowOutsideClick: false,
    })
}

export const simpleModal = (title, icon) => {
    return Swal.fire({
        title: title,
        icon: icon,
        confirmButtonColor: "#FF6500",
        allowEscapeKey: false,
        allowOutsideClick: false,
    })
}
