<template>
  <div class="login-page">
    <div class="login-card">
      <h2 class="login-title custom-font">ເຂົ້າສູ່ລະບົບ</h2>
      <v-text-field
        label="ຊື່ຜູ້ໃຊ້ (ສະເພາະເອັດມິນ)"
        placeholder="ກະລຸນາປ້ອມຊື່"
        single-line
        outlined
        dense
        prepend-inner-icon="mdi-account"
        v-model="email"
        class="login-input custom-font"
      ></v-text-field>
      <v-text-field
        label="ລະຫັດຜ່ານ"
        placeholder="ກະລຸນາປ້ອມລະຫັດຜ່ານ..."
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        single-line
        outlined
        dense
        prepend-inner-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        maxlength="20"
        counter
        :rules="[rules.required, rules.counter]"
        @click:append="toggleShowPassword"
        @submit.prevent="checkrequired"
        @keydown.enter="checkrequired"
        class="login-input custom-font"
      ></v-text-field>
      <div class="login-options">
        <v-checkbox
          v-model="rememberMe"
          label="ຈື່ຊື່ຜູ້ໃຊ້"
          class="login-checkbox custom-font"
          dense
        ></v-checkbox>
      </div>
      <v-btn
        class="login-button rainbow-button login-card custom-font"
        large
        :loading="loading"
        :disabled="loading"
        @click="checkrequired"
        >ເຂົ້າສູ່ລະບົບ</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  auth: 'guest',
  data() {
    return {
      rememberMe: false,
      loading: false,
      showPassword: false,
      email: '',
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        counter: (value) => value.length <= 20 || 'Max 20 characters',
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
  mounted() {
    // remove password saved in plain text by older versions
    localStorage.removeItem('password')
    const storedEmail = localStorage.getItem('email')
    if (storedEmail) {
      this.email = storedEmail
      this.rememberMe = true
    }
  },
  methods: {
    toggleShowPassword(){
      this.showPassword = !this.showPassword;
    },
    async checkrequired() {
      if (!this.email || !this.password) {
        this.errorMessage('ຂໍ້ມູນບໍ່ຄົບ', 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ ແລະ ລະຫັດຜ່ານ.')
        return
      }
      if (this.loading) return
      this.loading = true
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            nameoremail: this.email,
            password: this.password,
          },
        })
        if (response.data) {
          if (this.rememberMe) {
            localStorage.setItem('email', this.email)
          } else {
            localStorage.removeItem('email')
          }
          this.$router.push('/')
        } else {
          console.error('Invalid response data')
        }
      } catch (err) {
        this.errorMessage(
          'ບໍ່ພົບຜູ້ໃຊ້',
          'ກະລຸນາກວດເບິ່ງຊື່ ຫຼື ລະຫັດຜ່ານຂອງທ່ານ ແລະ ລອງໃໝ່ອີກຄັ້ງ.'
        )
      } finally {
        this.loading = false
      }
    },
    errorMessage(title, desc) {
      this.$Notice.error({
        title: `<span class="custom-font">${title}</span>`,
        desc: `<span class="custom-font">${desc}</span>`,
      })
    },
    messageModal(type, desc) {
      this.$Message[type]({
        background: true,
        content: `<span class="custom-font">${desc}<span>`,
      })
    },
  },
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(90vh + 2px);
  background: url('~/static/login_backgroud.png') no-repeat center center;
  background-size: cover;
}
.login-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 350px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.login-title {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff;
}
.login-input {
  width: 100%;
  margin-bottom: 15px;
  border-radius: 20px;
}
.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #fff;
}
.login-checkbox {
  color: #fff;
}
.forgot-password {
  color: #fff;
  text-decoration: none;
}
.login-button {
  width: 100%;
  color: #fff;
  margin-top: 20px;
  border-radius: 50px;
  font-weight: bold;
}
.rainbow-button {
  background: linear-gradient(
    12deg,
    #ff704d,
    #ff5c33,
    #ffd633,
    #ffd11a,
    #ffff66,
    #FFC400,
    #ffd633,
    #ffd11a,
    #ffff66,
    #FFC400,
    #ff704d,
    #ffd633,
    #ffd11a,
    #FFC400,
    #ffff66,
    #FFC400
  );
  color: #fff;
  background-size: 200% 200%;
  animation: rainbow-animation 15s linear infinite;
  animation-play-state: running;
}

.rainbow-button:hover {
  animation-play-state: paused;
}

@keyframes rainbow-animation {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}
.register-text {
  margin-top: 20px;
  color: #fff;
}
.register-text a {
  color: #4d4d00;
  font-weight: bold;
  text-decoration: none;
}
</style>
