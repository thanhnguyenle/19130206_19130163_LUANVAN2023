import React from "react";
import {useTranslation} from "react-i18next";
export default function NumberDropdown(props) {
    const {t} = useTranslation();
    const {number, onChange} = props;
    const numbers = [];
    for (let i = 10; i <= 500; i+=5) {
        numbers.push(i);
    }
    return (
        <div className="row numberDropdown">
            <h6 className='col-7'>{t('number_of_records')}</h6>
            <select className='col-5' name="number" value={number} onChange={onChange}>
                {numbers.map((number) => {
                    return (
                        <option key={number} value={number}>
                            {number}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
