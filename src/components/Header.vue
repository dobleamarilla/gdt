<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">New GDT</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li v-if="userInfo.logeado" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              TPV
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Teclados</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Promociones</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Parámetros</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">TPV Online</a></li>
            </ul>
          </li>
          <li v-if="userInfo.logeado" class="nav-item">
            <a class="nav-link" @click="logout()">Desconectar</a>
          </li>
          <li v-else class="nav-item">
            <a class="nav-link" @click="login()">Iniciar sesión</a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';
import {useStore} from 'vuex';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../store/index";

export default defineComponent({
    name: 'headerMenu',
    setup() {
      const store = useStore();
      const userInfo = computed(() => {
        /* Si NO tiene nombre */
        if (store.state.userInfo.displayName == null) {
          return {
            displayName: 'Menú de usuario',
            logeado: store.state.userInfo.logeado
          }; 
          /* Si tiene nombre */
        } else {
          return store.state.userInfo;
        }
      });

      /* LOGOUT */
      function logout() {
        store.dispatch('logout');
      }

      /* LOGIN */
      function login() {
        store.dispatch("login");
      }

      /* ¿ESTÁ LOGEADO? */
      onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser != null) {
          store.dispatch('setUserInfo', {
            logeado: true,
            displayName: firebaseUser.displayName
          });
        } else {
          store.dispatch('setUserInfo', {
            logeado: false,
            displayName: ''
          });
        }
      });

      return {
        userInfo,
        logout,
        login
      };
    }
});
</script>

<style>

</style>