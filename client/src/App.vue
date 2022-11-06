<template>
  <div class="grid w-full">
    <Toast /> 
    
    <div class="col-6">
      <header>
        <template v-if="providerConnected">
          <div>
            <ConnectButton />
          </div>

          <div class="wrapper">
            <nav>
              <RouterLink to="/piggybank">PIGGYBANK</RouterLink>
              <RouterLink to="/tickets">TICKETS</RouterLink>
            </nav>
          </div>
        </template>
      </header>
    </div>
    <div class="col-6">
      <template v-if="providerConnected">
      <Card>
        <template #content>
          <RouterView />
        </template>
      </Card>
      </template>
      <h1 v-else>
        Please install MetaMask and reload the page!
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConnectButton from "@/components/ConnectButton.vue";

const providerConnected = window.ethereum.isConnected();
</script>

<style>
@import "@/assets/base.css";

#app {
  width: 100%;
  height: 100vh;
  padding: 2rem;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a {
  text-decoration: none;
  color: var(--color-text);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  text-decoration: underline;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 6rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
