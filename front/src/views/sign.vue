<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" v-model="form.id" label="아이디" type="text"></v-text-field>
              <v-text-field prepend-icon="lock" v-model="form.pwd" label="비밀번호" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signIn">로그인</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        id: '',
        pwd: ''
      }
    }
  },
  methods: {
    signIn () {
      axios.post(`${this.$apiRootPath}sign/in`, this.form)
        .then(r => {
          if (!r.data.success) return console.error(r.data.msg)
          localStorage.setItem('token', r.data.token) // localstorage에 생성된 token값을 저장
          this.$store.commit('getToken') // store.js의 'getToken'함수를 실행하여 vuex의 전역 변수 state.token값에 localStorage의 token값으로 변경
          // this.$router.push('/header')
        })
        .catch(e => console.error(e.message))
    }
  }
}
</script>
