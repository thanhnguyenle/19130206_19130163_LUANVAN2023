import React, {useState} from "react";
import {useTranslation} from "react-i18next";
const listOptionPage = [
    {page:'category',urlApi:''}
]
export default function SearchContent(props) {
    const {t} = useTranslation();
        if(props.page === 'category'){
            return ( <div className='box search'>
                <h6>{t('search')}</h6>
                <input type="text" name="search" placeholder={t('by_code_name')}/>
            </div>);
        }
        else if(props.page === 'priceSetting'){
            return ( <div className='box search'>
                <h6>{t('search')}</h6>
                <input type="text" name="search" placeholder={t('by_code_name')}/>
            </div>);
        }
        else if(props.page === 'inventoryControl'){
            return ( <div className='box search'>
                <h6>{t('search')}</h6>
                <input type="text" name="search" placeholder={t('invoice_code')}/>
                <input type="text" name="search" placeholder={t('by_code_name')}/>
            </div>);
        }
        else if(props.page === 'tableRoom'){
            return ( <div className='box search'>
                <h6>{t('search')}</h6>
                <input type="text" name="search" placeholder={t('by_code_room_table')}/>
            </div>);
        }

}
