// Dove mostrare risultati 
let sectionOne = document.querySelector('#greetings')
let sectionTwo = document.querySelector('#made-for-you-section')
let sectionThree = document.querySelector('#recently-played-section')

let allFavorites =[]

// Tutti i risultati
let allResults = []

function timeStampFromDuration(duration) {
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
    )}`
}
window.addEventListener('load', ()=>{
    makeFetch("hisaishi", sectionTwo)
    makeFetch("japanese", sectionThree)
    favorites("wagakkiband", sectionOne)
})

// window.onload = async function () {
//     makeFetch("hisaishi", sectionTwo)
//     makeFetch("japanese", sectionThree)
//     favorites("wagakkiband", sectionOne)
    
    
// }

async function favorites(artist, nodeHtml){
    try {
        allFavorites = await getResults(artist)

        // Varibili per identificare nodi
        sectionOne = document.querySelector('#greetings')
      


        // Mostro tutti i prodotti nel DOM
        displayFavorites(allFavorites, nodeHtml)

    } catch (error) {
        console.log(error)
    }

}


async function makeFetch(artist, nodeHtml) {

    try {
        allResults = await getResults(artist)

        // Varibili per identificare nodi
        sectionTwo = document.querySelector('#made-for-you-section')
        sectionThree = document.querySelector('#recently-played-section')


        // Mostro tutti i prodotti nel DOM
        displayResults(allResults, nodeHtml)

    } catch (error) {
        console.log(error)
    }

}


// Funzione che richiama risultati

async function getResults(query) {

    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)

        const jsonData = await response.json()
        return jsonData

    } catch (error) {
        console.log(error)

    }
}


// Funzione che mostra risultati delle sezioni 1

function displayFavorites(result, nodeHtml){
    const songs = result.data

    for (let i = 0; i < 6; i++) {
        const song = songs[i]
console.log(song)
        nodeHtml.innerHTML += /*html*/`
                        <div id="${song.artist.id}" class="greetings-card col-md-3 my-1 border-0 rounded" >
                            <div class="row ">
                                <div class="col-md-2 d-flex p-0">
                                    <a class="link-offset-2 link-underline link-underline-opacity-0 text-dark" href="../artist/artist.html?id=${song.artist.id}">
                                    <img id="img-greetings" src="${song.album.cover_xl}" class="img-fluid rounded-start" alt="${song.title}">
                                    </a>
                                </div>
                                <div class="col-md-10 d-flex align-items-center">
                                    <div class="card-body ">
                                        <a class="link-offset-2 link-underline link-underline-opacity-0 text-dark" href="../artist/artist.html?id=${song.artist.id}">
                                        <h5 class="card-title text-white fs-6">${song.title}</h5>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                                `
                        
                            }
                        }
                                    


                        



// Funzione che mostra risultati delle sezioni 2 e 3

function displayResults(result, nodeHtml) {


    const songs = result.data

    for (let i = 0; i < 7; i++) {
        const song = songs[i]

        nodeHtml.innerHTML += /*html*/`
    <div id="${song.artist.id}" class="col-md-2">
    <div id="card" class="card-results position-relative rounded p-3">
        <a class="link-offset-2 link-underline link-underline-opacity-0 text-dark" href="../artist/artist.html?id=${song.artist.id}">
            <img src="${song.album.cover_xl}" class="card-img-top rounded-circle" alt="${song.title}">
        </a>
            <div id="play-btn-container" class="position-absolute invisible">
                <button id="play-btn" type="button" class="btn text-dark rounded-circle"><i class="bi bi-caret-right-fill fs-3"></i></button>

           
        </div>
        <div class="card-body p-0 mt-2">
        <a class="link-offset-2 link-underline link-underline-opacity-0 text-dark" href="../artist/artist.html?id=${song.artist.id}">
            <p class="card-text fw-semibold text-white">${song.album.title}</p>
        </a>
        <p class="card-text fw-normal text-white-50">Artist</p>
        </div>
      </div>
</div>
                                `

    }

}

const today = new Date();
const hours = today.getUTCHours();
console.log (hours)


//   <p class="card-text">${timeStampFromDuration(result.duration)}</p>
