import { Button, Card, CardBody, CardHeader, Heading, IconButton, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";
import Service from "../Service";

function Todos({ setOver }) {

    const toast = useToast();

    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        Service.getData("todos")
            .then(res => {
                setData(res.data.reverse())
            })
    }, [])

    useEffect(() => {
        Service.getData('category')
            .then(res => {
                setCategory(res.data)
            })
    }, [])

    const handleFinish = id => {
        const tempData = data.find(x => x.id == id);
        tempData.completed = true
        try {

            Service.editItem("todos", id, tempData);
            setData(data => data.map(item => (
                item.id === id ? { ...item, completed: true } : item
            )
            ))

        } catch (err) {

        }
    }

    const handleDelete = id => {
        try {
            Service.deleteItem("todos", id)
            setData(data => data.filter(item => item.id !== id));
            toast({
                title: "Delete",
                description: "Entry has been deleted!",
                position: "bottom-right",
                variant: "solid",
                status: "warning",
                isClosable: true
            })
        } catch (err) {

        }

    }

    return (
        <VStack pt="30px" w="100%" gap="1em">

            <Heading mb="50px">Entries</Heading>

            {
                category.map(cat => {
                    return (
                        <VStack key={cat.id} gap={2} pt={2} px={{ base: 5, md: 10 }} pb={5} w={{ base: "90%", md: "70%" }} rounded={10} background="rgba(255, 255, 255, .2)">
                            <Heading>{cat.name}</Heading>
                            {
                                data.filter(x => x.category.name === cat.name).map(item => {
                                    return (
                                        <Card key={item.id} w="100%" variant="elevated" pos="relative" onMouseOver={() => setOver("over")} onMouseOut={() => setOver("not")} >
                                            <CardHeader>{item.title}</CardHeader>
                                            <hr></hr>
                                            <CardBody>{item.description}</CardBody>
                                            {!item.completed ?
                                                <Button size={{ base: "sm", md: "md" }} colorScheme="teal" pos="absolute" top="10px" right="10px" onClick={() => navigate(`/edit/${item.id}`)} >Edit</Button>
                                                : null}
                                            {item.completed ?
                                                <IconButton
                                                    aria-label="delete"
                                                    icon={<CloseIcon />}
                                                    colorScheme="red"
                                                    onClick={() => handleDelete(item.id)}
                                                    pos="absolute" top="10px" right="10px" /> :
                                                <Button colorScheme="teal" onClick={() => handleFinish(item.id)}>Finish!</Button>}
                                        </Card>
                                    )
                                })
                            }

                        </VStack>
                    )
                })
            }


        </VStack>
    )
}

export default Todos;
