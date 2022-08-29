<template>
  <tr>
    <td><input type="text" v-model.lazy.trim.number="filter.id" class="form-control"
          @change="validate" v-bind:class="{ 'is-invalid': hasError('id') }"  />
    </td>
    <td><input type="text" v-model.lazy.trim="filter.title" class="form-control"
           />
    </td>
    <td><input type="text" v-model.lazy.trim.number="filter.rating" class="form-control"
          @change="validate" v-bind:class="{ 'is-invalid': hasError('rating') }" />
    </td>
    <td>
      &nbsp;
    </td>    
  </tr>
  
</template>

<script>
import {MODULE_NAME, validateSearchForm} from './_moduleSettings';



export default {
  name: 'filter-row',
  
  components: {
    
  },
  data: function() {
    return {
        filter: {
            id: '',
            title: '',
            rating: '',
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
    validate() {
      let res = this.validateSearchForm(this.filter);
      this.validateResult = Object.assign({}, res);
    },  
    hasError(name) {
      return name in this.validateResult;
    },      
  },   
  
  watch: {
    filter: {
        handler: function (val) {
            this.validate();
            if (!this.validateResult['has_error']) {
              this.$store.dispatch(this.moduleName + '/setFilterAction', val);
            }
        },
        deep: true
    }
  },
  props: {

      
  },


  created() {  
    this.filter =  Object.assign({}, this.$store.state[this.moduleName].condition.filter);
  }  
}

</script>