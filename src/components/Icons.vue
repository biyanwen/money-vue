<template>
  <svg class="icon">
    <use :xlink:href="'#'+iconName"/>
  </svg>
</template>

<script>
let importAll = (requireContext) => requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('../assets/icons', true, /\.svg$/));
} catch (error) {
  console.log(error);
}

export default {
  props: ["iconName"],
  name: "icons"
}
</script>

<style lang="scss" scoped>
</style>