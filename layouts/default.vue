<template>
  <v-app class="app-root">
    <v-navigation-drawer
      v-if="isLoggedInPage"
      v-model="drawer"
      :mini-variant="miniVariant"
      clipped
      fixed
      app
      width="220"
      color="secondary"
      dark
      class="sidebar"
    >
      <div class="sidebar-header custom-font">
        <v-icon color="primary">mdi-shield-account</v-icon>
        <span v-if="!miniVariant" class="ml-2">Admin</span>
      </div>
      <v-list nav dense class="pt-2">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="sidebar-item"
          active-class="sidebar-item--active"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="custom-font">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat clipped-left fixed app color="white" class="app-bar">
      <v-btn
        v-if="isLoggedInPage"
        icon
        aria-label="toggle menu"
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon size="26">mdi-menu</v-icon>
      </v-btn>
      <v-avatar size="40" class="ml-2 logo">
        <img src="/Tpluslogo.png" alt="Tplus" />
      </v-avatar>
      <h3 v-if="isLoggedInPage" class="custom-font page-title ml-4">
        {{ pageTitle }}
      </h3>
      <v-spacer />
      <template v-if="isLoggedInPage">
        <div v-if="fname" class="user-chip custom-font mr-2">
          <v-icon small color="primary-dark" class="mr-1"
            >mdi-account-circle</v-icon
          >
          {{ fname }}
        </div>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              aria-label="logout"
              v-bind="attrs"
              v-on="on"
              @click="logoutDialog = true"
            >
              <v-icon color="error">mdi-logout</v-icon>
            </v-btn>
          </template>
          <span class="custom-font">ອອກຈາກລະບົບ</span>
        </v-tooltip>
      </template>
    </v-app-bar>

    <v-main class="main-bg">
      <Nuxt />
    </v-main>

    <v-dialog v-model="logoutDialog" max-width="340">
      <v-card class="rounded-lg">
        <v-card-text class="text-center pt-6">
          <v-icon size="44" color="warning">mdi-alert-circle-outline</v-icon>
          <h3 class="custom-font mt-3 text-color">ຕ້ອງການອອກຈາກລະບົບ ຫຼື ບໍ່?</h3>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-spacer />
          <v-btn text class="custom-font" @click="logoutDialog = false"
            >ຍົກເລີກ</v-btn
          >
          <v-btn
            color="error"
            depressed
            class="custom-font"
            :loading="loggingOut"
            @click="logOut"
            >ອອກຈາກລະບົບ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: true,
      miniVariant: false,
      logoutDialog: false,
      loggingOut: false,
      items: [
        { icon: 'mdi-view-dashboard-outline', title: 'ໜ້າຫຼັກ', to: '/' },
        { icon: 'mdi-movie-open-outline', title: 'ໂພດ', to: '/post' },
      ],
    }
  },
  computed: {
    isLoggedInPage() {
      return this.$route.path !== '/login'
    },
    pageTitle() {
      const item = this.items.find((i) => i.to === this.$route.path)
      return item ? item.title : ''
    },
    fname() {
      return this.$auth.user && this.$auth.user.name ? this.$auth.user.name : ''
    },
  },
  methods: {
    async logOut() {
      this.loggingOut = true
      try {
        await this.$auth.logout()
      } catch (e) {
        // logout endpoint failed: still clear the local session
        this.$auth.strategy.token.reset()
      } finally {
        this.loggingOut = false
        this.logoutDialog = false
        this.$router.push('/login')
      }
    },
  },
}
</script>
<style scoped>
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
.main-bg {
  background-color: #f5f6f8;
}
.app-bar {
  border-bottom: 1px solid #e5e7eb !important;
}
.logo {
  background-color: #111827;
}
.page-title {
  color: #1f2937;
  font-weight: 600;
}
.text-color {
  color: #1f2937;
}
.user-chip {
  display: flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 999px;
  background-color: #fff8e1;
  color: #1f2937;
  font-size: 14px;
}
.sidebar-header {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #ffc400;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.sidebar-item {
  border-radius: 8px !important;
  color: #d1d5db !important;
}
.sidebar-item--active {
  background-color: rgba(255, 196, 0, 0.12);
  color: #ffc400 !important;
  box-shadow: inset 3px 0 0 #ffc400;
}
.sidebar-item--active .v-icon {
  color: #ffc400 !important;
}
</style>
