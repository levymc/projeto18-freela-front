import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel'
import { useAuth } from '../components/AuthContext';


export default function Home() {
	const { telaAcesso, setTelaAcesso, logado, setLogado } = useAuth();

	return (
		<Div height={'100vh'}>
			<Body>
				{telaAcesso ? (
					<h1>Tela de login</h1>
				) : (
					<Carousel>
						<Carousel.Item interval={3000}>
							<img src="https://www.2quartos.com/y/3447/encanamento-e1522070773829.jpg" className="d-block w-100 imgSlide" alt="Slide 1" />
							<Carousel.Caption>
								<h3>First slide label</h3>
								<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item interval={3000}>
							<img src="https://citecnologia.com/wp-content/uploads/2021/07/WhatsApp-Image-2021-04-15-at-15.13.19-2.jpeg" className="d-block w-100 imgSlide" alt="Slide 2" />
							<Carousel.Caption>
								<h3>First slide label</h3>
								<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item interval={3000}>
							<img src="https://housemaid-brasil.com.br/wp-content/uploads/2021/06/Limpeza-no-tatuape-1.jpg" className="d-block w-100 imgSlide" alt="Slide 3" />
							<Carousel.Caption>
								<h3>First slide label</h3>
								<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item interval={3000}>
							<img src="https://www.rolnews.com.br/uploads/noticias/2020/04/conheca-as-funcoes-do-cortador-de-grama-e-da-rocadeira-1587085181.jpg" className="d-block w-100 imgSlide" alt="Slide 4" />
							<Carousel.Caption>
								<h3>First slide label</h3>
								<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				)}
			</Body>
		</Div>
	);
}



const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: ${props => props.height};
	background-color: RGB(0, 26, 61);
`;

const Body = styled.div`
	display: flex;
    justify-content: center;
	flex-direction: column;
    align-items: center;
    height: 60vh;
    width: 60vw;
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

// Não é necessário importar ou definir o componente ExampleCarouselImage.
