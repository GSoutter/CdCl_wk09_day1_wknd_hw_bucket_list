<template lang="html">
  <div id="favourite_countries">
    <h2>Bucket List</h2>
    <ul>
      <li v-for="country in bucketList" v-bind:class="visited(country)" >{{country.name}} <img class="small-flag" :src="country.flag"/>
      <button  v-if="!country.visited" v-on:click="updateList(country)">Visit!</button> <span v-else>Visited</span></li>
    </ul>
  </div>
</template>

<script>
import BucketService from '@/services/BucketService';
import {eventBus} from '@/main.js';


export default {
  name: 'bucket-list',
  props: ['bucketList'],
  methods: {
    updateList(country){
      const updatedCountry = {
        name: country.name,
        flag: country.flag,
        visited: true
      }
      BucketService.updateBucketItem(country._id, updatedCountry)
      .then(resBucketitem => eventBus.$emit('updated-bucket-item', resBucketitem))
    },
    visited(country){
      return country.visited ? 'countryVisited' : 'notCountryVisited'
    }
  },

}
</script>

<style lang="css" scoped>
.countryVisited {
  color: green;
}
.notCountryVisited {
  color: red;
}
</style>
