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


  function displayProduct (data) {
    
    
          cont.innerHTML = /*html*/` 
                        <div class="sfondo-img">
                              ${data.picture_xl}
                        </div>
  
                        <div>
  
                        </div>`;
    }

    window.onload = async function () {
      try {
          const productData = await loadData(id)
          displayProduct(productData)
      } catch (error) {
          console.log(error)
      }
  }