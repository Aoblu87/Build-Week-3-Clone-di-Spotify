const SearchInput = document.querySelector('#SearchBar')
let timeoutId;

async function getData(query) {
    const response = await fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=' + query)
    const data = await response.json()

    return data.data;
}

async function displayResults(results) {

    const row = document.querySelector('.container.main')

    if (results.length <= 3) {
        row.innerHTML = ''
    } else {

        const data = await getData(results)

        row.innerHTML = data.map(({ album, artist, title, duration, preview, id }) => /*html*/`
    
        <div class="row mb-4" id="_${id}" onclick="playAudio(${id})">
            <div class="col-2 col-md-1 pe-0">
                <div style="position: relative">
                    <img src="${album.cover_big}" alt="" class="img-fluid">
                    <audio src="${preview}"></audio>
                    <div class="play-button d-none d-md-flex"><i class="bi bi-play-fill text-white"></i></div>
                </div>
            </div>
            <div class="col d-flex flex-column justify-content-center TextCut">
                <h5 class="mb-1 fs-6 fw-semibold TextCut">${title}</h5>
                <p class="text-white-50 mb-0 fw-semibold TextCut">${artist.name}</p>
            </div>
            <div class="col-auto d-flex align-items-center">
                <p class="text-white-50 fw-bold">${formatTime(duration)}</p>
            </div>
        </div>

    `).join('')
    }
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    const formattedMinutes = String(minutes).padStart(2, '0'); // Aggiunge uno zero iniziale se necessario
    const formattedSeconds = String(seconds).padStart(2, '0'); // Aggiunge uno zero iniziale se necessario

    return `${formattedMinutes}:${formattedSeconds}`;
}

function playAudio(id) {
    const target = document.querySelector(`#_${id}`)
    const cover = target.querySelector('img')
    const title = target.querySelector('h5')
    const audio = target.querySelector(`audio`)
    const icon = target.querySelector(".play-button")

    if (audio.paused) {
        audio.play();
        icon.innerHTML = '<i class="bi bi-pause-fill text-white"></i>'
        icon.classList.toggle("active")
        title.style.color = "var(--color-green)"

        audio.addEventListener('ended', function () {
            icon.innerHTML = '<i class="bi bi-play-fill text-white"></i>';
            icon.classList.remove("active")
            title.style.color = "#fff"
        });

    } else {
        audio.pause();
        icon.innerHTML = '<i class="bi bi-play-fill text-white"></i>'
        icon.classList.toggle("active")
        title.style.color = "#fff"
    }
}

