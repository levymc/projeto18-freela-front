import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel'
import { useAuth } from '../components/AuthContext';
import Button from 'react-bootstrap/Button';
import { ConstructOutline } from 'react-ionicons'
import Form from 'react-bootstrap/Form';
import CardIcons from '../components/CardIcons';
import iconsList from '../components/dto/menuCategoriaIcons';
import axios from 'axios'
import { simpleModal } from '../components/modais';
import HTMLReactParser from 'html-react-parser';


export default function Home() {
	const { categorias, setCategorias, itensCarrinho, setItensCarrinho } = useAuth();

	useEffect(() => {
		axios.get('http://localhost:5000/categorias').then(res => {
			setCategorias(res.data)
			iconsList.forEach((icon, i) => {
				if ( icon.descricao === res.data[i].descricao) return icon.id = res.data[i].id
			})
		}).catch(err => {
			console.error(err.response)
			simpleModal("Ocorreu algum erro de comunicação com o servidor", "error")
		})
	}, [])
	
	useEffect(() => {
        localStorage.setItem("carrinho", JSON.stringify(itensCarrinho))
	}, [itensCarrinho])

	return (
		<Div height={'100vh'}>
			<Body onClick={() => {console.log(iconsList)}}>
				{iconsList.map((icon, i) => {
					return (
						<SCCardIcons 
							icon = {icon.icon} 
							text = {icon.descricao}
							id = {icon.id}
							key = {i}
						/>
					)
				})}

			</Body>
		</Div>
	);
}

const SCCardIcons = styled(CardIcons)`
	transition: all 0.3s ease-in;
    :hover {
        transform: scale(1.1);
        background-color: #f8f8f8;
    }
`

const Div = styled.div`
    display: flex;
    justify-content: center;
    overflow-y: auto;
    width: 100%;
    min-height: 100vh;
    height: auto;
	background-color: RGB(0, 26, 61);
    padding-bottom: 4em;
	padding-top: 12vh;
`;

const Body = styled.div`
	position: absolute;
	display: flex;
    justify-content: center;
	flex-wrap: wrap;
	gap: 2em;

    height: auto;
    width: 80%;
    margin: 0 auto;
    padding: 20px; 
    color: black;
	.imgSlide{
		width: 35vw !important;
		height: 65vh !important;
	}
	h3{
		color: black;
	}
`;
const Card = styled.div`
	width: 4em;
	height: 4em;
	border-radius: 10px;
	background-color: white;
	box-shadow: 1px 1px 2px 2px rgba(255, 255, 255, 0.212);
`