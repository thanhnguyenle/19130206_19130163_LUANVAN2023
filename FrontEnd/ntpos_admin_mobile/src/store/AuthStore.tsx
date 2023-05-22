import { makeAutoObservable } from 'mobx';
class AuthStore {
    isAuthenticated = false;
    username = '';
    password = '';

    constructor() {
        makeAutoObservable(this);
    }

    setUsername(username: string) {
        this.username = username;
    }

    setPassword(password: string) {
        this.password = password;
    }

    login() {
        // Gọi API để xác thực thông tin đăng nhập
        // Nếu đăng nhập thành công, set isAuthenticated là true
        // Nếu đăng nhập không thành công, xử lý lỗi
        this.isAuthenticated = true;
    }

    logout() {
        // Đăng xuất khỏi ứng dụng
        this.isAuthenticated = false;
        this.username = '';
        this.password = '';
    }
}

const authStore = new AuthStore();

export default authStore;