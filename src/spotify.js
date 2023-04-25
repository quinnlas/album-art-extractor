/* eslint-disable no-unused-vars */
import axios from 'axios'
import qs from 'qs'

const spotify = axios.create({
    baseURL: 'https://api.spotify.com/v1/'
})

let loggedIn = false

const clientID = '4709acbe12174233a784130018339459'

async function login() {
    if (loggedIn) return
    window.location = 'https://accounts.spotify.com/authorize?' + qs.stringify({
        client_id: clientID,
        response_type: 'token',
        redirect_uri: 'http://localhost:8080/redirect',
        scope: 'playlist-read-private'
    })
}

function handleRedirect(hash) {
    const info = qs.parse(hash.substring(1))
    spotify.defaults.headers = {
        Authorization: 'Bearer ' + info.access_token
    }
    loggedIn = true
    console.log('Logged In!')
}

async function getPlaylists() {
    const playlists = []
    let total = 1
    while (total > playlists.length) {
        const res = await spotify.get(`/me/playlists?offset=${playlists.length}`)
        total = res.data.total
        playlists.push(...res.data.items)
    }
    return playlists
}

async function getPlaylistItems(id) {
    const items = []
    let total = 1
    while (total > items.length) {
        const res = await spotify.get(`/playlists/${id}/tracks?offset=${items.length}`)
        total = res.data.total
        items.push(...res.data.items)
    }
    return items
}

export default {
    login, spotify, handleRedirect, getPlaylists, getPlaylistItems
}