import { 
        ConstructOutline,
        RestaurantOutline, 
        CarOutline, 
        BusOutline,
        FitnessOutline,
        PawOutline,
        BookOutline,
        KeyOutline,
        FlaskOutline,
        LaptopOutline,
    } from 'react-ionicons'

import { LiaBabyCarriageSolid } from 'react-icons/lia'
import { IoAirplaneOutline } from 'react-icons/io5'
import { PiPottedPlantThin } from 'react-icons/pi'
import { GiHandSaw } from 'react-icons/gi'

const iconsList = [
    {
        icon: <CarOutline height="0.8em" width="0.8em" />,
        text: "Automotivo",
        id: "catIcon1",
        url: "",
    },
    {
        icon: <IoAirplaneOutline height="0.8em" width="0.8em" />,
        text: "Viagens",
        id: "catIcon1",
        url: "",
    },
    {
        icon: <BusOutline height="0.8em" width="0.8em" />,
        text: "Transporte",
        id: "catIcon1",
        url: "",
    }, 
    {
        icon: <LaptopOutline height="0.8em" width="0.8em" />,
        text: "Tecnologia",
        id: "catIcon1",
        url: "",
    }, 
    {
        icon: <FlaskOutline height="0.8em" width="0.8em" />,
        text: "Laboratorial",
        id: "catIcon1",
        url: "",
    }, 
    {
        icon: <PawOutline height="0.8em" width="0.8em" />,
        text: "Pet",
        id: "catIcon1",
        url: "",
    }, 
    {
        icon: <PiPottedPlantThin height="0.8em" width="0.8em" />,
        text: "Jardinagem",
        id: "catIcon1",
        url: "",
    },
    {
        icon: <BookOutline height="0.8em" width="0.8em" />,
        text: "Educação",
        id: "catIcon1",
        url: "",
    }, 
    {
        icon: <KeyOutline height="0.8em" width="0.8em" />,
        text: "Chaveiro",
        id: "catIcon1",
        url: "",
    }, 
    {
        icon: <ConstructOutline height="0.8em" width="0.8em" />,
        text: "Serviços Domésticos",
        id: "catIcon1",
        url: "",
    },
    {
        icon: <RestaurantOutline height="0.8em" width="0.8em" />,
        text: "Alimentação",
        id: "catIcon1",
        url: "",
    },
    {
        icon: <FitnessOutline height="0.8em" width="0.8em" />,
        text: "Saúde",
        id: "catIcon1",
        url: "",
    }, 
    {
        icon: <LiaBabyCarriageSolid height="0.8em" width="0.8em" />,
        text: "Cuidados especiais",
        id: "catIcon1",
        url: "",
    },
    {
        icon: <GiHandSaw height="0.8em" width="0.8em" />,
        text: "Marcenaria",
        id: "catIcon1",
        url: "",
    },
];



export default iconsList.sort((a, b) => a.text.localeCompare(b.text));