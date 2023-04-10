const products = [
    {
        name: 'Cá viên chiên',
        price: 56,
        imgUrl: "https://dulichvietnam.com.vn/vnt_upload/File/Image/quan_ca_vien_chien_o_tphcm.jpg",
    },
    {
        name: 'Gà rán',
        price: 55,
        imgUrl: "https://cdn.tgdd.vn/Files/2021/01/13/1320026/cach-lam-ga-ran-kfc-bang-noi-chien-khong-dau-gion-rum-an-khong-ngay-202202231031137197.jpg",
    },
    {
        name: 'Mì cay',
        price: 89000,
        imgUrl: "https://cachnau.vn/wp-content/uploads/2022/03/cach-nau-mi-cay-cap-do.jpg",
    },
    {
        name: 'Tokbokki',
        price: 50000,
        imgUrl: "https://i-giadinh.vnecdn.net/2021/08/20/nh2-1629451568-2958-1629451610.jpg",
    },
    {
        name: 'Bún mắm nêm',
        price: 51000,
        imgUrl: "http://nethue.com.vn/uploaded/san%20pham/bun%20mam%20nem.jpg",
    },
    {
        name: 'Bánh mì',
        price: 52000,
        imgUrl: "https://cdn.daotaobeptruong.vn/wp-content/uploads/2021/01/banh-mi-viet-nam.jpg",
    },
    {
        name: 'Cá viên chiên',
        price: 56000,
        imgUrl: "https://dulichvietnam.com.vn/vnt_upload/File/Image/quan_ca_vien_chien_o_tphcm.jpg",
    },
    {
        name: 'Gà rán',
        price: 55000,
        imgUrl: "https://cdn.tgdd.vn/Files/2021/01/13/1320026/cach-lam-ga-ran-kfc-bang-noi-chien-khong-dau-gion-rum-an-khong-ngay-202202231031137197.jpg",
    },
    {
        name: 'Mì cay',
        price: 51000,
        imgUrl: "https://cachnau.vn/wp-content/uploads/2022/03/cach-nau-mi-cay-cap-do.jpg",
    },
    {
        name: 'Tokbokki',
        price: 50555,
        imgUrl: "https://i-giadinh.vnecdn.net/2021/08/20/nh2-1629451568-2958-1629451610.jpg",
    },
    {
        name: 'Bún mắm nêm',
        price: 51233,
        imgUrl: "http://nethue.com.vn/uploaded/san%20pham/bun%20mam%20nem.jpg",
    },
    {
        name: 'Bánh mì',
        price: 52333,
        imgUrl: "https://cdn.daotaobeptruong.vn/wp-content/uploads/2021/01/banh-mi-viet-nam.jpg",
    },
];
const carousels = [
    {
        imgUrl: "https://pasgo.vn/Upload/anh-slide-show/sushi-world---thuc-don-mon-nhat-da-dang-mon-an-va-luon-dam-bao-do-tuoi-ngon-124575781672.jpg",
    },
    {
        imgUrl: "https://pasgo.vn/Upload/anh-slide-show/galbi-house---buffet-nuong-lau-han-quoc-178760781659.jpg",
    },
    {
        imgUrl: "https://pasgo.vn/Upload/anh-slide-show/pho-79---am-thuc-doc-dao-trong-khong-gian-sang-trong-167295001589.jpg",
    },
    {
        imgUrl: "https://pasgo.vn/Upload/anh-slide-show/bo-to-tay-ninh-nam-sanh-pham-hung---chuyen-bo-to-180971951661.jpg",
    },
];

