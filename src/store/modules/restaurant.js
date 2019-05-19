import * as types from '../mutation-types'
import restaurantApi from '../../webapi/restaurant'

const state = {
    tables: [],
    tableAreas: [],
    currentTable: [{
        orderItems: {}
    }],

    products: [],
    productMenus: [],

    currentOrderItem: [],

    netError: {}
}


const mutations = {
    [types.FETCH_TABLES](state, _data) {
        state.tables = _data
    },
    [types.FETCH_TABLEAREA](state, _data) {
        state.tableAreas = _data
    },
    [types.FETCH_PRODUCTS](state, _data) {
        state.products = _data
    },
    [types.FETCH_PRODUCTMENU](state, _data) {
        state.productMenus = _data
    },
    [types.OPEN_TABLE](state, _data) {
        let item = state.tables[_data._id]
        item.status = 1
        item.startTime = new Date()
    },
    [types.VIEW_TABLE](state, _data) {
        state.currentTable = _data
    },

    [types.ADD_SHOPPINGCART](state, _data) {
        let obj = {}
        obj[_data.orderItem._id] = _data.orderItem
        state.currentTable.orderItems = Object.assign({}, state.currentTable.orderItems, obj)
    },
    [types.SWITCH_ORDERITEMS](state, params) {
        state.currentOrderItem = params
    },
    [types.QUANTITYORDERITEM](state, params) {
        let {
            orderItemId,
            quantity
        } = params
        if (quantity <= 0) {
            delete state.currentTable.orderItems[orderItemId]
            state.currentTable.orderItems = Object.assign({}, state.currentTable.orderItems)
            state.currentOrderItem = {}
        } else {
            state.currentTable.orderItems[orderItemId].quantity = quantity
        }
    },
    [types.ORDER_MAKE](state, params) {
        params.forEach((item) => {
            state.currentTable.orderItems[item].status = 2
        })
    },

    // [types.PLACE_ORDER](state) {
    //     for (var i = 0; i < state.currentTable.orderItems.length; i++) {
    //         if (state.currentTable.orderItems[i].isTimeOut) {
    //             continue
    //         }
    //         state.currentTable.orderItems[i].status = 2
    //     }
    // },


    [types.GIFT_ORDERITEM](state, {
        orderItemId,
        isGift
    }) {
        state.currentTable.orderItems[orderItemId].isGift = isGift
        state.currentOrderItem.isGift = isGift
    },
    [types.TIMEOUT_ORDERITEM](state, {
        orderItemId,
        isTimeout
    }) {
        state.currentTable.orderItems[orderItemId].isTimeout = isTimeout
        state.currentOrderItem.isTimeout = isTimeout
    },
    [types.EXPEDITE_ORDERITEM](state, {
        orderItemId,
        isExpedited
    }) {
        state.currentTable.orderItems[orderItemId].isExpedited = isExpedited
        state.currentOrderItem.isExpedited = isExpedited
    },
    [types.BALE_ORDERITEM](state, {
        orderItemId,
        isBale
    }) {
        state.currentTable.orderItems[orderItemId].isBale = isBale
        state.currentOrderItem.isBale = isBale
    },
    [types.FETCH_ERROR](state, {
        netError
    }) {
        state.netError = netError
    }
}

const actions = {
    fetchTables({
        commit
    }) {
        restaurantApi.fetchTables().then(resolve => {
            commit(types.FETCH_TABLES, resolve.data.data)
        }).catch(reject => {
            commit(types.FETCH_ERROR, reject)
        })
    },

    fetchTableAreas({
        commit
    }) {
        restaurantApi.fetchTableAreas().then(resolve => {
            commit(types.FETCH_TABLEAREA, resolve.data.data)
        }).catch(reject => {
            commit(types.FETCH_ERROR, reject)
        })
    },
    fetchProducts({
        commit
    }) {
        restaurantApi.fetchProducts().then(resolve => {
            commit(types.FETCH_PRODUCTS, resolve.data.data)
        }).catch(reject => {
            commit(types.FETCH_ERROR, reject)
        })
    },
    fetchProductMenus({
        commit
    }) {
        restaurantApi.fetchProductMenus().then(resolve => {
            commit(types.FETCH_PRODUCTMENU, resolve.data.data)
        }).catch(reject => {
            commit(types.FETCH_ERROR, reject)
        })
    }
}

const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}