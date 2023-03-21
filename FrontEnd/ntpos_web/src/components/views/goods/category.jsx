import React, {useRef, useState} from "react";
import '../../../assets/style/goods.scss';
import {useTranslation} from "react-i18next";
import SearchContent from "../../common/searchContent";
import TypeMenu from "../../common/typeMenu";
import RadioMenu from "../../common/radioMenu";
import NumberDropdown from "../../common/numberDropdown";
import Operation from "../../common/operation";
import GroupButton from "../../common/groupButton";
import ListGoodsTable from "../../common/listGoodsTable";
export default function CategoryPage() {
    const {t} = useTranslation();
    return (
        <div className="categoryPage row">
            <div className='left'>
                <SearchContent page='category'/>
                <TypeMenu type='type_of_menu'/>
                <RadioMenu type = 'inventory'/>
                <RadioMenu type = 'display_selection'/>
                <NumberDropdown/>
            </div>
            <div className="right">
                <div className="top">
                    <h4 className="title">{t("goods")}</h4>
                    <Operation />
                    <GroupButton page='category'/>
                </div>
                <div className="center content">
                    <ListGoodsTable page='category'/>
                </div>
            </div>
        </div>
    )
}
