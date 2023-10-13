const params = new URLSearchParams(window.location.search);
const id = params.get("id");



const main = document.querySelector("#main")


async function GetAlbum() {
    document.querySelector(".dot-pulse").classList.remove("d-none")
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
    const result = await response.json()
    console.log(result)
    return result

}



window.onload = async function () {


    const AlbumData = await GetAlbum() // X SIDEBAR
    DisplayAlbum(AlbumData)
    DisplayTableSong(AlbumData)
    document.querySelector(".scroollbar-main").addEventListener('scroll', toggleIcon);

    const RandomArtistData = await GetSongFromRandomArtist() // X SIDEBAR DA INSERIRE ALLA FINE 
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
    width: -webkit-fill-available;" class="mt-2">
           
    <div id="top-icon" class="row p-2 sticky-top m-0">
    <div id="nav-icon" class="col d-flex align-items-center ">

      <button 
        class="btn btn-transparent border-0 link-offset-2 link-underline link-underline-opacity-0 text-white bg-dark rounded-circle m-0 p-0 me-2 fs-3">
        <i class="bi bi-arrow-left"></i></i></button>
      <button 
        class="btn btn-transparent border-0 link-offset-2 link-underline link-underline-opacity-0 text-white bg-dark rounded-circle m-0 p-0 me-2 fs-3">
        <i class="bi bi-arrow-right"></i></button>
        <div class="button-top-main opacity-0 d-flex align-items-center">
        
        <div class="d-flex justify-content-center align-items-center me-4 text-light"
                        style="background-color: green; padding-inline: 10px;border-radius: 50px; font-size: 27px;">
                        <i class="bi bi-play-fill"></i>
        </div>
        <div class="d-flex justify-content-center align-items-center">
            <p class="m-0 text-light fw-bolder" style="font-size: 20px;">${AlbumData.title}</p>
        </div>
        </div>
        
    </div>

    <div id="user-icon" class="col d-flex align-items-center justify-content-end">
      <button
        class="d-flex justify-content-center align-items-center btn btn-transparent border-0 link-offset-2 link-underline link-underline-opacity-0 text-white bg-dark rounded-pill w-25 h-75 m-0 p-0 me-2">
        <i class="bi bi-arrow-down-circle fs-5 me-1"></i>Install App</button>
      <button
        class="btn btn-transparent border-0 link-offset-2 link-underline link-underline-opacity-0 text-white bg-dark rounded-circle m-0 p-0 me-2 fs-5">
        <i class="bi bi-bell"></i></button>
      <button
        class="btn btn-transparent border-0 link-offset-2 link-underline link-underline-opacity-0 text-white bg-dark rounded-circle m-0 p-0 me-2 fs-5">
        <i class="bi bi-person"></i></i></button>
    </div>




  </div>
            <div class="title-image-info" style="
            height: 40vh;
            display: flex;
            align-items: flex-end;">
                <div class=" mb-3 Album-Mobile" style="margin-left: 1rem;">


                    <div>
                        <img src="${AlbumData.cover}" class="album-cover"
                            alt="" style="width: 240px; height: 240px; -webkit-box-shadow: 0px 0px 33px 5px rgba(0,0,0,0.46); 
                            box-shadow: 0px 0px 33px 5px rgba(0,0,0,0.46);">
                    </div>
                    <div class="text-light ms-3">
                        <p class="m-0 fw-bolder" style="font-size: 14px;">ALBUM</p>
                        <h1 class="mb-3" style="font-size: 4rem; font-weight: bold;">${AlbumData.title}!</h1>
                        <div class="d-flex justify-content-start align-items-center">
                            <img src="${AlbumData.contributors[0].picture}"
                                alt="" style="width: 25px; height: 25px; border-radius: 25px;">
                            <p class="m-0" style="font-size: 14px;"><span class="fw-bolder">
                            <a class="link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover text-light" href="/artist/artist.html?id=${AlbumData.artist.id}">
                            ${AlbumData.artist.name}</a></span> • ${AlbumData.nb_tracks} canzoni • ${formatTime(AlbumData.duration)} minuti</p>
                                
                        </div>

                    </div>
                </div>
            </div>
            <div class="mt-2 pt-4 background-mobile" style="
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
        if (i >= 9) {
            document.querySelector(".song-list").innerHTML +=
                `
            <div class="d-flex justify-content-between align-items-center text-light button-hover" style="
                    margin-top: 1.5rem;">
                
                            <div class="d-flex align-items-center ps-1">
                                <div class="text-grey count-mobile" style="
                                     font-size: 20px;">
                                    <p class="m-0">${i + 1}</p>
                                </div>
                                <div style="font-size: 15px;margin-left: 1.5rem;">
                                    
                                    <p class="m-0 fw-bolder" style="cursor: pointer;">
                                        <a onclick="DisplayInPlayer('${song.artist.name}' , '${song.title_short}' , '${formatTime(song.duration)}' , '${AlbumData.cover}' )"class=" text-light link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover">
                                            ${song.title_short}
                                        </a>
                                    </p>
                                    
                                    <a class="link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover text-light" href="/artist/artist.html?id=${AlbumData.artist.id}">
                                        <p class="m-0 text-grey">${song.artist.name}</p>
                                    </a>
                                    
                                </div>
                            </div>
                            
                            <div class="me-4 pe-3">
                                <p class="m-0 text-grey">${formatTime(song.duration)}</p>
                            </div>
                            
            </div>


            `
        } else {
            document.querySelector(".song-list").innerHTML +=
                `
            <div class="d-flex justify-content-between align-items-center text-light button-hover" style="
                    margin-top: 1.5rem;
                ">
                            <div class="d-flex align-items-center ps-3 ">
                                <div class="text-grey count-mobile" style="
                            font-size: 20px;
                        ">
                                    <p class="m-0">${i + 1}</p>
                                </div>
                                <div style="
                            font-size: 15px;
                            margin-left: 1.5rem;
                        ">
                                 <p class="m-0 fw-bolder" style="cursor: pointer;">
                                         <a onclick="DisplayInPlayer('${song.artist.name}' , '${song.title_short}' , '${formatTime(song.duration)}' , '${AlbumData.cover}' )" class=" text-light link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover">
                                              ${song.title_short}
                                         </a>
                                 </p>
                                 <a class="link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover text-light" href="/artist/artist.html?id=${AlbumData.artist.id}">
                                    <p class="m-0 text-grey">${song.artist.name}</p>
                                </a>
                                </div>
                            </div>
                            <div class="me-4 pe-3">
                                <p class="m-0 text-grey">${formatTime(song.duration)}</p>
                            </div>
                        </div>
            `
        }
    });

}


