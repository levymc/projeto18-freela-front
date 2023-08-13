import Swal from 'sweetalert2';
import ReactDOMServer from 'react-dom/server';
import DataTableCarrinho from './dataTables/DataTableCarrinho';

export const simpleModal = (title, icon) => {
    return Swal.fire({
        title: title,
        icon: icon,
        confirmButtonColor: "#FF6500",
        allowEscapeKey: false,
        allowOutsideClick: false,
    })
}

export const simpleModalCancelar = (title, icon) => {
    return Swal.fire({
        title: title,
        icon: icon,
        confirmButtonColor: "#FF6500",
        allowEscapeKey: false,
        allowOutsideClick: false,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        showCloseButton: true,
    })
}


export const modalCarrinho = (itensCarrinho) => {
    const html = itensCarrinho.length === 0 ? "Você ainda não solicitou nenhum serviço!!"
                : `<div class="tableCarrinho">
                    <table>
                        <thead>
                            <tr>
                                <th>Prestador</th>
                                <th>Categoria Serviço</th>
                                <th>Preço</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itensCarrinho.map((item, i) => `
                                <tr key=${i}>
                                    <td>${item.prestadorName}</td>
                                    <td>${item.categoriaNome}</td>
                                    <td>${item.price}</td>
                                    <td><ion-icon id="${item.id}" name="trash-outline"></ion-icon></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>`
                    
    
    return Swal.fire({
        title: "<strong>Serviços Solicitados!</strong>",
        html: html,
        confirmButtonColor: `RGB(255, 101, 0)`,
        confirmButtonText: itensCarrinho.length != 0 ? "Finalizar pedido" : "Voltar",
        showCloseButton: true,
        showCancelButton: itensCarrinho.length != 0 ? true : false,
        cancelButtonText: 'Cancelar',
        allowEscapeKey: false,
        allowOutsideClick: false,
        padding: '1.5em',
        width: itensCarrinho.length != 0 ? '60vw' : '40vw',
        
        didOpen: () => {
            for (const i in itensCarrinho){
                document.getElementById(itensCarrinho[i].id).addEventListener("click", () => {
                    simpleModalCancelar(`Cancelar solicitação do prestador: ${itensCarrinho[i].prestadorName} ?`, "question").then(res => {
                        if (res.isConfirmed){
                                
                            modalCarrinho(itensCarrinho)
                        }else (modalCarrinho(itensCarrinho))
                    })
                    console.log(itensCarrinho[i])
                })
            }
        }
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

