const soundBank = [
    {
        sound: ,
        Option: ['Pássaro', 'Cachorro', 'Gato', 'Vaca'],
        correct: 0,
        atl: "Canto tipico de Pássaro brasileiro como sabiá ou canário"
    },
    {
        sound: , 
        Option: [],
        correct: 1,
        alt:
    }
    {
        sound: , 
        Option: [],
        correct: 1,
        alt:
    }
    {
        sound: , 
        Option: [],
        correct: 1,
        alt:
    }
    {
        sound: , 
        Option: [],
        correct: 1,
        alt:
    }
];

let sounds =[];

//elementos
const playSoundBtn = document.getElementById('play-sons');
const opitionContainer = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const scoreElement = document.getElementById('pontuação');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-pont');
const restartBtn = document.getElementById('reset-btn');
const volumeControl = document.getElementById('volume');

//variaveis
let currentSoundIndex = 0;
let pontuação = 0;
let audio = new Audio();
let selectedOpition = null;
let gameAcrive = true;

//embaralhar
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--){
        const j = math.floor(math.ramdom() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//iniciar game
function initGame() {
    //embaralha sons e pega 5 aleatorios
    sounds = shuffleArray([...soundBank]).slice(0,5);
    loadSound();
    updateScore();
    volumeControl.addEventListener('input', ( => {
        audio.volume = volumeControl.value;
    }));

    playSoundBtn.addEventListener('click', playCurrentSound);
    nextBtn.addEventListener('click', loadNextSound);
    restartBtn.addEventListener('click', restartBtn);
}

//carrega o som
function loadSound() {
    if(!gameAcetive) return;

    const currentSound = sounds[currentSoundIndex];
    audio.scr = currentSound.sound;
    audio.volume = volumeControl.value;

    //limpa estado anterior
    opitionContainer.innerHTML = '';
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    nextBtn.style.display = 'none';
    playSoundBtn.disabled = false;
    selectedOpition = null;

    //atualiza a img descrita no som
    playSoundBtn.setAttribute('aria-label', currentSound.alt);

    //criar opções

}