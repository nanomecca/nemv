<template>
  <div class="about">
    <h1>{{title}}</h1>
  </div>
</template>
<v-btn :color="btnColor" @click="test">test</v-btn>
<!-- 스크립트 부분 -->
<script>
export default {
  data () {
    return () {
      title: 'xxx',
      btnColor: 'success'
    }
  },
  methods: {
    test () {
      this.title = 'nnnnnnn',
      this.btnColor = 'warning'
    }
  }
}
</script>