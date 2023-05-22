import React from 'react'
import {useTranslation} from "react-i18next";
import '../../../assets/style/tableRoom.scss';
import SearchContent from "../../common/searchContent";
import TypeMenu from "../../common/typeMenu";
export default function TableRoomPage(){
    const {t} = useTranslation();
    return (
      <div className='table-room-page row'>
        <div className="left">
            <SearchContent page= 'tableRoom'/>
            <TypeMenu type='status'/>
        </div>
          <div className="right">

          </div>
      </div>
    );
}
