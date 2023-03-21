import React, {useEffect, useRef} from "react";
import {useTranslation} from "react-i18next";
import {MDBIcon} from "mdb-react-ui-kit";
export default function ListAddGoods({show,setShowAdd, onCloseDemo,refButton}) {
    const {t} = useTranslation();
    const ref = useRef(null);
    const listAddOption = [
        {name: 'add_goods', value: 'add_goods',apiUrl:''},
        {name: 'add_dishes', value: 'add_dishes',apiUrl:''},
        {name: 'add_service', value: 'add_service',apiUrl:''},
        {name: 'add_combo', value: 'add_combo',apiUrl:''},
    ]
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
                setShowAdd(false);
            }
        }

    };
   return(
       <div ref={ref} className={!show ? 'hideGroup':'box addGroup'} >
           {listAddOption.map((item) => {
               return (
                   <div className="item" key={item.name}>
                       <button>
                           <MDBIcon fas icon="add"/>
                           {t(item.name)}
                       </button>
                   </div>
               );
           })}
       </div>
   );
}
