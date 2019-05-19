import Vue from 'vue'
import Vuex from 'vuex'

import restaurant from './modules/restaurant'

Vue.use(Vuex)

const state = {
    imgPath: "http://uat-training.gzs.com.cn/",
    filePath: "http://studyfile.gzs.com.cn/"
}


export default new Vuex.Store({
    state,
    modules: {
        restaurant,
    }
})