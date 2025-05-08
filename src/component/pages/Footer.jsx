import React from "react";
import "../../assets/css/app.css";

const Footer = () => {
    return (
        <div className="purple footer-text">
            <div className="container">
                <div className="row pt-3">
                    <div className="col-lg-6 col-sm-12 text-lg-start text-center">
                        <p className="text-white font-14">
                            © 2022 Embrace, Inc. - All Rights Reserved
                        </p>
                    </div>
                    <div className="col-lg-6 col-sm-12 text-lg-end text-center">
                        <p className="text-white font-14 privacy">
                            Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
