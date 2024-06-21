import { Button, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


function Sidebar(){

    const navigate = useNavigate();

    const Btns = [
        {name:"Home", link:"/"},
        {name:"Add", link:"/add"}
    ];

    return (
        <VStack w={{base:"100vw",md:"200px"}} h={{base:"auto", md:"100vh"}} backgroundColor="blackAlpha.600" pos={{base:"static", md:"fixed"}}>

            <Heading mt="30px" size="lg">Todo App</Heading>

            <VStack w="80%" mt="20px">
                {
                    Btns.map((item, index) => {
                        return (
                            <Button w="100%" variant="ghost" key={index} onClick={() => navigate(item.link)}>
                                {item.name}
                            </Button>
                        )
                    })
                }
            </VStack>


        </VStack>
    )
}

export default Sidebar;
