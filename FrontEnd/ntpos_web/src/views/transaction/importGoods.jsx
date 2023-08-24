import React from 'react'
import {useTranslation} from "react-i18next";
import '../../assets/style/importGoods.scss';
import SearchContent from "../../components/common/searchContent";
import TypeMenu from "../../components/common/typeMenu";
import GroupButton from "../../components/common/groupButton";
import ListGoodsTable from "../../components/common/listGoodsTable";

export default function ImportGoodsPage(){
    const {t} = useTranslation();
    const handleSearch = (searchTerm) => {
        console.log('Performing search:', searchTerm);
    };
    return (
        <div className='import_goods-page row'>
            <div className="left">
                <SearchContent page= 'import_goods'/>
                <TypeMenu type='status' handleSearch = {handleSearch}/>
            </div>
            <div className="right">
                <div className="top">
                    <h4 className="title">{t("import_goods")}</h4>
                    <GroupButton page= 'import_goods'/>
                </div>
                <div className="center content">
                    <ListGoodsTable page='import_goods'/>
                </div>
            </div>
        </div>
    );
}
