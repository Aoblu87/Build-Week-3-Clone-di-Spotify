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

async function displayHome() {
    row.innerHTML = `

    `
}

async function playAudio(id) {

    /* FETCH DEI DATI CORRISPONDEDNTI ALLA CANZONE */
    const response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/track/" + id);
    const data = await response.json();

    const { title, album, artist } = data;

    /* RECUPERO DATI NECESSARI */
    const target = document.querySelector(`#_${id}`);
    const player = document.getElementById('player');

    const songName = target.querySelector('h5');
    const currentAudio = target.querySelector('audio');
    const icon = target.querySelector(".play-button");

    /* CONTROLLA SE CI SONO CANZONI IN RIPRODUZIONE */
    const previousPlaying = document.querySelector('.playing');
    if (previousPlaying) {
        const previousIcon = previousPlaying.querySelector('.play-button');
        const previousSongName = previousPlaying.querySelector('h5');
        const previousAudio = previousPlaying.querySelector('audio');

        /* SE E' LA STESSA CANZONE FERMA L'AUDIO */
        if (previousAudio === currentAudio) {
            previousAudio.pause();
            previousIcon.innerHTML = '<i class="bi bi-play-fill text-white"></i>';
            previousIcon.classList.remove('active')
            previousSongName.style.color = "#fff";
            previousPlaying.classList.remove('playing');
            
            return;
        }

        /* SE NON E' LA STESSA FERMA LA CANZONE DI PRIMA */
        previousAudio.pause()
        previousIcon.innerHTML = '<i class="bi bi-play-fill text-white"></i>';
        previousIcon.classList.remove('active')
        previousSongName.style.color = "#fff";

        previousPlaying.classList.remove('playing');
    }

    /* AGGIUNGE LA CLASSE PLAYING ALLA CANZONE IN RIPRODUZIONE */
    currentAudio.play();
    target.classList.add('playing');

    /* IMPOSTA IMFORMAZIONI NEL PLAYER */
    player.querySelector('img').src = album.cover_big;
    player.querySelector('h5').innerHTML = title;
    player.querySelector('p').innerHTML = artist.name;

    icon.innerHTML = '<i class="bi bi-pause-fill text-white"></i>';
    icon.classList.add("active");
    songName.style.color = "var(--color-green)";

    /* QUANDO LA CANZONE FINISCE SI STOPPA */
    currentAudio.addEventListener('ended', function () {
        icon.innerHTML = '<i class="bi bi-play-fill text-white"></i>';
        icon.classList.remove("active");
        songName.style.color = "#fff";
    });

}


