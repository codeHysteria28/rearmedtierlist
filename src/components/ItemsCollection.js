import React, {useState,useEffect} from 'react';
import Item from './Item';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';

const Items = () => {
    const [items, setItems] = useState([]);
    const [show, setShow] = useState(false);
    const [file, setFile] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    const url = "https://rearmedtierlist-node-backend.azurewebsites.net/upload_item";
    const urlGet = "https://rearmedtierlist-node-backend.azurewebsites.net/getAllItems";

    const saveImg = e => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    const getItems = () => {
        axios.get(urlGet)
        .then(res => {
            const items = res.data;
            setItems(items);
        });
    }

    const handleUpload = (e) => {
        e.preventDefault();
        const item_data = new FormData(e.target);
        const item_obj = {};

        item_data.append('item_image', file);

        item_data.forEach((val,key) => {
            item_obj[key] = val;
        });

        axios.post(url, item_obj, {headers: {"Content-type": "multipart/form-data",}}).then(res => {
            if(res.data === "success") {
                toggleShowA();
                getItems();
            }else {
                console.log('error');
            }
        });

        handleClose();
    }

    useEffect(()=> {
        getItems();
    }, []);

    return (
        <>
            <Container fluid>
                <Button variant="success" onClick={handleShow} style={{ marginBottom: "2rem" }}>Add Item</Button>
            </Container>
            {
                items.map((item, index) => {
                    return (
                        <Item key={index} 
                        itemName={item.item_name} 
                        itemImageUrl={item.item_image} 
                        itemCategory={item.item_category}
                        sellPrice={item.sell_price}
                        buyPrice={item.buy_price}
                        slotSize={item.slot_size}
                        />
                    );
                })  
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item to database</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUpload}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control type="text" placeholder="Item Name" name="item_name" required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Item Image</Form.Label>
                            <Form.Control type="file" placeholder="Item Name" onChange={saveImg} required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Slot Size</Form.Label>
                            <Form.Control type="text" placeholder="example: 3x3" name="slot_size" required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Sell Price</Form.Label>
                            <Form.Control type="text" placeholder="$100" name="sell_price" required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Buy Price</Form.Label>
                            <Form.Control type="text" name="buy_price" placeholder="$100"required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Item Category</Form.Label>
                            <Form.Select name="item_category" required>
                                <option value="Sidearms">Sidearms</option>
                                <option value="Submachines">Submachines</option>
                                <option value="Sniper Rifles">Sniper Rifles</option>
                                <option value="Shotguns">Shotguns</option>
                                <option value="Rifles">Rifles</option>
                                <option value="Light Machine Guns">Light Machine Guns</option>
                                <option value="Assault Rifles">Assault Rifles</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" type="submit">
                            Upload
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <ToastContainer position="top-end">
                <Toast style={{ margin: "13px" }} bg="success" show={showA} onClose={toggleShowA} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Success</strong>
                </Toast.Header>
                <Toast.Body>New Item added to the database!</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default Items;
