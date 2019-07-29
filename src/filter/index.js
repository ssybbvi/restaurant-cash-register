import moment from 'moment'


export default {
    tabelStatusColor(tableStatus) {
        return ["green", "blue", "red", "gray"][tableStatus - 1]
    },
    tableStatusTags(tableStatus) {
        return ["未开台", "点菜中", "用餐中", "待清桌"][tableStatus - 1]
    },
    spendTime(time = 0) {
        return moment.utc(moment(Date.now()).diff(moment(time))).format("HH:mm")
    },
    dataTime(time) {
        return moment(time).format("YYYY年MM月DD日 HH:mm:ss")
    }
}