import React, { useState } from "react";
import {
    MDBContainer,
    MDBNavbar,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBInputGroup,
    // MDBInputGroupText,
    // MDBInputGroupElement,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBDropdownDivider,
    MDBBadge,
} from "mdb-react-ui-kit";

export default function Navbar({ updateSidenav, sidenavState }) {
    return (
        <MDBNavbar id="main-navbar" expand="lg" light fixed="top" bgColor="light">
            <MDBContainer fluid>
                <MDBBtn
                    onClick={() => updateSidenav(!sidenavState)}
                    className="shadow-0 p-0 me-3 d-block d-xxl-none"
                    color="light"
                >
                    <MDBIcon icon="bars" size="lg" fas />
                </MDBBtn>

                <MDBInputGroup
                    textAfter={<MDBIcon icon="search" fas />}
                    className="d-none d-md-flex w-auto my-auto"
                >
                    <input
                        type="search"
                        className="form-control"
                        placeholder='Search (ctrl + "/" to focus)'
                        style={{ minWidth: "225px" }}
                    />
                </MDBInputGroup>

                <MDBNavbarNav className="ms-auto d-flex flex-row">
                    <MDBNavbarItem>
                        <MDBDropdown>
                            <MDBDropdownToggle
                                style={{ cursor: "pointer" }}
                                tag="a"
                                className="nav-link me-3 me-lg-0 hidden-arrow"
                            >
                                <MDBIcon icon="bell" fas />
                                <MDBBadge pill notification color="danger">
                                    1
                                </MDBBadge>
                            </MDBDropdownToggle>
                            <MDBDropdownMenu style={{ zIndex: 1060 }}>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>Some news</MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>Another news</MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>Something else here</MDBDropdownLink>
                                </MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavbarItem>

                    <MDBNavbarItem>
                        <MDBNavbarLink className="me-3 me-lg-0" href="#">
                            <MDBIcon fas icon="fill-drip" />
                        </MDBNavbarLink>
                    </MDBNavbarItem>

                    <MDBNavbarItem>
                        <MDBNavbarLink className="me-3 me-lg-0" href="#">
                            <MDBIcon fab icon="github" />
                        </MDBNavbarLink>
                    </MDBNavbarItem>

                    <MDBNavbarItem>
                        <MDBDropdown>
                            <MDBDropdownToggle
                                style={{ cursor: "pointer" }}
                                tag="a"
                                className="nav-link me-3 me-lg-0 hidden-arrow"
                            >
                                <MDBIcon flag="uk" fas />
                            </MDBDropdownToggle>
                            <MDBDropdownMenu style={{ zIndex: 1060 }}>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>
                                        <MDBIcon flag="uk" fas /> English{" "}
                                        <MDBIcon icon="check" className="text-success ms-2" />
                                    </MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownDivider />
                                <MDBDropdownItem>
                                    <MDBDropdownLink>
                                        <MDBIcon flag="pl" fas /> Polski
                                    </MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>
                                        <MDBIcon flag="cn" fas /> 中文
                                    </MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>
                                        <MDBIcon flag="jp" fas /> 日本語
                                    </MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>
                                        <MDBIcon flag="de" fas /> Deutsch
                                    </MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>
                                        <MDBIcon flag="fr" fas /> Français
                                    </MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>
                                        <MDBIcon flag="es" fas /> Español
                                    </MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>
                                        <MDBIcon flag="ru" fas /> Русский
                                    </MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>
                                        <MDBIcon flag="pt" fas /> Português
                                    </MDBDropdownLink>
                                </MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavbarItem>

                    <MDBNavbarItem>
                        <MDBDropdown>
                            <MDBDropdownToggle
                                style={{ cursor: "pointer" }}
                                tag="a"
                                className="nav-link hidden-arrow d-flex align-items-center"
                            >
                                <img
                                    src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                                    className="rounded-circle"
                                    style={{ height: 22 }}
                                    alt=""
                                />
                            </MDBDropdownToggle>
                            <MDBDropdownMenu style={{ zIndex: 1060 }}>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>My profile</MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>Settings</MDBDropdownLink>
                                </MDBDropdownItem>
                                <MDBDropdownItem>
                                    <MDBDropdownLink>Logout</MDBDropdownLink>
                                </MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavbarItem>
                </MDBNavbarNav>
            </MDBContainer>
        </MDBNavbar>
    );
}
