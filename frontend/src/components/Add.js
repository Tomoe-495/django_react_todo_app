import { Button, Heading, Input, Select, Textarea, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Add({api}){

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [cat, setCat] = useState(0);
    const navigate = useNavigate();

    const [Category, setCategory] = useState([]);

    useEffect(()=>{
        axios.get(api+"category/")
        .then(res => {
            setCategory(res.data);
            setCat(res.data[0].id)
        })
    }, [])


    const toast = useToast();

    const handleEnter = () => {
        if (title === "" || desc === ""){

            toast({
                title: "Error",
                description: "don't leave any fields empty",
                position: "bottom-right",
                variant: "subtle",
                status: "error",
                isClosable: true
            })
        }else{

            const formData = {title:title, description:desc, category:Category.find(x => x.id == cat)};

            axios
                .post(api+"todos/", formData)
                .then(res => {
                    toast({
                        title: "Entry",
                        description: "new Entry has been added",
                        position: "bottom-right",
                        variant: "solid",
                        status: "success",
                        isClosable: true
                    })
                    navigate("/");
                })

        }
    }

    return (
        <VStack w="100%" pt="30px" gap="1em">
            <Heading mb="50px">Add Entry</Heading>

            <Input size="lg" variant="flushed" w="60%" placeholder="Enter Title" value={title} onChange={(event) => setTitle(event.target.value)} />
            <Textarea size="lg" variant="flushed" w="60%" placeholder="Enter Description" value={desc} onChange={(event) => setDesc(event.target.value)} ></Textarea>
            <Select size='lg' variant='flushed' w="60%" placeholder="Select Category"  value={cat} onChange={(event) => setCat(event.target.value)}>
                {Category.map(item => {
                    return (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )
                })}
            </Select>
            <Button colorScheme="teal" onClick={handleEnter}>Enter</Button>
        </VStack>
    )
}

export default Add;
