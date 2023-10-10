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
                       <div class="container d-flex">
                         <img class="image col-12 col-lg-3" src="${data.imageUrl}" alt="">
                         <div class="d-flex flex-column ms-5 info">
                           <h1 class="name">${data.name}</h1>
                           <h4 class="description">${data.description}</h4>
                           <h4 class="brand">${data.brand}</h4>
                           <h3 class="price">Price: ${data.price} €</h3>
                           <div class="d-flex">
                             <a href="../index.html" class=""> <button class="btn btn-outline-dark"><i class="bi bi-arrow-left-short"></i>Back</button></a>
                           </div>
                         </div>
                         
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