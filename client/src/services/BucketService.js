const baseUrl = 'http://localhost:3000/api/countries/';

export default {
  getBucketList() {
    return fetch(baseUrl)
    .then(res => res.json())
  },

  // TODO: add bucket list item
  addBucketItem(payload) {
    return fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {'Content-type': 'application/json'}
    })
    .then(res => res.json())
  },

  updateBucketItem(id, payload){
    return fetch (baseUrl + id, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {'Content-type': 'application/json'}
    })
    .then(res => res.json())
  }
}
