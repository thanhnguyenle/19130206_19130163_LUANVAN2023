import { makeAutoObservable } from 'mobx';
class SearchProductScreen {
    isAuthenticated = false;

    constructor() {
        makeAutoObservable(this);
    }


}

const searchProductScreen = new SearchProductScreen();

export default searchProductScreen;