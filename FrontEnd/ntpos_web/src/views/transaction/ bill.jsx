import React from 'react'
import {useTranslation} from "react-i18next";
import '../../assets/style/bill.scss';
import SearchContent from "../../components/common/searchContent";
import TypeMenu from "../../components/common/typeMenu";
import GroupButton from "../../components/common/groupButton";
import ListGoodsTable from "../../components/common/listGoodsTable";

export default function BillPage(){
    const {t} = useTranslation();
    const handleSearch = (searchTerm) => {
        console.log('Performing search:', searchTerm);
    };
    return (
        <div className='bill-page row'>
            <div className="left">
                <SearchContent page= 'bill'/>
                <TypeMenu type='status' handleSearch = {handleSearch}/>
            </div>
            <div className="right">
                <div className="top">
                    <h4 className="title">{t("bill")}</h4>
                    <GroupButton page= 'bill'/>
                </div>
                <div className="center content">
                    <ListGoodsTable page='bill'/>
                </div>
            </div>
        </div>
    );
}
