import React,{useEffect, useRef}  from "react";
import {useTranslation} from "react-i18next";

export default function ListFilterContent({show,setShowFilter, onCloseDemo,refButton}){
    const {t} = useTranslation();
    const listItemsGoodsFilter = [
        {name: 'image', value: 'image'},
        {name: 'goods_name', value: 'goods_name'},
        {name: 'commodity_codes', value: 'commodity_codes'},
        {name: 'type_of_menu', value: 'type_of_menu'},
        {name: 'price', value: 'price'},
        {name: 'capital_value', value: 'capital_value'},
        {name: 'inventory', value: 'inventory'},
        {name: 'order', value: 'order'},
        {name: 'status', value: 'status'},
    ]
    const ref = useRef(null);
    const refButtonDemo = refButton;
    useEffect(() => {
         document.addEventListener('click', onClickOutside, true);
        return () => {
            document.removeEventListener('click', onClickOutside, true);
        };
        }, [onCloseDemo]);
    const onClickOutside = (e) => {
        const element = e.target;
        if(refButtonDemo.current && refButtonDemo.current.contains(element)){
          if (ref.current && !ref.current.contains(element)) {
                onCloseDemo();
            }
        }
        else{
            if(show && !ref.current.contains(element)){
                setShowFilter(false);
            }
        }

    };
    return (
        <div ref={ref} className={!show ? 'hideGroup':'box filterGroup'} >
            {listItemsGoodsFilter.map((item) => {
                return (
                    <div className="item" key={item.name}>
                        <input type="checkbox" id='food' name="filter" value={item.value}/>
                        <label htmlFor="image"> {t(item.name)}</label><br/>
                    </div>
                );
            })}
        </div>);

}

