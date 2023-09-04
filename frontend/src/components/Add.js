import { Button, Heading, Input, Textarea, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Add(){

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const enterData = () => {

        axios
            .post("/api/todos/", {title:title,description:desc})
            .then(res => {
                navigate("/");
            })

    }

    return (
        <VStack w="100%" mt="50px" gap="15px">
            <Heading mb="50px">Add Todo Entry</Heading>
            <Input placeholder="Enter Title" w="70%" size="lg" variant="flushed" value={title} onChange={(event) => setTitle(event.target.value)} />
            <Textarea placeholder="Enter Description" w="70%" size="lg" variant="flushed" value={desc} onChange={(event) => setDesc(event.target.value)}></Textarea>
            <Button colorScheme="teal" w="100px" onClick={enterData} >Enter</Button>
        </VStack>
    )
}

export default Add;
