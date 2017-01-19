<template>

<header id="Headbar">
    <nav>
        <ul class="menu">
            <li>
                <span class="logo first-part">Trip</span>
                <span class="logo second-part">Planner</span>
            </li>
            <li class="search">
                <form v-on:submit=" forms($event) ">
                    <input type="text" class="searchbar" v-model="searchQuery" v-on:focus=" searchQuery = '' " v-on:change=" updateQuery " placeholder="Search Place Here">
                </form>
            </li>
        </ul>
    </nav>
</header>

</template>

<script>

export default {
    name: 'Headbar',
    data() {
        return {
            searchQuery: "Search something"
        }
    },
    methods: {
        updateQuery: function(){
            window.eventHub.$emit("query-updated", this.searchQuery);
        },
        forms: function(event){
            event.preventDefault();
        }
    }

}

</script>