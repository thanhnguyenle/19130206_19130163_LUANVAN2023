import React, {useEffect, useState} from 'react'
import { useTranslation } from "react-i18next";
import '../../assets/style/tableRoom.scss';
import {MDBBtn, MDBDatatable, MDBIcon} from 'mdb-react-ui-kit';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {detailClientRequest, fetchUsersRequest} from "../../store/client/clientSlice";
import {fetchTablesStart} from "../../store/table/tableSlice";

export default function TableRoomPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.order.table.loading);
    const error = useSelector((state: RootState) => state.order.table.error);
    const tables = useSelector((state: RootState) => state.order.table.data);
    const clickableData = {
        columns: [
            { label: t("STT"), field: 'stt' },
            { label: t("Name"), field: 'name' },
            { label: t("NumberOfPeople"), field: 'numberOfPeople' },
            { label: t("Note"), field: 'note' },
            { label: t("status"), field: 'status' },
            { label: t("Action"), field: 'action', sort: false },
        ],
        rows: tables.map((table, index) => ({
            stt: index + 1,
            name: table.name,
            numberOfPeople: table.numberOfPeople+'',
            note: table.note,
            status: table.status,
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
        dispatch(fetchTablesStart());
    }, []);
    const handleReloadData = () => {
        dispatch(fetchTablesStart());
    };
    return (
        <div className='table-room-page row'>
            <div className="right">
                <div className="top">
                    <h4 className="title">{t("rom_table")}</h4>
                    <div className="groupBtn">
                        <MDBBtn className='btn-inventory' color='success' onClick={() => {  }}>
                            <>
                                <MDBIcon fas icon="add" />
                                <span>{t("rom_table")}</span>
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
