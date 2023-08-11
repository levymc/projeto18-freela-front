import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';


export default function CardIcons(props) {
	return (
            <Card>
                <SectionIcon>
                    {props.icon}
                </SectionIcon>
                <DivText>
                    {props.text}

                </DivText>
                <SCButton>
                    Contratar
                </SCButton>
            </Card>		
	    );
}

const DivText = styled.div`
    font-size: 16px;
`
const SCButton = styled(Button)`
    background-color: #EF642F;
    border: 0;
    padding: 0.2em 1em;
`

const Card = styled.div`
	width: 2.8em;
	height: 2.9em;
    padding-bottom: 0.3em; 
	border-radius: 10px;
	background-color: white;
	box-shadow: 1px 1px 2px 2px rgba(255, 255, 255, 0.212);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    gap: 0.12em;
    font-size: 5em;
    position: relative;

`
const SectionIcon = styled.div`
    
`