const SearchInput = document.querySelector('#SearchBar')
const player = document.querySelector('#player')
const row = document.querySelector('.container.main')
const PlayerButton = document.querySelector('#Player-Button')
const progress = document.querySelector('.player-progress-bar')

let timer;

function debounce(callback, delay) {
    clearTimeout(timer);
    timer = setTimeout(callback, delay);
}

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

    row.innerHTML = /*html*/`
        <div class="dot-pulse">
            <div class="dot-pulse__dot"></div>
        </div>
    `

    if (results.length <= 3) {
        stopAll()
        displayHome();

    } else {
        const data = await getData(results)
        row.innerHTML = data.map(({ album, artist, title, duration, preview, id }) => /*html*/`
    
        <div class="row mb-4" id="_${id}" onclick="playAudio(${id})">
            <div class="col-2 col-md-1 pe-0 pe-md-2">
                <div style="position: relative" id="cover">
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

    const container = document.querySelector('#sfoglia')

    container.innerHTML = `
        <div class="row g-4 my-4">
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(39,133,106);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Podcast</h3>
                    <img src="https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(30,50,100);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Solo per Te</h3>
                    <img src="https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(141,103,171);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Classifiche</h3>
                    <img src="https://charts-images.scdn.co/assets/locale_en/regional/weekly/region_global_default.jpg">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(232,17,91);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Nuove uscite</h3>
                    <img src="https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(141,103,171);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Scopri</h3>
                    <img src="https://t.scdn.co/images/d0fb2ab104dc4846bdc56d72b0b0d785.jpeg">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(115,88,255);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Eventi dal vivo</h3>
                    <img src="https://concerts.spotifycdn.com/images/live-events_category-image.jpg">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(180,155,200);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Nuove uscite</h3>
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(240,55,165);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Estate</h3>
                    <img src="https://t.scdn.co/images/8e508d7eb5b843a89c368c9507ecc429.jpeg">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(156,240,225);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Pop</h3>
                    <img src="https://t.scdn.co/media/derived/pop-274x274_447148649685019f5e2a03a39e78ba52_0_0_274_274.jpg">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(215,242,125);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Hip-Hop</h3>
                    <img src="https://t.scdn.co/media/original/hip-274_0a661854d61e29eace5fe63f73495e68_274x274.jpg">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(141,103,171);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Mood</h3>
                    <img src="https://t.scdn.co/media/original/mood-274x274_976986a31ac8c49794cbdc7246fd5ad7_274x274.jpg">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(232,17,91);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Gaming</h3>
                    <img src="https://i.scdn.co/image/ab67706f0000000221a2087747d946f16704b8af">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(115,88,255);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Indie</h3>
                    <img src="https://t.scdn.co/images/fe06caf056474bc58862591cd60b57fc.jpeg">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(175,40,150);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Dance/Elettronica</h3>
                    <img src="https://t.scdn.co/media/derived/edm-274x274_0ef612604200a9c14995432994455a6d_0_0_274_274.jpg">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(255,17,139);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Latina</h3>
                    <img src="https://t.scdn.co/images/6a48e36b373a4d879a9340076db03a7b">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(140,25,50);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Autori</h3>
                    <img src="https://i.scdn.co/image/ab676d63000076a0c9657833d9c169782b961c9c">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(220,20,140);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">R&B</h3>
                    <img src="https://i.scdn.co/image/ab67706f000000023c5a4aaf5df054a9beeb3d82">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(20,138,8);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">EQUAL</h3>
                    <img src="https://i.scdn.co/image/ab67706f0000000284a1ec26f589f0d569805a07">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(235,30,50);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Rock</h3>
                    <img src="https://t.scdn.co/media/derived/rock_9ce79e0a4ef901bbd10494f5b855d3cc_0_0_274_274.jpg">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(119,119,119);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Allenamento</h3>
                    <img src="https://i.scdn.co/image/ab67706f000000029249b35f23fb596b6f006a15">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(13,115,236);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Radar</h3>
                    <img src="https://t.scdn.co/images/c6677aa51acf4121b66b9d1f231bd427.png">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(80,155,245);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Relax</h3>
                    <img src="https://t.scdn.co/media/derived/chill-274x274_4c46374f007813dd10b37e8d8fd35b4b_0_0_274_274.jpg">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(30,50,100);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">In Auto</h3>
                    <img src="https://t.scdn.co/images/57017d435c344bb28efba325b7c9e7c6.jpeg">
                </div>
            </div>
            <div class="col-6 col-md-4 col-lg-2">
                <div class="square w-100 rounded" style="background: rgb(186,93,7);">
                    <h3 class="ps-3 pt-3 fw-bold" style="font-size: 24px">Anni</h3>
                    <img src="https://t.scdn.co/images/4c8b58ab42b54296ad5379514d36edac">
                </div>
            </div>
        </div>
    `
}

async function playAudio(id) {

    /* FETCH DEI DATI CORRISPONDEDNTI ALLA CANZONE */
    const response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/track/" + id);
    const data = await response.json();

    const { title, album, artist, duration } = data;

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
            previousIcon.classList.remove('active')
            previousIcon.innerHTML = '<i class="bi bi-play-fill text-white"></i>';
            PlayerButton.innerHTML = '<i class="bi bi-play-fill  fs-4 text-white"></i>';
            progress.style.transition = `none`
            progress.style.width = '0%';

            previousSongName.style.color = "#fff";
            previousPlaying.classList.remove('playing');

            return;
        }

        /* SE NON E' LA STESSA FERMA LA CANZONE DI PRIMA */
        previousAudio.pause()
        previousIcon.classList.remove('active')
        previousIcon.innerHTML = '<i class="bi bi-play-fill text-white"></i>';

        progress.style.transition = 'none'
        progress.style.width = '0%';

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

    icon.classList.add("active");
    icon.innerHTML = '<i class="bi bi-pause-fill text-white"></i>';
    PlayerButton.innerHTML = '<i class="bi bi-pause-fill fs-4  text-white"></i>';

    if (progress.offsetWidth == 0) {
        progress.style.transition = `width 30s linear`
        progress.style.width = '100%';
    }



    songName.style.color = "var(--color-green)";

    /* QUANDO LA CANZONE FINISCE SI STOPPA */
    currentAudio.addEventListener('ended', function () {

        icon.classList.remove("active");
        icon.innerHTML = '<i class="bi bi-play-fill text-white"></i>';
        PlayerButton.innerHTML = '<i class="bi bi-play-fill  fs-4 text-white"></i>';
        progress.style.transition = `width 0s linear`
        progress.style.width = '0%';

        songName.style.color = "#fff";
    });

}

function stopAll() {
    const audio = document.querySelectorAll('audio')

    audio.forEach(audio => {
        if (!audio.paused) {
            audio.pause()
        }
    });

    PlayerButton.innerHTML = '<i class="bi bi-play-fill  fs-4 text-white"></i>';
    progress.style.transition = `width 0s linear`
    progress.style.width = '0%';
}

window.onload = async () => {

    await displayHome()
    const RandomArtistData = await GetSongFromRandomArtist()
    DisplaySongFromRandomArtist(RandomArtistData)
}

