import React from 'react'
import {useTranslation} from "react-i18next";
import '../../assets/style/cancellation.scss';
import SearchContent from "../../components/common/searchContent";
import TypeMenu from "../../components/common/typeMenu";
import GroupButton from "../../components/common/groupButton";
import ListGoodsTable from "../../components/common/listGoodsTable";

export default function CancellationPage(){
    const {t} = useTranslation();
    const handleSearch = (searchTerm) => {
        console.log('Performing search:', searchTerm);
    };
    return (
        <div className='cancellation-page row'>
            <div className="left">
                <SearchContent page= 'cancellation'/>
                <TypeMenu type='status' handleSearch = {handleSearch}/>
            </div>
            <div className="right">
                <div className="top">
                    <h4 className="title">{t("cancellation")}</h4>
                    <GroupButton page= 'cancellation'/>
                </div>
                <div className="center content">
                    <ListGoodsTable page='cancellation'/>
                </div>
            </div>
        </div>
    );
}
