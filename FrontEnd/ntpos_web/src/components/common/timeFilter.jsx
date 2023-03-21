import React from "react";
import {useTranslation} from "react-i18next";
import {MDBDatepicker} from "mdb-react-ui-kit";
export default function TimeFilter(props){
    const {t} = useTranslation();
    if(props.page === 'inventory-control'){
        return (
            <div className='box'>
                <div className="row">
                    <h6 className='col-10'>{t('datetime')}</h6>
                </div>
                <div className='datetime'>
                    <MDBDatepicker
                        inline
                        inputLabel={t('select_a_date')}
                        okBtnText={t('btnOk')}
                        cancelBtnText={t('btnCancel')}
                        clearBtnText={t('btnClear')}
                    />
                </div>
            </div>
        );
    }
}

