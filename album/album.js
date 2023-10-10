const RandomMusic = document.querySelector(".sidebar-scroll .nav")
let number



async function GetSongFromRandomArtist() {
    randomnumber()
    const response = await  fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${number}/top?limit=5`)
    const data = await response.json()
    return data
    
}

window.onload = async function () {
    
    const SongData = await GetSongFromRandomArtist()
     
    if(SongData.total !== 0) {
        console.log(SongData)
    } else {
        GetSongFromRandomArtist()
    }
    

}

function randomnumber() {
    number = Math.floor(Math.random() * 27) + 1
}