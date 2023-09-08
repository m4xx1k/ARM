import React, {useEffect, useState} from 'react';
import {
    Card,
    CardBody,
    Col,
    Container,
    Input,
    Label,
    Row,
    Button,
    Form,
    FormFeedback,
    Alert,
    Spinner
} from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//redux
import {useSelector, useDispatch} from "react-redux";

import {Link} from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
// Formik validation
import * as Yup from "yup";
import {useFormik} from "formik";

// actions
import {loginUser, socialLogin, resetLoginFlag} from "../../slices/thunks";

import logoLight from "../../assets/images/logo-light.png";
import {createSelector} from 'reselect';
//import images

const Login = (props) => {
    const dispatch = useDispatch();

    const selectLayoutState = (state) => state;
    const loginpageData = createSelector(
        selectLayoutState,
        (state) => ({
            user: state.Account.user,
            error: state.Login.error,
            loading: state.Login.loading,
            errorMsg: state.Login.errorMsg,
        })
    );
    // Inside your component
    const {
        user, error, loading, errorMsg
    } = useSelector(loginpageData);

    const [userLogin, setUserLogin] = useState([]);
    const [passwordShow, setPasswordShow] = useState(false);


    useEffect(() => {
        if (user && user) {
            const updatedUserData = process.env.REACT_APP_DEFAULTAUTH === "firebase" ? user.multiFactor.user.email : user.email;
            const updatedUserPassword = process.env.REACT_APP_DEFAULTAUTH === "firebase" ? "" : user.confirm_password;
            setUserLogin({
                email: updatedUserData,
                password: updatedUserPassword
            });
        }
    }, [user]);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: userLogin.username || '',
            password: userLogin.password || '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Поле не може бути пустим!"),
            password: Yup.string().required("Поле не може бути пустим!"),
        }),
        onSubmit: (values) => {
            dispatch(loginUser({username: values.email, password: values.password}, props.router.navigate));
        }
    });


    useEffect(() => {
        if (errorMsg) {
            setTimeout(() => {
                dispatch(resetLoginFlag());
            }, 3000);
        }
    }, [dispatch, errorMsg]);
    document.title = "Вхід";
    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content mt-lg-1">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <CardBody className="p-4">

                                        {error && error ? (<Alert color="danger"> {error} </Alert>) : null}
                                        <div className="p-2 mt-4">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                action="#">

                                                <div className="mb-3">
                                                    <Label htmlFor="email" className="form-label">Електронна
                                                        пошта</Label>
                                                    <Input
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Введіть логін або електронну пошту..."
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.email || ""}
                                                        invalid={
                                                            !!(validation.touched.email && validation.errors.email)
                                                        }
                                                    />
                                                    {validation.touched.email && validation.errors.email ? (
                                                        <FormFeedback
                                                            type="invalid">{validation.errors.email}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <Link to="/forgot-password" className="text-muted">Забули
                                                            пароль?</Link>
                                                    </div>
                                                    <Label className="form-label"
                                                           htmlFor="password-input">Пароль</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="password"
                                                            value={validation.values.password || ""}
                                                            type={passwordShow ? "text" : "password"}
                                                            className="form-control pe-5"
                                                            placeholder="Введіть пароль"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={
                                                                !!(validation.touched.password && validation.errors.password)
                                                            }
                                                        />
                                                        {validation.touched.password && validation.errors.password ? (
                                                            <FormFeedback
                                                                type="invalid">{validation.errors.password}</FormFeedback>
                                                        ) : null}
                                                        <button
                                                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                                            type="button" id="password-addon"
                                                            onClick={() => setPasswordShow(!passwordShow)}><i
                                                            className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>


                                                <div className="mt-4">
                                                    <Button color="success"
                                                            disabled={error ? null : !!loading}
                                                            className="btn btn-success w-100" type="submit">
                                                        {loading ? <Spinner size="sm"
                                                                            className='me-2'> Загрузка... </Spinner> : null}
                                                        Вхід
                                                    </Button>
                                                </div>

                                            </Form>
                                        </div>
                                        <div className="mt-1 text-center">
                                            <p className="mb-0">
                                                <Link to="/faq"
                                                      className="fw-semibold text-primary text-decoration-underline">
                                                    Я не маю акаунту. Як отримати доступ?
                                                </Link>
                                            </p>
                                        </div>
                                    </CardBody>
                                </Card>


                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);
