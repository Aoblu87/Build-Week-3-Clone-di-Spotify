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
        titleSections = document.querySelectorAll('.title-section')


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
    for (let i = 0; i < 5; i++) {
        const song = songs[i];
        console.log(song)
        resultsContainer.innerHTML += /*html*/`
    <div id="${song.id}" class="col-md-2">
    <div id="card" class="card  position-relative p-3">
        <a class="link-offset-2 link-underline link-underline-opacity-0 text-dark" href="../artist/artist.html?id=${song.id}">
            <img src="${song.album.cover_xl}" class="card-img-top rounded-circle" alt="${song.title}">
        </a>
            <div id="play-btn-container" class="position-absolute invisible">
                <button id="play-btn" type="button" class="btn text-dark rounded-circle"><i class="bi bi-caret-right-fill fs-3"></i></button>

           
        </div>
        <div class="card-body p-0 mt-2">
        <a class="link-offset-2 link-underline link-underline-opacity-0 text-dark" href="../artist/artist.html?id=${song.id}">
            <p class="card-text fw-semibold text-white">${song.album.title}</p>
        </a>
        <p class="card-text fw-normal text-white-50">Artist</p>
        </div>
      </div>
</div>
                                `

    }

}



//   <p class="card-text">${timeStampFromDuration(result.duration)}</p>
