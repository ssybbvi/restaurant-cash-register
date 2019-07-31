import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import enumerate from '@/filter/enumerate'
import axios from '../webapi'

Vue.use(Vuex)




const state = {
    imgPath: "xxx",
    filePath: "xxxx",
    currentOrder: {
        offerPriceItems: [],
        eventItems: [],
        seatPrice: 0,
        seat: 0
    },
    productItems: [],
    currentOrderItemId: '',
    orderMode: enumerate.orderMode.productList,
    orderTableMode: enumerate.orderTableMode.orderItemList,
    netError: {}
}


const mutations = {
    [types.CURRENT_ORDER](state, data) {
        state.currentOrder = data
    },
    [types.CURRENT_ITEMS](state, data) {
        state.productItems = data
    },
    [types.SET_ORDER_MODE](state, data) {
        state.orderMode = data
    },
    [types.CURRENT_PRODUCT_ID](state, data) {
        state.currentOrderItemId = data
    },
    [types.SET_ORDER_TABLE_MODE](state, data) {
        state.orderTableMode = data
    }
}


const actions = {
    feachOrderById({
        commit
    }) {
        console.log("feachOrderById#####")
        let orderId = state.route.query.orderId
        axios.get(`/order/${orderId}`).then(resolve => {
            commit(types.CURRENT_ORDER, resolve.data.data)
        }).catch(reject => {
            commit(types.FETCH_ERROR, reject)
        })

        axios.get(`/restaurant/getOrderItem`, {
            params: {
                orderId
            }
        }).then(resolve => {
            commit(types.CURRENT_ITEMS, resolve.data.data)
        }).catch(reject => {
            commit(types.FETCH_ERROR, reject)
        })
    },
}

const getters = {

}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})