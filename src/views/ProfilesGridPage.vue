<template>
  <div class="profile-grid-page">
    <h1>Profiles list page</h1>
    <router-link to="/profile-create">Add item</router-link>
    <grid-view /> 
  </div>
</template>

<script>
import GridView from "@/components/crud/profile/GridView.vue"

export default {
  name: 'ProfilesGridPage',
  
  components: {
      GridView
  },
  props: [],
  data: function() {
    return {

    };
  }  ,
  computed: {

    

  },
  methods: {
    
  },
  created() {  


  }   
}

</script>