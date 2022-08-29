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
                <label for="inp3">Rating</label><br>
                <input id="inp3" type="text" v-model.trim.number="model.rating" @change="validate"  class="form-control"
                       v-bind:class="{ 'is-invalid': hasError('rating') }">
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

export default {
  name: 'model-edit-form',
  
  components: {

  },
  props: ['id'],
  data: function() {
    return {
        model: {
            id: '',
            title: '',
            rating: '',
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
    validate() {
      let res = this.validateForm(this.model);
      this.validateResult = Object.assign({}, res);
    },
    hasError(name) {
      return name in this.validateResult;
    },
    async process() {
        this.validate();
        if (this.validateResult['has_error']) {
          alert('Fix the validation errors before continue.');
        } else {
          if (this.id) {
            await this.$store.dispatch(this.moduleName + "/updateObjectAction", this.model); 
            this.$router.push(this.listPageRoute);
          } else {
            await this.$store.dispatch(this.moduleName + "/createObjectAction", this.model); 
            this.$router.push(this.listPageRoute);
          }
        }
    }
  },
  async created() {  
    if (this.id) {
      let obj = await this.$store.dispatch(this.moduleName + "/getObjectAction", this.id); 
      for (let prop in this.model) {
        if (prop in obj) {
          this.model[prop] = obj[prop];
        }
      }
    }
  }  
}

</script>