<template>
  <el-container>
    <el-header>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6"
                :key="item._id"
                v-for="item in waitCookQueues.chefList">
          <el-row>
            <div>{{item.name}}</div>
            <draggable class="list-group"
                       tag="div"
                       v-model="item.list"
                       v-bind="dragOptions"
                       :empty-insert-threshold="100"
                       :move="onMove"
                       @end="draggableOrderItem"
                       :id="item._id">
              <transition-group type="transition"
                                :name="'flip-list'"
                                tag="ul"
                                :id="item._id">
                <li class="list-group-item"
                    v-for="element in item.list"
                    :key="element._id">
                  <span>({{element.tableName}})[{{Number.parseInt((Date.now()-element.orderMakeDateTime)/1000/60 )}}]{{element.name}}</span>
                  <span v-show="element.isGift"
                        class="gift"></span>
                  <span v-show="element.isTimeout"
                        class="time-out"></span>
                  <span v-show="element.isExpedited"
                        class="expedited"></span>
                  <span v-show="element.isBale"
                        class="bale"></span>
                </li>
              </transition-group>
            </draggable>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>


<script>
import draggable from "vuedraggable";
import { subscriptionSocket } from '../../webapi/socket-client'

export default {
  components: {
    draggable
  },
  data() {
    return {
      editable: true,
      delayedDragging: false,
      moveParam: {},
      waitCookQueues: {
        chefList: [],
      },
    };
  },
  methods: {
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      this.moveParam = {
        relatedElement,
        draggedElement
      }
      return true
    },
    loadWaitCookQueues() {
      let self = this
      self.$http.get("/restaurant/fetchWaitCookQueues").then(resolve => {
        self.waitCookQueues = resolve.data.data
      })
    },
    draggableOrderItem(evt) {
      let self = this

      // console.log(evt)
      // console.log('form', evt.from.id)
      // console.log('to', evt.to.id)
      // console.log('oldIndex', evt.oldIndex)
      // console.log('newIndex', evt.newIndex)
      // console.log('self.moveParam.draggedElement)', self.moveParam.draggedElement)

      if (!self.moveParam.draggedElement) {
        return
      }

      self.$http.put("/restaurant/draggableOrderItem", {
        fromChefId: evt.from.id,
        toChefId: evt.to.id,
        orderItem: self.moveParam.draggedElement,
        oldIndex: evt.oldIndex,
        newIndex: evt.newIndex
      })
    }
  },
  computed: {
    dragOptions() {
      return {
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    }
  },
  mounted() {
    let self = this

    self.destroySocketList.push(subscriptionSocket(`draggableOrderItem`, () => {
      console.log('draggableOrderItem')
      self.loadWaitCookQueues()
    }))

    self.destroySocketList.push(subscriptionSocket(`deleteOrderItem`, () => {
      console.log('deleteOrderItem')
      self.loadWaitCookQueues()
    }))
    self.destroySocketList.push(subscriptionSocket(`orderMake`, () => {
      console.log('orderMake')
      self.loadWaitCookQueues()
    }))
    self.destroySocketList.push(subscriptionSocket(`setChefProduct`, () => {
      console.log('setChefProduct')
      self.loadWaitCookQueues()
    }))

    self.destroySocketList.push(subscriptionSocket(`chefUpdateWork`, () => {
      console.log('chefUpdateWork')
      self.loadWaitCookQueues()
    }))

    self.destroySocketList.push(subscriptionSocket(`startCookOrderItem`, () => {
      console.log('startCookOrderItem')
      self.loadWaitCookQueues()
    }))

    //    self.destroySocketList.push(subscriptionSocket(`setRemarkOrderItem`, () => {
    //   console.log('setRemarkOrderItem')
    //   self.loadWaitCookQueues()
    // }))

    self.destroySocketList.push(subscriptionSocket(`setGiftOrderItem`, () => {
      console.log('setGiftOrderItem')
      self.loadWaitCookQueues()
    }))

    //    self.destroySocketList.push(subscriptionSocket(`setBaleOrderItem`, () => {
    //   console.log('setBaleOrderItem')
    //   self.loadWaitCookQueues()
    // }))

    self.destroySocketList.push(subscriptionSocket(`expediteOrderItem`, () => {
      console.log('expediteOrderItem')
      self.loadWaitCookQueues()
    }))

    self.loadWaitCookQueues()
  }
};
</script>

<style  scoped lang="scss">
.gift {
  background-color: #2ecc71;
}

.time-out {
  background-color: #3498db;
}

.expedited {
  background-color: #e74c3c;
}

.bale {
  background-color: #f39c12;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
  min-height: 30px;
  border: 1px solid #ddd;
  font-size: 16px;
  padding-left: 3px;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  color: #2980b9;
  padding-left: 5px;
  span:nth-child(1) {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }
  span:nth-child(2) {
    flex-basis: 5px;
  }
  span:nth-child(3) {
    flex-basis: 5px;
  }
  span:nth-child(4) {
    flex-basis: 5px;
  }
  span:nth-child(5) {
    flex-basis: 5px;
  }
}
</style>