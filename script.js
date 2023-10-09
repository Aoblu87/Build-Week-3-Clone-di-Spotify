// Dove mostrare risultati 
let resultsContainer = document.querySelector('#results-container')

// Tutti i risultati
let allResults = []


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


    const songs = result.data
    console.log(songs)

    resultsContainer.innerHTML = songs.map( result => /*html*/`
    <div class="col">
    <div class="card">
        <img src="${result.album.cover_xl}" class="card-img-top" alt="${result.artist.title}">
        <div class="card-body">
          <p class="card-text">${result.duration}</p>
        </div>
      </div>
</div>
                                `
    ).join('')
    
}





