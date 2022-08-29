<template>
  <tr class="grid-title">
    <th> 
      <a href="#" :class="getClass('id')" @click="change('id');" > ID</a>
    </th>
    <th> 
      <a href="#" :class="getClass('title')" @click="change('title');" > Title</a>
    </th>
    <th> 
      <a href="#" :class="getClass('gender')" @click="change('gender');" > Gender</a>
    </th>
    <th> 
      Number
    </th>    
    <th>
      &nbsp;
    </th>
  </tr>
  
</template>

<script>
import {MODULE_NAME} from './_moduleSettings';

import OmegaTitleAndSortRow from '../omega/TitleAndSortRow';

export default {
  name: 'title-and-sort-row',
  extends: OmegaTitleAndSortRow,
  
  components: {
    
  },

  data: function() {
    return {
        sort: {
            id: 'asc',
            title: '',
            gender: '',
        }
    };
  },

  computed: {
    moduleName() {
      return MODULE_NAME;
    },     

  },  

  methods: {

  },

  watch: {
    
  },

}

</script>