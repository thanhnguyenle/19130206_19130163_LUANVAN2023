export interface Inventory {
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
