<template>
  <div class="main">
    <router-link to="/">Васк to the list</router-link>
    <h1>{{id ? 'Edit' : 'Create'}} page</h1>
    <edit-form :id="id" />
  </div>
</template>

<script>
import EditForm from "@/components/crud/omega/EditForm.vue"


export default {
  name: 'OmegaEdit',
  
  components: {
      EditForm
  },
  props: ['id'],
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