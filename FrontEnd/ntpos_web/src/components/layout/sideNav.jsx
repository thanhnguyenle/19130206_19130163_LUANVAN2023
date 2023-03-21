import React, { useState, useRef, useEffect } from "react";
import {
  MDBSideNav,
  MDBSideNavMenu,
  MDBSideNavItem,
  MDBSideNavLink,
  MDBSideNavCollapse,
  MDBIcon,
  MDBCardLink,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {useTranslation} from "react-i18next";

export default function SideNav({ basicOpen, setBasicOpen,collapseSidebar,setCollapseSidebar }) {
  const {t} = useTranslation();
  const [mode, setMode] = useState("side");
  const [backdrop, setBackdrop] = useState(false);
  const [goodsCollapse, setGoodsCollapse] = useState(false);
  const [transactionCollapse, settransactionCollapse] = useState(false);
  const [partnerCollapse, setPartnerCollapse] = useState(false);
  const [staffCollapse, setStaffCollapse] = useState(false);
  const [reportCollapse, setReportCollapse] = useState(false);
  const innerWidth = useRef(null);
  const checkResize = () => {
    if (window.innerWidth === innerWidth.current) {
      return;
    }
    innerWidth.current = window.innerWidth;

    if (window.innerWidth < 1400) {
      setMode("over");
      setBasicOpen(false);
      setBackdrop(true);
    } else {
      setMode("side");
      setBasicOpen(true);
      setBackdrop(false);
    }
  };
  const handleGoods = () => {
    if (goodsCollapse && !transactionCollapse && !partnerCollapse && !staffCollapse && !reportCollapse)
      settransactionCollapse(false);
      setPartnerCollapse(false);
      setStaffCollapse(false);
      setReportCollapse(false);
     setGoodsCollapse(!goodsCollapse);
  };
  const handlePartnerCollapse = () => {
    if (!goodsCollapse && !transactionCollapse && partnerCollapse && !staffCollapse && !reportCollapse)
    setGoodsCollapse(false);
    settransactionCollapse(false);
    setPartnerCollapse(!partnerCollapse);
    setStaffCollapse(false);
    setReportCollapse(false);
  };
  const handleStaffCollapse = () => {
    if (!goodsCollapse && !transactionCollapse && !partnerCollapse && staffCollapse && !reportCollapse)
      setGoodsCollapse(false);
    settransactionCollapse(false);
    setPartnerCollapse(false);
    setStaffCollapse(!staffCollapse);
    setReportCollapse(false);
  };
  const handleReportCollapse = () => {
    if (!goodsCollapse && !transactionCollapse && !partnerCollapse && !staffCollapse && reportCollapse)
     setGoodsCollapse(false);
    settransactionCollapse(false);
    setPartnerCollapse(false);
    setStaffCollapse(false);
    setReportCollapse(!reportCollapse);
  };
  const handTransactionCollapse = () => {
    if (!goodsCollapse && transactionCollapse && !partnerCollapse && !staffCollapse && !reportCollapse)
      setGoodsCollapse(false);
    settransactionCollapse(!transactionCollapse);
    setPartnerCollapse(false);
    setStaffCollapse(false);
    setReportCollapse(false);
  };

  useEffect(() => {
    checkResize();

    window.addEventListener("resize", checkResize);

    return () => {
      window.removeEventListener("resize", checkResize);
    };
  }, []);

  return (
    <>
      <MDBSideNav className= {collapseSidebar?"collapseSidebar":""}
        isOpen={basicOpen}
        backdrop={backdrop}
        getOpenState={(e) => setBasicOpen(e)}
        style={{width:collapseSidebar?"80px":"250px"}}
      >
        <a href='/' className="d-flex justify-content-center py-3">
          <img
            id="MDB-logo"
            src={logo}
            alt="MDB Logo"
            width='100%'
            draggable="false"
          />
        </a>
        <MDBSideNavMenu id='sideNav'>
          <MDBSideNavItem>
            <Link to="/" className="sidenav-link" title={t('overview')}>
              {collapseSidebar ?  <MDBIcon fas icon="eye" className="fa-fw me-1" /> : <><MDBIcon fas icon="eye" className="fa-fw me-3" /> {t('overview')}</> }
            </Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <MDBSideNavLink icon="angle-down" onClick={handleGoods} title={t('goods')}>
              {collapseSidebar ? <MDBIcon fas icon="dice-d6" className="fa-fw me-1" /> : <><MDBIcon fas icon="dice-d6" className="fa-fw me-3" /> {t('goods')}</>}
            </MDBSideNavLink>
            <MDBSideNavCollapse show={goodsCollapse}>
              <Link to="/category" className="sidenav-link" title={t('category')}>
                {collapseSidebar ? <MDBIcon fas icon="th"  className="fa-fw me-1" /> : <><MDBIcon fas icon="th"   className="fa-fw me-3"  /> {t('category')}</>}
              </Link>
              <Link className="sidenav-link" to="/price-setting"  title={t('price_setting')}>
                {collapseSidebar ? <MDBIcon fas icon="money-bill-wave"  className="fa-fw me-1"  /> : <><MDBIcon fas icon="money-bill-wave"   className="fa-fw me-3" /> {t('price_setting')}</>}
              </Link>
              <Link className="sidenav-link" to="/inventory-control"  title={t('inventory_control')}>
                {collapseSidebar ? <MDBIcon fas icon="box-open" className="fa-fw me-1"  /> : <><MDBIcon fas icon="box-open"  className="fa-fw me-3"  /> {t('inventory_control')}</>}
              </Link>
            </MDBSideNavCollapse>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link to="/e-commerce2" className="sidenav-link" title= {t('rom_table')}>
              {collapseSidebar ? <MDBIcon fas icon="table" className="fa-fw me-1"  /> : <><MDBIcon fas icon="table" className="fa-fw me-3"  /> {t('rom_table')}</>}
            </Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <MDBSideNavLink icon="angle-down" onClick={handTransactionCollapse} title= {t('transaction')}>
              {collapseSidebar ? <MDBIcon fas icon="tablet-alt" className="fa-fw me-1" /> : <><MDBIcon fas icon="tablet-alt" className="fa-fw me-3" /> {t('transaction')}</>}
            </MDBSideNavLink>
            <MDBSideNavCollapse show={transactionCollapse}>
              <Link to="/chat-app" className="sidenav-link" title={t('bill')}>
                {collapseSidebar ? <MDBIcon fas icon="receipt" className="fa-fw me-1" /> : <><MDBIcon fas icon="receipt" className="fa-fw me-3" /> {t('bill')}</>}
              </Link>
              <Link className="sidenav-link" to="/mailbox-app" title={t('returns')}>
                {collapseSidebar ? <MDBIcon fas icon="undo-alt" className="fa-fw me-1" /> : <><MDBIcon fas icon="undo-alt" className="fa-fw me-3" /> {t('returns')}</>}
              </Link>
              <Link className="sidenav-link" to="/mailbox-app" title={t('import_goods')}>
                {collapseSidebar ? <MDBIcon fas icon="file-import" className="fa-fw me-1" /> : <><MDBIcon fas icon="file-import" className="fa-fw me-3" /> {t('import_goods')}</>}
              </Link>
              <Link to="/chat-app" className="sidenav-link" title= {t('return_of_imported_goods')}>
                {collapseSidebar ? <MDBIcon fas icon="exchange-alt" className="fa-fw me-1" /> : <><MDBIcon fas icon="exchange-alt" className="fa-fw me-3" /> {t('return_of_imported_goods')}</>}
              </Link>
              <Link className="sidenav-link" to="/mailbox-app" title={t('cancellation')}>
                {collapseSidebar ? <MDBIcon fas icon="times-circle" className="fa-fw me-1" /> : <><MDBIcon fas icon="times-circle" className="fa-fw me-3" /> {t('cancellation')}</>}
              </Link>
            </MDBSideNavCollapse>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <MDBSideNavLink icon="angle-down" onClick={handlePartnerCollapse} title={t('partner')}>
              {collapseSidebar ? <MDBIcon fas icon="users" className="fa-fw me-1" /> : <><MDBIcon fas icon="users" className="fa-fw me-3" /> {t('partner')}</>}
            </MDBSideNavLink>
            <MDBSideNavCollapse show={partnerCollapse}>
              <Link to="/chat-app" className="sidenav-link" title={t('client')}>
                {collapseSidebar ? <MDBIcon fas icon="user" className="fa-fw me-1" /> : <><MDBIcon fas icon="user" className="fa-fw me-3" /> {t('client')}</>}
              </Link>
              <Link className="sidenav-link" to="/mailbox-app" title= {t('supplier')}>
                {collapseSidebar ? <MDBIcon fas icon="user-friends" className="fa-fw me-1" /> : <><MDBIcon fas icon="user-tie" className="fa-fw me-3" /> {t('supplier')}</>}
              </Link>
            </MDBSideNavCollapse>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <Link className="sidenav-link" to="/invoice-page" title= {t('cash_book')}>
              {collapseSidebar ? <MDBIcon fas icon="file-invoice-dollar" className="fa-fw me-1" /> : <><MDBIcon fas icon="file-invoice-dollar" className="fa-fw me-3" /> {t('cash_book')}</>}
            </Link>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <MDBSideNavLink icon="angle-down" onClick={handleStaffCollapse} title={t('staff')}>
              {collapseSidebar ? <MDBIcon fas icon="user-friends" className="fa-fw me-1" /> : <><MDBIcon fas icon="user-friends" className="fa-fw me-3" /> {t('staff')}</>}
            </MDBSideNavLink>
            <MDBSideNavCollapse show={staffCollapse}>
              <Link to="/chat-app" className="sidenav-link" title={t('staff')}>
                {collapseSidebar ? <MDBIcon fas icon="user" className="fa-fw me-1" /> : <><MDBIcon fas icon="user" className="fa-fw me-3" /> {t('staff')}</>}
              </Link>
              <Link className="sidenav-link" to="/mailbox-app" title= {t('timekeeping')}>
                {collapseSidebar ? <MDBIcon fas icon="clock" className="fa-fw me-1" /> : <><MDBIcon fas icon="clock" className="fa-fw me-3" /> {t('timekeeping')}</>}
              </Link>
              <Link className="sidenav-link" to="/mailbox-app" title={t('payroll')}>
                {collapseSidebar ? <MDBIcon fas icon="money-bill-wave" className="fa-fw me-1" /> : <><MDBIcon fas icon="money-bill-wave" className="fa-fw me-3" /> {t('payroll')}</>}
              </Link>
              <Link to="/chat-app" className="sidenav-link" title={t('rose_table')}>
                {collapseSidebar ? <MDBIcon fas icon="hand-holding-usd" className="fa-fw me-1" /> : <><MDBIcon fas icon="hand-holding-usd" className="fa-fw me-3" /> {t('rose_table')}</>}
              </Link>
              <Link className="sidenav-link" to="/mailbox-app" title= {t('general_settings')}>
                {collapseSidebar ? <MDBIcon fas icon="cog" className="fa-fw me-1" /> : <><MDBIcon fas icon="cog" className="fa-fw me-3" /> {t('general_settings')}</>}
              </Link>
            </MDBSideNavCollapse>
          </MDBSideNavItem>
          <MDBSideNavItem>
            <MDBSideNavLink icon="angle-down" onClick={handleReportCollapse} title={t('report')}>
              {collapseSidebar ? <MDBIcon fas icon="chart-line" className="fa-fw me-1" /> : <><MDBIcon fas icon="chart-line" className="fa-fw me-3" /> {t('report')}</>}
            </MDBSideNavLink>
            <MDBSideNavCollapse show={reportCollapse}>
              <Link to="/chat-app" className="sidenav-link" title= {t('end_day')}>
                {collapseSidebar? <MDBIcon fas icon="calendar-alt" className="fa-fw me-1" /> : <><MDBIcon fas icon="calendar-alt" className="fa-fw me-3" /> {t('end_day')}</>}
              </Link>
              <Link className="sidenav-link" to="/mailbox-app" title= {t('sell')}>
                {collapseSidebar ? <MDBIcon fas icon="shopping-cart" className="fa-fw me-1" /> : <><MDBIcon fas icon="shopping-cart" className="fa-fw me-3" /> {t('sell')}</>}
              </Link>
              <Link className="sidenav-link" to="/mailbox-app" title={t('goods')}>
                {collapseSidebar ? <MDBIcon fas icon="box-open" className="fa-fw me-1" /> : <><MDBIcon fas icon="box-open" className="fa-fw me-3" /> {t('goods')}</>}
              </Link>
              <Link to="/chat-app" className="sidenav-link" title={t('client')}>
                {collapseSidebar ? <MDBIcon fas icon="user" className="fa-fw me-1" /> : <><MDBIcon fas icon="user" className="fa-fw me-3" /> {t('client')}</>}
              </Link>
              <Link className="sidenav-link" to="/mailbox-app" title={t('supplier')}>
                {collapseSidebar ? <MDBIcon fas icon="user-tie" className="fa-fw me-1" /> : <><MDBIcon fas icon="user-tie" className="fa-fw me-3" /> {t('supplier')}</>}
              </Link>
              <Link to="/chat-app" className="sidenav-link" title={t('staff')}>
                {collapseSidebar ? <MDBIcon fas icon="user-friends" className="fa-fw me-1" /> : <><MDBIcon fas icon="user-friends" className="fa-fw me-3" /> {t('staff')}</>}
              </Link>
              <Link className="sidenav-link" to="/mailbox-app" title={t('sales_channel')}>
                {collapseSidebar ? <MDBIcon fas icon="store" className="fa-fw me-1" /> : <><MDBIcon fas icon="store" className="fa-fw me-3" /> {t('sales_channel')}</>}
              </Link>
              <Link className="sidenav-link" to="/mailbox-app" title={t('finance')}>
                {collapseSidebar ? <MDBIcon fas icon="money-bill-wave" className="fa-fw me-1" /> : <><MDBIcon fas icon="money-bill-wave" className="fa-fw me-3" /> {t('finance')}</>}
              </Link>
            </MDBSideNavCollapse>
          </MDBSideNavItem>
        </MDBSideNavMenu>
        <MDBCardLink id='sideBar' onClick={() => {
          setCollapseSidebar(!collapseSidebar);
          console.log(collapseSidebar)
        }}>
          <MDBIcon fas icon= {collapseSidebar ? "chevron-circle-right" :"chevron-circle-left"}/>
        </MDBCardLink>
      </MDBSideNav>
    </>
  );
}
