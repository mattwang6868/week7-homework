<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row mt-4 d-flex">
        <div class="col-md-4 mb-4 " v-for="(item,index) in products" :key="index.id">
            <div class="card h-100">
                <div style="height: 150px; background-size: cover; background-position: center; "
                    :style="{backgroundImage: `url(${item.imageUrl})`}">
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-baseline mb-2">
                        <h5 class="card-title m-0">{{item.title}}</h5>
                        <span class="badge badge-pill badge-primary ">{{item.category}}</span>
                    </div>

                    <p class="card-text">{{item.content}}</p>
                    <div class="d-flex mt-auto flex-column">
                        <div v-if="!item.price">{{item.origin_price}}</div>
                        <div v-else class="d-flex align-items-baseline justify-content-between">
                            <del class="text-info">原價{{item.origin_price}}</del>
                            <div class="font-weight-bolder h5 text-danger">現在只要{{item.price}}</div>
                        </div>
                    </div>

                </div>
                <div class="card-footer bg-light d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm"
                        @click="getDetail(item.id)" :disabled = "status.loadingItem === item.id">查看更多</button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addToCart(item.id)" :disabled = "status.loadingItem === item.id">加到購物車</button>
                </div>
            </div>
        </div>
      </div>
      <!-- 產品modal -->
      <div class="modal fade" id="DetailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <DetailModal :temp-product="tempProduct" :status="status" @modaltocart = "modalAddCart(tempProduct.id)"></DetailModal>
    </div>
      <!-- 購物車頁面 -->
      <div class="my-5 row justify-content-center">
        <div class="col-md-6">
          <div class="text-right mb-3">
              <button type="button" class="btn btn-outline-danger btn-sm" @click="removeAllCartItem()">
                <font-awesome-icon :icon="['far', 'trash-alt']" /> 刪除所有品項
              </button>
          </div>
          <table class="table">
              <thead>
                  <tr>
                      <th >刪除</th>
                      <th>品名</th>
                      <th width="150px">
                          數量
                      </th>
                      <th>單位</th>
                      <th>單價</th>
                      <th>小計</th>
                  </tr>
              </thead>
              <tbody v-if="cart.length">
                  <tr v-for = "item in cart" :key="item.id">
                      <td class="align-middle">
                          <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.product.id)">
                              <font-awesome-icon :icon="['far', 'trash-alt']" />
                          </button>
                      </td>
                      <td class="align-middle" >
                          {{item.product.title}}
                      </td>
                      <td class="align-middle">
                          <div class="input-group">
                              <div class="input-group-prepend">
                                  <button class="btn btn-outline-primary" type="button" @click="quantityUpdate(item.quantity +1,item.product.id)">
                                      +
                                  </button>
                              </div>
                              <input  type="text" class="form-control text-center"
                              :value="item.quantity" @keyup.enter="quantityUpdate($event.target.value,item.product.id )">
                              <div class="input-group-prepend">
                                  <button class="btn btn-outline-primary" type="button" :disabled="item.quantity === 1" @click="quantityUpdate(item.quantity -1,item.product.id)">
                                      -
                                  </button>
                              </div>
                          </div>
                      </td>
                      <td class="align-middle">
                          {{item.product.unit}}
                      </td>
                      <td class="align-middle text-right">
                          {{item.product.price}}
                      </td>
                      <td class="align-middle text-right">
                          {{item.product.price*item.quantity}}
                      </td>
                  </tr>
              </tbody>
              <tfoot>
                  <tr>
                    <td colspan="5" class="text-right">
                      總計
                    </td>
                    <td class="text-right" >
                      {{cartTotal}}
                    </td>
                  </tr>
                  <tr >
                    <td colspan="6">
                      <!-- <div class="float-right">
                        <select  class="form-control mt-3 " v-model="couponPercent">
                          <option value="0" disabled selected>請選擇優惠卷</option>
                          <option value="0">無</option>
                          <option :value="item.percent" v-for = "item in coupon" :key = "item.percent">{{ item.title }} {{ item.percent }} %off</option>
                        </select>
                      </div> -->
                      <div class="input-group mb-3 input-group-sm">
                        <input v-model="coupon_code" type="text" class="form-control" placeholder="請輸入優惠碼">
                        <div class="input-group-append">
                          <button class="btn btn-outline-secondary" type="button" @click="searchCoupon">
                            套用優惠碼
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="5" class="text-right text-success">
                      折扣價
                    </td>
                    <td class="text-right text-success">
                      {{ cartTotal*((100-couponPercent)/100) }}
                    </td>
                  </tr>
                </tfoot>
          </table>
        </div>
      </div>
      <!-- 表單 -->
      <div class="row justify-content-center">
        <div class="col-md-6">
            <validation-observer v-slot="{ invalid }">
                <form @submit.prevent="submitForm" class="text-left">
                    <div class="form-group">
                        <validation-provider rules="required" v-slot="{ errors, classes, passed }">
                            <div class=" mb-3 ">
                                <label for="name">收件人姓名</label>
                                <input id="name" type="text" class="form-control"
                                    v-model="form.name" :class="classes" name="姓名">
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                                <span v-if="passed" class="text-success"><small>OK</small></span>
                            </div>
                        </validation-provider>
                    </div>
                    <div class="form-group">
                        <validation-provider rules="required|email" v-slot="{ errors, classes, passed }">
                            <div class=" mb-3">
                                <label for="email">Email</label>
                                <input id="email" type="email" class="form-control" :class="classes"
                                    v-model="form.email" name="電子信箱">
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                                <span v-if="passed" class="text-success"><small>OK</small></span>
                            </div>
                        </validation-provider>
                    </div>
                    <div class="form-group">
                        <validation-provider rules="required|min:8" v-slot="{ errors, classes, passed }">
                            <div class="mb-3">
                                <label for="tel">電話</label>
                                <input id="tel" type="tel" class="form-control" v-model="form.tel" :class="classes"
                                    name="電話">
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                                <span v-if="passed" class="text-success"><small>OK</small></span>
                            </div>
                        </validation-provider>
                    </div>
                    <div class="form-group">
                        <validation-provider rules="required" v-slot="{ errors, classes }">
                            <div class="mb-3">
                                <label for="address">地址</label>
                                <input type="text" class="form-control" id="address" :class="classes"
                                    v-model="form.address" name="地址">
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </div>
                        </validation-provider>
                    </div>
                    <div class="form-group">
                        <validation-provider rules="required" v-slot="{ errors, classes }">
                            <div class=" mb-3">
                                <label for="payment">購買方式</label>
                                <select class="form-control" id="payment" :class="classes" v-model="form.payment" name="付款方式">
                                    <option value="" disabled>
                                        請選擇付款方式
                                    </option>
                                    <option value="WebATM">
                                        WebATM
                                    </option>
                                    <option value="ATM">
                                        ATM
                                    </option>
                                    <option value="CVS">
                                        CVS
                                    </option>
                                    <option value="Barcode">
                                        Barcode
                                    </option>
                                    <option value="Credit">
                                        Credit
                                    </option>
                                    <option value="ApplePay">
                                        ApplePay
                                    </option>
                                    <option value="GooglePay">
                                        GooglePay
                                    </option>
                                </select>
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </div>
                        </validation-provider>
                    </div>
                    <div class="form-group">
                        <validation-provider rules="required" v-slot="{ errors, classes }">
                            <div class=" mb-3">
                                <label for="message">留言</label>
                                <textarea class="form-control" id="message" :class="classes" placeholder="請輸入留言..."
                                    v-model="form.message"></textarea>
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </div>
                        </validation-provider>
                    </div>
                    <div class="text-right">
                        <button type="submit" class="btn btn-primary" :disabled="invalid" >
                            送出表單
                        </button>
                    </div>
                </form>
            </validation-observer>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery'
