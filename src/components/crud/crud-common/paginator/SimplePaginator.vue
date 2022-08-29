<template>
        <table class="table-pagination table-bordered" v-if="endPageNumber">
        <tr>
          <td v-for="n in endPageNumber" :key="n">
            <span v-if="n == currentPageNumber">{{n}}</span>
            <a href="#" v-else @click.prevent="$emit('change_current_page', n)">{{n}}</a>
          </td>
        </tr>
      </table>
</template>

<script>


export default {
  name: 'simple-paginator',
  
  components: {

  },
  data: function() {
    return {

    };
  },
  props: ['currentPageNumber', 'endPageNumber'],
  computed: {
      

  },
  methods: {
    
  },
  created() {  

  }  
}

</script>