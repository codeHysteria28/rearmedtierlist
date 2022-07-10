import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import moment from "moment";
import logo from '../images/R.png';


const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ marginBottom: "3rem" }}>
                <Container>
                    <Navbar.Brand href="#home">
                        <img src={logo} style={{ width: "4rem", marginRight: "1rem"}}/>
                        DayZ Rearmed Online Shop
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <small>{moment().format('MMMM Do YYYY')}</small>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;