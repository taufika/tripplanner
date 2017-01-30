<template>

<div id="mainSection">
    <section v-bind:class="['content', contentClass]">
        <h1> Showing search results for {{ searchQuery }} </h1>
        <div class="no-query" v-if=" !queryExists ">
            No query found. Please type your query on the box above.
        </div>
        <div class="list" v-if=" queryExists " >
            <h1>Attraction List</h1>
            <ul v-bind:class="[ 'list-of-place', listClasses ]"> {{ listOfPlaces }}
                <places v-for="place in places" v-bind:place-name=" place.name " v-bind:place-coord=" place.geometry.location " v-bind:place-photo=" place.photos[0].getUrl({maxWidth: 800, maxHeight: 800}) "></places>
                <div class="more" v-on:click="toggleListExpand">
                    <span>More</span>
                </div>
            </ul>
        </div>
        <h1>Local Map</h1>
        <div id="themap"></div>
    </section>
    <aside v-bind:class="['accommodation', contentClass]">
        <h1 class="title">travel</h1>
        <h2>From <span id="from">{{ currentLocation }}</span> to <span id="to">{{ searchQuery }}</span></h2>
    </aside>
</div>

</template>

<script>

import places from './places'

export default {
    name: 'mainSection',
    props: ["searchQuery"],
    data: function(){
        return {
            places: [],
            listClasses: ""
        }
    },
    computed: {
        queryExists: function(){
            // check query
            if( this.searchQuery == "..." || this.searchQuery == "")
                return false;
            else
                return true;
        },
        listOfPlaces: function(){
            // geocode example
            // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCDfd_nt0wAORu3DOTD6kA_K42NnCVVB10

            // url encode the query
            var address = encodeURI(this.searchQuery);
            var searchCategory = ["amusement_park","bar","campground","museum","art_gallery","cafe"];
            var final = {
                places: [],
                counter: 0
            }

            // get the latlong
            $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCDfd_nt0wAORu3DOTD6kA_K42NnCVVB10", function(data){

                if(data.results.length > 0){
                    var lat = data.results[0].geometry.location.lat;
                    var lng = data.results[0].geometry.location.lng;

                    // get list of places
                    var destination = new google.maps.LatLng(lat, lng);

                    // reset the map center
                    window.map.setCenter({
                        lat: lat,
                        lng: lng
                    })

                    // compose the request
                    var request = function(type){

                        var theRequest = {
                            location: destination,
                            radius: '50000',
                            type: [type]
                        }

                        var callback = function(results, status){
                            if(status == google.maps.places.PlacesServiceStatus.OK){
                               
                                // places retrieved
                                // get top 5 results
                                results.length = 3;
                                for(var i=0; i< results.length; i++){
                                    // console.log(results[i].photos[0].getUrl({maxWidth: 800, maxHeight: 800}));
                                    if( !results[i].photos ){
                                        results[i].photos = [ { getUrl: function(){ return ""; } } ]
                                    }
                                    final.places.push(results[i]);
                                }
                                final.counter++;
                            }
                        }

                        var service = new google.maps.places.PlacesService(window.map);
                        service.nearbySearch(theRequest, callback);
                    }

                    for(var i=0; i<searchCategory.length; i++){
                        request(searchCategory[i]);
                    }
                }

            });

            var component = this;

            // wait for the counter
            var wait = setInterval(function(){

                if(final.counter < searchCategory.length){
                    // do nothing
                } else {
                    clearInterval(wait);
                    // $.each(final.places, function(i, el){
                    //     if( $.inArray(el, component.places) === -1 ) component.places.push(el)
                    // });
                    // final.places.length = 1;
                    component.places = final.places;
                }

            },250);
        },
        contentClass: function(){
            if(this.queryExists)
                return " accommodate";
            else
                return "";
        },
        currentLocation: function(){
            // reverse geocode
            var reverseGeoCode = function(coord){
                // console.log(coord.coords);
                var lat = coord.coords.latitude;
                var lng = coord.coords.longitude;

                var geocoder = new google.maps.Geocoder;
                geocoder.geocode({'location': { lat: lat, lng: lng } }, function(results, status){
                    if(status == "OK"){

                        // get the city
                        var city = results[0].address_components[4].long_name;
                        $(" #from ").text(city);
                    }
                })
            }

            // check if geoloc is available
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(reverseGeoCode);
            } else {
                return "Location unavailable";
            }
        }
    },
    components:{
        places
    },
    methods: {
        toggleListExpand: function(){

            // check the classses
            if(this.listClasses.indexOf("expanded") > -1){
                this.listClasses = this.listClasses.replace(" expanded", "");
            } else {
                this.listClasses = this.listClasses.concat(" expanded");
            }
        }
    }
}

</script>