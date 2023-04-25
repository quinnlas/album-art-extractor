<template>
  <div class="home">
    Playlist:
    <select v-model="playlist">
      <option v-for="p in playlists" :key="p.id" :value="p.id">{{p.name}}</option>
    </select><br>
    Min appearances:
    <input type="number" v-model="minAppearances"><br>
    <button @click="loadArt" :disabled="!this.playlist">Load Art</button>
    <template v-if="art.length">
      <hr>
      <template v-for="(a, i) in art">
        <div :key="i" style="display: inline">
          <img :src="a.link" class="album-art">
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'
import spotify from '@/spotify.js'

export default {
  name: 'Home',
  data() {
    return {
      playlists: [],
      playlist: null,
      art: [],
      minAppearances: 2
    }
  },
  methods: {
    async loadArt() {
      const tracks = await spotify.getPlaylistItems(this.playlist)
      const allArt = tracks.map(t => t.track.album.images[0] && t.track.album.images[0].url).filter(a => a)
      // get art and sort by number of mentions
      const groupedArt = _.groupBy(allArt)
      const art = Object.values(groupedArt).map(a => ({ link: a[0], appearances: a.length })).filter(a => a.appearances >= this.minAppearances)
      this.art = _.sortBy(art, v => -v.appearances)
      console.log(`loading ${this.art.length} images!`)
    }
  },
  async mounted() {
    spotify.login() // will redirect if not logged in
    this.playlists = await spotify.getPlaylists()
  }
}
</script>

<style scoped>
.album-art{
  border-style: solid;
  border-width: 5px;
  margin: 10px;
}
</style>
