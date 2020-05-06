<template>
  <div class="about">
    <h1>This is an about page</h1>

    <stores />
  </div>
</template>

<script>
import Stores from '@/components/Stores.vue';

export default {
  name: 'App',
  components: {'stores' : Stores},
};
</script>