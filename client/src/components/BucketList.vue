<template lang="html">
  <div id="favourite_countries">
    <h2>Bucket List</h2>
    <ul>
      <li v-for="country in bucketList">{{country.name}} <img class="small-flag" :src="country.flag"/>
      <button v-on:click="updateList">Visit!</button></li>
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
    updateList(){
      const updatedCountry= {
        name: this.country.name,
        flag: this.country.flag,
        visited: true,
      }
    BucketService.updateBucketItem(this.country._id, updatedCountry)
    .then(resBucketitem => eventBus.$emit('updated-bucket-item', resBucketitem))
    }
  }
}
</script>

<style lang="css" scoped>
</style>
