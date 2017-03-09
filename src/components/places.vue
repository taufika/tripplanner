<template>

<li id="places">
    <img v-bind:class="[ 'backImage', imageClassGen, imageClass ]" v-bind:src=" imageSource " ref="img" v-bind:id=" imgId ">
    <h1 class="title"> {{ placeName }} </h1>
</li>

</template>

<script>

export default {
    name: "places",
    props: ["placeName", "placeCoord", "placePhoto", "imgId"],
    data: function(){
        return {
            imageClass: ""
        };
    },
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
        imageClassGen: function(){

            var component = this;

            var img = new Image();
            img.onload = function(){
                // console.log( this.width+' '+ this.height );

                var width = this.width * (150 / this.height);
                var parentWidth = $(" .list-of-place li ").width();

                if( width < parentWidth){
                    component.imageClass = "portrait";
                }
            };
            img.src = this.imageSource;
        }
    }
}

</script>