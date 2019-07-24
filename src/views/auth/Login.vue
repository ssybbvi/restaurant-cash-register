<template>
  <el-container>
    <el-header>
      <h1>xxxx收银系统</h1>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-form ref="form"
                   label-width="80px">
            <el-form-item label="手机号码">
              <el-input v-model="form.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="login">登陆</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>
<script>

import { setToken, getUserInfo } from "@/webapi/tool"

export default {
  data() {
    return {
      form: {
        phoneNumber: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      let self = this
      self.$http.post("/auth/login", self.form).then((resolve) => {
        setToken(resolve.data.data)
        this.$router.push("/tables")
      })
    }
  }
}
</script>
