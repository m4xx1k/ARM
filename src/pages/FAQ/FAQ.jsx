import React, {useEffect, useState} from "react";
import {Card, Col, Collapse, Container, Row} from "reactstrap";
import api from "../../api";
import {GET_ALL_FAQ} from "../../helpers/url_helper";
import classnames from "classnames";
import Header from "../../Layouts/Header";
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {
    changeLayout,
    changeLayoutMode, changeLayoutPosition, changeLayoutWidth,
    changeLeftsidebarSizeType,
    changeLeftsidebarViewType, changeSidebarImageType,
    changeSidebarTheme, changeSidebarVisibility, changeTopbarTheme
} from "../../slices/layouts/thunk";


const DashboardEcommerce = () => {
    const [headerClass, setHeaderClass] = useState("");
    const dispatch = useDispatch();

    const selectLayoutState = (state) => state.Layout;
    const selectLayoutProperties = createSelector(
        selectLayoutState,
        (layout) => ({
            layoutType: layout.layoutType,
            leftSidebarType: layout.leftSidebarType,
            layoutModeType: layout.layoutModeType,
            layoutWidthType: layout.layoutWidthType,
            layoutPositionType: layout.layoutPositionType,
            topbarThemeType: layout.topbarThemeType,
            leftsidbarSizeType: layout.leftsidbarSizeType,
            leftSidebarViewType: layout.leftSidebarViewType,
            leftSidebarImageType: layout.leftSidebarImageType,
            preloader: layout.preloader,
            sidebarVisibilitytype: layout.sidebarVisibilitytype,
        })
    );
    // Inside your component
    const {
        layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftsidbarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
        preloader,
        sidebarVisibilitytype
    } = useSelector(selectLayoutProperties);

    useEffect(() => {
        if (
            layoutType ||
            leftSidebarType ||
            layoutModeType ||
            layoutWidthType ||
            layoutPositionType ||
            topbarThemeType ||
            leftsidbarSizeType ||
            leftSidebarViewType ||
            leftSidebarImageType ||
            sidebarVisibilitytype
        ) {
            window.dispatchEvent(new Event('resize'));
            dispatch(changeLeftsidebarViewType(leftSidebarViewType));
            dispatch(changeLeftsidebarSizeType(leftsidbarSizeType));
            dispatch(changeSidebarTheme(leftSidebarType));
            dispatch(changeLayoutMode(layoutModeType));
            dispatch(changeLayoutWidth(layoutWidthType));
            dispatch(changeLayoutPosition(layoutPositionType));
            dispatch(changeTopbarTheme(topbarThemeType));
            dispatch(changeLayout(layoutType));
            dispatch(changeSidebarImageType(leftSidebarImageType));
            dispatch(changeSidebarVisibility(sidebarVisibilitytype));
        }
    }, [layoutType,
        leftSidebarType,
        layoutModeType,
        layoutWidthType,
        layoutPositionType,
        topbarThemeType,
        leftsidbarSizeType,
        leftSidebarViewType,
        leftSidebarImageType,
        sidebarVisibilitytype,
        dispatch]);

    const onChangeLayoutMode = (value) => {
        if (changeLayoutMode) {
            dispatch(changeLayoutMode(value));
        }
    };

    // class add remove in header
    useEffect(() => {
        window.addEventListener("scroll", scrollNavigation, true);
    });

    function scrollNavigation() {
        let scrollup = document.documentElement.scrollTop;
        if (scrollup > 50) {
            setHeaderClass("topbar-shadow");
        } else {
            setHeaderClass("");
        }
    }


    const [faq, setFaq] = useState(null)
    const [openFaq, setOpenFaq] = useState(null)
    const toggleFaq = id => {
        if (id === openFaq) setOpenFaq(null)
        else setOpenFaq(id)
    }
    document.title = "FAQ";
    useEffect(() => {
        const getData = async () => {
            const {data: faq} = await api.get(GET_ALL_FAQ)
            console.log({faq})
            setFaq(faq)
        }
        getData()

    }, [])

    return (
        <React.Fragment>
            <Header
                headerClass={headerClass}
                layoutModeType={layoutModeType}
                onChangeLayoutMode={onChangeLayoutMode}/>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <h1>Часті Запитання</h1>
                            <Row className="justify-content-evenly mb-4">
                                {
                                    faq && faq.map(section =>
                                        <Col lg={4}>
                                            <div className="mt-3">
                                                <div className="d-flex align-items-center mb-2">
                                                    <div className="flex-shrink-0 me-1">
                                                        <i className="ri-user-settings-line fs-24 align-middle text-success me-1"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h5 className="fs-16 mb-0 fw-semibold">{section.nameFAQ}</h5>
                                                    </div>
                                                </div>

                                                <div className="accordion accordion-border-box"
                                                     id="manageaccount-accordion">
                                                    {
                                                        section.infoquestionstfaq_set.map(set =>
                                                            <div key={set.id} className="accordion-item">
                                                                <h2 className="accordion-header"
                                                                    id="manageaccount-headingOne">
                                                                    <button
                                                                        className={classnames(
                                                                            "accordion-button",
                                                                            "fw-medium",
                                                                            {collapsed: set.id !== openFaq}
                                                                        )}
                                                                        type="button"
                                                                        onClick={() => toggleFaq(set.id)}
                                                                        style={{cursor: "pointer"}}
                                                                    >
                                                                        {set.question}
                                                                    </button>
                                                                </h2>
                                                                <Collapse isOpen={set.id === openFaq}
                                                                          className="accordion-collapse">
                                                                    <div className="accordion-body">
                                                                        {set.answer}
                                                                    </div>
                                                                </Collapse>
                                                            </div>)
                                                    }

                                                </div>
                                            </div>
                                        </Col>
                                    )
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>

    );
};

export default DashboardEcommerce;
// <section key={section.id}>
//     <h3 style={{fontWeight:700}}>{section.nameFAQ}</h3>
//     <ul style={{paddingLeft:32}}>
//         {
//             section.infoquestionstfaq_set.map(set=>
//                 <li key={set.id}>
//                     <div style={{fontWeight:600}}>{set.question}</div>
//                     <div>
//                         {set.answer}
//                     </div>
//                 </li>
//             )
//         }
//
//     </ul>
// </section>