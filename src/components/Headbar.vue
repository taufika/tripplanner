<template>

<header id="Headbar">
    <nav>
        <ul class="menu">
            <li>
                <span class="logo first-part">Trip</span>
                <span class="logo second-part">Planner</span>
            </li>
            <li class="search">
                <form>
                    <input type="text" class="searchbar" v-model="searchQuery" v-on:click=" searchQuery = ''" placeholder="Search Place Here">
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
    }

}

</script>