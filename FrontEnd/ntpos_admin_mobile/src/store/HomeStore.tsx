import { makeAutoObservable } from 'mobx';
class HomeStore {
    numberOrder = 0; // Số hóa đơn
    numberPaySlip = 0; // Số phiếu trả
    numberUsing = 0; // Số lượng bàn đang có khách
    numberClient = 0; // Số lượng khách hàng đang có
    profit = 0;// Lợi nhuận
    cost_of_capital = 0; // Giá vốn
    total_inventory = 0;  // Tổng tiền tất cả sản phẩm tồn kho
    number_product_inventory = 0; // Số lượng sản phẩm tồn kho
    name_product_bestseller = 'Product 1'; // tên sản phẩm bán chạy nhất
    number_product_bestseller = 0;
    constructor() {
        makeAutoObservable(this);
    }
    // số hóa đơn
    setNumberOrder(numberOrder: number) {
        this.numberOrder = numberOrder;
    }
    // số phiếu trả
    setNumberPaySlip(numberPaySlip: number) {
        this.numberPaySlip = numberPaySlip;
    }
    // số lượng bàn đang sử dụng
    setNumberUsing(numberUsing: number) {
        this.numberUsing = numberUsing;
    }
    // số lượng khách hàng hiện đang có
    setCostOfCapitalt(cost_of_capital: number) {
        this.cost_of_capital = cost_of_capital;
    }
    // phương thức đọc từ database // overview
    updateOverview() {
        this.setNumberOrder(5);
        this.setNumberPaySlip(2);
        this.setNumberUsing(3);
        this.setNumberClient(2);
    }
    // số lượng bàn đang sử dụng
    setProfit(profit: number) {
        this.profit = profit;
    }
    // số lượng khách hàng hiện đang có
    setNumberClient(numberClient: number) {
        this.numberClient = numberClient;
    }
    // Phương thức lấy tổng giá vốn và lợi nhuận
    updateRevenue() {
        this.setProfit(4440);
        this.setCostOfCapitalt(4300);
    }
    // tổng tiền tất cả sản phẩm tồn kho
    setTotalInventory(total_inventory: number) {
        this.total_inventory = total_inventory;
    }
    // số lượng hàng hóa còn trong kho
    setNumberProductInventory(number_product_inventory: number) {
        this.number_product_inventory = number_product_inventory;
    }
    // Phương thức lấy tổng giá vốn và lợi nhuận
    updateInventory() {
        this.setTotalInventory(4440);
        this.setNumberProductInventory(4300);
    }
    // lấy ra tên sản phẩm bán chạy nhất
    setNameProductBestseller(name_product_bestseller: string) {
        this.name_product_bestseller = name_product_bestseller;
    }
    // tống sản phẩm bán được nhiều nhất
    setNumberProductBestseller(number_product_bestseller: number) {
        this.number_product_bestseller = number_product_bestseller;
    }
    // cập nhật Hàng bán chạy nhất
    updateNameProductBestseller() {
        this.setNameProductBestseller("Bò sốt cay");
        this.setNumberProductBestseller(90);
    }

}

const homeStore = new HomeStore();

export default homeStore;