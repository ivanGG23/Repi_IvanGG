export default {
    _past_songs: [],
    _nextSongs: [],
    getNextSongs: function (){
        return this_nextSongs.pop();
    }
}