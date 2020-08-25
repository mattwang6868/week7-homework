<template>
  <div class="">
    <img alt="Vue logo" src="../assets/logo.png">
      <div>
        <router-link class="btn btn-outline-primary" to="/login">登入後台</router-link>
      </div>
  </div>

</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      isLoading: false
    }
  },
  created () {
    this.isLoading = true
    // simulate AJAX
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  }
}
</script>
