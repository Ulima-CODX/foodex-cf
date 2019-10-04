<template>
  <div id="about" class="card">
    <div class="footer">
      <p>{{ $t("pages.about.description") }}</p>
      <div v-for="(member, index) in members" :key="index">
        <p class="member">{{ member.name }} ({{ member.code }})</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  data: () => ({
    members: [
      { name: "Bisso Bernal, Carlos Manuel", code: 20110154 },
      { name: "Cabrera Vidal, Andre Eduardo", code: 20160235 },
      { name: "Calcina Huerta, Sergio Alvaro", code: 20161863 },
      { name: "Sanchez Concha, Eduardo", code: 20151250 },
      { name: "Vásquez Montes, Daniel Rolando", code: 20162614 }
    ]
  })
};
</script>

<style lang="scss" scoped>
.member {
  padding: 5px 20px 5px;
}
</style>
