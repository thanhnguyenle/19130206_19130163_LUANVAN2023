import React, {useState} from 'react';
import {
    MDBBtn, MDBCol, MDBIcon, MDBInput,
    MDBModal,
    MDBModalBody,
    MDBModalContent,
    MDBModalDialog,
    MDBModalHeader,
    MDBModalTitle, MDBRow
} from "mdb-react-ui-kit";

export default function ModalLogin() {
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow1 = () => setBasicModal(!basicModal);

    return (
        <>
            <button type="button" onClick={toggleShow1} className="btn btn-primary me-3"
                    style={{background: '#14a44d'}}>
                Sign up for free
            </button>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Signup</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow1}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody style={{textAlign: 'center'}}>
                            <form>
                                <MDBRow className='mb-4'>
                                    <MDBCol>
                                        <MDBInput id='form3Example1' label='First name'/>
                                    </MDBCol>
                                    <MDBCol>
                                        <MDBInput id='form3Example2' label='Last name'/>
                                    </MDBCol>
                                </MDBRow>
                                <MDBInput className='mb-4' type='email' id='form3Example3' label='Email address'/>
                                <MDBInput className='mb-4' id='form3Example4' label='Password' type='password'/>
                                <MDBBtn type='submit' className='mb-4 btn-success' style={{width: '50%'}} block>
                                    Sign in
                                </MDBBtn>

                                <div className='text-center'>
                                    <p>or sign up with:</p>
                                    <MDBBtn floating className='mx-1'>
                                        <MDBIcon fab icon='facebook-f'/>
                                    </MDBBtn>
                                    <MDBBtn floating style={{background: 'red'}} className='mx-1'>
                                        <MDBIcon fab icon='google'/>
                                    </MDBBtn>
                                </div>
                            </form>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}