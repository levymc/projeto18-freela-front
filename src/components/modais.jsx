import Swal from 'sweetalert2';
import ReactDOMServer from 'react-dom/server';
import DataTableCarrinho from './dataTables/DataTableCarrinho';
import axios from 'axios'
import React, { useEffect, useState } from 'react'


export const simpleModal = (title, icon) => {
    return Swal.fire({
        title: title,
        icon: icon,
        confirmButtonColor: "#FF6500",
        allowEscapeKey: false,
        allowOutsideClick: false,
    })
}

export const simpleModalButton = (title, textButton, icon) => {
    return Swal.fire({
        title: title,
        icon: icon,
        confirmButtonColor: "#FF6500",
        confirmButtonText: textButton,
        showCloseButton: true,
        showCancelButton: true,
    })
}

export const simpleModalText = (title, text, icon) => {
    return Swal.fire({
        title: title,
        text: text,
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

const handleDeleteService = (data, token) => {
    return axios.put(`${import.meta.env.VITE_API_URL}/cancelarSolicitacao`, {data}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }})
}


export const modalCarrinho = (itensCarrinho, setItensCarrinho, token) => {
    let total = 0;
    itensCarrinho.forEach(element => {
        total += parseFloat(element.price)
        console.log(total)           
    })
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
                                    <td>R$ ${item.price}</td>
                                    <td><ion-icon id="${item.id}" name="trash-outline"></ion-icon></td>
                                </tr>
                            `).join('')}
                            <tr>
                                <td></td>
                                <td></td>
                                <td><strong>TOTAL</strong></td>
                                <td><strong>R$ ${total.toFixed(2).replace(".", ",")}</strong></td>
                            </tr>
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
                            handleDeleteService(itensCarrinho[i], token).then(res => {
                                console.log(res)
                                if (itensCarrinho.length === 1){
                                    setItensCarrinho([])
                                }else{
                                    setItensCarrinho(itensCarrinho.splice(i, 1))
                                }
                            }).catch(err => {
                                console.error(err.response)
                            })
                            
                        }else (modalCarrinho(itensCarrinho))
                    })
                })
            }
        },
    });
}


export const modalHome = () => {
    Swal.fire({
        title: "Seja bem-vindo(a) ao Get Serviços!",
        text: "Seu lugar de conexões.",
        confirmButtonColor: "#FF6500",
        allowEscapeKey: false,
        allowOutsideClick: false,
    }).then(res => {
        res.isConfirmed
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

