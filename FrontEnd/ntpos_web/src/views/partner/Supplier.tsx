import React, {useEffect} from 'react'
import { useTranslation } from "react-i18next";
import '../../assets/style/supplier.scss';
import {useDispatch, useSelector} from "react-redux";
import {MDBBtn, MDBDatatable, MDBIcon} from "mdb-react-ui-kit";
import {detailClientRequest, fetchUsersRequest} from "../../store/client/clientSlice";
import {RootState} from "../../app/store";
import {fetchSuppliersRequest} from "../../store/supplier/SupplierSlice";

export default function SupplierPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.inventory.supplier.loading);
    const error = useSelector((state: RootState) => state.inventory.supplier.error);
    const suppliers = useSelector((state: RootState) => state.inventory.supplier.suppliers);
    const clickableData = {
        columns: [
            { label: t("STT"), field: 'stt' },
            { label: t("Name"), field: 'name' },
            { label:t("email"), field: 'email' },
            { label: t("phoneNumber"), field: 'phone' },
            { label: t("address"), field: 'address' },
            { label: t("Action"), field: 'action', sort: false },
        ],
        rows: suppliers.map((supplier, index) => ({
            stt: index + 1,
            name: supplier.name,
            email: supplier.email,
            address: supplier.address,
            phone: supplier.phone,
            status: supplier.status,
            action:(
                <>
                    <MDBBtn outline size='sm' floating className='delete-button' style={{color:'red', borderColor:'red'}} onClick={() => {

                    }
                    }>
                        <MDBIcon icon='trash-alt' />
                    </MDBBtn>
                    <span style={{marginLeft:8}}></span>
                    <MDBBtn outline size='sm' floating className='edit-button'  onClick={() => {
                        setTimeout(()=>{
                        },800);
                    }
                    }>
                        <MDBIcon icon='edit' />
                    </MDBBtn>
                </>
            ),
        })),
    };
    useEffect(() => {
        dispatch(fetchSuppliersRequest());
    }, []);
    const handleReloadData = () => {
        dispatch(fetchSuppliersRequest());
    };
    return (
        <div className='supplier-page row'>
            <div className="right">
                <div className="top">
                    <h4 className="title">{t("supplier")}</h4>
                    <div className="groupBtn">
                        <MDBBtn className='btn-inventory' color='success' onClick={() => { }}>
                            <>
                                <MDBIcon fas icon="add" />
                                <span>{t("supplier")}</span>
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
                                advancedSearch={(value: string) => {
                                    const string = value.split(' in:').map((str: string) => str.trim());
                                    const phrase = string[0];
                                    let columns: string | string[] = string[1];
                                    if (columns) {
                                        columns = columns.split(',').map((str: string) => str.toLowerCase().trim());
                                    }
                                    return { phrase, columns };
                                }}
                                placeholder="Demo"
                                maxHeight='470px'
                                maxWidth='98%'
                                selectable
                                hover
                                advancedData={true}
                                data={clickableData} >
                            </MDBDatatable>
                    }
                </div>
            </div>
        </div>
    );
}
