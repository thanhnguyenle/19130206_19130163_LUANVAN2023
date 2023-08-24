import React from 'react'
import {useTranslation} from "react-i18next";
import '../../assets/style/materialReturn.scss';
import SearchContent from "../../components/common/searchContent";
import TypeMenu from "../../components/common/typeMenu";
import GroupButton from "../../components/common/groupButton";
import ListGoodsTable from "../../components/common/listGoodsTable";

export default function MaterialReturnPage(){
    const {t} = useTranslation();
    const handleSearch = (searchTerm) => {
        console.log('Performing search:', searchTerm);
    };
    return (
        <div className='material-return-page row'>
            <div className="left">
                <SearchContent page= 'material_return'/>
                <TypeMenu type='status' handleSearch = {handleSearch}/>
            </div>
            <div className="right">
                <div className="top">
                    <h4 className="title">{t("import_payment_slip")}</h4>
                    <GroupButton page= 'material_return'/>
                </div>
                <div className="center content">
                    <ListGoodsTable page='material_return'/>
                </div>
            </div>
        </div>
    );
}
