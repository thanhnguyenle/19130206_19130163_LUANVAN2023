import React, {useState} from "react";
import {MDBAutocomplete, MDBIcon, MDBInputGroup} from "mdb-react-ui-kit";
import {useTranslation} from "react-i18next";
export default function SearchContent() {
    const {t} = useTranslation();
        return ( <div className='box search'>
            <h6>{t('search')}</h6>
            <input type="text" name="search" placeholder={t('by_code_name')}/>
        </div>);
}
