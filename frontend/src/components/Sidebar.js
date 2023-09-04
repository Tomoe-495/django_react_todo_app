import { Button, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";


function Sidebar() {


    return (
        <VStack w="200px" h="100vh" backgroundColor="blackAlpha.400" boxShadow="dark-lg" pos="fixed" top="0">

            <Heading m="30px 0" size="md">Todo App</Heading>
            <VStack w="100%">

                {
                    [{name:"Home", link:"/"}, {name:"Add", link:"/add"}].map((item, index) => {
                        return (
                            <Button w="80%" variant="ghost" key={index}>
                                <Link to={item.link}>{item.name}</Link>
                            </Button>
                        )
                    })
                }

            </VStack>


        </VStack>
    )
}

export default Sidebar;