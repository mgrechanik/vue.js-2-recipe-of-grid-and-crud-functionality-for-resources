<template>
  <div class="grid-view">

        <yii-like-paginator 
          :currentPageNumber="currentPageNumber" 
          :endPageNumber="endPageNumber"  
          @change_current_page="changeCurrentPage"         
          v-if="pageSize > 10"
        />

        <span v-if="pageSize > 10" v-html="extendedTotalCountHelpHtml"></span>

        <table class="table table-bordered">
          <title-and-sort-row />
          <filter-row />
          <tr v-for="iobject in objects" :key="iobject.id">
            <td>{{iobject.id}}</td>
            <td>{{iobject.title}}</td>
            <td>{{getGender(iobject.gender)}}</td>
            <td>{{iobject.number}}</td>
            <td>
              <router-link :to="{ name: moduleName + '_update', params: { id: iobject.id }}" title="update">
                  update
              </router-link>   
              &nbsp;&nbsp;
              <a href="#" @click.prevent="deleteObject(iobject.id)" title="Delete" class="delete-button">delete</a>
            </td>
          </tr>          
        </table>

        <span v-html="extendedTotalCountHelpHtml"></span>
 
        <yii-like-paginator 
          :currentPageNumber="currentPageNumber" 
          :endPageNumber="endPageNumber"  
          @change_current_page="changeCurrentPage"         
        />      

  </div>
</template>

<script>
import OmegaGridView from '../omega/GridView';
import YiiLikePaginator from "../crud-common/paginator/YiiLikePaginator.vue"
import FilterRow from "./FilterRow.vue"
import TitleAndSortRow from "./TitleAndSortRow.vue"

import {MODULE_NAME} from './_moduleSettings';

export default {
  name: 'grid-view',
  extends: OmegaGridView,
  components: {
     TitleAndSortRow,
     FilterRow,
     YiiLikePaginator,
  },
  props: [],
  data: function() {
    return {

    };
  }  ,
  computed: {
    moduleName() {
      return MODULE_NAME;
    },    
  },

  methods: {
    getGender(gender) {
      gender = + gender;
      return gender == 2 ?  'Female' : (gender == 3 ? 'Male' : '');
    }
  },

  created() {  

  }  
}

</script>