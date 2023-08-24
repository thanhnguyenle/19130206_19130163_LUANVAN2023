import React from 'react'
import { useTranslation } from "react-i18next";
import '../../assets/style/supplier.scss';
import SearchContent from "../../components/common/searchContent";
import TypeMenu from "../../components/common/typeMenu";
import GroupButton from "../../components/common/groupButton";
import ListGoodsTable from "../../components/common/listGoodsTable";

export default function SupplierPage() {
    const { t } = useTranslation();
    const handleSearch = (searchTerm) => {
        console.log('Performing search:', searchTerm);
    };
    return (
        <div className='supplier-page row'>
            <div className="left">
                <SearchContent page='supplier-page' />
                <TypeMenu type='status' handleSearch={handleSearch} />
            </div>
            <div className="right">
                <div className="top">
                    <h4 className="title">{t("supplier")}</h4>
                    <GroupButton page='supplier-page' />
                </div>
                <div className="center content">
                    <ListGoodsTable page='supplier-page' />
                </div>
            </div>
        </div>
    );
}
