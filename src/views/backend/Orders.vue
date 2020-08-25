<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="mt-5 row justify-content-center">
      <div class="col-md-6">
        <table class="table">
          <thead>
            <tr>
              <th width="200px">購買時間</th>
              <th width="200px">購買方式</th>
              <th width="250px">商品列表</th>
              <th width="120px">應付金額</th>
              <th width="200px">付款狀態</th>
              <th width="200px">編輯</th>
            </tr>
          </thead>
          <tbody  v-if="orders.length">
            <tr v-for = "(item, key) in orders" :key="key">
              <td class="align-middle">
                  {{item.created.datetime}}
              </td>
              <td class="align-middle" >
                  {{item.payment}}
              </td>
              <td>
                <ul class="list-unstyled">
                  <li v-for="(product, i) in item.products" :key="i">
                    {{ product.product.title }}
                    數量：{{ product.quantity }}{{ product.product.unit }}
                  </li>
                </ul>
              </td>
              <td class="align-middle" >
                  {{item.amount}}
              </td>
              <td class="align-middle" >
                  <strong v-if="!item.paid">未付款</strong>
                  <span v-else>已付款</span>
              </td>
              <td class="align-middle" >
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" :disabled="item.paid" @click.prevent="getDetailed(item.id)">選擇</button>
                  </div>
              </td>
            </tr>
          </tbody>
        </table>
        <Pagination :pages = "pagination" @update = "getOrders"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      isLoading: false,
      pagination: {},
      orders: []
    }
  },
  methods: {
    getOrders (num = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders?page=${num}`
      this.$http.get(url).then(res => {
        this.orders = res.data.data
        this.pagination = res.data.meta.pagination
        this.isLoading = false
      })
    },
    getDetailed () {}
  },
  created () {
    console.log(this.$route.params)
    this.getOrders()
  }
}
</script>
