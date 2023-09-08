import React from 'react';
import {Col, Container, Row} from 'reactstrap';

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer">
                <Container fluid>
                    <Row>
                        <Col sm={6}>
                            {new Date().getFullYear()} © <a style={{textDecoration: 'underline'}}
                                                            href="https://t.me/maxx1k">m4xx1k</a>.
                        </Col>
                        <Col sm={6}>
                            <div className="text-sm-end d-none d-sm-block">

                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
