<template>
  <tr>
    <td><input type="text" v-model.lazy.trim.number="filter.id" class="form-control"
          @change="validate" v-bind:class="{ 'is-invalid': hasError('id') }"  />
    </td>
    <td><input type="text" v-model.lazy.trim="filter.title" class="form-control"
           />
    </td>
    <td>
      <select v-model.number="filter.gender" class="form-control"
        @change="validate" v-bind:class="{ 'is-invalid': hasError('gender') }">
        <option value=""></option>
        <option value="2">Female</option>
        <option value="3">Male</option>
      </select>    

    </td>
    <td>
      <input type="text" v-model.lazy.trim.number="filter.number" class="form-control"
            @change="validate" v-bind:class="{ 'is-invalid': hasError('number') }" />
    </td>
    <td>
      &nbsp;
    </td>    
  </tr>
  
</template>

<script>
import {MODULE_NAME, validateSearchForm} from './_moduleSettings';

import OmegaFilterRow from '../omega/FilterRow';

export default {
  name: 'filter-row',
  extends: OmegaFilterRow,
  components: {
    
  },
  data: function() {
    return {
        filter: {
            id: '',
            title: '',
            gender: '',
            number: '',
        },
        validateResult: {
          'has_error': false
        }        
    };
  },

  computed: {
    moduleName() {
      return MODULE_NAME;
    },
    validateSearchForm() {
      return validateSearchForm;
    }     
  }, 

  methods: {

  },   
  
  watch: {

  },

  props: {
  
  },


}

</script>