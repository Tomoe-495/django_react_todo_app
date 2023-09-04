import { Button, Heading, Input, Textarea, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit({api}){

    const {id} = useParams();

    useEffect(()=>{

    axios
        .get(`${api}${id}`)
        .then(res => {
            const data = res.data;
            setTitle(data.title);
            setDesc(data.description)
        })
    },[api, id])


    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const updateEntry = () => {

        axios
            .put(`${api}${id}/`, {title:title,description:desc})
            .then(res => {
                navigate("/")
            })

    }


    return (
        <VStack w="100%" mt="50px" gap="15px">
            <Heading mb="50px">Add Todo Entry</Heading>
            <Input placeholder="Enter Title" w="70%" size="lg" variant="flushed" value={title} onChange={(event) => setTitle(event.target.value)} />
            <Textarea placeholder="Enter Description" w="70%" size="lg" variant="flushed" value={desc} onChange={(event) => setDesc(event.target.value)}></Textarea>
            <Button colorScheme="teal" w="100px" onClick={updateEntry}>Update</Button>
        </VStack>
    )
}

export default Edit;
