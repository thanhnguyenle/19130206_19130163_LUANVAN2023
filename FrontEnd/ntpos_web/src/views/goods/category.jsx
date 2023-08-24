import React, {useRef, useState} from "react";
import '../../assets/style/goods.scss';
import {useTranslation} from "react-i18next";
import SearchContent from "../../components/common/searchContent";
import TypeMenu from "../../components/common/typeMenu";
import RadioMenu from "../../components/common/radioMenu";
import NumberDropdown from "../../components/common/numberDropdown";
import Operation from "../../components/common/operation";
import GroupButton from "../../components/common/groupButton";
import ListGoodsTable from "../../components/common/listGoodsTable";

export default function CategoryPage() {
    const {t} = useTranslation();
    const handleSearch = (searchTerm) => {
        console.log('Performing search:', searchTerm);
    };

    return (
        <div className="categoryPage row">
            <div className='left'>
                <SearchContent page='category' handleSearch = {handleSearch}/>
                <TypeMenu type='type_of_menu'/>
                <RadioMenu type = 'inventory'/>
                <RadioMenu type = 'display_selection'/>
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
