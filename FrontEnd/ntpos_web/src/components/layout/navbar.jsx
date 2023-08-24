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
  MDBBadge, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane,
} from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";
import ListNotication from "../common/listNotication";
import inbox from "../../assets/images/inbox.png";
import '../../assets/style/modules.scss';
export default function Navbar({ updateSidenav, sidenavState }) {
  const { t, i18n } = useTranslation();
  const [pickedLanguage, setPickedLanguage] = useState('vn');
  const [basicActive, setBasicActive] = useState('tab1');
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };
  return (
    <MDBNavbar id="main-navbar" expand="lg" light fixed="top" bgColor="light" style={{ marginBottom: '40px' }}>
      <MDBContainer fluid>
        <MDBBtn
          onClick={() => updateSidenav(!sidenavState)}
          className="shadow-0 p-0 me-3 d-block d-xxl-none"
          color="light"
        >
          <MDBIcon icon="bars" size="lg" fas />
        </MDBBtn>
        <MDBNavbarNav className="ms-auto d-flex flex-row">
          <MDBNavbarItem>
            <MDBDropdown>
              <MDBDropdownToggle
                style={{ cursor: "pointer" }}
                tag="a"
                className="nav-link me-3 me-lg-0 hidden-arrow"
              >
                <MDBIcon fas icon='envelope' />
                <MDBBadge pill notification color="danger">
                  1
                </MDBBadge>
              </MDBDropdownToggle>
              <MDBDropdownMenu style={{ zIndex: 1060 }}>
                <br />
                <h6 className='text-center'>{t('inbox')}</h6>
                <MDBTabs className='mb-3' style={{ paddingTop: '10px', paddingBottom: '20px', paddingLeft: '30px', paddingRight: '30px' }}>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                      {t('all')}
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                      {t('notification')}
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
                      {t('endow')}
                    </MDBTabsLink>
                  </MDBTabsItem>
                </MDBTabs>
                <MDBTabsContent style={{ height: '300px' }}>
                  <MDBTabsPane show={basicActive === 'tab1'}>
                    <div className='text-center'>
                      <img src={inbox} alt="" style={{ width: '200px' }} />
                      <p style={{ color: 'grey' }}>{t('no_notifications')}</p>
                    </div>
                  </MDBTabsPane>
                  <MDBTabsPane show={basicActive === 'tab2'}>
                    <ListNotication />
                  </MDBTabsPane>
                  <MDBTabsPane show={basicActive === 'tab3'}><ListNotication /></MDBTabsPane>
                </MDBTabsContent>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBDropdown>
              <MDBDropdownToggle
                style={{ cursor: "pointer" }}
                tag="a"
                className="nav-link me-3 me-lg-0 hidden-arrow"
              >
                <MDBIcon flag={pickedLanguage} fas />
              </MDBDropdownToggle>
              <MDBDropdownMenu style={{ zIndex: 1060 }}>
                <MDBDropdownItem>
                  <MDBDropdownLink>
                    <MDBIcon flag={pickedLanguage} fas /> {t((pickedLanguage === 'vn') ? 'language_V' : 'language_E')}{" "}
                    <MDBIcon icon="check" className="text-success ms-2" />
                  </MDBDropdownLink>
                </MDBDropdownItem>
                <MDBDropdownDivider />
                <MDBDropdownItem>
                  <MDBDropdownLink
                    onClick={() => {
                      i18n.changeLanguage("vn");
                      setPickedLanguage('vn');
                    }}>
                    <MDBIcon flag="vn" fas /> {t('language_V')}
                  </MDBDropdownLink>
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <MDBDropdownLink
                    onClick={() => {
                      i18n.changeLanguage("en");
                      setPickedLanguage('uk');
                    }}>
                    <MDBIcon flag="uk" fas /> {t('language_E')}
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
