import React from 'react'
import { useTranslation } from "react-i18next";
import '../../assets/style/cashBook.scss';
import SearchContent from "../../components/common/searchContent";
import TypeMenu from "../../components/common/typeMenu";
import GroupButton from "../../components/common/groupButton";
import ListGoodsTable from "../../components/common/listGoodsTable";

export default function CashBookPage() {
    const { t } = useTranslation();
    const handleSearch = (searchTerm) => {
        console.log('Performing search:', searchTerm);
    };
    return (
        <div className='cashBook-page row'>
            <div className="left">
                <SearchContent page='cashBook-page' />
                <TypeMenu type='status' handleSearch={handleSearch} />
            </div>
            <div className="right">
                <div className="top">
                    <h4 className="title">{t("cash_book")}</h4>
                    <GroupButton page='cashBook-page' />
                </div>
                <div className="center content">
                    <ListGoodsTable page='cashBook-page' />
                </div>
            </div>
        </div>
    );
}
