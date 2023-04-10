import React from "react";
import bep from '../../assets/images/bep.png';
import letan from '../../assets/images/note.png';
import ghichu from '../../assets/images/note1.png';
import {useTranslation} from "react-i18next";
export default function NavBottom() {
    const {t} = useTranslation();
   return(
       <div className='navBottom'>
           <a href="#" title={t('kitchen')}><img src={bep} alt=""/></a>
           <a href="#" title={t('receptionist')}><img src={ghichu} alt=""/></a>
           <a href="#" title={t('cashier')}><img src={letan} alt=""/></a>
       </div >
   )
}
