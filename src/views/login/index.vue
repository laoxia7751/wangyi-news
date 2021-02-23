<template>
  <div class="loginMain">
    <!-- 登录表单 -->
    <el-form class="form" ref="loginForm" :model="loginForm" label-width="0" label-position="top" v-if="scene === 'login'">
      <el-form-item class="formItem" size="medium">
        <el-input v-model="loginForm.user" placeholder="请输入用户名" prefix-icon="el-icon-user" />
      </el-form-item>
      <el-form-item class="formItem" size="medium">
        <el-input v-model="loginForm.password" show-password placeholder="请输入密码" prefix-icon="el-icon-lock" />
      </el-form-item>
      <el-form-item class="opera">
        <el-button size="medium" type="danger" @click="login">登录</el-button>
        <el-button size="medium" @click="scene = 'regist'">立即注册</el-button>
      </el-form-item>
    </el-form>

    <!-- 注册表单 -->
    <el-form class="form" ref="registForm" :model="registForm" label-width="0" label-position="top" v-else>
      <el-form-item class="formItem" size="medium" prop="user">
        <el-input v-model="registForm.user" placeholder="请输入用户名" prefix-icon="el-icon-user" />
      </el-form-item>
      <el-form-item class="formItem" size="medium" prop="password">
        <el-input v-model="registForm.password" show-password placeholder="请输入密码" prefix-icon="el-icon-lock" />
      </el-form-item>
      <el-form-item class="formItem" size="medium" prop="confirmPassword">
        <el-input v-model="registForm.confirmPassword" show-password placeholder="请再次输入密码" prefix-icon="el-icon-lock" />
      </el-form-item>
      <el-form-item class="opera">
        <el-button size="medium" type="danger" @click="regist">注册</el-button>
        <el-button size="medium" @click="scene = 'login'">已有账号？登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup () {
    const state = reactive({
      loginForm: {
        user: '',
        password: ''
      },
      registForm: {
        user: '',
        password: '',
        confirmPassword: ''
      },
      scene: 'login',
    })

    return state
  },
  methods: {
    login () { },
    regist () { }
  },
}
</script>

<style lang="scss" >
.loginMain {
  padding: 20vw 3%;
  height: 100%;
  width: 100%;
  .form {
    width: 100%;
    .el-input__inner {
      border-color: transparent transparent #dcdfe6 transparent;
      border-radius: 0;
    }
    .opera {
      .el-button {
        width: 100%;
        margin: 0;
        + .el-button {
          margin-top: 5vw;
        }
      }
    }
  }
}
</style>