import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchSubmit from "../component/searchSubmit";
const listOptionPage = [
    { page: 'category', urlApi: '' }
]
export default function SearchContent(props) {
    const { t } = useTranslation();
    if (props.page === 'category') {
        return (<div className='box search'>
            <h6>{t('search')}</h6>
            <SearchSubmit onSearch={props.handleSearch} placeholder={t('by_code_name')} />
        </div>);
    }
    else if (props.page === 'priceSetting') {
        return (<div className='box search'>
            <h6>{t('search')}</h6>
            <SearchSubmit onSearch={props.handleSearch} placeholder={t('by_code_name')} />
        </div>);
    }
    else if (props.page === 'inventoryControl') {
        return (<div className='box search'>
            <h6>{t('search')}</h6>
            <SearchSubmit onSearch={props.handleSearchInvoiceCode} placeholder={t('invoice_code')} />
            <SearchSubmit onSearch={props.handleSearch} placeholder={t('by_code_name')} />
        </div>);
    }
    else if (props.page === 'tableRoom') {
        return (<div className='box search'>
            <h6>{t('search')}</h6>
            <SearchSubmit onSearch={props.handleSearch} placeholder={t('by_code_room_table')} />
        </div>);
    }
    else if (props.page === 'bill') {
        return (<div className='box search'>
            <h6>{t('search')}</h6>
            <SearchSubmit onSearch={props.handleSearch} placeholder={t('by_code_name')} />
        </div>);
    }
    else if (props.page === 'returnOrder') {
        return (<div className='box search'>
            <h6>{t('search')}</h6>
            <SearchSubmit onSearch={props.handleSearch} placeholder={t('by_code_name')} />
        </div>);
    }
    else if (props.page === 'import_goods') {
        return (<div className='box search'>
            <h6>{t('search')}</h6>
            <SearchSubmit onSearch={props.handleSearch} placeholder={t('by_code_name')} />
        </div>);
    }
    else if (props.page === 'material_return') {
        return (<div className='box search'>
            <h6>{t('search')}</h6>
            <SearchSubmit onSearch={props.handleSearch} placeholder={t('by_code_name')} />
        </div>);
    }
    else if (props.page === 'cancellation') {
        return (<div className='box search'>
            <h6>{t('search')}</h6>
            <SearchSubmit onSearch={props.handleSearch} placeholder={t('by_code_name')} />
        </div>);
    }
    else if (props.page === 'client-page') {
        return (<div className='box search'>
            <h6>{t('search')}</h6>
            <SearchSubmit onSearch={props.handleSearch} placeholder={t('by_code_name')} />
        </div>);
    }
    else if (props.page === 'supplier-page') {
        return (<div className='box search'>
            <h6>{t('search')}</h6>
            <SearchSubmit onSearch={props.handleSearch} placeholder={t('by_code_name')} />
        </div>);
    }
    else if (props.page === 'cashBook-page') {
        return (<div className='box search'>
            <h6>{t('search')}</h6>
            <SearchSubmit onSearch={props.handleSearch} placeholder={t('by_code_name')} />
        </div>);
    }
}
