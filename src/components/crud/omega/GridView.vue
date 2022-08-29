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
            <td>{{iobject.rating}}</td>
            <td>
              <router-link :to="{ name: moduleName + '_update', params: { id: iobject.id }}" title="update">
                  update
              </router-link>   
              
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
import YiiLikePaginator from "../crud-common/paginator/YiiLikePaginator.vue"
import FilterRow from "./FilterRow.vue"
import TitleAndSortRow from "./TitleAndSortRow.vue"

import {MODULE_NAME} from './_moduleSettings';

export default {
  name: 'grid-view',
  
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
    objects() {
      return this.$store.getters[this.moduleName + '/currentPageObjects'];
    },
    currentPageNumber(){
      return this.$store.state[this.moduleName].currentPageNumber;
    },
    totalCount(){
      return this.$store.state[this.moduleName].totalCount;
    },
    endPageNumber() {
      return this.$store.getters[this.moduleName + '/endPageNumber'];
    },
    pageSize() {
      return this.$store.state[this.moduleName].pageSize;
    },
    simpleTotalCountHelpHtml(){
      return this.totalCount ? '<em>Found <strong>' + this.totalCount + '</strong> items.</em>' : '<em>No results found.</em>';
    },
    extendedTotalCountHelpHtml(){
      if (!this.totalCount) {
        return '<em>No results found.</em>';
      } 
      let start = this.pageSize * (this.currentPageNumber - 1) + 1;
      let end = start - 1 + this.pageSize;
      if (end > this.totalCount) {
        end = this.totalCount;
      }
      return '<em>Showing <strong>' + start + ' - ' + end + '</strong> of <strong>' 
        + this.totalCount + '</strong> item' + (this.totalCount > 1 ? 's' : '') + '.</em>';
    },     
    

  },

  methods: {
    changeCurrentPage(event){
      this.$store.dispatch(this.moduleName + '/setPageAction', event);
    },
    deleteObject(id) {
       if (confirm('Are you sure you want to delete this item?')) {
         this.$store.dispatch(this.moduleName + '/deleteObjectAction', id);
       }
    }
  },

  created() {  

  }  
}

</script>