import React, {useRef, useState} from "react";
import {MDBBtn, MDBIcon} from "mdb-react-ui-kit";
import ListAddGoods from "./listAddGoods";
import ListFilterContent from "./listFilterContent";
import {useTranslation} from "react-i18next";
export default function GroupButton(props){
    const listPage=[
        {page:'category',apiUrl:''},
        {page:'priceSetting',apiUrl:''},
        {page:'inventoryControl',apiUrl:''},
    ]
    const {t} = useTranslation();
    const [showFilter, setShowFilter] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const refButtonFilter = useRef(null);
    const refButtonAdd = useRef(null);
    if(props.page === 'category'){
        return (
            <div className="groupBtn">
                <MDBBtn ref={refButtonAdd} className='btn-add' color='success' onClick={()=> {
                    setShowAdd(showAdd)
                }
                }>
                    <>
                        <MDBIcon fas icon="plus" />
                        <span>{t("add")}</span>
                        <MDBIcon fas icon="sort-down" />
                    </>
                </MDBBtn>
                <ListAddGoods show={showAdd} setShowAdd={setShowAdd} refButton={refButtonAdd} onCloseDemo={()=>{
                    setShowAdd(!showAdd);
                }}/>
                <MDBBtn className='btn-import' color='success'>
                    <>
                        <MDBIcon fas icon="file-import" />
                        <span>{t("import_file")}</span>
                    </>
                </MDBBtn>
                <MDBBtn className='btn-export' color='success'>
                    <>
                        <MDBIcon fas icon="file-export" />
                        <span>{t("export_file")}</span>
                    </>
                </MDBBtn>
                <MDBBtn ref={refButtonFilter} className='btn-filter' color='success' title={t("option")}
                        onClick={()=>{
                            setShowFilter(showFilter)
                        }}>
                    <>
                        <MDBIcon fas icon="filter" />
                        <MDBIcon fas icon="sort-down" />
                    </>
                </MDBBtn>
                <ListFilterContent show={showFilter} page='category' refButton={refButtonFilter} setShowFilter={setShowFilter} onCloseDemo={()=>{
                    setShowFilter(!showFilter);
                }}/>
            </div>
        );
    }
    else if(props.page === 'priceSetting'){
       return (
           <div className="groupBtn">
               <MDBBtn className='btn-export'  color='success'>
                   <>
                       <MDBIcon fas icon="file-export" />
                       <span>{t("export_file")}</span>
                   </>
               </MDBBtn>
               <MDBBtn ref={refButtonFilter} className='btn-filter' color='success' title={t("option")}
                       onClick={()=>{
                           setShowFilter(showFilter)
                       }}>
                   <>
                       <MDBIcon fas icon="filter" />
                       <MDBIcon fas icon="sort-down" />
                   </>
               </MDBBtn>
               <ListFilterContent page='priceSetting' show={showFilter} refButton={refButtonFilter} setShowFilter={setShowFilter} onCloseDemo={()=>{
                   setShowFilter(!showFilter) ;
               }}/>
           </div>
       );
    }
    else if(props.page === 'inventoryControl'){
        return (
            <div className="groupBtn">
                <MDBBtn className='btn-inventory'  color='success'>
                    <>
                        <MDBIcon fas icon="add" />
                        <span>{t("inventory_control")}</span>
                    </>
                </MDBBtn>
                <MDBBtn className='btn-export'  color='success'>
                    <>
                        <MDBIcon fas icon="file-export" />
                        <span>{t("export_file")}</span>
                    </>
                </MDBBtn>
                <MDBBtn ref={refButtonFilter} className='btn-filter' color='success' title={t("option")}
                        onClick={()=>{
                            setShowFilter(showFilter)
                        }}>
                    <>
                        <MDBIcon fas icon="filter" />
                        <MDBIcon fas icon="sort-down" />
                    </>
                </MDBBtn>
                <ListFilterContent page='inventoryControl' show={showFilter} refButton={refButtonFilter} setShowFilter={setShowFilter} onCloseDemo={()=>{
                    setShowFilter(!showFilter) ;
                }}/>
            </div>
        )
    }
}
