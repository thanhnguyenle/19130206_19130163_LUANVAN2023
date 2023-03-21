import React, {useEffect, useRef, useState} from 'react';
import {
    MDBBtn, MDBCheckbox, MDBCol, MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle, MDBRow
} from "mdb-react-ui-kit";


export default function ModalLogin() {
    const [modalLogin, setModalLogin] = useState(false);
    const [modalForgotpassword, setModalForgotpassword] = useState(false);
    const [modalNewPassword, setModalNewPassword] = useState(false);
    const toggleShowLogin = () => setModalLogin(!modalLogin);
    const toggleShowForgotpassword = () => {
        setModalLogin(!modalLogin)
        setModalForgotpassword(!modalForgotpassword)
    }
    const toggleShowNewPassword = () => {
        setModalLogin(!modalLogin)
        setModalForgotpassword(!modalForgotpassword)
        setModalNewPassword(modalNewPassword)
    }

    return (
        <>
            <button onClick={toggleShowLogin} type="button" className="btn btn-link px-3 me-2"
                    style={{color: '#14a44d'}}>
                Login
            </button>
            <MDBModal show={modalLogin} setShow={setModalLogin} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle style={{textTransform: 'uppercase'}}>Login</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShowLogin}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody style={{textAlign: 'center'}}>
                            <form>
                                <MDBInput className='mb-4' type='email' id='formLogin1' label='Email address'/>
                                <MDBInput className='mb-4' type='password' id='formLogin2' label='Password'/>
                                <MDBRow className='mb-4'>
                                    <MDBCol className='d-flex justify-content-center'>
                                        <MDBCheckbox id='form1Example3' label='Remember me' defaultChecked/>
                                    </MDBCol>
                                    <MDBCol>
                                        <a onClick={toggleShowForgotpassword}
                                           style={{color: '#14a44d', cursor: 'pointer'}}>Forgot password?</a>
                                    </MDBCol>
                                </MDBRow>
                                <MDBBtn type='submit' block color='success' style={{width: '50%', textAlign: 'center'}}>
                                    Login
                                </MDBBtn>
                            </form>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <MDBModal show={modalForgotpassword} setShow={modalForgotpassword} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>ForgotPassword</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShowForgotpassword}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody style={{textAlign: 'center'}}>
                            <form>
                                <MDBInput className='mb-4' type='email' id='formForgotPassword1' label='Email address'/>
                                <MDBBtn onClick={toggleShowNewPassword} block color='success'
                                        style={{width: '50%', textAlign: 'center'}}>
                                    Continue
                                </MDBBtn>
                            </form>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <MDBModal show={modalNewPassword} setShow={modalNewPassword} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>ChangePassword</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShowNewPassword}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody style={{textAlign: 'center'}}>
                            <form>
                                <MDBInput className='mb-4' type='password' id='formnewpassword1' label='New password'/>
                                <MDBInput className='mb-4' type='password' id='formnewpassword2'
                                          label='Confirm password'/>
                                <MDBBtn type='submit' block color='success' style={{width: '50%', textAlign: 'center'}}>
                                    Reset password
                                </MDBBtn>
                            </form>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}