import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Badge from "react-bootstrap/Badge";

const Item = (props) => {
    return (
        <Col>
            <Card style={{ width: '18rem', marginBottom: '1rem', border: "1px solid lightgrey" }}>
                <Card.Img variant="top" src={props.itemImageUrl} alt={props.itemName}/>
                <Card.Body>
                    <Card.Title>{props.itemName}</Card.Title>
                    <Badge bg="secondary" style={{ marginBottom: '1rem' }}>{props.itemCategory}</Badge>
                    <Card.Text>Slot size: <b>{props.slotSize}</b></Card.Text>
                    <Container>
                        <Row>
                            <Col><Button variant="success">Sell: ${props.sellPrice}</Button></Col>
                            <Col><Button variant="danger">Buy: ${props.buyPrice}</Button></Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default Item;