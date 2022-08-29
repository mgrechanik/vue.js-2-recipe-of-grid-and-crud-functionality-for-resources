<template>
  <div class="omega-grid-page">
    <h1>Omegas list page</h1>
    <router-link to="/omega-create">Add item</router-link>
    <grid-view /> 
  </div>
</template>

<script>
import GridView from "@/components/crud/omega/GridView.vue"

export default {
  name: 'OmegasGridPage',
  
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