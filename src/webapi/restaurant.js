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


    fetchProduct() {
        return axios.get("/product")
    },
    createProduct(doc) {
        return axios.post("/product", doc)
    },
    editProduct(doc) {
        return axios.put("/product", doc)
    },
    deleteProduct(doc) {
        return axios.delete("/product", doc)
    },




    getOrder(_id) {
        return axios.get(`/order/${_id}`)
    },
    fetchOrder(query) {
        return axios.get('order', query)
    },
    createOrder(doc) {
        return axios.post("/order", doc)
    },
    editOrder(doc) {
        return axios.put("/order", doc)
    },
    deleteOrder(doc) {
        return axios.delete("/order", doc)
    },


    openTable(doc) {
        return axios.post("/opentable", doc)
    },
    updateOrderProduct(doc) {
        return axios.put("/updateOrderProduct", doc)
    },
    paymentOrder(doc) {
        return axios.put("/updateOrderProduct", doc)
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