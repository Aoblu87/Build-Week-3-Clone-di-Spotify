const params = new URLSearchParams(window.location.search);
const id = params.get("id");

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

 window.onload = async function () {
    
        
        const AlbumData = await GetAlbum() // X SIDEBAR
        
        DisplayAlbum(AlbumData)
        DisplayTableSong(AlbumData)

        const RandomArtistData = await  GetSongFromRandomArtist() // X SIDEBAR DA INSERIRE ALLA FINE 
        DisplaySongFromRandomArtist(RandomArtistData) // X SIDEBAR DA INSERIRE ALLA FINE 
   
 }

 function DisplayAlbum(AlbumData) { 
    main.innerHTML = /*html*/
    `
    <div class="scroollbar-main" style="    margin-bottom: 97px;
    background: linear-gradient(180deg, #FFEB3B, black), linear-gradient(180deg, #00000040, black);
    border-radius: 15px;
    position: fixed;
    top: 0;
    overflow-y: auto;
    height: 100vh;
    width: -webkit-fill-available;"
            class="mt-2">
            <div class="title-image-info" style="
            height: 40vh;
            display: flex;
            align-items: flex-end;">
                <div class="d-flex align-items-end mb-3" style="margin-left: 1rem;">


                    <div>
                        <img src="${AlbumData.cover}"
                            alt="" style="width: 240px; height: 240px; -webkit-box-shadow: 0px 0px 33px 5px rgba(0,0,0,0.46); 
                            box-shadow: 0px 0px 33px 5px rgba(0,0,0,0.46);">
                    </div>
                    <div class="text-light ms-3">
                        <p class="m-0 fw-bolder" style="font-size: 14px;">ALBUM</p>
                        <h1 class="mb-3" style="font-size: 4rem; font-weight: bold;">${AlbumData.title}!</h1>
                        <div class="d-flex justify-content-start align-items-center">
                            <img src="${AlbumData.contributors[0].picture}"
                                alt="" style="width: 25px; height: 25px; border-radius: 25px;">
                            <p class="m-0" style="font-size: 14px;"><span class="fw-bolder"><a class="text-decoration-none text-light" href="/artist/artist.html?id=${AlbumData.artist.id}">${AlbumData.artist.name}</a></span>•${AlbumData.nb_tracks}•${AlbumData.duration}
                                minuti</p>
                                
                        </div>

                    </div>
                </div>
            </div>
            <div class="mt-2 pt-4" style="
            background: linear-gradient(180deg, #00000040, black); padding-bottom: 110px
        ">
                <div class="d-flex justify-content-start align-items-center px-4 mb-5 text-grey" style="
            font-size: 35px;
                    ">
                    <div class="d-flex justify-content-center align-items-center me-4"
                        style="background-color: green; padding-inline: 10px;border-radius: 50px;">
                        <i class="bi bi-play-fill"></i>
                    </div>
                    <i class="bi bi-heart me-4"></i>
                    <i class="bi bi-arrow-down-circle me-4"></i>
                    <i class="bi bi-three-dots me-4"></i>
                </div>
                <div class="table-song">
                    <div class="container-fluid px-4">
                        <div class="d-flex justify-content-between text-grey px-3"
                            style="border-bottom: 1px #9e9e9e69 solid;">
                            <div class="d-flex">
                                <p class="me-3">#</p>
                                <p>TITOLO</p>
                            </div>
                            <div class="me-4 pe-2">
                                <i class="bi bi-clock"></i>
                            </div>
                        </div>
                        <div class="song-list"></div>
                    </div>
                </div>
            </div>
        </div>
    
    `
  
 }

 async function DisplayTableSong(AlbumData) {

    AlbumData.tracks.data.forEach((song, i) => {
        if(i >= 9){
            document.querySelector(".song-list").innerHTML += 
            `
            <div class="d-flex justify-content-between align-items-center text-light" style="
                    margin-top: 1.5rem;
                ">
                            <div class="d-flex align-items-center ps-1">
                                <div class="text-grey" style="
                            font-size: 20px;
                        ">
                                    <p class="m-0">${i + 1}</p>
                                </div>
                                <div style="
                            font-size: 15px;
                            margin-left: 1.5rem;
                        ">
                                    <p class="m-0 fw-bolder">${song.title_short}</p>
                                    <p class="m-0 text-grey">${song.artist.name}</p>
                                </div>
                            </div>
                            <div class="me-4 pe-3">
                                <p class="m-0 text-grey">${song.duration}</p>
                            </div>
                        </div>


            `
        } else {
            document.querySelector(".song-list").innerHTML += 
            `
            <div class="d-flex justify-content-between align-items-center text-light" style="
                    margin-top: 1.5rem;
                ">
                            <div class="d-flex align-items-center ps-3">
                                <div class="text-grey" style="
                            font-size: 20px;
                        ">
                                    <p class="m-0">${i + 1}</p>
                                </div>
                                <div style="
                            font-size: 15px;
                            margin-left: 1.5rem;
                        ">
                                    <p class="m-0 fw-bolder">${song.title_short}</p>
                                    <p class="m-0 text-grey">${song.artist.name}</p>
                                </div>
                            </div>
                            <div class="me-4 pe-3">
                                <p class="m-0 text-grey">${song.duration}</p>
                            </div>
                        </div>
            `
        }
    });
  
 }

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

const sleep = (milliseconds=500) => new Promise(resolve => setTimeout(resolve, milliseconds)) //funzione per timing 1.5sec // X SIDEBAR