import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {MDBIcon} from "mdb-react-ui-kit";
import '../../assets/style/common.scss'
export default function TypeMenu(props) {
    const listFood = [
        {i18n:'food',value:false},
        {i18n:'drinks',value:false},
        {i18n:'others',value:false},
    ]
    const listStatus = [
        {i18n:'temporary_ticket',value:false},
        {i18n:'balanced_stock',value:false},
        {i18n:'cancelled',value:false},
    ]
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
                                <input type="checkbox" name={t(props.type)} value={item.value}/>
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
                                <input type="checkbox" name={t(props.type)} value={item.value}/>
                                <label htmlFor="food"> {t(item.i18n)}</label><br/>
                            </>
                        );
                    })}

                </div>
            </div>
        );
    }

}
