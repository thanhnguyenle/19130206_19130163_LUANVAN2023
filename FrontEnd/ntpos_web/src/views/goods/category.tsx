import React, {useEffect, useRef, useState} from "react";
import '../../assets/style/goods.scss';
import {useTranslation} from "react-i18next";
import {MDBBtn, MDBDatatable, MDBIcon} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {detailClientRequest, fetchUsersRequest} from "../../store/client/clientSlice";
import {fetchProductsStart} from "../../store/product/productSlice";

export default function CategoryPage() {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.product.productsSevice.loading);
    const error = useSelector((state: RootState) => state.product.productsSevice.error);
    const products = useSelector((state: RootState) => state.product.productsSevice.products);
    const clickableData = {
        columns: [
            { label: 'Stt', field: 'stt' },
            { label: 'Name', field: 'name' },
            { label: 'Quantity', field: 'quantity' },
            { label: 'Price', field: 'price' },
            { label: 'Unit', field: 'unit' },
            { label: 'Status', field: 'status' },
            { label: 'Action', field: 'action', sort: false },
        ],
        rows: products.map((product, index) => ({
            stt: index + 1,
            name: product.name,
            quantity: product.quantity+'',
            price: product.price+'',
            unit: product.unit+'',
            status: product.status,
            action:(
                <>
                    <MDBBtn outline size='sm' floating className='delete-button' style={{color:'red', borderColor:'red'}} onClick={() => {
                        // setIdUser(user.id);
                        // toggleShow();
                    }
                    }>
                        <MDBIcon icon='trash-alt' />
                    </MDBBtn>
                    <span style={{marginLeft:8}}></span>
                    <MDBBtn outline size='sm' floating className='edit-button'  onClick={() => {
                        // dispatch(detailClientRequest(user.id));
                        setTimeout(()=>{
                            // setEditBasicModal(!editBasicModal);
                        },800);
                    }
                    }>
                        <MDBIcon icon='edit' />
                    </MDBBtn>
                </>
            ),
        })),
    };
    const handleReloadData = () => {
        dispatch(fetchProductsStart());
    };
    useEffect(() => {
        dispatch(fetchProductsStart());
    }, []);
    return (
        <div className="categoryPage row">
                <div className="right">
                    <div className="top">
                        <h4 className="title">{t("product")}</h4>
                        <div className="groupBtn">
                            <MDBBtn className='btn-inventory' color='success' onClick={() => { }}>
                                <>
                                    <MDBIcon fas icon="add" />
                                    <span>{t("product")}</span>
                                </>
                            </MDBBtn>
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
                            <MDBBtn className='' onClick={() => handleReloadData()} color='success'>
                                {t("reload_data")}
                                <MDBIcon icon='sync' className='ms-2' />
                            </MDBBtn>
                        </div>
                    </div>
                    <div className="center content">
                        {
                            loading ? <h6>Loading ...</h6> :
                                <MDBDatatable
                                    placeholder="Demo"
                                    maxHeight='470px'
                                    maxWidth='98%'
                                    selectable
                                    hover
                                    data={clickableData}
                                    advancedData={true}
                                    advancedSearch={(value: string) => {
                                        const string = value.split(' in:').map((str: string) => str.trim());
                                        const phrase = string[0];
                                        let columns: string | string[] = string[1];
                                        if (columns) {
                                            columns = columns.split(',').map((str: string) => str.toLowerCase().trim());
                                        }
                                        return { phrase, columns };
                                    }}
                                     >
                                </MDBDatatable>
                        }
                    </div>
            </div>
        </div>
    )
}
