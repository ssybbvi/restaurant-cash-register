export default {
    tableStatus: {
        available: 1,
        ordering: 2,
        dining: 3,
        clearing: 4
    },
    orderStatus: {
        processing: 1,
        finish: 2
    },
    productStatus: {
        normal: 1,
        waitCooking: 2,
        cooking: 3,
        finish: 4,
        transporting: 5,
        transportFinish: 6
    },
    remarkType: {
        product: 1,
        order: 2,
        paymentOrder: 3
    },
    orderMode: {
        productList: 1,
        productItemInfo: 2,
        settlement: 3,
    },
    orderTableMode: {
        orderItemList: 1,
        tablePanel: 2
    },
    userType: {
        admin: 0,
        cashier: 1,
        chef: 2,
        waiter: 3
    },
    paymentType: {
        cash: 1,
        weixin: 2,
        zhifupay: 3
    }
}