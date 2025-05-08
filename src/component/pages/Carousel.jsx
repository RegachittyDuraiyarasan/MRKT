import React, { useState } from "react";
// import "../../../css/carousel.css";
import "../../assets/css/carousel.css";
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';
// import { BASE_URL } from "../../main.jsx";
import emailjs from 'emailjs-com';

const Carousel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Overseas Education");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        category: "Overseas Education",
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const options = ["Overseas Education", "EdTech", "IT"];

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSelect = (value) => {
        setSelectedValue(value);
        setFormData({ ...formData, category: value });
        setIsOpen(false);
        setErrors({ ...errors, category: undefined });
    };

    const cardData = [
        { title: "Overseas Education", googleAds: "3X On Google Ads", metaAds: "2X On Meta Ads" },
        { title: "EdTech", googleAds: "4X On Google Ads", metaAds: "3X On Meta Ads" },
        { title: "IT", googleAds: "5X On Google Ads", metaAds: "3X On Meta Ads" },
    ];

    const handleShowModal = (category) => {
        setShowModal(true);
        setFormData({ ...formData, category });
        setSelectedValue(category);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        validateField(id, value);
    };
    const validateField = () => {
        let newErrors = {}; // Ensure this is always an object
    
        // Check name
        if (!/^[A-Za-z\s]{2,50}$/.test(formData.name)) {
            newErrors.name = "Name must be alphabetic and 2-50 characters long";
        }
    
        // Check phone
        if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid 10-digit phone number";
        }
    
        // Check email
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }
    
        // Return the errors object
        return newErrors;
    };
    
    // const validateField = (id, value) => {
    //     let newErrors = { ...errors };
    //     if (id === "name" && !/^[A-Za-z\s]{2,50}$/.test(value)) {
    //         newErrors.name = "Name must be alphabetic and 2-50 characters long";
    //     } else if (id === "phone" && !/^\d{10}$/.test(value)) {
    //         newErrors.phone = "Enter a valid 10-digit phone number";
    //     } else if (id === "email" && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
    //         newErrors.email = "Enter a valid email address";
    //     } else {
    //         delete newErrors[id];
    //     }
    //     setErrors(newErrors);
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // if (Object.keys(validateForm()).length === 0) {

    //         console.log(formData);
            
    //         axios.post(`${BASE_URL}/api/case-send`, formData)
    //             .then(() => {
    //                 setFormData({ name: "", email: "", phone: "", category: "Overseas Education" });
    //                 setSelectedValue("Overseas Education");
    //                 setSuccessMessage("Email sent successfully!");
    //                 setShowModal(false);
    //                 setTimeout(() => setSuccessMessage(""), 3000);
    //             })
    //             .catch(console.log);
    //     // }
    // };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateField();  // Now it will always return an object
        if (Object.keys(formErrors).length === 0) {
            console.log("Form data:", formData);
            emailjs.send('service_3es2nri', 'template_xyl1q2u', formData, 'AxPEDzi2p4r5m8k7h')
                .then((response) => {
                    console.log('Email sent:', response.status, response.text);
                }, (error) => {
                    console.error('Error sending email:', error);
                });
    
            alert("Form submitted successfully!");
            setFormData({
                name: "",
                phone: "",
                email: "",
                category: "",
            });
        } else {
            setErrors(formErrors);
        }
    };
    
    return (
        <div className="card-section">
        <div className="container ">
            <h6 className="display-4 heading2 fw-bold text-black mt-xl-5 mt-lg-5 mt-md-5 mt-sm-0 mt-1  text-center">
                Our Returns On Investment For Different Clients
            </h6>
            <div className="row mt-5 mb-5 mx-xl-0 mx-lg-0 mx-md-0 mx-sm-0 mx-3">
                {cardData.map((card, index) => (
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title fw-bold ps-2">{card.title}</h6>
                                <p className="card-text fw-semibold">{card.googleAds}</p>
                                <p className="card-text  fw-semibold">{card.metaAds}</p>
                                <Button
                                    className="case-btn"
                                    onClick={() => handleShowModal(card.title)}
                                >
                                    Get Case Study
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {successMessage && (
                <div className="alert alert-success mt-4" role="alert">
                    {successMessage}
                </div>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Request Case Study</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Category</Form.Label>
                            <div className="custom-dropdown">
                                <div
                                    className="selected"
                                    onClick={handleToggle}
                                >
                                    {selectedValue}
                                </div>
                                {isOpen && (
                                    <div className="options">
                                        {options.map((types) => (
                                            <div
                                                key={types}
                                                className="types"
                                                onClick={() => handleSelect(types)}
                                            >
                                                {types}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {errors.category && <small className="text-danger">{errors.category}</small>}
                        </Form.Group>
                        <Button
                            type="submit"
                            style={{
                                backgroundColor: "#44086D",
                                padding: "10px",
                                borderRadius: "20px",
                                width: "100%",
                                borderColor: "white",
                            }}
                        >
                            Request
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
        </div>
    );
};

export default Carousel;
