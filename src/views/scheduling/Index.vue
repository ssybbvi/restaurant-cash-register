<template>
  <el-container>
    <el-header>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6"
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
                  <!-- <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                     @click=" element.fixed=! element.fixed"
                     aria-hidden="true"></i> -->
                  {{element.name}}
                  <span class="badge">{{element._id}}</span>
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
import io from 'socket.io-client';


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
      socket: io('localhost:3000')
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
      this.$http.post("/scheduling/cookProduct", { orderItemId: this.message }).then(() => { })
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

      self.$http.post("/scheduling/draggableOrderItem", {
        fromChefId: evt.from.id,
        toChefId: evt.to.id,
        orderItem: self.moveParam.draggedElement,
        oldIndex: evt.oldIndex,
        newIndex: evt.newIndex
      }).then(() => { })
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
    this.socket.on('orderItemQueue', (data) => {
      this.waitCookQueues = data
    });
    this.$http.get("/scheduling/fetchWaitCookQueues").then(resolve => {
      this.waitCookQueues = resolve.data.data
    })
  }
};
</script>

<style>
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
  border: 1px solid #ddd;
  font-size: 16px;
  padding: 5px 3px;
  margin-top: 5px;
}
.list-group-item i {
  cursor: pointer;
}
</style>