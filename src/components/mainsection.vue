<template>

<div id="mainSection">
    <div class="no-query" v-if=" !queryExists ">
        No query found. Please type your query on the box above.
    </div>
    <div class="list" v-if=" queryExists " >
        <h1>Attraction List</h1>
        <ul v-bind:class="[ 'list-of-place', listClasses ]"> {{ listOfPlaces }}
            <places v-for="place in places" v-bind:place-name=" place.name " v-bind:place-coord=" place.geometry.location "></places>
            <div class="more" v-on:click="toggleListExpand">
                <span>More</span>
            </div>
        </ul>
    </div>
    <div id="themap"></div>
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
                                results.length = 2;
                                for(var i=0; i< results.length; i++){
                                    final.places.push(results[i]);
                                }
                                final.counter++;
                            }
                        }

                        var service = new google.maps.places.PlacesService(window.map);
                        service.nearbySearch(theRequest, callback);
                    }

                    request("amusement_park");
                    request("bar");
                    request("campground");
                    request("museum");
                    request("art_gallery");
                    request("cafe");
                }

            });

            var component = this;

            // wait for the counter
            var wait = setInterval(function(){

                if(final.counter < 6){
                    // do nothing
                } else {
                    clearInterval(wait);
                    // $.each(final.places, function(i, el){
                    //     if( $.inArray(el, component.places) === -1 ) component.places.push(el)
                    // });
                    component.places = final.places;
                }

            },250);
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