import React from "react";
import {useTranslation} from "react-i18next";
import '../../assets/style/inventoryControl.scss';
import SearchContent from "../../components/common/searchContent";
import TypeMenu from "../../components/common/typeMenu";
import TimeFilter from "../../components/common/timeFilter";
import NumberDropdown from "../../components/common/numberDropdown";
import GroupButton from "../../components/common/groupButton";
import ListGoodsTable from "../../components/common/listGoodsTable";

export default function InventoryControlPage(){
    const {t} = useTranslation();
    const handleSearch = (searchTerm) => {
        console.log('Performing search:', searchTerm);
    };
    const handleSearchInvoiceCode = (searchTerm1) => {
        console.log('Performing search:', searchTerm1);
    };
    return(
        <div className='inventory-control-page row'>
            <div className="left">
                <SearchContent page= 'inventoryControl' handleSearch = {handleSearch} handleSearchInvoiceCode = {handleSearchInvoiceCode}/>
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
