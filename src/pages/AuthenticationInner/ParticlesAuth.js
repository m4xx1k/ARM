import React from 'react';
import withRouter from '../../Components/Common/withRouter';
import {Row, Col, Container} from 'reactstrap'
import {Link} from "react-router-dom";

const ParticlesAuth = ({ children }) => {
    return (
        <React.Fragment>
            <div className="auth-page-wrapper pt-5" style={{overflowX:'hidden'}}>
                <div className="auth-one-bg-position auth-main-bg" id="auth-particles">

                    <div className="bg-overlay"></div>
                    <Container>
						<Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={'https://via.placeholder.com/256'} alt="" height="64"/>
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-24 fw-bold">АРМ</p>
                                    <p className="mt-3 fs-15 fw-medium">Інструменти автоматизованого опрацювання
                                        даних</p>
                                </div>
                            </Col>
                        </Row>
					</Container>
						
                    {/* <div className="shape">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                        </svg>
                    </div> */}
					{/* TODO commented shape */}
                    {/* pass the children */}
                    {children}

                </div>

                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center">
                                    <p className="mb-0 text-muted">&copy; {new Date().getFullYear()} Velzon. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </React.Fragment>
    );
};

export default withRouter(ParticlesAuth);
