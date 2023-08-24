import React, { useEffect, useState,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import '../../assets/style/client.scss';
import AddClient from './component/addClient';
import { MDBBtn,
    MDBDatatable,
    MDBIcon,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBAlert
} from 'mdb-react-ui-kit';
import {
    deleteClientNull,
    deleteClientRequest, detailClientRequest,
    fetchUsersRequest,
} from '../../store/client/clientSlice';
import { RootState } from '../../app/store';
import EditClient from "./component/editClient";
export default function ClientPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const toast = useRef(null);
    const [topRightModal, setTopRightModal] = useState(false);
    const [idUser, setIdUser] = useState('');
    const toggleShow = () => setTopRightModal(!topRightModal);
    const loading = useSelector((state: RootState) => state.client.users.loading);
    const error = useSelector((state: RootState) => state.client.users.error);
    const users = useSelector((state: RootState) => state.client.users.users);
    const deleteSuccess = useSelector((state:RootState) => state.client.users.deleteSuccess);
    const [basicModal, setBasicModal] = useState(false);
    const [editBasicModal, setEditBasicModal] = useState(false);

    const clickableData = {
        columns: [
            { label: 'Stt', field: 'stt' },
            { label: 'Username', field: 'username' },
            { label: 'Name', field: 'name' },
            { label: 'Email', field: 'email' },
            { label: 'PhoneNumber', field: 'phoneNumber' },
            { label: 'Address', field: 'address' },
            { label: 'Action', field: 'action', sort: false },
        ],
        rows: users.map((user, index) => ({
            stt: index + 1,
            username: user.username,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            action:(
        <>
            <MDBBtn outline size='sm' floating className='delete-button' style={{color:'red', borderColor:'red'}} onClick={() => {
              setIdUser(user.id);
              toggleShow();
             }
            }>
                <MDBIcon icon='trash-alt' />
            </MDBBtn>
            <span style={{marginLeft:8}}></span>
            <MDBBtn outline size='sm' floating className='edit-button'  onClick={() => {
                dispatch(detailClientRequest(user.id));
                setTimeout(()=>{
                setEditBasicModal(!editBasicModal);
                },800);
            }
            }>
                <MDBIcon icon='edit' />
            </MDBBtn>
        </>
    ),
        })),
    };
    useEffect(() => {
        dispatch(fetchUsersRequest());
    }, []);
    const handleReloadData = () => {
        dispatch(fetchUsersRequest());
    };
    return (
        <>
            <div className='client-page row'>
                <div className="right">
                    <div className="top">
                        <h4 className="title">{t("client")}</h4>
                        <div className="groupBtn">
                            <MDBBtn className='btn-inventory' color='success' onClick={() => { setBasicModal(!basicModal) }}>
                                <>
                                    <MDBIcon fas icon="add" />
                                    <span>{t("client")}</span>
                                </>
                            </MDBBtn>
                            <MDBBtn className='btn-import' color='success'>
                                <>
                                    <MDBIcon fas icon="file-import" />
                                    <span>{t("import_file")}</span>
                                </>
                            </MDBBtn>
                            <MDBBtn className='btn-export' color='success'>
                                <>
                                    <MDBIcon fas icon="file-export" />
                                    <span>{t("export_file")}</span>
                                </>
                            </MDBBtn>
                            <MDBBtn className='' onClick={() => handleReloadData()} color='success'>
                                {t("reload_data")}
                                <MDBIcon icon='sync' className='ms-2' />
                            </MDBBtn>
                        </div>
                    </div>
                    <div className="center content">
                        {
                            loading ? <h6>Loading ...</h6> :
                                <MDBDatatable
                                    advancedSearch={(value: string) => {
                                        const string = value.split(' in:').map((str: string) => str.trim());
                                        const phrase = string[0];
                                        let columns: string | string[] = string[1];

                                        if (columns) {
                                            columns = columns.split(',').map((str: string) => str.toLowerCase().trim());
                                        }
                                        return { phrase, columns };
                                    }}
                                    placeholder="Demo"
                                    maxHeight='470px'
                                    maxWidth='98%'
                                    selectable
                                    hover
                                    advancedData={true}
                                    data={clickableData} >
                                </MDBDatatable>
                        }
                    </div>
                </div>
                {basicModal && <AddClient basicModal={basicModal} setBasicModal={setBasicModal}  onLoad={()=>{dispatch(fetchUsersRequest())}} />}
                {editBasicModal && <EditClient basicModal={editBasicModal} setBasicModal={setEditBasicModal}  onLoad={()=>{dispatch(fetchUsersRequest())}} />}
                <MDBModal
                    animationDirection='right'
                    show={topRightModal}
                    tabIndex='-1'
                    setShow={setTopRightModal}
                >
                    <MDBModalDialog position='bottom-right' side>
                        <MDBModalContent>
                            <MDBModalHeader className='text-white' style={{backgroundColor:'#0D9949'}}>
                                <MDBModalTitle>{t("notification")}</MDBModalTitle>
                                <MDBBtn
                                    color='none'
                                    className='btn-close btn-close-white'
                                    onClick={toggleShow}
                                ></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <div className='row'>
                                    <div className='col-3 text-center'>
                                        <i className= 'fa-solid fa-trash fa-4x' style={{color:'#0D9949'}}></i>
                                    </div>
                                    <div className='col-9' style={{justifyContent:'center'}}>
                                        <p>{t("Do you want to delete this user?")}</p>
                                    </div>
                                </div>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn style={{backgroundColor:'#0D9949'}} onClick={()=>{
                                    dispatch(deleteClientRequest(idUser));
                                    if(deleteSuccess === true){
                                        setTimeout(() => {
                                            deleteClientNull();
                                            handleReloadData();
                                        }, 2000);
                                    }
                                }
                                } ref={toast} >{t("delete")}</MDBBtn>
                                <MDBBtn outline style={{color:'#0D9949',borderColor:'#0D9949'}} onClick={toggleShow}>
                                    {t("close")}
                                </MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
                <MDBAlert color='success'
                          autohide
                          width={800}
                          position='top-right'
                          offset={50}
                          delay={2000}
                          appendToBody
                          triggerRef={toast}
                >
                    {deleteSuccess ? t(" Delete successfully") : t(" Deletion failed")}
                </MDBAlert>
            </div>
        </>

    );
}
