import { Button, Heading, Input, Select, Textarea, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../Service";


function Add() {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [cat, setCat] = useState(0);
    const [img, setImage] = useState({});
    const navigate = useNavigate();

    const [Category, setCategory] = useState([]);

    useEffect(() => {
        Service.getData("category")
            .then(res => {
                setCategory(res.data);
                setCat(res.data[0].id)
            })
    }, [])


    const toast = useToast();

    const handleEnter = async () => {
        if (title === "" || desc === "") {

            toast({
                title: "Error",
                description: "don't leave any fields empty",
                position: "bottom-right",
                variant: "subtle",
                status: "error",
                isClosable: true
            })
        } else {

            const formData = { title: title, description: desc, category: cat };

            try {
                const res = await Service.addItem("todos", formData)

                if(res){

                    const newTodoId = res.data.id;
                    
                    for (let file of img) {
                        const ImageFile = { todo: newTodoId, image: file };
                        const response = await Service.addItem('todoimages', ImageFile);
                        if(response){
                            console.log(file);
                        }
                    }
                    
                    // console.log(img);
                    
                    toast({
                        title: "Entry",
                        description: "new Entry has been added",
                        position: "bottom-right",
                        variant: "solid",
                        status: "success",
                        isClosable: true
                    })
                    
                    navigate("/");
                }

            } catch (err) {

            }

        }
    }

    return (
        <VStack w="100%" pt="30px" gap="1em">
            <Heading mb="50px">Add Entry</Heading>

            <Input size="lg" variant="flushed" w="60%" placeholder="Enter Title" value={title} onChange={(event) => setTitle(event.target.value)} />
            <Textarea size="lg" variant="flushed" w="60%" placeholder="Enter Description" value={desc} onChange={(event) => setDesc(event.target.value)} ></Textarea>
            <Select size='lg' variant='flushed' w="60%" placeholder="Select Category" value={cat} onChange={(event) => setCat(event.target.value)}>
                {Category.map(item => {
                    return (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )
                })}
            </Select>
            <Input size='lg' variant="flushed" w="60%" type="file" multiple onChange={e => setImage(e.target.files)} />
            <Button colorScheme="teal" onClick={handleEnter}>Enter</Button>
        </VStack>
    )
}

export default Add;
