<template>

  <el-drawer title="订单详情"
             :visible.sync="drawer"
             :direction="direction"
             :before-close="handleClose"
             size="50%">
    <el-tabs type="border-card"
             style="height: 90vh;
    overflow-y: scroll;
    overflow-x: hidden;">
      <el-tab-pane label="订单信息">
        <el-form label-width="180px">
          <el-form-item label="订单来源：">
            {{currentOrder.orderSource }}
          </el-form-item>
          <el-form-item label="开始用餐：">
            {{currentOrder.startDateTime|dataTime}}
          </el-form-item>
          <el-form-item label="结束用餐：">
            {{currentOrder.endDateTime|dataTime}}
          </el-form-item>
          <el-form-item label="桌号：">
            {{currentOrder.tableName}}
          </el-form-item>
          <el-form-item label="应收：">
            {{currentOrder.totalPrice}}
          </el-form-item>
          <el-form-item label="收银员：">
            {{currentOrder.cashierName}}
          </el-form-item>
          <el-form-item label="优惠金额：">
            ¥{{currentOrder.totalOfferPrice}} <el-link type="primary"
                     @click="innerDrawer=true">详情</el-link>
          </el-form-item>
          <el-form-item label="支付方式：">
            {{currentOrder.paymentType}}
          </el-form-item>
          <el-form-item label="实际金额：">
            {{currentOrder.paymentPrice}}
          </el-form-item>
          <el-form-item label="备注：">
            {{currentOrder.remark}}
          </el-form-item>
        </el-form>
        <el-drawer title="优惠列表"
                   :direction="direction"
                   :append-to-body="true"
                   :before-close="innerHandleClose"
                   :visible.sync="innerDrawer">

          <el-form label-width="180px">
            <el-form-item :label="item.name"
                          v-for="(item,index) in currentOrder.offerList"
                          :key="index">
              ¥{{item.offerPrice}}
            </el-form-item>

          </el-form>
        </el-drawer>
      </el-tab-pane>
      <el-tab-pane label="菜品信息">
        <el-collapse accordion>
          <el-collapse-item :title="item.name+'('+item.price+')'"
                            v-for="item in orderItems"
                            :key="item._id">
            <el-timeline style="padding-left: 10px">

              <el-row style="margin-bottom: 10px;">
                <el-col>
                  <el-tag v-if="item.isGift" style="background-color: #2ecc71; color: white;">赠菜</el-tag>
                  <el-tag v-if="item.isTimeout" style="background-color: #3498db; color: white;">暂停</el-tag>
                  <el-tag v-if="item.isExpedited" style="background-color: #e74c3c; color: white;">加急</el-tag>
                  <el-tag v-if="item.isBale" style="background-color: #f39c12; color: white;">打包</el-tag>
                </el-col>
              </el-row>
              <el-timeline-item color="#2ecc71"
                                :timestamp="item.createAt|dataTime">
                点菜
              </el-timeline-item>
              <el-timeline-item v-if="[
              $Enumerate.productStatus.waitCooking,
              $Enumerate.productStatus.cooking,
              $Enumerate.productStatus.finish,
              $Enumerate.productStatus.transporting,
              $Enumerate.productStatus.transportFinish].some(s=>s===item.status) "
                                color="#2980b9"
                                :timestamp="item.orderMakeDateTime|dataTime">
                下单到厨房
              </el-timeline-item>
              <el-timeline-item v-if="[
              $Enumerate.productStatus.cooking,
              $Enumerate.productStatus.finish,
              $Enumerate.productStatus.transporting,
              $Enumerate.productStatus.transportFinish].some(s=>s===item.status) "
                                color="#f1c40f"
                                :timestamp="item.startCookDateTime|dataTime">
                开始烹饪（{{item.chefName}}）
              </el-timeline-item>
              <el-timeline-item v-if="[
              $Enumerate.productStatus.finish,
              $Enumerate.productStatus.transporting,
              $Enumerate.productStatus.transportFinish].some(s=>s===item.status) "
                                color="#e74c3c"
                                :timestamp="item.endCookDateTime|dataTime">
                完成烹饪（{{item.chefName}}）
              </el-timeline-item>
              <el-timeline-item v-if="[ 
              $Enumerate.productStatus.transporting,
              $Enumerate.productStatus.transportFinish].some(s=>s===item.status) "
                                color="#8e44ad"
                                :timestamp="item.startTransportDatetime|dataTime">
                开始配送({{item.waiterName}})
              </el-timeline-item>
              <el-timeline-item v-if="[$Enumerate.productStatus.transportFinish].some(s=>s===item.status) "
                                color="#2c3e50"
                                :timestamp="item.endTransportDatetime|dataTime">
                结束配送({{item.waiterName}})
              </el-timeline-item>
            </el-timeline>

            <el-row>
              <el-col>
                备注：{{item.remark?item.remark:"无"}}
              </el-col>
            </el-row>

          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="操作日志">
        <el-timeline style="padding-left: 10px">
          <el-timeline-item v-for="item in currentOrder.eventItems"
                            :timestamp="item.createAt|dataTime"
                            :key="item.createAt">
            {{item.content}}
          </el-timeline-item>
        </el-timeline>
      </el-tab-pane>
      <el-tab-pane label="修改订单">
        <el-form label-width="120px">
          <el-form-item label="支付金额：">
            <el-input-number v-model="paymentPrice"
                             :step="1"
                             :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      v-model="remark" />
          </el-form-item>
          <el-form-item label="">
            <el-button @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-drawer>

</template>
<script>

export default {

  data() {
    return {
      drawer: false,
      orderItems: [],
      currentOrder: {},
      direction: 'ltr',
      innerDrawer: false,
      paymentPrice: 0,
      remark: ""
    }
  },
  methods: {
    handleClose() {
      let self = this
      self.drawer = false
    },
    innerHandleClose() {
      let self = this
      self.innerDrawer = false
    },
    save() {
      let self = this
      self.$http.put("/restaurant/updatePayment", {
        orderId: self.currentOrder._id,
        paymentPrice: self.paymentPrice,
        remark: self.remark
      }).then(() => {
        self.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success'
        });
      })
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
</style>
