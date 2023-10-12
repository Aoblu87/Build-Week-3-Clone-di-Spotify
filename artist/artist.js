
/* ARTIST*/

let cont = document.querySelector(".contenitore-foto");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/"


async function loadData(id) {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`)
      const data = await response.json()
      console.log(data)
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

                          <div id="user-icon" class="col d-flex align-items-center justify-content-end">
                              <button class="d-flex justify-content-center align-items-center btn btn-transparent border-0 link-offset-2 link-underline link-underline-opacity-0 text-white  rounded-pill w-25 h-75 m-0 p-0 me-2">
                                  <i class="bi bi-arrow-down-circle fs-5 me-1"></i>Install App</button>
                              <button class="btn btn-transparent border-0 link-offset-2 link-underline link-underline-opacity-0 text-white rounded-circle m-0 p-0 me-2 fs-5">
                                   <i class="bi bi-bell"></i></button>
                              <button class="btn btn-transparent border-0 link-offset-2 link-underline link-underline-opacity-0 text-white rounded-circle m-0 p-0 me-2 fs-5">
                                   <i class="bi bi-person"></i></i></button>
                          </div>         
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
                 <div class="img-album" id="_${song.id}" onclick="playAudio(${song.id})">
                     <img class="album-cover col-3 mx-5 my-2" src="${song.album.cover_small}" alt="">
                     <div class="play-button d-none"><i class="bi bi-play-fill play-over position-relative"></div>
                     </i><audio src="${song.preview}"></audio>
                 </div>
                 <h5 class="song-title list-group-item col-4 my-2">${song.title}</h5>
                 <span class="song-rank list-group-item col-2 my-2">${song.rank}</span>
                 <span class="song-duration list-group-item col-2 my-2">${timeStampFromDuration(song.duration)}</span> 
              </div>
              </li>
            `
            ).join("")
      }



    window.onload = async function () {
      try {
          const artistData = await loadData(id)
          displayArtist(artistData)

          const playlistData = await loadData2(id)
          displayPlaylist(playlistData)

          const AlbumData = await GetAlbum() // X SIDEBAR
          const RandomArtistData = await  GetSongFromRandomArtist() // X SIDEBAR DA INSERIRE ALLA FINE 
        DisplaySongFromRandomArtist(RandomArtistData) // X SIDEBAR DA INSERIRE ALLA FINE 

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


// FUNZIONE PLAY SONGS

async function playAudio(id) {
  const response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/track/" + id)
  const data = await response.json()

  const { title, album, artist } = data

  const target = document.querySelector(`#_${id}`)

  const songName = target.querySelector(".song-title")
  const CurrentAudio = target.querySelector(`audio`)
  const icon = target.querySelector(".play-button")


  if (CurrentAudio.paused) { /* SE L'AUDIO E' IN PAUSA O NON PARTITO*/

      CurrentAudio.play();

      player.querySelector('.img-player').src = album.cover_small
      player.querySelector('.title-player').innerHTML = title
      player.querySelector('.artist-player').innerHTML = artist.name
      player.querySelector('.play-player').innerHTML = '<i class="bi bi-pause-fill text-white fs-2 mx-2"></i>'

      icon.innerHTML = '<i class="bi bi-pause-fill text-white play-over"></i>'
      icon.classList.toggle("active")
      

      CurrentAudio.addEventListener('ended', function () {
          icon.innerHTML = '<i class="bi bi-play-fill text-white play-over"></i>'
          icon.classList.remove("active")
          
      });

  } else { /* SE L'AUDIO E' IN RIPRODUZIONE */
      CurrentAudio.pause();

      player.querySelector('.play-player').innerHTML = '<i class="bi bi-play-circle-fill fs-2 mx-2"></i>'
      icon.innerHTML = '<i class="bi bi-play-fill text-white play-over"></i>'
      icon.classList.toggle("active")      
  }
}


const imgPlayer = document.querySelector(".img-player")
const titlePlayer = document.querySelector(".title-player")
const artistPlayer = document.querySelector(".artist-player")





// FUNZIONE SIDEBAR

const ArtisInfo = document.querySelector(".ArtistInfo") // X SIDEBAR
const ArtistSongs = document.querySelector(".Top10Songs")// X SIDEBAR


const main = document.querySelector("#main")
let number // X SIDEBAR
let check  // X SIDEBAR

 async function GetAlbum() { 
         const response = await  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/754535`)
         const result = await response.json()
         console.log(result)
         return result
       
    } 

 async function GetSongFromRandomArtist() {  // X SIDEBAR // funzione che fetcha randomicamente un artista 
try {
    document.querySelector(".dot-pulse").classList.remove("d-none")
    do { //ciclo do while che cicla fino a quando non trova un array pieno
    await sleep(1800) //funzione che fa fetchare ogni 1.5sec per non intasare il server
    randomnumber() // funzione per avere un numero random 
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
    document.querySelector(".dot-pulse").classList.add("d-none");
  }
        
} 

function randomnumber() { //funzione per numero random
    number = Math.floor(Math.random() * 5000) + 1
}

const sleep = (milliseconds=500) => new Promise(resolve => setTimeout(resolve, milliseconds)) //funzione per timing 1.5sec

async function DisplaySongFromRandomArtist(RandomArtistData) { //display random artist nella sidebar  // X SIDEBAR

        
  ArtisInfo.innerHTML = /*html*/ 
  `
 
  
  <h5 class="mb-3"><a class="text-decoration-none text-light" href="/artist/artist.html?id=${RandomArtistData[0].artist.id}">${RandomArtistData[0].artist.name}</h5>
  <img src="${RandomArtistData[0].contributors[0].picture}" alt="" class="mb-3">
  <p>Top 10:</p>
  
 
  `
  ArtistSongs.innerHTML = RandomArtistData.map(Song => /*html*/ 
   
           `
          <div class="d-flex align-items-center my-3 ">
          <div><img src="${Song.album.cover}" alt=""
                  style="width: 80px; height: 80px; border-radius: 1 0px;"></div>
          <div class="ms-2">
              <p class="m-0 text-grey">Song: <span class="fw-bolder">${Song.title_short}</span></p>
              <p class="m-0 text-grey">Album: <span class="fw-bolder"><a class="text-decoration-none text-light" href="/album/album.html?id=${Song.album.id}">${Song.album.title}</a></span></p>
              
          </div>
          </div>
          `
 ).join("")
}

function randomnumber() { //funzione per numero random // X SIDEBAR 
 number = Math.floor(Math.random() * 5000) + 1
}

