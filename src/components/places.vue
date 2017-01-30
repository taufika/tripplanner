<template>

<li id="places">
    <img v-bind:class="[ 'backImage', imageClass ]" v-bind:src=" imageSource ">
    <h1 class="title"> {{ placeName }} </h1>
</li>

</template>

<script>

export default {
    name: "places",
    props: ["placeName", "placeCoord", "placePhoto"],
    computed: {
        imageSource: function(){
            return this.placePhoto;
        },
        lat: function(){
            return this.placeCoord.lat();
        },
        lng: function(){
            return this.placeCoord.lng();
        },
        imageClass: function(){

            var width = $(' .backImage ').width();
            var parWidth = $(' .backImage ').parent().width();

            if(width > parWidth){
                return " portrait";
            } else {
                return "";
            }
        }
    }
}

</script>