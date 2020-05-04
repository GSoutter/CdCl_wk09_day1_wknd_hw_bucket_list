<template lang="html">
  <div id="favourite_countries">
    <h2>Bucket List</h2>
    <div class="bucket-grid">
      <article v-for="country in bucketList" v-bind:class="visited(country)">
        <img class="small-flag" :src="country.flag"/>
        {{country.name}}
        <button  v-if="!country.visited" v-on:click="updateList(country)" class="visit-button">Visit!</button>
        <span v-else>Visited</span>
      </article>
    </div>
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

.bucket-grid {
  display: grid;
  grid-auto-rows: minmax(150px, auto);
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 2em;
  margin: 2%;

}

img {
  display: flex;
  object-fit: scale-down;
  max-width: 100%;
  height: 90px;
  /* border-style: solid; */
  align-items: top;

}

.countryVisited {
  display: grid;
  border-radius: 4px;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
  grid-template-rows: auto auto auto;
  background-color: #1a3300;

  /* padding-bottom: 1.5em */
}
.notCountryVisited {
  display: grid;
  border-radius: 4px;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
  grid-template-rows: auto auto auto;
  background-color: #2B2A34;
}

.countryVisited:hover {
  -webkit-transform: translateY(-1.5%);
}

.visit-button {
  color: rgb(0, 153, 51);
  margin-left: auto;
  border-radius: 4px;
  background-color: rgb(25, 20, 20);
  border-color:  #2B2A34;

}
</style>
