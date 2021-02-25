<template>
  <div class="loginMain">
    <!-- 登录表单 -->
    <el-form class="form" ref="loginForm" label-width="0" label-position="top" v-if="scene === 'login'">
      <el-form-item class="formItem" size="medium">
        <el-input v-model="user" placeholder="请输入用户名" prefix-icon="el-icon-user" />
      </el-form-item>
      <el-form-item class="formItem" size="medium">
        <el-input v-model="password" show-password placeholder="请输入密码" prefix-icon="el-icon-lock" />
      </el-form-item>
      <el-form-item class="opera">
        <el-button size="medium" type="danger" @click="login">登录</el-button>
        <el-button size="medium" @click="changeScene('regist')">立即注册</el-button>
      </el-form-item>
    </el-form>

    <!-- 注册表单 -->
    <el-form class="form" ref="registForm" label-width="0" label-position="top" v-else>
      <el-form-item class="formItem" size="medium" prop="user">
        <el-input v-model="user" placeholder="请输入用户名" prefix-icon="el-icon-user" />
      </el-form-item>
      <el-form-item class="formItem" size="medium" prop="password">
        <el-input v-model="password" show-password placeholder="请输入密码" prefix-icon="el-icon-lock" />
      </el-form-item>
      <el-form-item class="formItem" size="medium" prop="confirmPassword">
        <el-input v-model="confirmPassword" show-password placeholder="请再次输入密码" prefix-icon="el-icon-lock" />
      </el-form-item>
      <el-form-item class="opera">
        <el-button size="medium" type="danger" @click="regist">注册</el-button>
        <el-button size="medium" @click="changeScene('login')">已有账号？登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup () {
    const state = reactive({
      user: '',
      password: '',
      confirmPassword: '',
      scene: 'login',
    })
    // 修改场景
    const changeScene = scene => {
      state.user = ''
      state.password = ''
      state.confirmPassword = ''
      state.scene = scene
    }
    return {
      ...toRefs(state),
      changeScene
    }
  },
  methods: {
    login () {
    },
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
      margin-top: 1em;
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