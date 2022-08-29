<template>
  <div id="app" class="container">
    <div class="row">
        <div class="col-sm-1">
          <br>
          <router-link to="/" v-if="this.$route.name != 'omegas-grid-page'">Omegas</router-link>
          <span v-else>Omegas</span>
          <hr>
          <router-link to="/profiles"  v-if="this.$route.name != 'profiles-grid-page'">Profiles</router-link>        
          <span v-else>Profiles</span>
        </div>
        <div class="col-sm-11">    
          <router-view :key="$route.fullPath"  />
        </div>
        
    </div>

  </div>
</template>

<script>

export default {
  name: 'App',
  
  components: {

  },
  data: function() {
    return {

    };
  }  ,
  computed: {

  },
  methods: {

  },
  created() {  
    this.$store.dispatch("omega/initializeAction", this.$store);    
    this.$store.dispatch("omega/setPageAction", 1);

    this.$store.dispatch("profile/initializeAction", this.$store);    
    this.$store.dispatch("profile/setPageAction", 1);         
  }  
}

</script>

<style src="@/assets/style.css"></style>
<style src="@/assets/crud.css"></style>
