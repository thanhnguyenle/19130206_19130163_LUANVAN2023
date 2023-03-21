import React ,{useState} from 'react';
import {
    MDBCollapse,
    MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownLink, MDBDropdownMenu, MDBDropdownToggle,
    MDBIcon, MDBNavbar, MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarNav,
    MDBNavbarToggler, MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane
} from "mdb-react-ui-kit";
import {useTranslation} from "react-i18next";
import inbox from "../../assets/images/inbox.png";
import ListNotication from "../ListNotication";
import tiengviet from "../../assets/images/lang/tiengviet.png";
import logo from "../../assets/images/logo.png";
import tienganh from "../../assets/images/lang/tienganh.png";
import './header.scss'
export default function Header1() {
    const [showNavCentred, setShowNavCentred] = useState(false);
    const {t, i18n} = useTranslation();
    const [pickedLanguage, setPickedLanguage] = useState(tiengviet);
    const [showNav, setShowNav] = useState(false);
    const [basicActive, setBasicActive] = useState('tab1');

    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
    };
    return (
        <section>
            <MDBNavbar expand='lg' light bgColor='light' id='navExtra'>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarCenteredExample'
                    aria-controls='navbarCenteredExample'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNavCentred(!showNavCentred)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBNavbarBrand href='#'>
                    <img
                        src={logo}
                        height='40'
                        alt=''
                        loading='lazy'
                    />
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='true'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNav(!showNav)}
                >
                    <MDBIcon icon='ellipsis-h' fas/>
                </MDBNavbarToggler>
                <MDBNavbarNav>
                    <MDBCollapse navbar show={showNav} >
                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBNavbarLink className='me-3 me-lg-0'>
                                    <MDBDropdownToggle tag='a' className='hidden-arrow itemNav'>
                                        <span className='navTitle'>{t('support')}</span>
                                        <MDBIcon fas icon='headset'/>
                                    </MDBDropdownToggle>
                                </MDBNavbarLink>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink href='#'>{t('user_manual')}</MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink href='#'>{t('teamviewer')}</MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink href='#'>{t('ultraview')}</MDBDropdownLink>
                                    </MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBNavbarLink className='me-3 me-lg-0'>
                                    <MDBDropdownToggle tag='a' className='hidden-arrow itemNav'>
                                        <span className='navTitle'>{t('mailbox')}</span>
                                        <MDBIcon fas icon='envelope'/>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <br/>
                                        <h6 className='text-center'>{t('inbox')}</h6>
                                        <MDBTabs className='mb-3' style={{paddingTop:'10px',paddingBottom:'20px',paddingLeft:'30px',paddingRight:'30px'}}>
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
                                        <MDBTabsContent style={{height:'300px'}}>
                                            <MDBTabsPane show={basicActive === 'tab1'}>
                                                <div className='text-center'>
                                                    <img src={inbox} alt="" style={{width:'200px'}}/>
                                                    <p style={{color:'grey'}}>{t('no_notifications')}</p>
                                                </div>
                                            </MDBTabsPane>
                                            <MDBTabsPane show={basicActive === 'tab2'}>
                                                <ListNotication/>
                                            </MDBTabsPane>
                                            <MDBTabsPane show={basicActive === 'tab3'}><ListNotication/></MDBTabsPane>
                                        </MDBTabsContent>
                                    </MDBDropdownMenu>
                                </MDBNavbarLink>
                            </MDBDropdown>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBNavbarLink className='me-3 me-lg-0'>
                                    <MDBDropdownToggle tag='a' className='hidden-arrow itemNav'>
                                            <span className='navTitle'
                                                  style={{color: 'black', fontWeight: '600'}}>{t('setting')}</span>
                                        <MDBIcon fas icon='cog'/>
                                    </MDBDropdownToggle>
                                </MDBNavbarLink>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink href='#'>{t('set_up_shop')}</MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink href='#'>{t('print_form_management')}</MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink href='#'>{t('user_management')}</MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink href='#'>{t('manage_cancellation_reason')}</MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink href='#'>{t('manage_dish_notes')}</MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink href='#'>{t('operation_history')}</MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink href='#'>{t('clear_trial_data')}</MDBDropdownLink>
                                    </MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBNavbarLink className='me-3 me-lg-0'>
                                    <MDBDropdownToggle tag='a' className='hidden-arrow itemNav'>
                                            <span className='navTitle'
                                                  style={{color: 'black', fontWeight: '600'}}>minhnhu01</span>
                                        <MDBIcon fas icon='user-circle'/>
                                    </MDBDropdownToggle>
                                </MDBNavbarLink>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink href='#'>{t('account')}</MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink href='#'>{t('log_out')}</MDBDropdownLink>
                                    </MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBDropdown>
                                <MDBNavbarLink className='me-3 me-lg-0'>
                                    <MDBDropdownToggle tag='a' className='hidden-arrow itemNav'
                                                       style={{cursor: "pointer"}}>
                                        <img src={pickedLanguage} alt="" width='28'/>
                                    </MDBDropdownToggle>
                                </MDBNavbarLink>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink href='#'
                                                         onClick={() => {
                                                             i18n.changeLanguage("vi");
                                                             setPickedLanguage(tiengviet);
                                                         }}>
                                            {t("language_V")}
                                        </MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink href='#'
                                                         onClick={() => {
                                                             i18n.changeLanguage("en");
                                                             setPickedLanguage(tienganh);
                                                         }}>{t('language_E')}</MDBDropdownLink>
                                    </MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavbarItem>
                    </MDBCollapse>
                </MDBNavbarNav>
            </MDBNavbar>

        </section>
    );
}
