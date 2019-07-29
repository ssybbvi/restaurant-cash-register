import moment from 'moment'

export default {
    data() {
        return {
            debounceTimer: null
        }
    },
    methods: {
        moment(agument) {
            return moment(agument)
        },
        // debounce(func, delay) {
        //     return (...args) => {
        //         if (this.debounceTimer) {
        //             clearTimeout(this.debounceTimer)
        //         }
        //         this.debounceTimer = setTimeout(() => {
        //             func.apply(this, args)
        //         }, delay);
        //     }
        // }
    },

}