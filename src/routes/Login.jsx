import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel'
import { useAuth } from '../components/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Home() {
	const { telaAcesso, setTelaAcesso, logado, setLogado } = useAuth();

	return (
		<Div height={'100vh'}>
			<Body onClick={() => {setLogado(!logado)}}>
                <Form >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
			</Body>
		</Div>
	);
}



const Div = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: ${props => props.height};
	background-color: RGB(0, 26, 61);
`;

const Body = styled.div`
    position: absolute;
    top: 14em;
	display: flex;
    justify-content: center;
	flex-direction: column;
    align-items: center;
    height: 40vh;
    width: 30vw;
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
