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
        descricao: "Automotivo",
        modal: "",
    },
    {
        icon: <IoAirplaneOutline height="0.8em" width="0.8em" />,
        descricao: "Viagens",
        modal: "",
    },
    {
        icon: <BusOutline height="0.8em" width="0.8em" />,
        descricao: "Transporte",
        modal: "",
    }, 
    {
        icon: <LaptopOutline height="0.8em" width="0.8em" />,
        descricao: "Tecnologia",
        modal: "",
    }, 
    {
        icon: <FlaskOutline height="0.8em" width="0.8em" />,
        descricao: "Laboratorial",
        modal: "",
    }, 
    {
        icon: <PawOutline height="0.8em" width="0.8em" />,
        descricao: "Pet",
        modal: "",
    }, 
    {
        icon: <PiPottedPlantThin height="0.8em" width="0.8em" />,
        descricao: "Jardinagem",
        modal: "",
    },
    {
        icon: <BookOutline height="0.8em" width="0.8em" />,
        descricao: "Educação",
        modal: "",
    }, 
    {
        icon: <KeyOutline height="0.8em" width="0.8em" />,
        descricao: "Chaveiro",
        modal: "",
    }, 
    {
        icon: <ConstructOutline height="0.8em" width="0.8em" />,
        descricao: "Serviços Domésticos",
        modal: "",
    },
    {
        icon: <RestaurantOutline height="0.8em" width="0.8em" />,
        descricao: "Alimentação",
        modal: "",
    },
    {
        icon: <FitnessOutline height="0.8em" width="0.8em" />,
        descricao: "Saúde",
        modal: "",
    }, 
    {
        icon: <LiaBabyCarriageSolid height="0.8em" width="0.8em" />,
        descricao: "Cuidados especiais",
        modal: "",
    },
    {
        icon: <GiHandSaw height="0.8em" width="0.8em" />,
        descricao: "Marcenaria",
        modal: "",
    },
];



export default iconsList.sort((a, b) => a.descricao.localeCompare(b.descricao));