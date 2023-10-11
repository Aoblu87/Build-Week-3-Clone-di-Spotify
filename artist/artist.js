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
    
    
          cont.innerHTML = /*html*/` 
                        
                          <img class="sfondo-img" src="${data.picture_xl}" alt="">  
                          <p class="artista-verificato"><i class="bi bi-patch-check-fill"></i> Artista verificato</p>
                          <p class="artist-name">${data.name}</p>
                          <p class="ascoltatori-mensili">${data.nb_fan} ascoltatori mensili</p>
                        
                        
                        
 
                        `;
    }


   const contenuto = document.querySelector(".playlist");

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
      
      
            contenuto.innerHTML = /*html*/` 
                          
            <img class="album-cover" src="${data.album.cover_small}" alt="">
            <span class="song-title">${data.title}</span>
            <span class="song-rank">${data.rank}</span>
            <span class="song-duration">${data.duration}</span>

                          
                          
                          
   
                          `;
      }

    window.onload = async function () {
      try {
          const artistData = await loadData(id)
          displayArtist(artistData)

          const playlistData = await loadData2(id)
          displayPlaylist(playlistData)
      } catch (error) {
          console.log(error)
      }
  }




  