import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create_user from "./pages/Create_user";
import Delete_user from "./pages/Delete_user";
import Update_user from "./pages/Update_user";
import Error from "./pages/Error";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from "axios";



function App() {
  const [searchname, setSearchName] = useState('');
  const [filterdList, setFilterdList] = useState([])
  const [display, setDisplay] = useState("d-none")

  const searchList = async (name) => {
    setDisplay("d-block")
    const resp = await axios.get(process.env.LOCAL_URL + '/users');

    const fullList = resp.data;
    const filterName = [];

    fullList.map(item => filterName.push(item.name))
    const filteredItems = filterName.filter(item =>
      item.toLowerCase().includes(searchname.toLowerCase())
    );
    filteredItems.length > 0 ? setFilterdList(filteredItems) : setFilterdList(["No data found"])

  }

  const selectedItem = () => {
    setDisplay("d-none")
  }
  return (
    <div>
      <Navbar expand="lg" style={{ backgroundColor: "lightgray" }}>
        <Container fluid>
          <Navbar.Brand href="#">
            <img src="/crud.png" width={70} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >

            </Nav>
            <div style={{ backgroundColor: "white" }} id='searchList' className={`${display}`}>
              {filterdList?.map((item, index) => (<li key={index} onClick={() => selectedItem()}><Link href="#">{item}</Link></li>))}
            </div>
            <Form className="d-flex">

              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => { searchList(e.target.value); setSearchName(e.target.value) }}
                value={searchname}
              />
              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/Create_user/:id" Component={Create_user} />
        <Route path="/Create_user" Component={Create_user} />
        {/* <Route path="/Update_user" Component={Update_user}/>
        <Route Component={Error}/> */}
      </Routes>
    </div>
  );
}

export default App;
