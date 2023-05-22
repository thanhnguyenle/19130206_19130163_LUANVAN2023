const products = [
    {
        idProduct: 'SP0001',
        name: 'Bánh xèo đặc sản miền tây',
        image: 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_12_17_nhung-mon-ngon-viet-nam-khien-ban-be-quoc-te-phai-ngo-ngang-1.jpg',
        price: 54000,
        costPrice: 30000,
        numberInventory: 2000
    },
    {
        idProduct: 'SP0002',
        name: 'Bánh hỏi combo1',
        image: 'https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyendoan/anh-blog/am-thuc-da-nang/am-thuc-da-nang-kham-pha-the-gioi-mon-an-da-dang-1.jpg',
        price: 95000,
        costPrice: 60000,
        numberInventory: 100
    },
    {
        idProduct: 'SP0003',
        name: 'Bánh xèo đặc sản miền tây',
        image: 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_12_17_nhung-mon-ngon-viet-nam-khien-ban-be-quoc-te-phai-ngo-ngang-1.jpg',
        price: 54000,
        costPrice: 30000,
        numberInventory: 2000
    },
    {
        idProduct: 'SP0004',
        name: 'Bánh hỏi combo1',
        image: 'https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyendoan/anh-blog/am-thuc-da-nang/am-thuc-da-nang-kham-pha-the-gioi-mon-an-da-dang-1.jpg',
        price: 95000,
        costPrice: 30000,
        numberInventory: 100
    },
    {
        idProduct: 'SP0005',
        name: 'Bánh xèo đặc sản miền tây',
        image: 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_12_17_nhung-mon-ngon-viet-nam-khien-ban-be-quoc-te-phai-ngo-ngang-1.jpg',
        price: 54000,
        costPrice: 30000,
        numberInventory: 2000
    },
    {
        idProduct: 'SP0006',
        name: 'Bánh hỏi combo1',
        image: 'https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyendoan/anh-blog/am-thuc-da-nang/am-thuc-da-nang-kham-pha-the-gioi-mon-an-da-dang-1.jpg',
        price: 95000,
        costPrice: 30000,
        numberInventory: 100
    },
    {
        idProduct: 'SP0007',
        name: 'Bánh xèo đặc sản miền tây',
        image: 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_12_17_nhung-mon-ngon-viet-nam-khien-ban-be-quoc-te-phai-ngo-ngang-1.jpg',
        price: 54000,
        costPrice: 30000,
        numberInventory: 2000
    },
    {
        idProduct: 'SP0008',
        name: 'Bánh hỏi combo1',
        image: 'https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyendoan/anh-blog/am-thuc-da-nang/am-thuc-da-nang-kham-pha-the-gioi-mon-an-da-dang-1.jpg',
        price: 95000,
        costPrice: 30000,
        numberInventory: 100
    },
    {
        idProduct: 'SP0009',
        name: 'Bánh xèo đặc sản miền tây',
        image: 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_12_17_nhung-mon-ngon-viet-nam-khien-ban-be-quoc-te-phai-ngo-ngang-1.jpg',
        price: 54000,
        costPrice: 30000,
        numberInventory: 2000
    },
    {
        idProduct: 'SP0010',
        name: 'Bánh hỏi combo1',
        image: 'https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyendoan/anh-blog/am-thuc-da-nang/am-thuc-da-nang-kham-pha-the-gioi-mon-an-da-dang-1.jpg',
        price: 95000,
        costPrice: 30000,
        numberInventory: 100
    },
    {
        idProduct: 'SP0011',
        name: 'Bánh xèo đặc sản miền tây',
        image: 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_12_17_nhung-mon-ngon-viet-nam-khien-ban-be-quoc-te-phai-ngo-ngang-1.jpg',
        price: 54000,
        costPrice: 30000,
        numberInventory: 2000
    },
    {
        idProduct: 'SP0012',
        name: 'Bánh hỏi combo1',
        image: 'https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyendoan/anh-blog/am-thuc-da-nang/am-thuc-da-nang-kham-pha-the-gioi-mon-an-da-dang-1.jpg',
        price: 95000,
        costPrice: 30000,
        numberInventory: 100
    },

]
const traDon = [
    {
        id: 'TH0001',
        ngay: '01/09/2001',
        tongtienhantra: 90000,
        giamgiahgoadon: 0,
        tongdagiamgia: 90000,
        phitarhang: 0,
        cantrakhach: 90000,
        tientrakhach: 0,
        nguoitao: 'NguyenLeThanh',
        trangThai: 'Đã trả',
    },
    {
        id: 'TH0002',
        ngay: '01/09/2001',
        tongtienhantra: 90000,
        giamgiahgoadon: 0,
        tongdagiamgia: 90000,
        phitarhang: 0,
        cantrakhach: 90000,
        tientrakhach: 0,
        nguoitao: 'NguyenLeThanh',
        trangThai: 'Đã trả',
    },
    {
        id: 'TH0003',
        ngay: '01/09/2001',
        tongtienhantra: 90000,
        giamgiahgoadon: 0,
        tongdagiamgia: 90000,
        phitarhang: 0,
        cantrakhach: 90000,
        tientrakhach: 0,
        nguoitao: 'NguyenLeThanh',
        trangThai: 'Đã trả',
    },
]
const phieuNHap = [
    {
        id: 'PN0001',
        time: '23/09/2021',
        namDL: 'QuanLy',
        price: 90000,
        status: 'Đã nhập hàng',
    },
    {
        id: 'PN0002',
        time: '23/09/2021',
        namDL: 'QuanLy',
        price: 90000,
        status: 'Đã nhập hàng',
    },
    {
        id: 'PN0003',
        time: '23/09/2021',
        namDL: 'QuanLy',
        price: 90000,
        status: 'Đã nhập hàng',
    }
];
const phieuTra = [
    {
        id: 'PTN0001',
        time: '23/09/2021',
        namDL: 'QuanLy',
        price: 90000,
        status: 'Đã nhập hàng',
    },
    {
        id: 'PTN0002',
        time: '23/09/2021',
        namDL: 'QuanLy',
        price: 90000,
        status: 'Đã nhập hàng',
    },
    {
        id: 'PTN0003',
        time: '23/09/2021',
        namDL: 'QuanLy',
        price: 90000,
        status: 'Đã nhập hàng',
    }
]

export { products, traDon, phieuNHap, phieuTra }