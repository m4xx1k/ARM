import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {closeInfoModal} from "../../../slices/auth/login/reducer";
import {Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {getEULA, getFakeEULA, getLocalEULA} from "../../../helpers/fakebackend_helper";
import Loader from '../../Common/Loader'
import axios from 'axios';
import {GET_ALL_EULA} from "../../../helpers/url_helper";
import api from "../../../api";

const ModalEula = () => {
    const dispatch = useDispatch()
    const showModal = useSelector(state => state.Login.showInfoModal)
    const [eula, setEula] = useState(null)
    const [showCloseButton, setShowCloseButton] = useState(false)
    const handleClose = () => {
        dispatch(closeInfoModal())
    }
    useEffect(() => {
        const getData = async () => {
            try {
                const {data} = await api.get(GET_ALL_EULA)
                setEula(data)
            } catch (e) {
                console.log(e)
            }
            setTimeout(() => setShowCloseButton(true), 10000)
        }
        getData()
    }, [])

    return (
        <Modal isOpen={showModal} scrollable={true} size={'lg'}>
            {/*<ModalHeader>"Пам'ятка користувачу</ModalHeader>*/}
            {
                eula ?
                    <React.Fragment>
                        <ModalBody>

                            {
                                eula.map(item => (
                                    <React.Fragment key={item.content}>
                                        {item.is_worning_type ?
                                            <Alert color="warning">
                                                <h3><strong>{item.content}</strong></h3>
                                                <ul>
                                                    {
                                                        item.infoitem_set.map(item => (
                                                            <li style={{color: '#000', fontWeight: 500}}
                                                                key={item.content} className={'m-1'}>
                                                                <p>{item.content}</p>
                                                            </li>
                                                        ))

                                                    }

                                                </ul>
                                            </Alert>
                                            : <div>
                                                <h3><strong>{item.content}</strong></h3>
                                                <ul>
                                                    {
                                                        item.infoitem_set.map(item => (
                                                            <li key={item.content} className={'m-1'}>
                                                                <p>{item.content}</p>
                                                            </li>
                                                        ))

                                                    }

                                                </ul>
                                            </div>
                                        }
                                    </React.Fragment>

                                ))
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button disabled={!showCloseButton} color="secondary"
                                    onClick={handleClose}>Зрозуміло</Button>
                        </ModalFooter>
                    </React.Fragment>
                    : <Loader/>
            }

        </Modal>
    );
};

export default ModalEula;
