import React from 'react'
import {useTranslation} from "react-i18next";
import '../../assets/style/returnOrder.scss';
import SearchContent from "../../components/common/searchContent";
import TypeMenu from "../../components/common/typeMenu";
import GroupButton from "../../components/common/groupButton";
import ListGoodsTable from "../../components/common/listGoodsTable";

export default function ReturnOrderPage(){
    const {t} = useTranslation();
    const handleSearch = (searchTerm) => {
        console.log('Performing search:', searchTerm);
    };
    return (
        <div className='return-order-page row'>
            <div className="left">
                <SearchContent page= 'returnOrder'/>
                <TypeMenu type='status' handleSearch = {handleSearch}/>
            </div>
            <div className="right">
                <div className="top">
                    <h4 className="title">{t("return_order")}</h4>
                    <GroupButton page= 'returnOrder'/>
                </div>
                <div className="center content">
                    <ListGoodsTable page='returnOrder'/>
                </div>
            </div>
        </div>
    );
}
