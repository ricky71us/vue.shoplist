<template>
  <v-banner single-line :sticky="sticky">
    Adding more content.
    <template v-slot:actions></template>
  </v-banner>
</template>
<script>
export default {
  data: () => ({
    sticky: false,
  }),
};
</script>
