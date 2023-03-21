import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {MDBIcon} from "mdb-react-ui-kit";
export default function RadioMenu(props) {
    const {t} = useTranslation();
    const [show, setShow] = useState(false);
    const typeRadioMenu = [
        {type: 'display_selection', appUrl:''},
        {type: 'inventory', appUrl:''},
    ]
    if(props.type === 'inventory'){
        return(
            <div className='box radioMenu'>
                <div className="row">
                    <h6 className='col-10'>{t(props.type)}</h6>
                    <a className='col-2' onClick={() => {
                        setShow(!show);
                    }}>
                        <div className='bg'>
                            <MDBIcon fas icon="chevron-down" />
                        </div>
                    </a>
                </div>
                {/*1 Tất cả*/}
                {/*2 Dưới mức tồn kho*/}
                {/*3 Vượt mức tồn kho*/}
                {/*4 Còn hàng*/}
                {/*5 Hết hàng*/}
                <div className= {show ? 'hideGroup':'listGroup'}>
                    <input type="radio" id={props.type+'1'} name={props.type} value="1"/>
                    <label htmlFor={props.type+'1'}> {t('all')}</label><br/>
                    <input type="radio" id={props.type+'2'} name={props.type} value="2"/>
                    <label htmlFor={props.type+'2'}> {t('below_stock_level')}</label><br/>
                    <input type="radio"  id={props.type+'3'} name={props.type} value="3"/>
                    <label htmlFor={props.type+'3'}> {t('exceeded_inventory_level')}</label><br/>
                    <input type="radio" id={props.type+'4'} name={props.type} value="4"/>
                    <label htmlFor={props.type+'4'}> {t('in_stock')}</label><br/>
                    <input type="radio" id={props.type+'5'} name={props.type} value="5"/>
                    <label htmlFor={props.type+'5'}> {t('out_of_stock_in_stock')}</label><br/>
                </div>
            </div>
        );
    }
    else if(props.type === 'display_selection'){
        return(
            <div className='box radioMenu'>
                <div className="row">
                    <h6 className='col-10'>{t(props.type)}</h6>
                    <a className='col-2' onClick={() => {
                        setShow(!show);
                    }}>
                        <div className='bg'>
                            <MDBIcon fas icon="chevron-down" />
                        </div>
                    </a>
                </div>
                <div className= {show ? 'hideGroup':'listGroup'}>
                    <input type="radio" id={props.type+'1'} name={props.type} value="1"/>
                    <label htmlFor={props.type+'1'}> {t('all')}</label><br/>
                    <input type="radio" id={props.type+'2'} name={props.type} value="2"/>
                    <label htmlFor={props.type+'2'}> {t('goods_in_business')}</label><br/>
                    <input type="radio"  id={props.type+'3'} name={props.type} value="3"/>
                    <label htmlFor={props.type+'3'}> {t('out_of_business')}</label><br/>
                </div>
            </div>
        );
    }

}
