import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Card, CardBody, CardHeader, Heading, IconButton, VStack } from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";

function getobj(data, id){
    for(let d of data){
        if (d.id === id){
            return d;
        }
    }
}

function Todos({api}){

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    
    useEffect(()=>{
        axios
            .get(api)
            .then(res => {
                setData(res.data.reverse())
            })
    },[api])

    const handleFinish = id => {

        let tempData = getobj(data, id);
        tempData.completed = true;

        axios
            .put(`${api}${id}/`, tempData)
            .then(res => {
                
                setData(data.map(item => 
                    item.id === id ? {...item, completed: true} : item
                    ));

            }).catch(err => {
                console.log("error while updating finish", err);
            })

    }

    const handleDelete = id => {
        axios
            .delete(`${api}${id}`)
            .then(res => {
                setData(data.filter(item => item.id !== id))
            })
    }

    const goEdit = id => navigate(`edit/${id}`);

    return (
        <VStack w="100%" mt="40px" gap="1.5em">

                <Heading>All Entries</Heading>

            {
                data.map(item => {
                    return (
                        <Card key={item.id} w="60%" variant="elevated" pos="relative">
                            <CardHeader fontSize="lg" fontWeight="700">{item.title}</CardHeader>
                            <hr></hr>
                            <CardBody>{item.description}</CardBody>
                            {
                               ! item.completed ?
                               <Button colorScheme="teal" onClick={() => handleFinish(item.id)} >Finish!</Button> : 
                               <IconButton icon={<CloseIcon />}
                               pos="absolute" right="10px" top="10px"
                               colorScheme="red" size="md"
                               onClick={() => handleDelete(item.id)} />
                            }
                            {! item.completed ? <Button pos="absolute" right="10px" top="10px" colorScheme="teal" onClick={() => goEdit(item.id)}>Edit</Button> : null}
                        </Card>
                    )
                })
            }

        </VStack>
    )
}

export default Todos;
