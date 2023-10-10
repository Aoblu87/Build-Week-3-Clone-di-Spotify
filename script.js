// Dove mostrare risultati 
let resultsContainer = document.querySelector('#results-container')

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


window.onload = async function () {

    try {
        allResults = await getResults()
        console.log(allResults)

        // Varibili per identificare nodi
        resultsContainer = document.querySelector('#results-container')

        // Mostro tutti i prodotti nel DOM
        displayResults(allResults)

    } catch (error) {
        console.log(error)
    }
}

// Funzione che richiama risultati

async function getResults() {

    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=pianoguys')

        const jsonData = await response.json()
        return jsonData
        
    } catch (error) {
        console.log(error)

    }
}


// Funzione che mostra risultati

function displayResults(result) {


    const song = result.data
    console.log(song)

    resultsContainer.innerHTML = song.map( result => /*html*/`
    <div id="card-container" class="col-md-2">
    <div id="card" class="card p-3">
        <img src="${result.album.cover_xl}" class="card-img-top rounded-circle" alt="${result.title}">
        <div class="card-body p-0 mt-2">
        <p class="card-text fw-semibold text-white">${result.artist.name}</p>
        <p class="card-text fw-normal text-white-50">Artist</p>
        </div>
      </div>
</div>
                                `
    ).join('')
    
}





        //   <p class="card-text">${timeStampFromDuration(result.duration)}</p>