const categorys = [
    {
        type: 1,
        name: 'Nhà hàng',
        list: [
            {
                title: 'Nướng',
                imageUrl: 'https://i.imgur.com/SV7Sn1K.png'
            },
            {
                title: 'Lẩu',
                imageUrl: 'https://i.imgur.com/xHDFRUH.png'
            },
            {
                title: 'Hải sản',
                imageUrl: 'https://i.imgur.com/nSOCRh5.png'
            },
            {
                title: 'Đồ uống',
                imageUrl: 'https://i.imgur.com/vL2IfKu.png'
            }
        ]
    },
    {
        type: 2,
        name: 'Quán nước',
        list: [
            {
                title: 'Đồ uống nóng',
                imageUrl: 'https://i.imgur.com/YxdPvzG.png'
            },
            {
                title: 'Sinh tố',
                imageUrl: 'https://i.imgur.com/gvQKZuz.png'
            },
            {
                title: 'Soda',
                imageUrl: 'https://i.imgur.com/fAYOgfy.png'
            },
            {
                title: 'Trà sữa',
                imageUrl: 'https://i.imgur.com/7CIrwjR.png'
            }
        ]
    }

]
const blogs = [
    {
        title: 'Tuyển dụng lập trình Flutter App Developer',
        description: 'PasGo là một Start up về dịch vụ đặt chỗ nhà hàng trực tuyến và lấy các ưu đãi ăn uống miễn phí, chúng tôi đang cần tuyển thêm đội ngũ quản lý, hỗ trợ và chăm sóc các Đối tác để việc hợp tác là hiệu quả',
        imgUrl: "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyenhuong/tuyendungflutterappdeveloper/tuyen-dung-2-2.jpg",
    },
    {
        title: 'Tuyển dụng lập trình Flutter App Developer',
        description: 'PasGo là một Start up về dịch vụ đặt chỗ nhà hàng trực tuyến và lấy các ưu đãi ăn uống miễn phí, chúng tôi đang cần tuyển thêm đội ngũ quản lý, hỗ trợ và chăm sóc các Đối tác để việc hợp tác là hiệu quả',
        imgUrl: "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyenhuong/tuyendungflutterappdeveloper/tuyen-dung-2-2.jpg",
    },
    {
        title: 'Tuyển dụng lập trình Flutter App Developer',
        description: 'PasGo là một Start up về dịch vụ đặt chỗ nhà hàng trực tuyến và lấy các ưu đãi ăn uống miễn phí, chúng tôi đang cần tuyển thêm đội ngũ quản lý, hỗ trợ và chăm sóc các Đối tác để việc hợp tác là hiệu quả',
        imgUrl: "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyenhuong/tuyendungflutterappdeveloper/tuyen-dung-2-2.jpg",
    },
    {
        title: 'Tuyển dụng lập trình Flutter App Developer',
        description: 'PasGo là một Start up về dịch vụ đặt chỗ nhà hàng trực tuyến và lấy các ưu đãi ăn uống miễn phí, chúng tôi đang cần tuyển thêm đội ngũ quản lý, hỗ trợ và chăm sóc các Đối tác để việc hợp tác là hiệu quả',
        imgUrl: "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyenhuong/tuyendungflutterappdeveloper/tuyen-dung-2-2.jpg",
    },
    {
        title: 'Tuyển dụng lập trình Flutter App Developer',
        description: 'PasGo là một Start up về dịch vụ đặt chỗ nhà hàng trực tuyến và lấy các ưu đãi ăn uống miễn phí, chúng tôi đang cần tuyển thêm đội ngũ quản lý, hỗ trợ và chăm sóc các Đối tác để việc hợp tác là hiệu quả',
        imgUrl: "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyenhuong/tuyendungflutterappdeveloper/tuyen-dung-2-2.jpg",
    },
    {
        title: 'Tuyển dụng lập trình Flutter App Developer',
        description: 'PasGo là một Start up về dịch vụ đặt chỗ nhà hàng trực tuyến và lấy các ưu đãi ăn uống miễn phí, chúng tôi đang cần tuyển thêm đội ngũ quản lý, hỗ trợ và chăm sóc các Đối tác để việc hợp tác là hiệu quả',
        imgUrl: "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyenhuong/tuyendungflutterappdeveloper/tuyen-dung-2-2.jpg",
    },
    {
        title: 'Tuyển dụng lập trình Flutter App Developer',
        description: 'PasGo là một Start up về dịch vụ đặt chỗ nhà hàng trực tuyến và lấy các ưu đãi ăn uống miễn phí, chúng tôi đang cần tuyển thêm đội ngũ quản lý, hỗ trợ và chăm sóc các Đối tác để việc hợp tác là hiệu quả',
        imgUrl: "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyenhuong/tuyendungflutterappdeveloper/tuyen-dung-2-2.jpg",
    },
    {
        title: 'Tuyển dụng lập trình Flutter App Developer',
        description: 'PasGo là một Start up về dịch vụ đặt chỗ nhà hàng trực tuyến và lấy các ưu đãi ăn uống miễn phí, chúng tôi đang cần tuyển thêm đội ngũ quản lý, hỗ trợ và chăm sóc các Đối tác để việc hợp tác là hiệu quả',
        imgUrl: "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyenhuong/tuyendungflutterappdeveloper/tuyen-dung-2-2.jpg",
    },
]
const typeTable = [
    {
        id: 1,
        name: 'Bàn thường'
    },
    {
        id: 2,
        name: 'Bàn vip'
    },
    {
        id: 3,
        name: 'Lầu'
    },
    {
        id: 4,
        name: 'Sân vườn'
    },
]
const tables = [
    {
        name: 'Bàn 1',
        type: 1,
    },
    {
        name: 'Bàn 2',
        type: 2,
    },
    {
        name: 'Bàn 3',
        type: 3,
    },
    {
        name: 'Bàn 1',
        type: 1,
    },
    {
        name: 'Bàn 2',
        type: 2,
    },
]
const covers = [
    {
        imageUrl: 'https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/nguyenhuong/suaquananngon/nha-hang-quan-an-ngon-7.jpg',
    },
    {
        imageUrl: 'https://www.kiotviet.vn/wp-content/uploads/2019/10/kinh-doanh-qu%C3%A1n-%C4%83n-v%E1%BA%B7t-nh%E1%BB%8F.jpg',
    },
    {
        imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/06/45/bf/06/quan-an-ngon-25t2.jpg                                        ',
    },
]
const orders = [
    {
        id: 432423432424,
        time: '01/09/2001 8h30',
        idTable: 1,
        memberNumber: 5,
        status: 1,
    },
    {
        id: 324234234234,
        time: '01/09/2001 8h30',
        idTable: 2,
        memberNumber: 2,
        status: 1,
    },
    {
        id: 44324234234,
        time: '01/09/2001 8h30',
        idTable: 5,
        memberNumber: 4,
        status: 1,
    },
    {
        id: 432423432424,
        time: '01/09/2001 8h30',
        idTable: 1,
        memberNumber: 5,
        status: 2,
    },
    {
        id: 324234234234,
        time: '01/09/2001 8h30',
        idTable: 2,
        memberNumber: 2,
        status: 2,
    },
    {
        id: 44324234234,
        time: '01/09/2001 8h30',
        idTable: 5,
        memberNumber: 4,
        status: 2,
    },
]
export { carousels, categorys, products, blogs, tables, typeTable, covers, orders };

