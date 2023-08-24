import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {MDBIcon} from "mdb-react-ui-kit";
import '../../assets/style/common.scss'
const listFood = [
    {i18n:'food',name:'monan'},
    {i18n:'drinks',name:'nuoc'},
    {i18n:'others',name:'khac'},
]
const listStatus1 = [
    {i18n:'temporary_ticket',name:'phieutam'},
    {i18n:'balanced_stock',name:'phieucanbang'},
    {i18n:'cancelled',name:'dahuy'},
]
const listStatus = [
    {i18n:'active',name:'danghoatdong'},
    {i18n:'stop_working',name:'ngunghoatdong'},
    {i18n:'all',name:'tatca'},
]
export default function TypeMenu(props) {
    const {t} = useTranslation();
    const [show, setShow] = useState(false);

    if(props.type === 'type_of_menu'){
        return(
            <div className='box typeMenu'>
                <div className="row">
                    <h6 className='col-10'>{t(props.type)}</h6>
                    <a className='col-1' onClick={() => {
                        setShow(!show);
                    }}>
                        <div className='bg'>
                            <MDBIcon fas icon="chevron-down" />
                        </div>
                    </a>
                </div>
                <div className= {show ? 'hideGroup':'listGroup'}>
                    {listFood.map((item) => {
                        return (
                            <>
                                <input type="checkbox" name={t(props.type)} />
                                <label htmlFor="food"> {t(item.i18n)}</label><br/>
                            </>
                        );
                    })}

                </div>
            </div>
        );
    }else if(props.type === 'status'){
        return(
            <div className='box typeMenu'>
                <div className="row">
                    <h6 className='col-10'>{t(props.type)}</h6>
                    <a className='col-1' onClick={() => {
                        setShow(!show);
                    }}>
                        <div className='bg'>
                            <MDBIcon fas icon="chevron-down" />
                        </div>
                    </a>
                </div>
                <div className= {show ? 'hideGroup':'listGroup'}>
                    {listStatus.map((item) => {
                        return (
                            <>
                                <input type="checkbox" name={t(props.type)} />
                                <label htmlFor="food"> {t(item.i18n)}</label><br/>
                            </>
                        );
                    })}

                </div>
            </div>
        );
    }

}
