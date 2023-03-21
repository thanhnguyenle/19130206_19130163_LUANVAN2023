import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {MDBIcon} from "mdb-react-ui-kit";
import '../../../../assets/style/common.scss'
export default function TypeMenu(props) {
    const {t} = useTranslation();
    const [show, setShow] = useState(false);
    return(
        <div className='box typeMenu'>
            <div className="row">
                <h6 className='col-10'>{t(props.type)}</h6>
                <a className='col-1' href="#" onClick={() => {
                    setShow(!show);
                }}>
                    <div className='bg'>
                        <MDBIcon fas icon="chevron-down" />
                    </div>
                </a>
            </div>
            <div className= {show ? 'hideGroup':'listGroup'}>
                <input type="checkbox" id='food' name={t(props.type)} value="food"/>
                <label htmlFor="food"> {t('food')}</label><br/>
                <input type="checkbox" id='drinks' name={t(props.type)} value="drinks"/>
                <label htmlFor="drinks"> {t('drinks')}</label><br/>
                <input type="checkbox" id='others' name={t(props.type)} value="others"/>
                <label htmlFor="others"> {t('others')}</label><br/>
            </div>
        </div>
    );
}
