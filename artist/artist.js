
/* ARTIST*/

let cont = document.querySelector(".contenitore-foto");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/"


async function loadData(id) {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`)
      const data = await response.json()
  
      return data
    } catch (error) {
      console.log(error)
  }
  }
  
  cont.innerHTML = /*html*/`
 <div class="jelly"></div>

 <svg width="0" height="0" class="jelly-maker">
   <defs>
     <filter id="uib-jelly-ooze">
       <feGaussianBlur
         in="SourceGraphic"
         stdDeviation="6.25"
         result="blur"
       />
       <feColorMatrix
         in="blur"
         mode="matrix"
         values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
         result="ooze"
       />
       <feBlend in="SourceGraphic" in2="ooze" />
     </filter>
   </defs>
 </svg>`


  function displayArtist (data) {
    
    console.log(data)
          cont.innerHTML = /*html*/` 
                        
                          <img class="sfondo-img" src="${data.picture_xl}" alt="">  
                          <p class="artista-verificato"><i class="bi bi-patch-check-fill"></i> Artista verificato</p>
                          <p class="artist-name">${data.name}</p>
                          <p class="ascoltatori-mensili">${data.nb_fan} ascoltatori mensili</p>                 
                         `;
    }


   const contenuto = document.querySelector(".list-group-numbered");

    async function loadData2(id) {
      try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=5`)
        const data = await response.json()
    
        return data
      } catch (error) {
        console.log(error)
    }
    }
    
    contenuto.innerHTML = /*html*/`
   <div class="jelly"></div>
  
   <svg width="0" height="0" class="jelly-maker">
     <defs>
       <filter id="uib-jelly-ooze">
         <feGaussianBlur
           in="SourceGraphic"
           stdDeviation="6.25"
           result="blur"
         />
         <feColorMatrix
           in="blur"
           mode="matrix"
           values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
           result="ooze"
         />
         <feBlend in="SourceGraphic" in2="ooze" />
       </filter>
     </defs>
   </svg>`
  
  
    function displayPlaylist (data) {

      const song = data.data
      console.log(song)
      
      console.log(data)
            contenuto.innerHTML = song.map(song => /*html*/` 
            
              <li class="list-group-item">
              <div class="d-flex align-items-center lista">    
                 <span class="img-album"><img class="album-cover col-3 mx-5 my-2" src="${song.album.cover_small}" alt=""></span>
                 <span class="song-title list-group-item col-4 my-2">${song.title}</span>
                 <span class="song-rank list-group-item col-2 my-2">${song.rank}</span>
                 <span class="song-duration list-group-item col-2 my-2">${timeStampFromDuration(song.duration)}</span> 
              </div>
              </li>
            `
            ).join("")
      }

//const albumPlay = document.querySelector(".img-album");

//albumPlay.innerHTML = /*html*/`
   //<div class="play-album position-relative">
      
      
//`


    window.onload = async function () {
      try {
          const artistData = await loadData(id)
          displayArtist(artistData)

          const playlistData = await loadData2(id)
          displayPlaylist(playlistData)

          const SongData = await GetSongFromRandomArtist()     
          DisplaySongFromRandomArtist(SongData)

      } catch (error) {
          console.log(error)
      }
  }


  function timeStampFromDuration(duration) {
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
    )}`
}


/*const numberSong = document.querySelector('.numberSong')
const song = data.data
function displayNumberSong (song) {
  for (let i = 0; i < song.length; i++) {
  numberSong[i].textContent = i + 1;
  console.log(song.length)

}}

displayNumberSong(numberSong)*/


/*function addNumbersToElements(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].textContent = i + 1;
  }
}*/


const ArtisInfo = document.querySelector(".ArtistInfo")
const ArtistSongs = document.querySelector(".Top10Songs")
let number
let check 


 async function GetSongFromRandomArtist() {
    try {
        document.querySelector(".waveform").classList.remove("d-none")
        do {
        await sleep(1500)
        randomnumber()
        const response = await  fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${number}/top?limit=10`)
        const result = await response.json()
        check = result.data 
        console.log(check)
        } while ((check.length === 0))
        return check
        }
      catch {
        ArtisInfo.innerHTML = `"oh oh qualcosa non va`
      }
      finally {
        document.querySelector(".waveform").classList.add("d-none");
      }
        
    } 



  function DisplaySongFromRandomArtist(SongData) {

     ArtisInfo.innerHTML = /*html*/ 
     `
    
     <h6 class="mb-3">Artista del Giorno:</h6>
     <h5 class="mb-3">${SongData[0].contributors[0].name}</h5>
     <img src="${SongData[0].contributors[0].picture}" alt="" class="mb-3">
     <p>Top 10:</p>
     
    
     `
     ArtistSongs.innerHTML = SongData.map(Song => /*html*/ 
      
              `
             <div class="d-flex align-items-center my-3 ">
             <div><img src="${Song.album.cover}" alt=""
                     style="width: 80px; height: 80px; border-radius: 1 0px;"></div>
             <div class="ms-2">
                 <p class="m-0 text-grey">Song: <span class="fw-bolder">${Song.title_short}</span></p>
                 <p class="m-0 text-grey">Album: <span class="fw-bolder" >${Song.album.title}</span></p>
                 
             </div>
             </div>
             `
    ).join("")
  }

function randomnumber() {
    number = Math.floor(Math.random() * 50000) + 1
}

const sleep = (milliseconds=500) => new Promise(resolve => setTimeout(resolve, milliseconds))