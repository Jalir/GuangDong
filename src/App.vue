<template>
    <div id="app">
        <navigation-menu @change-theme="changeTheme"></navigation-menu>
        <router-view/>
    </div>
</template>

<script>
import NavigationMenu from '@/views/HomeNavMenu'

export default {
  components: {
    NavigationMenu
  },
  data () {
    return {
      theme: ''
    }
  },
  mounted () {
    this.pageInit()
  },
  methods: {
    pageInit () {
      if (localStorage.getItem('theme') === 'dark') this.changeThemeDark('init')
    },
    changeTheme () {
      localStorage.getItem('theme') === 'light' ? this.changeThemeDark() : this.changeThemeLight()
    },
    changeThemeDark (init) {
      localStorage.setItem('theme', 'dark')
      $('#app').removeClass('dark-to-light')
      init ? $('#app').addClass('dark') : $('#app').addClass('light-to-dark dark')
    },
    changeThemeLight () {
      localStorage.setItem('theme', 'light')
      $('#app').removeClass('light-to-dark dark')
      $('#app').addClass('dark-to-light')
    }
  }
}
</script>

<style lang="less" scoped>

#app {
  width: 100vw;
  height: 100%;
  color: var(--color);
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background-color: var(--background-color);
}

.dark-to-light:after,
.light-to-dark:after {
  content: '';
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  margin-left: 0;
  opacity: 0.8;
  pointer-events: none;
}

.dark-to-light:after {
  background-color: var(--dark-background);
  animation: toLight 1s linear 0s forwards;
}

.light-to-dark:after {
  background-color: var(--light-background);
  animation: toDark 1s linear 0s forwards;
}

@keyframes toLight {
  0% {
    background-color: var(--dark-background);
    opacity: 0.6;
  }
  100% {
    background-color: var(--light-background);
    opacity: 0;
  }
}

@keyframes toDark {
  0% {
    background-color: var(--light-background);
    opacity: 0.6;
  }
  100% {
    background-color: var(--dark-background);
    opacity: 0;
  }
}
</style>
