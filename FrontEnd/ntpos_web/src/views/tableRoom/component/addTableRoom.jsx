import React, { useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
} from 'mdb-react-ui-kit';
import { useTranslation } from 'react-i18next';

export default function AddTableRoom({ basicModal, setBasicModal }) {
    const { t } = useTranslation();
    const toggleShow = () => setBasicModal(!basicModal);
    return (
        <>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{t("add_table_room")}</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className='item1 row'>
                                <h6 className='col-6'>{t('room_name')}</h6>
                                <MDBInput
                                    wrapperClass='col-auto'
                                    label={t('room_name')}
                                    type='text'
                                    id='formTextExample2'
                                    aria-describedby='textExample2'
                                />
                            </div>
                            <div className='item1 row'>
                                <h6 className='col-6'>{t('area')}</h6>
                                <MDBInput
                                    wrapperClass='col-auto'
                                    label={t('area')}
                                    type='text'
                                    id='formTextExample2'
                                    aria-describedby='textExample2'
                                />
                            </div>
                            <div className='item1 row'>
                                <h6 className='col-6'>{t('numerical_order')}</h6>
                                <MDBInput
                                    wrapperClass='col-auto'
                                    label={t('numerical_order')}
                                    type='number'
                                    id='formTextExample2'
                                    aria-describedby='textExample2'
                                />
                            </div>
                            <div className='item1 row'>
                                <h6 className='col-6'>{t('seats')}</h6>
                                <MDBInput
                                    wrapperClass='col-auto'
                                    label={t('seats')}
                                    type='text'
                                    id='formTextExample2'
                                    aria-describedby='textExample2'
                                />
                            </div>
                            <div className='item1 row'>
                                <h6 className='col-6'>{t('notes')}</h6>
                                <MDBInput
                                    wrapperClass='col-auto'
                                    label={t('notes')}
                                    type='text'
                                    id='formTextExample2'
                                    aria-describedby='textExample2'
                                />
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='muted' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn className='btn-success'>{t("add")}</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}