import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Flip, ToastContainer, toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Home = () => {
    const [userData, setUserdata] = useState([])
    const [refresh, setRefresh] = useState('')
    const navigate = useNavigate();

    const getData = async () => {
        const resp = await fetch('http://localhost:3030/users')
        const data = await resp.json();
        console.log("check resp", data)
        setUserdata(data)
    }
    useEffect(() => {
        getData()
    }, [refresh])

    const deleteData = async (id) => {
        const resp = await axios.delete(`http://localhost:3030/users/${id}`);

        resp.status == 200 ? toast.success("User Deleted successfully") : toast.error("Error")
        setRefresh(Math.random);
    }


    return (
        <div className='container'>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                theme='colored'
            />
            <div className='row text-center mt-3'>
                <div className='col-12 '>
                    <h2 >Users</h2>
                </div>
            </div>
            <div className='text-end'>
                <Button variant="success" onClick={() => navigate("/Create_user")}>Create User</Button>{' '}
            </div>
            <div className='row  mt-3'>

                <div className='col-12'>
                    <Table striped bordered hover responsive >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Phone No.</th>
                                <th>Address</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phno}</td>
                                    <td>{item.address}</td>
                                    <td><Button variant="warning" size="sm" onClick={() => navigate(`/Create_user/${item.id}`)}>Update</Button>{' '}</td>
                                    <td> <Button variant="danger" size="sm" onClick={() => deleteData(item.id)}>Delete</Button>{' '}</td>
                                </tr>))}
                            <tr >
                                <td>1</td>
                                <td>Sudhanshu Srivastava</td>
                                <td>sudhanshu@gmail.com</td>
                                <td>1234567890</td>
                                <td>Hardoi</td>
                                <td><Button variant="warning" size="sm" >Update</Button>{' '}</td>
                                <td> <Button variant="danger" size="sm" >Delete</Button>{' '}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>

        </div>
    );
}

export default Home;