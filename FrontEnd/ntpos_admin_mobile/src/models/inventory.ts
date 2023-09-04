export interface Inventory {
  id: string,
  name: string;
  price: number;
  unit: string;
  quantity: number;
  status: "ACTIVE" | "INACTIVE"; // Chỉ cho phép 2 giá trị: ACTIVE hoặc INACTIVE
  description: string;
  expiredDate: number; // Thời điểm hết hạn dưới dạng timestamp
  manufacturerDate: number; // Thời điểm sản xuất dưới dạng timestamp
  images: string[]; // Mảng chứa các URL hình ảnh
}
export interface MaterialReturn {
  id: string,
  materialID: string;
  price: number;
  unit: string;
  quantity: number;
  status: "ACTIVE" | "INACTIVE"; // Chỉ cho phép 2 giá trị: ACTIVE hoặc INACTIVE
  description: string;
  returnDate: number;
}
export interface Supplier {
  id: string
  name: string
  address: string
  phone: string
  email: string
  website: string
  status: string
  description: string
}
export interface  MaterialSetup {
  id: string
  materialID: string
  unit: string
  quantity: number
  status: string
  description: string
}
export interface  MaterialAll {
  id: string
  name: string
  unit: string
  quantity: number
  price: number
  expiredDate: number
  manufacturerDate: number
  status: string
  description: string
}
export interface  MaterialSetupDefault {
  materialID: string
  unit: string
  quantity: number
  status: string
  description: string
}

