import axios from './index'


export default {
    fetchTables(doc) {
        return axios.get("/table", doc)
    },
    createTables(doc) {
        return axios.post("/table", doc)
    },
    editTable(query, doc) {
        return axios.put("/table", doc, {
            params: query
        })
    },
    deleteTable(doc) {
        return axios.delete("/table", doc)
    },


    fetchTableArea() {
        return axios.get("/tableArea")
    },
    createTableArea(doc) {
        return axios.post("/tableArea", doc)
    },
    editTableArea(query, doc) {
        return axios.put("/tableArea", doc, {
            params: query
        })
    },
    deleteTableArea(doc) {
        return axios.delete("/tableArea", doc)
    },



    fetchRemark(doc) {
        return axios.get("/remark", doc)
    },
    createRemark(doc) {
        return axios.post("/remark", doc)
    },
    editRemark(query, doc) {
        return axios.put("/remark", doc, {
            params: query
        })
    },
    deleteRemark(doc) {
        return axios.delete("/remark", {
            data: doc
        })
    },


    fetchProduct(doc) {
        return axios.get("/product", doc)
    },
    createProduct(doc) {
        return axios.post("/product", doc)
    },
    editProduct(query, doc) {
        return axios.put("/product", doc, {
            params: query
        })
    },
    deleteProduct(doc) {
        return axios.delete("/product", doc)
    },


    fetchProductType() {
        return axios.get("/productType")
    },
    createProductType(doc) {
        return axios.post("/productType", doc)
    },
    editProductType(query, doc) {
        return axios.put("/productType", doc, {
            params: query
        })
    },
    deleteProductType(doc) {
        return axios.delete("/productType", doc)
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
    editOrder(query, doc) {
        return axios.put("/order", doc, {
            params: query
        })
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
        return axios.post("/paymentOrder", doc)
    },
    orderMake(doc) {
        return axios.put("/orderMake", doc)
    },
    editOrderProduectItems(doc) {
        return axios.put("/editOrderProduectItems", doc)
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


}