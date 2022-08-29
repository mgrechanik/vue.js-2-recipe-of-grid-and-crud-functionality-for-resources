<template>
        <ul class="pagination" v-if="endPageNumber > 1">
          <li class="prev">
            <span v-if="currentPageNumber == 1">«</span>
            <a href="#" v-else @click.prevent="$emit('change_current_page', currentPageNumber - 1)" title="Previous page">«</a>            
          </li>
          <li v-for="n in pageNumbers" :key="n">
            <span v-if="n == currentPageNumber">{{n}}</span>
            <a href="#" v-else @click.prevent="$emit('change_current_page', n)">{{n}}</a>
          </li>
          <li class="next">
            <span v-if="currentPageNumber == endPageNumber">»</span>
            <a href="#" v-else @click.prevent="$emit('change_current_page', currentPageNumber + 1)" title="Next page">»</a>            
          </li>          
      </ul>
</template>

<script>


export default {
  name: 'yii-like-paginator',
  
  components: {

  },
  data: function() {
    return {

    };
  },
  props: ['currentPageNumber', 'endPageNumber'],
  computed: {
      /**
        * Showing 10 pages in paginator when possible
        */
      pageNumbers() {
        let res = [];
        let possibleLeft = this.currentPageNumber - 1;
        let possibleRight = this.endPageNumber - this.currentPageNumber;
        let leftPlus = 0, rightPlus = 0;
        if (possibleLeft < 5) {
          rightPlus = 5 - possibleLeft;
        }
        if (possibleRight < 4) {
          leftPlus = 4 - possibleRight;
        }        
        for (let i = this.currentPageNumber - 5 - leftPlus; i < this.currentPageNumber + 5 + rightPlus; i++) {
          if (i < 1 || i > this.endPageNumber) {
            continue;
          }
          res.push(i);
        }
        return res;
      },    
      pageNumbersShort() {
        let res = [];
        for (let i = this.currentPageNumber - 5; i < this.currentPageNumber + 5; i++) {
          if (i < 1 || i > this.endPageNumber) {
            continue;
          }
          res.push(i);
        }
        return res;
      }
  },
  methods: {
    
  },
  created() {  

  }  
}

</script>