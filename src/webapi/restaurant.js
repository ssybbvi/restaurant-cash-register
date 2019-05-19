import axios from './index'


export default {
    fetchTables() {
        return axios.get("/table")
    },
    createTables(doc) {
        return axios.post("/table", doc)
    },
    editTable(doc) {
        return axios.put("/table", doc)
    },
    deleteTable(doc) {
        return axios.delete("/table", doc)
    },

    fetchTableAreas() {
        return axios.get("/tableArea")
    },
    openTable(params) {
        return axios.post("/table/open", params)
    },
    viewTable(params) {
        return axios.get("/table/view", {
            params
        })
    },

    fetchProducts() {
        return axios.get("/product")
    },
    fetchProductMenus() {
        return axios.get("/productMenu")
    },

    addShoppingCart(params) {
        return axios.get("/shopCart/addShoppingCart", {
            params: params
        })
    },
    quantityOrderItem(params) {
        return axios.get("/shopCart/quantity", {
            params: params
        })
    },
    giftOrderItem(params) {
        return axios.get("/shopCart/giftOrderItem", {
            params: params
        })
    },
    timeOutOrderItem(params) {
        return axios.get("/shopCart/timeOutOrderItem", {
            params: params
        })
    },
    expediteOrderItem(params) {
        return axios.get("/shopCart/expediteOrderItem", {
            params: params
        })
    },
    baleOrderItem(params) {
        return axios.get("/shopCart/baleOrderItem", {
            params: params
        })
    },

    orderMake(params) {
        return axios.get("/order/make", {
            params: params
        })
    },
}