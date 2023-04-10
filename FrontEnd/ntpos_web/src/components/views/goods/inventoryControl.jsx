import React from "react";
import {useTranslation} from "react-i18next";
import SearchContent from "../../common/searchContent";
import '../../../assets/style/inventoryControl.scss';
import TypeMenu from "../../common/typeMenu";
import TimeFilter from "../../common/timeFilter";
import NumberDropdown from "../../common/numberDropdown";
import ListGoodsTable from "../../common/listGoodsTable";
import GroupButton from "../../common/groupButton";
export default function InventoryControlPage(){
    const {t} = useTranslation();
    return(
        <div className='inventory-control-page row'>
            <div className="left">
                <SearchContent page= 'inventoryControl'/>
                <TypeMenu type='status'/>
                <TimeFilter page='inventory-control'/>
                <NumberDropdown/>
            </div>
            <div className="right">
                <div className="top">
                    <h4 className="title">{t("inventory_slip")}</h4>
                    <GroupButton page= 'inventoryControl'/>
                </div>
                <div className="center content">
                    <ListGoodsTable page={'inventoryControl'}/>
                </div>
            </div>
        </div>
    );
}
