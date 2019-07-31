import moment from 'moment'

export default {
    data() {
        return {
            destroySocketList: [] //待取消订阅的socket
        }
    },
    beforeDestroy() { //组件摧毁的时候记得把socket也销毁
        let self = this
        self.destroySocketList.forEach(item => item())
    },
    methods: {
        moment(agument) {
            return moment(agument)
        }
    },
}