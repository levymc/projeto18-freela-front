import Swal from 'sweetalert2';
import ReactDOMServer from 'react-dom/server';
import DataTableCarrinho from './dataTables/DataTableCarrinho';

export const modalCarrinho = (itensCarrinho) => {
    const html = itensCarrinho.length === 0 ? "Você ainda não solicitou nenhum serviço!!"
                : `<div class="tableCarrinho">
                    <table>
                        <thead>
                            <tr>
                                <th>Prestador</th>
                                <th>Categoria Serviço</th>
                                <th>Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itensCarrinho.map((item, i) => `
                                <tr key=${i}>
                                    <td>${item.prestadorId}</td>
                                    <td>${item.categoriaNome}</td>
                                    <td>${item.preco}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>`
                    
    
    Swal.fire({

        title: "<strong>Serviços Solicitados!</strong>",
        html: html,
        confirmButtonColor: `RGB(255, 101, 0)`,
        confirmButtonText: "Finalizar pedido",
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        allowEscapeKey: false,
        allowOutsideClick: false,
        padding: '1.5em',
        width: '60vw',
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

export const modalServico = (title, icon) => {
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
