<template>
  <div class="main">
    <router-link to="/profiles">Васк to the list</router-link>
    <h1>{{id ? 'Edit' : 'Create'}} page</h1>
    <edit-form :id="id" />
  </div>
</template>

<script>
import EditForm from "@/components/crud/profile/EditForm.vue";

export default {
  name: 'ProfileEdit',
  
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