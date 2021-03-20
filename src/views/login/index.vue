<template>
  <div class="loginMain">
    <!-- 登录表单 -->
    <el-form class="form" ref="loginFormData" :model="loginForm" label-position="top" v-if="scene === 'login'" :rules="loginRules">
      <el-form-item class="formItem" size="medium" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user" />
      </el-form-item>
      <el-form-item class="formItem" size="medium" prop="password">
        <el-input v-model="loginForm.password" show-password placeholder="请输入密码" prefix-icon="el-icon-lock" />
      </el-form-item>
      <el-form-item class="opera">
        <el-button size="medium" type="danger" @click="login">登录</el-button>
        <el-button size="medium" @click="changeScene('regist')">立即注册</el-button>
      </el-form-item>
    </el-form>

    <!-- 注册表单 -->
    <el-form class="form" ref="registFormData" :model="registForm" label-position="top" :rules="registForm" v-else>
      <el-form-item class="formItem" size="medium" prop="username">
        <el-input v-model="registForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user" />
      </el-form-item>
      <el-form-item class="formItem" size="medium" prop="password">
        <el-input v-model="registForm.password" show-password placeholder="请输入密码" prefix-icon="el-icon-lock" />
      </el-form-item>
      <el-form-item class="formItem" size="medium" prop="confirmPassword">
        <el-input v-model="registForm.confirmPassword" show-password placeholder="请再次输入密码" prefix-icon="el-icon-lock" />
      </el-form-item>
      <el-form-item class="opera">
        <el-button size="medium" type="danger" @click="regist">注册</el-button>
        <el-button size="medium" @click="changeScene('login')">已有账号？登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, toRefs, ref, inject } from 'vue'
import { userLogin, userRegist } from '/@api'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
export default {
  setup (props, ctx) {
    const store = useStore()
    const router = useRouter()

    const state = reactive({
      loginForm: {
        username: '',
        password: ''
      },
      registForm: {
        username: '',
        password: '',
        confirmPassword: '',
      },
      scene: 'login',
      loginRules: {
        username: { required: true, message: '请输入用户名', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' }
      },
      registRules: {
        username: { required: true, message: '请输入用户名', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' }
      }
    })
    // 修改场景
    const changeScene = scene => {
      state.loginForm = { username: '', password: '' }
      state.registForm = { username: '', password: '', confirmPassword: '' }
      state.scene = scene
    }
    const loginFormData = ref(null)
    const registFormData = ref(null)
    // 登录事件 
    const login = async () => {
      try {
        const validate = await loginFormData.value.validate()
        validate && userLogin(state.loginForm).then(res => {
          ElMessage.success(`欢迎回来,${res.data.nickname}`)
          localStorage.setItem("user", JSON.stringify(res.data))
          store.commit('login', res.data)
          router.replace('/home')
        })
      } catch (error) {
        console.error(error)
      }
    }
    // 注册事件
    const regist = () => {
      registFormData.value.validate(valid => {
        if (valid) {
          userRegist(state.registForm).then(res => {
            ElMessage.success('注册成功')
            localStorage.setItem("user", JSON.stringify(res.data))
            store.commit('login', res.data)
            router.replace('/home')
          })
        } else {
          console.log('error')
          return false
        }
      })
    }
    // 校验规则
    return {
      ...toRefs(state),
      changeScene,
      login,
      regist,
      loginFormData,
      registFormData,
    }
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