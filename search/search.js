const SearchInput = document.querySelector('#SearchBar')
const player = document.querySelector('#player')
const row = document.querySelector('.container.main')

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    const formattedMinutes = String(minutes).padStart(2, '0'); // Aggiunge uno zero iniziale se necessario
    const formattedSeconds = String(seconds).padStart(2, '0'); // Aggiunge uno zero iniziale se necessario

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getData(query) {
    const response = await fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=' + query)
    const data = await response.json()

    return data.data;
}

async function displayResults(results) {

    if (results.length <= 3) {
        displayHome();

    } else {

        const data = await getData(results)
        row.innerHTML = data.map(({ album, artist, title, duration, preview, id }) => /*html*/`
    
        <div class="row mb-4" id="_${id}" onclick="playAudio(${id})">
            <div class="col-2 col-md-1">
                <div style="position: relative">
                    <img src="${album.cover_big}" alt="" class="img-fluid rounded">
                    <audio src="${preview}"></audio>
                    <div class="play-button d-none d-md-flex"><i class="bi bi-play-fill text-white"></i></div>
                </div>
            </div>
            <div class="col d-flex flex-column justify-content-center TextCut">
                <h5 class="mb-1 fs-6 fw-semibold TextCut">${title}</h5>
                <p class="mb-0 text-white-50 fw-semibold TextCut">${artist.name}</p>
            </div>
            <div class="col-auto d-flex align-items-center">
                <p class="text-white-50 fw-bold">${formatTime(duration)}</p>
            </div>
        </div>

    `).join('')
    }
}

async function displayHome(){
    row.innerHTML = `

    `
}

async function playAudio(id) {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/track/" + id)
    const data = await response.json()

    const { title, album, artist } = data

    const target = document.querySelector(`#_${id}`)

    const songName = target.querySelector('h5')
    const CurrentAudio = target.querySelector(`audio`)
    const icon = target.querySelector(".play-button")


    if (CurrentAudio.paused) { /* SE L'AUDIO E' IN PAUSA O NON PARTITO*/

        CurrentAudio.play();

        player.querySelector('img').src = album.cover_big
        player.querySelector('h5').innerHTML = title
        player.querySelector('p').innerHTML = artist.name

        icon.innerHTML = '<i class="bi bi-pause-fill text-white"></i>'
        icon.classList.toggle("active")
        songName.style.color = "var(--color-green)"

        CurrentAudio.addEventListener('ended', function () {
            icon.innerHTML = '<i class="bi bi-play-fill text-white"></i>';
            icon.classList.remove("active")
            songName.style.color = "#fff"
        });

    } else { /* SE L'AUDIO E' IN RIPRODUZIONE */
        CurrentAudio.pause();

        icon.innerHTML = '<i class="bi bi-play-fill text-white"></i>'
        icon.classList.toggle("active")
        songName.style.color = "#fff"
    }


}
