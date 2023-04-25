<template>
    <div></div>
</template>

<script>
import spotify from '@/spotify'
export default {
    mounted() {
        spotify.handleRedirect(this.$route.hash)
        this.$router.push('/')
    }
}
</script>