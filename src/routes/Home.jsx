import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel'

export default function Home() {
	return (
		<Div height={'100vh'}>
			<Body>
				{/* <h1>Carousel:</h1> */}
				<Carousel>
					<Carousel.Item interval={1000}>
						<img src="https://img.freepik.com/vetores-premium/gato-bonito-trabalhando-no-laptop-com-ilustracao-de-icone-do-vetor-dos-desenhos-animados-do-copo-de-cafe_138676-3473.jpg?w=2000" className="d-block w-100 imgSlide" alt="Slide 1" />
						<Carousel.Caption>
						<h3>First slide label</h3>
						<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item interval={1000}>
						<img src="https://static.vecteezy.com/ti/vetor-gratis/p3/2543415-cute-cat-or-kitten-animal-meow-cartoon-fofo-pets-exato-vector-colecao-ilustracao-cartoon-miau-gato-vetor.jpg" className="d-block w-100 imgSlide" alt="Slide 2" />
						<Carousel.Caption>
							<h3>First slide label</h3>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>	
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
	background-color: #EAD3C1;
`;

const Body = styled.div`
	display: flex;
    justify-content: center;
	flex-direction: column;
    align-items: center;
    height: 60vh;
    width: 60vw;
    background-color: white;
    margin: 0 auto;
    padding: 20px; 
    border-radius: 10px;
    color: black;
	.imgSlide{
		width: 300px !important;
	}
`;

// Não é necessário importar ou definir o componente ExampleCarouselImage.
