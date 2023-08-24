import React, { useRef, useState } from "react";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import ListAddGoods from "./listAddGoods";
import ListFilterContent from "./listFilterContent";
import { useTranslation } from "react-i18next";
export default function GroupButton(props) {
    const listPage = [
        { page: 'category', apiUrl: '' },
        { page: 'priceSetting', apiUrl: '' },
        { page: 'inventoryControl', apiUrl: '' },
    ]
    const { t } = useTranslation();
    const [showFilter, setShowFilter] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const refButtonFilter = useRef(null);
    const refButtonAdd = useRef(null);
    if (props.page === 'category') {
        return (
            <div className="groupBtn">
                <MDBBtn ref={refButtonAdd} className='btn-add' color='success' onClick={() => {
                    setShowAdd(showAdd)
                }
                }>
                    <>
                        <MDBIcon fas icon="plus" />
                        <span>{t("add")}</span>
                        <MDBIcon fas icon="sort-down" />
                    </>
                </MDBBtn>
                <ListAddGoods show={showAdd} setShowAdd={setShowAdd} refButton={refButtonAdd} onCloseDemo={() => {
                    setShowAdd(!showAdd);
                }} />
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
            </div>
        );
    }
    else if (props.page === 'priceSetting') {
        return (
            <div className="groupBtn">
                <MDBBtn className='btn-export' color='success'>
                    <>
                        <MDBIcon fas icon="file-export" />
                        <span>{t("export_file")}</span>
                    </>
                </MDBBtn>
            </div>
        );
    }
    else if (props.page === 'inventoryControl') {
        return (
            <div className="groupBtn">
                <MDBBtn className='btn-inventory' color='success'>
                    <>
                        <MDBIcon fas icon="add" />
                        <span>{t("inventory_control")}</span>
                    </>
                </MDBBtn>
                <MDBBtn className='btn-export' color='success'>
                    <>
                        <MDBIcon fas icon="file-export" />
                        <span>{t("export_file")}</span>
                    </>
                </MDBBtn>
            </div>
        )
    }
    else if (props.page === 'tableRoom') {
        return (
            <div className="groupBtn">
                <MDBBtn className='btn-inventory' color='success'>
                    <>
                        <MDBIcon fas icon="add" />
                        <span>{t("add_room_table")}</span>
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
            </div>
        )
    }
    else if (props.page === 'bill') {
        return (
            <div className="groupBtn">
                <MDBBtn className='btn-inventory' color='success'>
                    <>
                        <MDBIcon fas icon="add" />
                        <span>{t("take_orders")}</span>
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
            </div>
        )

    }
    else if (props.page === 'returnOrder') {
        return (
            <div className="groupBtn">
                <MDBBtn className='btn-inventory' color='success'>
                    <>
                        <MDBIcon fas icon="add" />
                        <span>{t("returns")}</span>
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
            </div>
        )

    }
    else if (props.page === 'material_return') {
        return (
            <div className="groupBtn">
                <MDBBtn className='btn-inventory' color='success'>
                    <>
                        <MDBIcon fas icon="add" />
                        <span>{t("return_of_imported_goods")}</span>
                    </>
                </MDBBtn>
                <MDBBtn className='btn-export' color='success'>
                    <>
                        <MDBIcon fas icon="file-export" />
                        <span>{t("export_file")}</span>
                    </>
                </MDBBtn>
            </div>
        )

    }
    else if (props.page === 'cancellation') {
        return (
            <div className="groupBtn">
                <MDBBtn className='btn-inventory' color='success'>
                    <>
                        <MDBIcon fas icon="add" />
                        <span>{t("create_votes")}</span>
                    </>
                </MDBBtn>
                <MDBBtn className='btn-export' color='success'>
                    <>
                        <MDBIcon fas icon="file-export" />
                        <span>{t("export_file")}</span>
                    </>
                </MDBBtn>
            </div>
        )

    }
    else if (props.page === 'import_goods') {
        return (
            <div className="groupBtn">
                <MDBBtn className='btn-inventory' color='success'>
                    <>
                        <MDBIcon fas icon="add" />
                        <span>{t("import_goods")}</span>
                    </>
                </MDBBtn>
                <MDBBtn className='btn-export' color='success'>
                    <>
                        <MDBIcon fas icon="file-export" />
                        <span>{t("export_file")}</span>
                    </>
                </MDBBtn>
            </div>
        )

    }
    else if (props.page === 'client-page') {
        return (
            <div className="groupBtn">
                <MDBBtn className='btn-inventory' color='success'>
                    <>
                        <MDBIcon fas icon="add" />
                        <span>{t("client")}</span>
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
            </div>
        )

    }
    else if (props.page === 'supplier-page') {
        return (
            <div className="groupBtn">
                <MDBBtn className='btn-inventory' color='success'>
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
            </div>
        )

    }
    else if (props.page === 'cashBook-page') {
        return (
            <div className="groupBtn">
                <MDBBtn className='btn-inventory' color='success'>
                    <>
                        <MDBIcon fas icon="add" />
                        <span>{t("make_a_receipt")}</span>
                    </>
                </MDBBtn>
                <MDBBtn className='btn-inventory' color='success'>
                    <>
                        <MDBIcon fas icon="add" />
                        <span>{t("make_a_vote")}</span>
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
            </div>
        )

    }
}
