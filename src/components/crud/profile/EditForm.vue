<template>
  <form>
        <div class="row" v-if="id">
            <div class="col-sm-3"></div>
            <div class="col-sm-6 ">
                <label for="inp1">Id</label><br>
                <input id="inp1" type="text" :value="model.id" disabled>
            </div>
            <div class="col-sm-3"></div>
        </div>		

        <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6 " >
                <label for="inp2">Title</label><br>
                <input id="inp2" type="text" v-model.trim="model.title" @change="validate" class="form-control"
                      v-bind:class="{ 'is-invalid': hasError('title') }"
                >
            </div>
            <div class="col-sm-3"></div>
        </div>	    

        <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6 " >
                <label for="inp4">Gender</label><br>
                <select id="inp4" v-model.number="model.gender" class="form-control"
                  @change="validate" v-bind:class="{ 'is-invalid': hasError('gender') }">
                  <option value=""></option>
                  <option value="2">Female</option>
                  <option value="3">Male</option>
                </select>                       
            </div>
            <div class="col-sm-3"></div>
        </div>	                    

        <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6 " >
                <label for="inp3">Number</label><br>
                <input id="inp3" type="text" v-model.trim="model.number" @change="validate"  class="form-control"
                       v-bind:class="{ 'is-invalid': hasError('number') }">
            </div>
            <div class="col-sm-3"></div>
        </div>	            

        <div class="row">
            <div class="col-sm-5"></div>
            <div class="col-sm-2 text-center">
                <button type="button" class="form-control edit-form" @click="process">
                    {{id ? 'Save' : 'Add'}}
                </button>
            </div>
            <div class="col-sm-5"></div>
        </div>        
  </form>
</template>

<script>
import {MODULE_NAME, validateForm, LIST_PAGE_ROUTE} from './_moduleSettings';

import OmegaEditForm from '../omega/EditForm';

export default {
  name: 'model-edit-form',
  extends: OmegaEditForm,
  components: {

  },
  props: ['id'],
  data: function() {
    return {
        model: {
            id: '',
            title: '',
            gender: '',
            number: '',
        },
        validateResult: {
          'has_error': false
        }
    };
  }  ,
  computed: {
    moduleName() {
      return MODULE_NAME;
    },
    validateForm() {
      return validateForm;
    },
    listPageRoute() {
      return LIST_PAGE_ROUTE;
    }    
  },
  methods: {
    
  },
 
}

</script>