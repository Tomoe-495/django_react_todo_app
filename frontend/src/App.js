import React, { useState } from 'react';
import {
  Box,
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todos from './components/Todos';
import Sidebar from './components/Sidebar';
import Add from './components/Add';
import Edit from './components/Edit';
import Contact from './components/Contact';

function App() {

  const [over, setOver] = useState("not");

  console.log(over)

  const theme = extendTheme({
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false
    }
  })

  return (
    <Router>

      <ChakraProvider theme={theme}>

        <ColorModeSwitcher pos="fixed" right="10px" bottom="10px" />

        <Sidebar />

        {/* <Box w={isPhone ? "100%" : "calc(100% - 200px)"} ml="200px"> */}
        <Box w={{ base: "100%", md: "calc(100% - 200px)" }} ml={{ base: "0", md: "200px" }} mb="50px">

          <Routes>

            <Route exact path="/" element={<Todos setOver={setOver} />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/contact" element={<Contact />} />

          </Routes>
        </Box>

      </ChakraProvider>
    </Router>
  );
}

export default App;
