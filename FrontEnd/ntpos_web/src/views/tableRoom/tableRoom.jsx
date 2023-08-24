import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import '../../assets/style/tableRoom.scss';
import SearchContent from "../../components/common/searchContent";
import TypeMenu from "../../components/common/typeMenu";
import GroupButton from "../../components/common/groupButton";
import ListGoodsTable from "../../components/common/listGoodsTable";
import AddTableRoom from './component/addTableRoom';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

export default function TableRoomPage() {
    const { t } = useTranslation();
    const [basicModal, setBasicModal] = useState(false);
    const handleSearch = (searchTerm) => {
        console.log('Performing search:', searchTerm);
    };
    return (
        <div className='table-room-page row'>
            <div className="left">
                <SearchContent page='tableRoom' />
                <TypeMenu type='status' handleSearch={handleSearch} />
            </div>
            <div className="right">
                <div className="top">
                    <h4 className="title">{t("room_table")}</h4>
                    <div className="groupBtn">
                        <MDBBtn className='btn-inventory' color='success' onClick={() => { setBasicModal(!basicModal) }}>
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
                </div>
                <div className="center content">
                    <ListGoodsTable page='tableRoom' />
                </div>
            </div>
            {basicModal && <AddTableRoom basicModal={basicModal} setBasicModal={setBasicModal} />}
        </div>
    );
}
