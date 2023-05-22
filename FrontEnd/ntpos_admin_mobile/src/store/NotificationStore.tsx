import { makeAutoObservable } from 'mobx';
type NotificationItem = {
    username: string;
    content: string;
    time: string,
};
class NotificationStore {
    listData: NotificationItem[] = [];

    constructor() {
        makeAutoObservable(this);
    }
    setListData(listData: NotificationItem[]) {
        this.listData = listData;
    }
    loadData() {
        const listNew: NotificationItem[] = [
            {
                username: 'Duong Minh Nhu',
                content: 'Da cap nhap',
                time: '01/09/2001',
            },
            {
                username: 'Thanh',
                content: 'Da cap nhap',
                time: '01/09/2001',
            },
            {
                username: 'Duong Minh Nhu',
                content: 'Da cap nhap',
                time: '01/09/2001',
            },
            {
                username: 'Thanh',
                content: 'Da cap nhap',
                time: '01/09/2001',
            },
            {
                username: 'Duong Minh Nhu',
                content: 'Da cap nhap',
                time: '01/09/2001',
            },
            {
                username: 'Thanh',
                content: 'Da cap nhap',
                time: '01/09/2001',
            },
            {
                username: 'Duong Minh Nhu',
                content: 'Da cap nhap',
                time: '01/09/2001',
            },
            {
                username: 'Thanh',
                content: 'Da cap nhap',
                time: '01/09/2001',
            },
            {
                username: 'Duong Minh Nhu',
                content: 'Da cap nhap',
                time: '01/09/2001',
            },
            {
                username: 'Thanh',
                content: 'Da cap nhap',
                time: '01/09/2001',
            },
            {
                username: 'Duong Minh Nhu',
                content: 'Da cap nhap',
                time: '01/09/2001',
            },
            {
                username: 'Thanh',
                content: 'Da cap nhap',
                time: '01/09/2001',
            },
            {
                username: 'Duong Minh Nhu',
                content: 'Da cap nhap',
                time: '01/09/2001',
            },
            {
                username: 'Thanh',
                content: 'Da cap nhap',
                time: '01/09/2001',
            },

        ];
        this.setListData(listNew);
    }


}

const notificationStore = new NotificationStore();

export default notificationStore;