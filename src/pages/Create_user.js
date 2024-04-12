import React, { useEffect } from 'react';
import { Flip, ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Create_user = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phno, setPhno] = useState('');
    const [address, setAddress] = useState('');
    const [updatebtn, setupdatebtn] = useState(false);



    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id != undefined) {
            getUpdateData(params.id)
            setupdatebtn(true)
        }
    }, []);

    const getUpdateData = async (id) => {
       
        const resp = await axios.get(process.env.LOCAL_URL + '/users/' + id)
        
        setAddress(resp.data.address);
        setEmail(resp.data.email);
        setName(resp.data.name);
        setPhno(resp.data.phno);

    }

    const updateUser = async (id) => {

        if (name == '') {
            toast.error("Please fill name correctly!")
        } else if (email == '' || email.indexOf('@') === -1) {
            toast.error("Please fill email correctly!")
        } else if (phno == '' || phno.length != 10) {
            toast.error("Please fill phone no correctly!")
        } else if (address == '') {
            toast.error("Please fill address correctly!")
        } else {
            const newData = {
                id: id,
                name: name,
                email: email,
                phno: phno,
                address: address,
            }
            const resp = await axios.put(process.env.LOCAL_URL + '/users/' + id, newData);
           
            resp.status == 200 ? toast.success("User updated") : toast.error("Error!");
            setTimeout(() => navigate('/'), 3000)
        }

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        let lastId = 0;
        const getresp = await axios.get(process.env.LOCAL_URL+'/users')


        getresp.data.map((item) => {
            lastId = item.id;
        })


        if (name == '') {
            toast.error("Please fill name correctly!")
        } else if (email == '' || email.indexOf('@') === -1) {
            toast.error("Please fill email correctly!")
        } else if (phno == '' || phno.length != 10) {
            toast.error("Please fill phone no correctly!")
        } else if (address == '') {
            toast.error("Please fill address correctly!")
        } else {
            const resp = await axios.post(process.env.LOCAL_URL + '/users', {
                id: (parseInt(lastId) + 1).toString(),
                name: name,
                email: email,
                phno: phno,
                address: address,
            })
            resp.status == 201 ? toast.success("User created!", { hideProgressBar: true, closeOnClick: true, transition: Flip, }) : toast.error("User not created!", { hideProgressBar: true, closeOnClick: true, transition: Flip, })
            setAddress('');
            setEmail('');
            setName('');
            setPhno('');
            setTimeout(() => navigate('/'), 3000)
        }



    }

    return (
        <div className='container '>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                theme='colored'
            />
            <div className='row text-center mt-3'>
                <div className='col-12'>
                    <h2>Create User</h2>
                </div>
            </div>
            <div className='text-end '>
                <Button variant="success" onClick={() => navigate("/")}>Back</Button>{' '}
            </div>
            <div className='row   mt-3 p-3 rounded mb-5' style={{ border: "1px solid lightgray" }}>
                <div className='col-12'>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Phone No.</Form.Label>
                                <Form.Control type="number" name='phno' value={phno} onChange={(e) => setPhno(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                            </Form.Group>
                        </Row>





                        {updatebtn ? <Button variant="primary" onClick={() => updateUser(params.id)}>
                            Update User
                        </Button> : <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Create User
                        </Button>}
                    </Form>
                </div>
            </div>

        </div>
    );
}

export default Create_user;