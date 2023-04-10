import React from "react";
import {useTranslation} from "react-i18next";
import {MDBIcon} from "mdb-react-ui-kit";
export default function GroupList(props){
    const {t} = useTranslation();
    const listAddOption = [
        {type:'price_setting', apiURL:''}
    ];
    if(props.type === 'price_setting'){
        return(
            <div className='box groupList'>
                <div className="row">
                    <h6 className='col-10'>{t('price_list')}</h6>
                    <a className='col-2'>
                        <div className='bg'>
                            <MDBIcon fas icon="plus-circle" />
                        </div>
                    </a>
                </div>
                <div className='row'>
                    <select name="wpPluginsList" id="wpPluginsList">
                        <option>{t('general_price_list')}</option>
                        <option value="holidays">Holidays</option>
                    </select>
                    <a className='col-2' onClick={()=>{}}>
                        <div className='bg'>
                            <MDBIcon fas icon="pencil-alt" />
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}
