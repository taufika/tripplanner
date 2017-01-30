<template>
  <div id="app">
    <Headbar></Headbar>
    <main>
      <mainSection v-bind:search-query="searchQuery"></mainSection>
    </main>
  </div>
</template>

<script>
import Headbar from './components/Headbar'
import mainSection from './components/mainSection'

export default {
  name: 'app',
  components: {
    Headbar, mainSection
  },
  props: ["searchQuery"]
}
</script>

