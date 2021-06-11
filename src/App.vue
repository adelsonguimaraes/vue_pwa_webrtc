<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/local-notifications">Local Notifications</router-link> |
      <router-link to="/foreground-detections">Detectação em primeiro plano</router-link> |
      <router-link to="/camera-microfone">Fluxo Câmera e Microfone</router-link> |
      <router-link to="/foto">Tirando Foto</router-link> |
      <router-link to="/gravador">Gravador</router-link> |
      <router-link to="/real-time">Real Time</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
