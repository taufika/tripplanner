// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

/* eslint-disable no-new */
// event hub
window.eventHub = new Vue();

var app = new Vue({
  el: '#app',
  template: '<App v-bind:search-query="searchQuery"/>',
  components: { App },
  data: {
    searchQuery: "..."
  }
})


// init the event hub
// add listeners

// search query listener
window.eventHub.$on("query-updated", function(query){
  // assign the query to app var
  app.searchQuery = query;
})


// create the map
setTimeout( function(){
        window.map = new google.maps.Map( document.getElementById("themap"), {
        zoom: 10,
        center: { lat: -6.895540, lng: 107.603956 }
    } )
}, 300);