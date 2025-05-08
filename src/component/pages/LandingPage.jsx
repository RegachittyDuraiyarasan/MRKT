import React, { useState, useRef } from "react";
import axios from "axios";
import Navbar from "../../component/pages/Navbar.jsx";
// import "../../../css/landingpage.css";
import "../../assets/css/landingpage.css";
import cardimg1 from "../../assets/image/3.svg";
import cardimg2 from "../../assets/image/group1.svg";
import cardimg3 from "../../assets/image/group1 (1).svg";
import bannerimg from "../../assets/image/1st 1.svg";
import Carousel from "./Carousel.jsx";
import Footer from "./Footer.jsx";
// import { BASE_URL } from "../../main.jsx";
import emailjs from 'emailjs-com';


const LandingPage = () => {
    const [formData, setFormData] = useState({
         name: "",
         phone: "", 
         email: "", 
         message: "" 
    });
    const [errors, setErrors] = useState({});
    const contactUsRef = useRef(null);
 
   
    const scrollToContactUs = () => {
        contactUsRef.current.scrollIntoView({ behavior: "smooth" });
    };
    // // Handler for input changes with live validation
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });

        let newErrors = { ...errors };
        if (id === "name") {
            if (!/^[A-Za-z\s]{2,50}$/.test(value)) {
                newErrors.name =
                    "Name must be alphabetic and 2-50 characters long";
            } else {
                delete newErrors.name;
            }
        }
        if (id === "phone") {
            if (!/^\d{10}$/.test(value)) {
                newErrors.phone = "Enter a valid 10-digit phone number";
            } else {
                delete newErrors.phone;
            }
        }
        if (id === "email") {
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                newErrors.email = "Enter a valid email address";
            } else {
                delete newErrors.email;
            }
        }
        if (id === "message") {
            if (value.trim().length < 10) {
                // Minimum 10 characters
                newErrors.message =
                    "Message must be at least 10 characters long";
            } else {
                delete newErrors.message;
            }
        }
        setErrors(newErrors);
    };

    // Form submission handler with email API integration
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // Only submit if no errors
    //     if (
    //         Object.keys(errors).length === 0 &&
    //         formData.name &&
    //         formData.phone &&
    //         formData.email &&
    //         formData.message
    //     ) {
    //         const data = {
    //             name: formData.name,
    //             phone: formData.phone,
    //             email: formData.email,
    //             message: formData.message,
    //         };

    //         console.log("data : ", data);

      

    //         axios
    //             .post(BASE_URL + "/api/mail-send", data)
    //             .then((response) => {
    //                 console.log(response);
    //                 setFormData({
    //                     name: "",
    //                     phone: "",
    //                     email: "",
    //                     message: "",
    //                 }); 
    //                 setSuccessMessage("Email sent successfully!");
    //             })
    //             .catch((error) => {
    //                 console.log(error); 
    //             });
    //     } else {
    //         validate();
    //     }
    // };
    // Initial validation before submission
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const formErrors = validate();
    //     if (Object.keys(formErrors).length === 0) {
    //         console.log("Form data:", formData);
    //         emailjs.send('service_mc0mtna', 'template_qz8fftx', formData, 'AxPEDzi2p4r5m8k7h')
    //             .then((response) => {
    //                 console.log('Email sent:', response.status, response.text);
    //                 setSuccessMessage("Form sent successfully!");
    //                 setFormData({ name: "", phone: "", email: "", message: "" });
    //             })
    //             .catch((error) => {
    //                 console.error('Error sending email:', error);  
    //                 console.log('Error details:', error.response || error.message);
    //                 alert('Failed to send email. Please try again later.');
    //             });
                
    //     } else {
    //         setErrors(formErrors);
    //         alert("Please fill all fields correctly.");
    //     }
    // };
    
    // const validate = () => {
    //     let tempErrors = {};
    //     if (!formData.name || !/^[A-Za-z\s]{2,50}$/.test(formData.name)) {
    //         tempErrors.name = "Name must be alphabetic and 2-50 characters long";
    //     }
    //     if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
    //         tempErrors.phone = "Enter a valid 10-digit phone number";
    //     }
    //     if (!formData.email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
    //         tempErrors.email = "Enter a valid email address";
    //     }
    //     if (!formData.message || formData.message.trim().length < 10) {
    //         tempErrors.message = "Message must be at least 10 characters long";
    //     }
    //     setErrors(tempErrors);
    //     return tempErrors; 
    // };
    
    // const validate = () => {
    //     let tempErrors = {};
    //     if (!formData.name || !/^[A-Za-z\s]{2,50}$/.test(formData.name)) {
    //         tempErrors.name =
    //             "Name must be alphabetic and 2-50 characters long";
    //     }
    //     if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
    //         tempErrors.phone = "Enter a valid 10-digit phone number";
    //     }
    //     if (
    //         !formData.email ||
    //         !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
    //     ) {
    //         tempErrors.email = "Enter a valid email address";
    //     }
    //     if (!formData.message || formData.message.trim().length < 10) {
    //         tempErrors.message = "Message must be at least 10 characters long";
    //     }
    //     setErrors(tempErrors);
    // };
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //       ...formData,
    //       [name]: value,
    //     });
    //     setErrors({
    //       ...errors,
    //       [name]: "",
    //     });
    //   };

    const validateForm = () => {
        let formErrors = {};
      
        if (!formData.name) {
            formErrors.name = "Name is required";
        } else if (!/^[a-zA-z\s.]+$/.test(formData.name)) {
            formErrors.name = "Name is invalid";
        }    
        if (!formData.phone) {
          formErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone) || /^0{10}$/.test(formData.phone)|| (!/^\d+$/.test(formData.phone)) ) {
          formErrors.phone = "Phone number is invalid";
        }
    
        if (!formData.email) {
          formErrors.email = "Email is required";
        } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(formData.email)) {
          formErrors.email = "Email address is invalid";
        }
        if (!formData.message) formErrors.message = "message is required";
        return formErrors;
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
          console.log("Form data:", formData);
        emailjs.send('service_3es2nri', 'template_qz8fftx', formData, 'AxPEDzi2p4r5m8k7h')
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
            message: "",
          });
        
        } else {
          setErrors(formErrors);
        }
      };
    
    return (
        <>
            <section className="hidden">
                <Navbar />
                <div className="banner">
                    <div className="container">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 ps-2">
                        <img
                            src={bannerimg}
                            alt="banner-img"
                            className="img-fluid banner-imgs"
                            onClick={scrollToContactUs} // Add click event here
                            style={{ cursor: "pointer" }} // Change cursor to pointer to indicate it's clickable
                        />
                    </div>
                </div>
                </div>

                <div className="content-section">
                <div className="container">
                    <div className="row mt-xl-5 mt-lg-5 mt-md-5 mt-sm-0 mt-1">
                        <div className="col-lg-7 col-md-12 col-sm-12">
                            <h1 className="fw-bold display-1 head-con-1 montserrat2 black-color">
                                Changing Names Into Brands.
                            </h1>
                            <p className="banner-content2 sub-para-color font-30 montserrat2">
                                We change your business into a recognizable
                                brand.
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-0 col-sm-0 col-0"></div>
                    </div>
                </div>
                </div>
                <div className="service-section">
                <div className="container" id="served">
                    <h4 className="display-4 fw-bolder black-color text-center mt-xl-5 mt-lg-5 mt-md-5 mt-sm-0 mt-1">
                        Industries Served
                    </h4>
                    <div className="card-align mt-5 pt-3">
                        <div className="row mx-xl-0 mx-lg-0 mx-md-0 mx-sm-0 mx-3">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                <img
                                    src={cardimg1}
                                    alt="cardimg1"
                                    className="img-fluid img-align"
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                <img
                                    src={cardimg2}
                                    alt="cardimg2"
                                    className="img-fluid img-align"
                                />
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                <img
                                    src={cardimg3}
                                    alt="cardimg"
                                    className="img-fluid img-align"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <Carousel />
                <div className="contact-section">
                <div className="container " ref={contactUsRef}>
                    <div className="row  mx-xl-0 mx-lg-0 mx-md-0 mx-sm-0 mx-3 ">
                        <div className="col-lg-6 col-md-12 col-sm-12 col-12 contact pr-5" >
                            <div className="from-border px-3 py-3 mb-5 me-xl-4 me-lg-4  me-md-4 me-sm-0 me-0 ">
                                <h4 className="text-center display-6 fw-semibold pb-4 title-contact">
                                    Enquire Now
                                </h4>
                             
                               
                                <form onSubmit={handleSubmit} id="contact-us">
                                    <div className="mb-3">
                                        <label className="form-label text-black">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control input-custom-width "
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                       {errors.name && (
                                         <p className="error-message-font-roboto text-danger">{errors.name}</p>
                                          )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label text-black">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="form-control input-custom-width "
                                            placeholder="Enter your phone number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                        {/* {errors.phone && (
                                            <small className="text-danger">
                                                {errors.phone}
                                            </small>
                                        )} */}
                                          {errors.phone && (
                                             <p className="error-message-font-roboto text-danger">{errors.phone}</p>
                                         )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label text-black">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control input-custom-width "
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        {/* {errors.email && (
                                            <small className="text-danger">
                                                {errors.email}
                                            </small>
                                        )} */}
                                          {errors.email && (
                                             <p className="error-message-font-roboto text-danger">{errors.email}</p>
                                         )}
                                    </div>

                                    {/* New Message Field */}
                                    <div className="mb-3">
                                        <label className="form-label text-black">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            className="form-control input-custom-width "
                                            placeholder="Enter your message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                        {/* {errors.message && (
                                            <small className="text-danger">
                                                {errors.message}
                                            </small>
                                        )} */}
                                         {errors.message && (
                                             <p className="error-message-font-roboto text-danger">{errors.message}</p>
                                         )}
                                    </div>

                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-primary send-bton text-bold"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 pl-5 sm-p-3">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d257824.9918058415!2d76.802422260794!3d11.013924447326762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e1!3m2!1sen!2sin!4v1731401389614!5m2!1sen!2sin"
                                title="Coimbatore"
                                aria-label="Coimbatore"
                                width="100%"
                                frameBorder="0"
                                className="map"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
                </div>
                <Footer/>
            </section>
        </>
    );
};

export default LandingPage;
