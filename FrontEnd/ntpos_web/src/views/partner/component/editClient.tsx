import React, {ChangeEvent, useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBSelect
} from 'mdb-react-ui-kit';
import { useTranslation } from 'react-i18next';
import avatar1 from '../../../assets/images/avatar1.png'
import {District, Provinces, useDistricts, useProvinces, useWards, Ward} from "../../../hook/reatApi";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {editClientRequest} from "../../../store/client/clientSlice";
const host = "https://provinces.open-api.vn/api/";
export default function EditClient({ basicModal, setBasicModal , onLoad}: any) {
    const dispatch = useDispatch();
    const user = useSelector((state:RootState) => state.client.users.user);
    const id = user.id;
    const groupList = useSelector((state: RootState) => state.client.groups.groups);
    const { t } = useTranslation();
    const [username, setUsername] = useState(user.username);
    const [name, setName] = useState(user.name);
    const [email,setEmail] = useState(user?.email);
    const [address,setAddress] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const provinces = useProvinces();
    const [districts,setDistricts] = useState<District[]>([]);
    const [wards,setWards] = useState<Ward[]>([]);
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [avatar,setAvatar] = useState('');
    const [groups, setGroups] = useState<string[] | null>();
    const [fileImage, setFileImage] = useState<File | null>(null);
    useEffect(() => {
        splitAddress(user.address);
    }, [dispatch]);
    useEffect(() => {
        console.log('Xuất avatar ' + avatar);
    }, [avatar]);
    const handleUpload = async () => {
        if (fileImage) {
            try {
                const imageUrl = await uploadImage(fileImage);
                setAvatar(imageUrl);
            } catch (error) {
                // Xử lý lỗi nếu có
            }
        }
    };
     function handleEditClient() {
      dispatch(editClientRequest({
          id,
          username,
          name,
          email,
          phoneNumber,
          address:getAddress(address,ward,district,province)}))
    }
    const handleProvinceChange = (event: any) => {
        const selectedProvinceCode = event.target.value;
        const selectedProvinceName = event.target.options[event.target.selectedIndex].getAttribute("label");
        setProvince(selectedProvinceName);
        fetchDataDistrict(selectedProvinceCode);
        console.log(selectedProvinceName);
    };
    const handleDistrictsChange = (event: any) => {
        const selectedDistrictCode = event.target.value;
        const selectedDistrictName = event.target.options[event.target.selectedIndex].getAttribute("label");
        setDistrict(selectedDistrictName);
        fetchDataWard(selectedDistrictCode);
        console.log(selectedDistrictName);
    };
    const handleWardsChange = (event: any) => {
        const selectedWardCode = event.target.value;
        const selectedWardName = event.target.options[event.target.selectedIndex].getAttribute("label");
        setWard(selectedWardName);
        console.log(selectedWardName);
    };
    const handleChange = (event: any,setObject:any) => {
        setObject(event.target.value);
    };
    const toggleShow = () => setBasicModal(!basicModal);
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileImage(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                const target = event.target;
                if (target) {
                    setSelectedImage(target.result + '');
                }
            };
            reader.readAsDataURL(file);
        }
    };
    async function uploadImage(fileImageNew:File) : Promise<string> {
        try {
            if(!fileImageNew){
                return '';
            }
            const formData = new FormData();
            formData.append('image', fileImageNew); // 'image' là tên trường trên server để nhận hình ảnh, bạn có thể thay đổi nếu cần.
            const response = await axios.post('https://4cb1-27-65-196-160.ngrok-free.app/api/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            console.log('Kết quả từ server:', response.data.url);
            return `https://4cb1-27-65-196-160.ngrok-free.app${response.data.url}`;
        } catch (error) {
            console.error('Lỗi khi gửi hình ảnh:', error);
            throw error;
        }
    }
    const getAddress = (diaChi:string, xa:string, quan:string,tinh:string) =>{
        return diaChi +', '+ xa +', '+quan+', '+tinh;
    }

    const fetchDataDistrict = async (code: number | undefined) => {
        try {
            const response = await fetch('https://provinces.open-api.vn/api/p/'+code+'?depth=2');
            const data = await response.json();
            setDistricts(data.districts);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };
    const fetchDataWard = async (code: number | undefined) => {
        try {
            const response = await fetch('https://provinces.open-api.vn/api/d/'+code+'?depth=2');
            const data = await response.json();
            setWards(data.wards);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };
    const splitAddress = (addressString:string) => {
        const addressArray = addressString.split(',');
        if (addressArray.length === 4) {
            const diaChi = addressArray[0];
            const xa = addressArray[1];
            const quan = addressArray[2];
            const tinh = addressArray[3];
            setAddress(diaChi);
            setWard(xa);
            setDistrict(quan);
            setProvince(tinh);
        } else {
            return null;
        }
    };

    return (
        <>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog size='lg'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{t("edit_client")}</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody className='contentBody'>
                            <div className='div1'>
                                <h6 className=''>{t('avatar')}</h6>
                                <label htmlFor="imageInput" className="file-input-label">
                                    {selectedImage ? (
                                        <img src={selectedImage} alt="Selected Avatar" style={{ width: '80%' }} />
                                    ) : (
                                        <img src={avatar1} alt="Selected Avatar" style={{ width: '80%'}} />
                                    )}
                                </label>
                                <input type="file" id="imageInput" accept="image/*" onChange={handleImageChange} className="file-input" />
                            </div >
                            <div className='div2'>
                                <div className='item1 row'>
                                    <h6 className='col-4'>{t('username')}</h6>
                                    <div className="form-outline col-8">
                                        <MDBInput
                                            label={t('username')}
                                            type='text'
                                            aria-describedby='userName'
                                            value={username}
                                            onChange={(event) => handleChange(event, setUsername)}
                                        />
                                    </div>
                                </div>
                                <div className='item1 row'>
                                    <h6 className='col-4'>{t('name')}</h6>
                                    <div className="form-outline col-8">
                                        <MDBInput
                                            label={t('name')}
                                            type='text'
                                            aria-describedby='name'
                                            value={name}
                                            onChange={(event) => handleChange(event,setName)}
                                        />
                                    </div>
                                </div>
                                <div className='item1 row'>
                                    <h6 className='col-4'>{t('email')}</h6>
                                    <div className="form-outline col-8">
                                        <MDBInput
                                            label={t('email')}
                                            type='text'
                                            aria-describedby='email'
                                            value={email}
                                            onChange={(event) => handleChange(event,setEmail)}
                                        />
                                    </div>
                                </div>
                                <div className='item1 row'>
                                    <h6 className='col-4'>{t('phoneNumber')}</h6>
                                    <div className="form-outline col-8">
                                        <MDBInput
                                            label={t('phoneNumber')}
                                            type='text'
                                            aria-describedby='phoneNumber'
                                            value={phoneNumber}
                                            onChange={(event) => handleChange(event,setPhoneNumber)}
                                        />
                                    </div>
                                </div>
                                <div className='item1 row'>
                                    <h6 className='col-4'>{t('address')}</h6>
                                    <div className="form-outline col-8">
                                        <MDBInput
                                            label={t('address')}
                                            type='text'
                                            aria-describedby='address'
                                            value={address}
                                            onChange={(event) => handleChange(event,setAddress)}
                                        />
                                    </div>
                                </div>
                                <div className='item1 row'>
                                    <h6 className='col-4'>{t('provinces')}</h6>
                                    <div className="form-outline col-8">
                                        <select onChange={handleProvinceChange} className='col-12 form-outline'>
                                            <option value="">{province}</option>
                                            {provinces.map((province:Provinces) => (
                                                <option key={province.code} value={province.code} label={province.name}>
                                                    {province.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='item1 row'>
                                    <h6 className='col-4'>{t('district')}</h6>
                                    <div className="form-outline col-8">
                                        <select onChange={handleDistrictsChange} className='col-12 form-outline'>
                                            <option value="">{district}</option>
                                            {districts.map((district:District) => (
                                                <option key={district.code} value={district.code} label={district.name}>
                                                    {district.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='item1 row'>
                                    <h6 className='col-4'>{t('wards')}</h6>
                                    <div className="form-outline col-8">
                                        <select onChange={handleWardsChange} className='col-12 form-outline'>
                                            <option value="">{ward}</option>
                                            {wards.map((ward:Ward) => (
                                                <option key={ward.code} value={ward.code} label={ward.name}>
                                                    {ward.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='muted' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn className='btn-success' onClick={()=>{
                                handleEditClient();
                                setTimeout(()=>{
                                    onLoad();
                                },2000)
                            }
                            }>{t("add")}</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}
