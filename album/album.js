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

 window.onload = async function () {
    
     const SongData = await GetSongFromRandomArtist()
     
      DisplaySongFromRandomArtist(SongData)
   
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