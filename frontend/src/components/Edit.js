import { Button, HStack, Heading, Image, Input, Select, Textarea, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../Service";


function Edit() {

    const { id } = useParams();

    const [data, setData] = useState({
        title: '',
        description: '',
        category: 1,
        image: ''
    });

    const [img, setImg] = useState([]);

    const [category, setCategory] = useState([]);
    const [image, setImage] = useState([]);

    const navigate = useNavigate();

    const toast = useToast();

    useEffect(() => {
        Service.getItem("todos", id)
            .then(res => {
                setData(res.data);
            })
    }, [id])

    useEffect(() => {
        Service.getData("category")
            .then(res => {
                setCategory(res.data)
            })
    }, [])

    useEffect(() => {
        Service.getData("todoimages")
            .then(res => {
                setImage(res.data)
            })
    }, [])


    console.log(img);


    const handleUpdate = async () => {
        if (data.title === "" || data.description === "") {

            toast({
                title: "Error",
                description: "don't leave any fields empty",
                position: "bottom-right",
                variant: "subtle",
                status: "error",
                isClosable: true
            })
        } else {

            try {
                if (typeof data.image == 'string') {
                    delete data.image
                }
                const resp = await Service.editItem("todos", id, data);
                toast({
                    title: "Updated",
                    description: "Entry has been updated",
                    position: "bottom-right",
                    variant: "solid",
                    status: "info",
                    isClosable: true
                })
                navigate("/");
            } catch (err) {

            }
            // })
        }
    }


    return (
        <VStack w="100%" pt="30px" gap="1em">
            <Heading mb="50px">Add Entry</Heading>

            <HStack>
                {
                    image.filter(x => x.todo === data.id).map((item, index) => {
                        return <Image key={index} src={item.image} boxSize={10} />;
                    })
                }
            </HStack>

            <Input size="lg" variant="flushed" w="60%" placeholder="Enter Title" value={data.title} onChange={(event) => setData({ ...data, title: event.target.value })} />
            <Textarea size="lg" variant="flushed" w="60%" placeholder="Enter Description" value={data.description} onChange={(event) => setData({ ...data, description: event.target.value })} ></Textarea>
            <Select size='lg' variant='flushed' w="60%" placeholder="Select Category" value={data.category} onChange={(event) => setData({ ...data, category: parseInt(event.target.value) })}>
                {category.map(item => {
                    return (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )
                })}
            </Select>
            <Input size='lg' variant="flushed" w="60%" type="file" onChange={e => setImg(e.target.files)} multiple />
            <Button colorScheme="teal" onClick={handleUpdate}>Update</Button>
        </VStack>
    )
}

export default Edit;
