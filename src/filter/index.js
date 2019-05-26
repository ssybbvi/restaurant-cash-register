export default {
    tabelStatusColor(tableStatus) {
        return ["green", "blue", "red", "gray"][tableStatus - 1]
    },
    tableStatusTags(tableStatus) {
        return ["未开台", "点菜中", "用餐中", "待清桌"][tableStatus - 1]
    }
}