<template>

<li id="places">
    <img class="backImage" v-bind:src=" imageSource ">
    <h1 class="title"> {{ placeName }} </h1>
</li>

</template>

<script>

export default {
    name: "places",
    props: ["placeName", "placeCoord"],
    computed: {
        imageSource: function(){

            var component = this;

            // call the instagram API
            instagramAPI("https://api.instagram.com/v1/locations/search?lat=48.858844&lng=2.294351&access_token=ACCESS-TOKEN",
            {
                lat: this.lat,
                lng: this.lng,
                distance: 100,
            },
            function(data){
                data.data.length = 1;
                var placeId = data.data[0].id;
                console.log(component.placeName + ": " + placeId);

                // get the picture
                // instagramAPI("https://api.instagram.com/v1/locations/" + placeId + "/media/recent?access_token=ACCESS-TOKEN",
                // {},
                // function(data){

                //     console.log(data);
                // });
            });
        },
        lat: function(){
            return this.placeCoord.lat();
        },
        lng: function(){
            return this.placeCoord.lng();
        }
    }
}

</script>