<template>
  <div id="app">
    <h2>Travel Bucket List</h2>

    <country-select :countries="countries"/>

    <country-detail v-if="selectedCountry" :selectedCountry="selectedCountry">
    </country-detail>

    <button v-if="selectedCountry && !inBucketList(selectedCountry)" v-on:click="addToBucketList">Add Country</button>

    <bucket-list :bucketList="bucketList"></bucket-list>
</div>

</template>

<script>
import CountryDetail from '@/components/CountryDetail.vue';
import BucketList from '@/components/BucketList.vue';
import CountrySelect from '@/components/CountrySelect';
import BucketService from '@/services/BucketService';
import {eventBus} from '@/main.js';
export default {
  name: 'App',
  data() {
    return {
      countries: [],
      selectedCountry: null,
      bucketList: []
    }
  },
  components: {
    'country-detail': CountryDetail,
    'bucket-list': BucketList,
    'country-select': CountrySelect
  },
    mounted(){
      this.getCountries();
      this.getBucketList();

      eventBus.$on('country-selected', (country) => {
        this.selectedCountry = country;
      })

      eventBus.$on('updated-bucket-item', (resBucketitem) => {
        const index = this.bucketList.findIndex(country => country._id === resBucketitem._id)
        this.bucketList.splice(index, 1, resBucketitem)
      })


    },
    methods: {
      getCountries(){
        fetch("https://restcountries.eu/rest/v2/all")
        .then(res => res.json())
        .then(countries => this.countries = countries)
      },
      getBucketList(){
        BucketService.getBucketList()
        .then(bucketList => this.bucketList = bucketList)
      },
      addToBucketList(){
        // TODO: use service to add to bucket list
        const selectedCountryTrim = {
          name: this.selectedCountry.name,
          flag: this.selectedCountry.flag,
          visited: false,
        }

        BucketService.addBucketItem(selectedCountryTrim)
        .then(resBucket => this.bucketList.push(resBucket))
      },
      inBucketList(country){
        return this.bucketList.some(item => item.name === country.name)
      }
    }
}
</script>

<style>
.small-flag {
  height: 20px
}

body {
  background: #222129;
}
#app {
  /* display: grid;
  grid-template-rows: 100px 1fr ;
  grid-gap: 1em; */


  background: #222129;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  color: white;

}


</style>
