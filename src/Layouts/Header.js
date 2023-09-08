import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

//import Components
import LightDark from '../Components/Common/LightDark';
import {useDispatch} from "react-redux";
import {logoutUser} from "../slices/auth/login/thunk";


const Header = ({onChangeLayoutMode, layoutModeType, headerClass}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        dispatch(logoutUser())
        navigate('/login')
    }
    return (
        <React.Fragment>
            <header id="page-topbar" className={headerClass}>
                <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex">
                            <div className="navbar-brand-box horizontal-logo">
                                <Link to="/" className="logo">
                                    <img src={'https://via.placeholder.com/48x24'} alt="" width={48} height="24"/>
                                </Link>
                            </div>
                            {/*// <div className="navbar-brand-box horizontal-logo">*/}
                            {/*//     <Link to="/" className="logo logo-dark">*/}
                            {/*//         <span className="logo-sm">*/}
                            {/*//             <img src={logoSm} alt="" height="22"/>*/}
                            {/*//         </span>*/}
                            {/*        <span className="logo-lg">*/}
                            {/*            <img src={logoDark} alt="" height="17"/>*/}
                            {/*        </span>*/}
                            {/*    </Link>*/}

                            {/*    <Link to="/" className="logo logo-light">*/}
                            {/*        <span className="logo-sm">*/}
                            {/*            <img src={logoSm} alt="" height="22"/>*/}
                            {/*        </span>*/}
                            {/*        <span className="logo-lg">*/}
                            {/*            <img src={logoLight} alt="" height="17"/>*/}
                            {/*        </span>*/}
                            {/*    </Link>*/}
                            {/*</div>*/}


                        </div>
                        < div className={'d-flex'}>
                            <LightDark
                                layoutMode={layoutModeType}
                                onChangeLayoutMode={onChangeLayoutMode}
                            />
                            <div className="ms-1 header-item d-sm-flex">
                                <Link target={'_blank'} rel={'noopener noreferrer'} to={'/faq'}
                                    className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode">
                                    <i className="ri-question-fill fs-22"></i>
                                </Link>
                            </div>
                            <div className="ms-1 header-item d-sm-flex">
                                <button
                                    onClick={logout}
                                    type="button"
                                    className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode">
                                    <i className="ri-logout-box-fill fs-22"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default Header;
