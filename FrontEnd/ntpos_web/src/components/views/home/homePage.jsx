import React, {useState} from "react";
import '../../../assets/style/home.scss'
import {useTranslation} from "react-i18next";
import {
    MDBChart,
    MDBDropdown,
    MDBDropdownDivider,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBIcon
} from "mdb-react-ui-kit";

export default function HomePage(props) {
    const {t} = useTranslation();
    //du lieu
    const mid1 = [
        {id: 1, title: 'Hôm nay',content:'today', linkAPI: 'Welcome to learning React!'},
        {id: 2, title: 'Hôm qua',content:'yesterday', linkAPI: 'You can install React from npm.'},
        {id: 3, title: '4 ngày trước',content:'4_days_agos', linkAPI: 'You can install React from npm.'},
        {id: 4, title: '1 tuần trước',content:'1_week_ago', linkAPI: 'You can install React from npm.'},
        {id: 5, title: '1 tháng trước',content:'1_month_ago', linkAPI: 'You can install React from npm.'},
    ];
    const dataProductsTop5 = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [
            {
                label: t('product'),
                data: [30,50,60,98,100],
                backgroundColor: [
                    'rgba(63, 81, 181, 0.5)',
                    'rgba(77, 182, 172, 0.5)',
                    'rgba(63, 43, 181, 0.5)',
                    'rgba(4, 1, 98, 0.5)',
                    'rgba(43, 6, 5, 0.5)',
                ],
            },
        ],
    };
    const dataLabelsData = {
        labels: [t('capital_value'),t('profit')],
        datasets: [
            {
                data: [30,50],
                backgroundColor: [
                    'rgba(63, 81, 181, 0.5)',
                    'rgba(77, 182, 172, 0.5)',
                ],
            },
        ],
    };
    const dataLabelsOptions = {
        plugins: {
            datalabels: {
                formatter: (value) => {
                    let sum = 0;
                    // Assign the data to the variable and format it according to your needs
                    const dataArr = dataLabelsData.datasets[0].data;
                    dataArr.map((data) => {
                        sum += data;
                    });
                    return ((value * 100) / sum).toFixed(2) + '%';
                },
                color: 'white',
                labels: {
                    title: {
                        font: {
                            size: '14',
                        },
                    },
                },
            },
        },
    };
    // du lieu
    const [fiferMid1, setFiferMid1] = useState(mid1[0]);
    return (
        <div className='home row'>
            <div className="left col-8">
                <div className="box home-top">
                    <h5>{t('today_sale_results')}</h5>
                    <div className="uln">
                        <ul className='listUln'>
                            <li className="total">
                                <div className="row">
                                    <div className='col-3 text-center' >
                                        <label className="bg">
                                            <MDBIcon fas icon="dollar-sign" className="fa-fw" />
                                        </label>
                                    </div>
                                    <div className="text content col-9">
                                   <span className='today'>
                                         {t('order_is_done')}
                                   </span>
                                        <br/>
                                        <span className="number ng-binding">25 <span><MDBIcon fas icon="arrow-up" /></span></span>
                                        <br/>
                                        <span className="yesterday ng-binding">{t('yesterday')} <span>12</span></span>
                                        <br/>
                                    </div>
                                </div>
                            </li>
                            <li className="order">
                                <div className="row">
                                    <div className='col-3 text-center' >
                                        <label className="bg">
                                            <MDBIcon fas icon="pencil-alt" className="fa-fw" />
                                        </label>
                                    </div>
                                    <div className="text content col-9">
                                   <span className='today'>
                                         {t('orders_are_serving')}
                                   </span>
                                        <br/>
                                        <span className="number ng-binding">25 <span><MDBIcon fas icon="arrow-up" /></span></span>
                                        <br/>
                                        <span className="yesterday ng-binding">{t('yesterday')} <span>12</span></span>
                                        <br/>
                                    </div>
                                </div>
                            </li>
                            <li className="return">
                                <div className="row">
                                    <div className='col-3 text-center' >
                                        <label className="bg">
                                            <MDBIcon fas icon="user" className="fa-fw" />
                                        </label>
                                    </div>
                                    <div className="text content col-9">
                                   <span className='today'>
                                         {t('client')}
                                   </span>
                                        <br/>
                                        <span className="number ng-binding">25 <span><MDBIcon fas icon="arrow-up" /></span></span>
                                        <br/>
                                        <span className="yesterday ng-binding">{t('yesterday')} <span>12</span></span>
                                        <br/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="box home-mid1">
                    <div className="row title col-12">
                        <div className="item col-10">
                            <h5 className=''>{t(`today_sale`)} {" "} {t(fiferMid1.content)}</h5>
                            <span className='number'> <MDBIcon fas icon="arrow-circle-right" />20</span>
                        </div>
                        <div className="col-2 fitter">
                            <MDBDropdown>
                                <MDBDropdownToggle
                                    style={{ cursor: "pointer" }}
                                    tag="a"
                                    className="nav-link me-3 me-lg-0 "
                                >
                                    {t(fiferMid1.content)}
                                </MDBDropdownToggle>
                                <MDBDropdownMenu style={{ zIndex: 1060 }}>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink>
                                            {t(fiferMid1.content)}
                                            <MDBIcon icon="check" className="text-success ms-2" />
                                        </MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownDivider />
                                    <MDBDropdownItem>
                                        <MDBDropdownLink
                                            onClick={() => {
                                                setFiferMid1(mid1[0])
                                            }}>
                                            {t('today')}
                                        </MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink
                                            onClick={() => {
                                                setFiferMid1(mid1[1])
                                            }}>
                                            {t('yesterday')}
                                        </MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink
                                            onClick={() => {
                                                setFiferMid1(mid1[2])
                                            }}>
                                            {t('4_days_agos')}
                                        </MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink
                                            onClick={() => {
                                                setFiferMid1(mid1[3])
                                            }}>
                                            {t('1_week_ago')}
                                        </MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink
                                            onClick={() => {
                                                setFiferMid1(mid1[4])
                                            }}>
                                            {t('1_month_ago')}
                                        </MDBDropdownLink>
                                    </MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </div>
                    </div>
                    <div className="row content1 col-12">
                        <div className="col-lg-6">
                            <div className="card">
                                <MDBChart type='pie' data={dataLabelsData} options={dataLabelsOptions} datalabels />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="totalSale">
                                <h5>{t('total_revenue')}</h5>
                                <div className='item'> {t('capital_value')}: <span>30000đ</span></div>
                                <div className='item'> {t('profit')}: <span>30000đ</span></div>
                                <div className='item'> {t('total')}: <span>30000đ</span></div>
                                <h6>{t(`datetime`)}: 02/09/2023</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box home-mid2">
                    <div className="row title col-12">
                        <div className="item col-10">
                            <h5 className=''>{t(`top_bestseller`)} {" "} {t(fiferMid1.content)}</h5>
                            <span className='number'> <MDBIcon fas icon="arrow-circle-right" />20</span>
                        </div>
                        <div className="col-2 fitter">
                            <MDBDropdown>
                                <MDBDropdownToggle
                                    style={{ cursor: "pointer" }}
                                    tag="a"
                                    className="nav-link me-3 me-lg-0 "
                                >
                                    {t(fiferMid1.content)}
                                </MDBDropdownToggle>
                                <MDBDropdownMenu style={{ zIndex: 1060 }}>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink>
                                            {t(fiferMid1.content)}
                                            <MDBIcon icon="check" className="text-success ms-2" />
                                        </MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownDivider />
                                    <MDBDropdownItem>
                                        <MDBDropdownLink
                                            onClick={() => {
                                                setFiferMid1(mid1[0])
                                            }}>
                                            {t('today')}
                                        </MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink
                                            onClick={() => {
                                                setFiferMid1(mid1[1])
                                            }}>
                                            {t('yesterday')}
                                        </MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink
                                            onClick={() => {
                                                setFiferMid1(mid1[2])
                                            }}>
                                            {t('4_days_agos')}
                                        </MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink
                                            onClick={() => {
                                                setFiferMid1(mid1[3])
                                            }}>
                                            {t('1_week_ago')}
                                        </MDBDropdownLink>
                                    </MDBDropdownItem>
                                    <MDBDropdownItem>
                                        <MDBDropdownLink
                                            onClick={() => {
                                                setFiferMid1(mid1[4])
                                            }}>
                                            {t('1_month_ago')}
                                        </MDBDropdownLink>
                                    </MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </div>
                    </div>
                    <div className="row content1 col-12">
                        <div className="col-lg-12">
                            <div className="card">
                                <MDBChart
                                    type='bar'
                                    data={dataProductsTop5}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='right col-4'>
                <div className="box home-right1">
                    <div className="row title col-12">
                        <h6>{t('recent_activities')}</h6>
                        <hr/>
                        <div className="listWork">
                            <div className="item row">
                               <p><span className='username'>Nguyenlethanh </span>
                                   {t('update_payroll')}
                               </p>
                            </div>
                            <div className="item row">
                                <p><span className='username'>Nguyenlethanh </span>
                                    {t('checked_in_stock')}
                                </p>
                            </div>
                            <div className="item row">
                                <p><span className='username'>Nguyenlethanh </span>
                                    {t('viewed_the_treasury_book')}
                                </p>
                            </div>
                            <div className="item row">
                                <p><span className='username'>Nguyenlethanh </span>
                                    {t('timed_attendance_of_employees')}
                                </p>
                            </div>
                            <div className="item row">
                                <p><span className='username'>Nguyenlethanh </span>
                                    {t('update_payroll')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
