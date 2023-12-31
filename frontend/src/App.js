import React from 'react';
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

const api = "http://localhost:8000/api/todos/";

function App() {
  return (
    <Router>

    <ChakraProvider theme={theme}>
      <ColorModeSwitcher pos="fixed" right="10px" top="10px" />

      <Sidebar />

      <Box w="calc(100% - 200px)" ml="200px">
      <Routes>

        <Route exact path="/" element={<Todos api={api} />} />
        <Route path="/add" element={<Add api={api} />} />
        <Route path="/edit/:id" element={<Edit api={api} />} />

      </Routes>
      </Box>

    </ChakraProvider>
    </Router>
  );
}

export default App;
