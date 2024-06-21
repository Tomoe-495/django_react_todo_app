import { Button, Heading, Input, Textarea, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function Edit({api}){

    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [cat, setCat] = useState({});

    const navigate = useNavigate();

    const toast = useToast();

    useEffect(()=>{
        axios
            .get(`${api}todos/${id}/`)
            .then(res => {
                const data = res.data;
                setTitle(data.title);
                setDesc(data.description);
                setCat(data.category);
            })
    }, [id])



    const handleUpdate = () => {
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
            
            axios
                .put(`${api}todos/${id}/`, {title:title, description:desc, category:cat})
                .then(res => {
                    toast({
                        title: "Updated",
                        description: "Entry has been updated",
                        position: "bottom-right",
                        variant: "solid",
                        status: "info",
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
            <Button colorScheme="teal" onClick={handleUpdate}>Update</Button>
        </VStack>
    )
}

export default Edit;
