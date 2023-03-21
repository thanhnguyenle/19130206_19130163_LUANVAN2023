import React, {useRef, useState} from "react";
import '../../../assets/style/priceSetting.scss';
import {useTranslation} from "react-i18next";
import SearchContent from "../../common/searchContent";
import NumberDropdown from "../../common/numberDropdown";
import GroupList from "../../common/groupList";
import GroupButton from "../../common/groupButton";
import ListGoodsTable from "../../common/listGoodsTable";
export default function PriceSettingPage(){
    const {t} = useTranslation();
    return(
        <div className='price-setting-page row'>
            <div className="left">
                <SearchContent page= 'priceSetting'/>
                <GroupList type = 'price_setting'/>
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