import DetailModal from '@/components/DetailModal.vue'
const $ = jQuery

export default {
  components: {
    DetailModal
  },
  data () {
    return {
      isLoading: false,
      products: [],
      tempProduct: {
        num: 0,
        subtotal: 0,
        imageUrl: [],
        bgImage: ''
      },
      cart: {},
      coupon: {},
      coupon_code: '',
      couponPercent: '',
      cartTotal: 0,
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        coupon: '',
        message: ''
      },
      status: {
        loadingItem: ''
      }
    }
  },
  methods: {
    getProducts () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`
      this.$http.get(url).then(res => {
        this.products = res.data.data
        this.pagination = res.data.meta.pagination
        this.isLoading = false
      })
    },
    getCart () {
      this.isLoading = true
      this.cartTotal = 0
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http.get(url).then(res => {
        this.cart = res.data.data
        this.cart.forEach((item) => {
          this.cartTotal += item.product.price * item.quantity
        })
        this.isLoading = false
      })
    },
    searchCoupon () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/coupon/search`
      this.$http.post(url, { code: this.coupon_code }).then(res => {
        this.coupon = res.data.data
        this.couponPercent = res.data.data.percent
        this.isLoading = false
      }).catch((error) => {
        alert(error.response.data.errors)
        this.isLoading = false
      })
    },
    getDetail (id) {
      this.isLoading = true
      this.status.loadingItem = id
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`
      this.$http.get(url).then(res => {
        this.tempProduct = res.data.data
        this.tempProduct.num = 0
        this.tempProduct.bgImage = `background-image:url(${res.data.data.imageUrl})`
        $('#DetailModal').modal('show')
        this.status.loadingItem = ''
        this.isLoading = false
      })
    },
    addToCart (id) {
      this.isLoading = true
      this.status.loadingItem = id
      const cart = {
        product: id,
        quantity: 1
      }
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http.post(url, cart).then(res => {
        this.getCart()
        this.status.loadingItem = ''
        this.isLoading = false
      }).catch((error) => {
        this.status.loadingItem = ''
        console.log(error.response.data.errors)
        alert(error.response.data.errors)
        $('#DetailModal').modal('hide')
        this.isLoading = false
      })
    },
    modalAddCart (id) {
      this.status.loadingItem = id
      this.getCart()
      this.status.loadingItem = ''
      $('#DetailModal').modal('hide')
    },
    removeAllCartItem () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`
      this.$http.delete(url).then(res => {
        this.getCart()
        this.cartTotal = 0
        this.isLoading = false
      })
    },
    removeCartItem (id) {
      this.isLoading = true
      this.status.loadingItem = id
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`
      this.$http.delete(url).then(res => {
        this.getCart()
        this.isLoading = false
      })
    },
    quantityUpdate (num, id) {
      if (num <= 0) return
      {
        this.isLoading = true
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`
        const cart = {
          product: id,
          quantity: num
        }
        this.$http.patch(url, cart).then(res => {
          this.getCart()
          this.isLoading = false
        })
      }
    },
    submitForm () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`
      const order = this.form
      if (this.coupon.enabled) {
        order.coupon = this.coupon.code
      }
      console.log(order)
      this.$http.post(url, order).then(res => {
        if (res.data.data.id) {
          this.$router.push('/admin/customer_checkout')
        }
        this.isLoading = false
      })
    }

  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
