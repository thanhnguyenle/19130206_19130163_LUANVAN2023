import React,{useEffect, useRef}  from "react";
import {useTranslation} from "react-i18next";

export default function ListFilterContent({show,setShowFilter, onCloseDemo,refButton,page}){
    const {t} = useTranslation();
    const listItemsGoodsFilter = [
        {id:1 ,name: 'Hình hảnh', i18n: 'image'},
        {id:2 ,name: 'Mã hàng hóa', i18n: 'goods_name'},
        {id:3 ,name: 'Tên hàng', i18n: 'commodity_codes'},
        {id:4 ,name: 'Loại thực đơn', i18n: 'type_of_menu'},
        {id:5 ,name: 'Nhóm hàng', i18n: 'group_of_goods'},
        {id:6 ,name: 'Loại hàng', i18n: 'sectors'},
        {id:7 ,name: 'Giá bán', i18n: 'price'},
        {id:8 ,name: 'Giá vốn', i18n: 'cost_price'},
        {id:9 ,name: 'Tồn kho', i18n: 'inventory'},
        {id:10 ,name: 'Vị trí', i18n: 'location'},
        {id:11 ,name: 'Đặt hàng', i18n: 'order'},
        {id:12 ,name: 'Định mức tồn ít nhất', i18n: 'minimum_inventory_level'},
        {id:13 ,name: 'Định mức tồn nhiều nhất', i18n: 'the_most_stocked_normal'},
        {id:14 ,name: 'status', i18n: 'status'},
    ]
    const listItemsPriceFilter = [
        {id:1,name: 'Mã hàng hóa', i18n: 'goods_name'},
        {id:2,name: 'Tên hàng', i18n: 'commodity_codes'},
        {id:3,name: 'Giá vốn', i18n: 'price'},
        {id:4,name: 'Đơn giá nhập cuối', i18n: 'last_entry_unit_price'},
        {id:5,name: 'Giá mới', i18n: 'inventory'},
    ]
    const listItemsCheckFilter = [
        {id:1,name: 'Mã kiểm kho', i18n: 'inventory_code'},
        {id:2,name: 'Thời gian', i18n: 'datetime'},
        {id:3,name: 'Ngày cân bằng', i18n: 'balance_day'},
        {id:4,name: 'Tổng chênh lệch', i18n: 'total_difference'},
        {id:5,name: 'Tổng giá trị lệch', i18n: 'total_deviation_value'},
        {id:6,name: 'Tổng giá trị tăng', i18n: 'total_value_increase'},
        {id:7,name: 'Ghi chú', i18n: 'note'},
        {id:8,name: 'Trạng thái', i18n: 'status'},
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
    if(page === 'category'){
        return (
            <div ref={ref} className={!show ? 'hideGroup':'box filterGroup'} >
                {listItemsGoodsFilter.map((item) => {
                    return (
                        <div className="item" key={item.id}>
                            <input type="checkbox" id='food' name="filter" value={item.i18n}/>
                            <label htmlFor="image"> {t(item.name)}</label><br/>
                        </div>
                    );
                })}
            </div>);
    }else if(page === 'priceSetting'){
        return (
            <div ref={ref} className={!show ? 'hideGroup':'box filterGroup price'} >
                {listItemsPriceFilter.map((item) => {
                    return (
                        <div className="item" key={item.id}>
                            <input type="checkbox" id='food' name="filter" value={item.i18n}/>
                            <label htmlFor="image"> {t(item.name)}</label><br/>
                        </div>
                    );
                })}
            </div>);
    }
    else if(page === 'inventoryControl'){
        return (
            <div ref={ref} className={!show ? 'hideGroup':'box filterGroup price'} >
                {listItemsCheckFilter.map((item) => {
                    return (
                        <div className="item" key={item.id}>
                            <input type="checkbox" id='food' name="filter" value={item.i18n}/>
                            <label htmlFor="image"> {t(item.name)}</label><br/>
                        </div>
                    );
                })}
            </div>);
    }
}

