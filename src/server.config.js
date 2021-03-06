const BASE = "https://www.easy-mock.com/mock/5b62a433dc98972baf832e07/"
const LOCAL_URL = "http://localhost:3000/"

const URL = {
    homeInfo: BASE + "index",
    registerUser: LOCAL_URL + "user/register",
    login: LOCAL_URL + "user/login",
    goodsInfo: LOCAL_URL + "goods/getDetailInfo",
    categoryInfo: LOCAL_URL + "goods/listCategory",
    categorySubInfo: LOCAL_URL + "goods/listCategorySub",
    listGoodsBySubId: LOCAL_URL + "goods/listGoodsBySubId", //small category goods info
}

export default URL