async function DisplayInPlayer(ArtistTitle, SongTitle, Duration, AlbumImage) {
    const image =  document.querySelector(".img-album-song")
    const titleSong = document.querySelector(".title .title-player")
    const  artist = document.querySelector(".title .artist-player")
    const duration = document.querySelector(".playBar p:last-of-type")

    image.innerHTML = `<img src="${AlbumImage}"
    alt="" class="img-player rounded shadow me-2">`

    titleSong.innerHTML = `${SongTitle}`
    artist.innerHTML = `${ArtistTitle}`
    duration.innerHTML = `${Duration}`
}


function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    const formattedMinutes = String(minutes).padStart(2, '0'); // Aggiunge uno zero iniziale se necessario
    const formattedSeconds = String(seconds).padStart(2, '0'); // Aggiunge uno zero iniziale se necessario

    return `${formattedMinutes}:${formattedSeconds}`;
}

function toggleIcon() {

    const tabelsong = document.querySelector('.table-song');
    const icon = document.querySelector('.button-top-main');
    console.log(tabelsong.getBoundingClientRect().top)
    if (tabelsong.getBoundingClientRect().top <= 100) {
        icon.classList.replace('opacity-0', 'opacity-100');
    } else {
        icon.classList.replace('opacity-100', 'opacity-0');
    }
}


