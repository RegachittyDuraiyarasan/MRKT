import React from "react";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import '../../assets/css/navbar.css';
// import logo from '../../assets/image/Logo.svg';
import logo from '../../assets/image/Frame.svg';
// import logo from '../../assets/image/mrktlogo.svg';

export default function () {
    const scrollToContact = () => {
        const contactSection = document.getElementById("contact-us");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    }
    const scrolltoServed = () => {
        const servedSection = document.getElementById("served");
        if (servedSection) {
            servedSection.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <Navbar className="purple" variant="dark" expand="lg">
            <Container>
                <div className="nav_mobile">
                <Navbar.Brand>
                    {/* <img src={logo} alt="logo" className="navbarlogo" /> */}
                    <img src={logo} alt="logo" className="navbarlogo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="nav" />
                
                
                </div>
                <Navbar.Collapse id="nav" className="w-100">
                    <Nav className="justify-content-center montserrat1 align-items-start w-100 ps-3 ps-xl-0 ps-lg-0 ps-d-3 ps-sm-3">
                        <Nav.Link onClick={scrolltoServed} className="text-white option">Our Work</Nav.Link>
                        <Nav.Link onClick={scrollToContact} className="text-white option ms-xl-4">Pricing</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link onClick={scrollToContact}>
                            <Button className="bg-white button-book py-2 montserrat1">Book a Call</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
