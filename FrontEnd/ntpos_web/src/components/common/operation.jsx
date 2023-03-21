import React, {useEffect, useRef, useState} from "react";
import {MDBBtn, MDBIcon} from "mdb-react-ui-kit";
import {useTranslation} from "react-i18next";
export default function Operation(props) {
    const {t} = useTranslation();
    const ref = useRef(null);
    const refButton = useRef(null);
    const [show,setShow] = useState(false)
    useEffect(() => {
        document.addEventListener('click', onClickOutside, true);
        return () => {
            document.removeEventListener('click', onClickOutside, true);
        };
    }, [setShow]);
    const onClickOutside = (e) => {
        const element = e.target;
        if(refButton.current && !refButton.current.contains(element)){
            if (ref.current && !ref.current.contains(element)) {
                setShow(false);
            }
        }
    };

    return (
        <>
            <div className="operation row">
                <h6 className="col-5">{t('have')}<span>1</span> {t('selected')}</h6>
                <button className='col-1'><MDBIcon  fas icon="times" /></button>
                <MDBBtn ref={refButton} className='btn-import col-5' color='success' onClick={()=>{
                    setShow(!show);
                }}>
                    <>
                        <MDBIcon fas icon="ellipsis-v" />
                        <span>{t("operation")}</span>
                        <MDBIcon fas icon="sort-down" />
                    </>
                </MDBBtn>
            </div>
            <div className={show? "box listOperation": "hide"} ref={ref}>
                <button >
                    <MDBIcon fas icon="external-link-alt"/>
                    {t('change_group_of_goods')}
                </button>
                <button >
                    <MDBIcon fas icon="random"/>
                    {t('change_menu_type')}
                </button>
                <button >
                    <MDBIcon fas icon="barcode"/>
                    {t('bar_code_printing')}
                </button>
                <button >
                    <MDBIcon fas icon="file-export"/>
                    {t('export_file')}
                </button>
                <button >
                    <MDBIcon fas icon="trash-alt" />
                    {t('delete_goods')}
                </button>
            </div>
        </>
    );
}
