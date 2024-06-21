import React, { useState } from 'react';
import {
  Box,
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todos from './components/Todos';
import Sidebar from './components/Sidebar';
import Add from './components/Add';
import Edit from './components/Edit';

const api = "https://tomoe495.pythonanywhere.com/api/";

function App() {

  const [over, setOver] = useState("not");

  console.log(over)

  return (
    <Router>

      <ChakraProvider theme={theme}>

        <ColorModeSwitcher pos="fixed" right="10px" bottom="10px" />

        <Sidebar />

        {/* <Box w={isPhone ? "100%" : "calc(100% - 200px)"} ml="200px"> */}
        <Box w={{base:"100%", md:"calc(100% - 200px)"}} ml={{base:"0", md:"200px"}} mb="50px">

        <Routes>

          <Route exact path="/" element={<Todos api={api} setOver={setOver} />} />
          <Route path="/add" element={<Add api={api} />} />
          <Route path="/edit/:id" element={<Edit api={api} />} />

        </Routes>
        </Box>
        
      </ChakraProvider>
    </Router>
  );
}

export default App;
