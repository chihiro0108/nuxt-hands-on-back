<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>TODO App</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>

        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const drawer = ref(false)
const miniVariant = ref(false)
const clipped = ref(false)

const authStore = useAuthStore()

const user = computed(() => authStore.currentUser)

const items = computed(() => {
  if (user.value) {
    return [
      {
        icon: "mdi-apps",
        title: "TODOS",
        to: "/"
      },
      {
        icon: "mdi-chart-bubble",
        title: "MYPAGE",
        to: "/mypage"
      }
    ];
  } else {
    return [
      {
        icon: "mdi-apps",
        title: "LOGIN",
        to: "/login"
      },
      {
        icon: "mdi-chart-bubble",
        title: "SIGNUP",
        to: "/signup"
      }
    ];
  }
})
</script>
