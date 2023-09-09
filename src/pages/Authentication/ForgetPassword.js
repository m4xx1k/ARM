import PropTypes from "prop-types";
import React from "react";
import { Row, Col, Alert, Card, CardBody, Container, FormFeedback, Input, Label, Form } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { userForgetPassword } from "../../slices/thunks";

// import images
// import profile from "../../assets/images/bg.png";
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";

const ForgetPasswordPage = props => {
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Будь ласка введіть пошту"),
    }),
    onSubmit: (values) => {
      dispatch(userForgetPassword(values.email, props.history));
    }
  });


  const selectLayoutState = (state) => state.ForgetPassword;
  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (state) => ({
      forgetError: state.forgetError,
      forgetSuccessMsg: state.forgetSuccessMsg,
    })
  );
  // Inside your component
  const {
    forgetError, forgetSuccessMsg
  } = useSelector(selectLayoutProperties);

  document.title = "Reset Password | Velzon - React Admin & Dashboard Template";
  return (
    <ParticlesAuth>
      <div className="auth-page-content mt-lg-1">

        <Container>



          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">

                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Забули пароль?</h5>
                    <p className="text-muted"></p>
{/*
                    <lord-icon
                      src="https://cdn.lordicon.com/rhvddzym.json"
                      trigger="loop"
                      colors="primary:#0ab39c"
                      className="avatar-xl"
                      style={{ width: "120px", height: "120px" }}
                    >
                    </lord-icon> */}

                  </div>
                  {
                    !forgetError && !forgetSuccessMsg ?
                        <Alert className="border-0 alert-warning text-center mb-2 mx-2" role="alert">
                          Ми надішлем новий пароль на вашу пошту!
                        </Alert>
                        : null
                  }

                  <div className="p-2">
                    {forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null}
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-4">
                        <Label className="form-label">Пошта</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Введіть вашу пошту"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            !!(validation.touched.email && validation.errors.email)
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid"><div>{validation.errors.email}</div></FormFeedback>
                        ) : null}
                      </div>

                      <div className="text-center mt-4">
                        <button className="btn btn-success w-100" type="submit">Надіслати</button>
                      </div>
                    </Form>

                  </div>
                  <div className="mt-1 text-center">
                    <p className="mb-0">
                      <Link  to={'/faq'} target={'_blank'} rel={'noopener noreferrer'}
                         className="fw-semibold text-primary text-decoration-underline">
                        Потрібна допомога у відновленні
                      </Link>
                    </p>
                  </div>
                </CardBody>
              </Card>

              {/*<div className="mt-4 text-center">*/}
              {/*  <p className="mb-0">Wait, I remember my password... <Link to="/login" className="fw-semibold text-primary text-decoration-underline"> Click here </Link> </p>*/}
              {/*</div>*/}

            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
