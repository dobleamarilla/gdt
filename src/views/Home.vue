<template>
  <Header/>
  <HomeComponent/>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeComponent from '@/components/Home.vue'; // @ is an alias to /src
import Header from '@/components/Header.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HomeComponent,
    Header
  },
});
</script>
