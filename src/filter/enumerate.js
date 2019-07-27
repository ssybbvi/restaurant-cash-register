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
        order: 2
    },
    orderMode: {
        productList: 1,
        productItemInfo: 2,
        settlement: 3
    },
    userType: {
        admin: 0,
        cashier: 1,
        chef: 2,
        waiter: 3
    }
}