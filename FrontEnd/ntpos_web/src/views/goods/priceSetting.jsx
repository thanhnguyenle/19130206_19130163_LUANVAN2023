import React, {useRef, useState} from "react";
import '../../assets/style/priceSetting.scss';
import {useTranslation} from "react-i18next";
import SearchContent from "../../components/common/searchContent";
import GroupList from "../../components/common/groupList";
import NumberDropdown from "../../components/common/numberDropdown";
import GroupButton from "../../components/common/groupButton";
import ListGoodsTable from "../../components/common/listGoodsTable";
import TypeMenu from "../../components/common/typeMenu";

export default function PriceSettingPage(){
    const {t} = useTranslation();
    const handleSearch = (searchTerm) => {
        console.log('Performing search:', searchTerm);
    };
    return(
        <div className='price-setting-page row'>
            <div className="left">
                <SearchContent page= 'priceSetting' handleSearch = {handleSearch}/>
                <GroupList type = 'price_setting'/>
                <TypeMenu type='status'/>
                <NumberDropdown/>
            </div>
            <div className="right">
                <div className="top">
                    <h4 className="title">{t("general_price_list")}</h4>
                    <GroupButton page= 'priceSetting'/>
                </div>
                <div className="center content">
                    <ListGoodsTable page='priceSetting'/>
                </div>
            </div>
        </div>
    );
}
