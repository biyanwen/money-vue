<template>
  <div id="app">
    <!--      <router-link to="/">Home</router-link> |-->
    <!--      <router-link to="/about">About</router-link>-->
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box
}
a {
  text-decoration: none;
}
input{
  background:none;
  outline:none;
  border:0;
}
.router-link-active {
  text-decoration: none;
}

body {
  background-color: #f1f1f1;
  overflow-x: hidden;
}

.vc-popover-content-wrapper[data-v-05016e86] {
  transform: translate3d(-44px, 63.6667px, 0px) !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@media screen and (min-width: 900px){
  #app{
    max-width: 700px;
    margin: 0 auto;
    height: 100vh;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
