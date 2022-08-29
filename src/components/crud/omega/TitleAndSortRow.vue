<template>
  <tr class="grid-title">
    <th> 
      <a href="#" :class="getClass('id')" @click="change('id');" > ID</a>
    </th>
    <th> 
      <a href="#" :class="getClass('title')" @click="change('title');" > Title</a>
    </th>
    <th> 
      <a href="#" :class="getClass('rating')" @click="change('rating');" > Rating</a>
    </th>
    <th>
      &nbsp;
    </th>
  </tr>
  
</template>

<script>
import {MODULE_NAME} from './_moduleSettings';

export default {
  name: 'title-and-sort-row',
  
  components: {
    
  },

  data: function() {
    return {
        sort: {
            id: 'asc',
            title: '',
            rating: '',
        }
    };
  },

  computed: {
    moduleName() {
      return MODULE_NAME;
    },     

  },  

  props: {
  },  

  methods: {
    getClass(what) {
      return this.sort[what];
    },
    change(what) {
      let current = this.sort[what];
      this.sort[what] = current == 'asc' ? 'desc' : 'asc';
      for (let prop in this.sort) {
        if (prop != what) { 
          this.sort[prop] = '';
        }
      }      
    }
  },

  watch: {
    sort: {
        handler: function (val) {
            this.$store.dispatch(this.moduleName + '/setSortAction', val);
        },
        deep: true
    }
  },

  created() {  
    this.sort = Object.assign({}, this.$store.state[this.moduleName].condition.sort);
  }  
}

</script>