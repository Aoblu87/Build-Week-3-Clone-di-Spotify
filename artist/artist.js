let cont = document.querySelector("#main");

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
                        <div >
                          <img class="sfondo-img" src="${data.picture_xl}" alt="">  
                          <p class="text-white-50 artist-name">${data.name}</p>
                        </div>
                        
  
                        <div>
                             
                        </div>`;
    }

    window.onload = async function () {
      try {
          const artistData = await loadData(id)
          displayArtist(artistData)
      } catch (error) {
          console.log(error)
      }
  }




  