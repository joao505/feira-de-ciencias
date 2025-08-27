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
    },
    {
        sound: , 
        Option: [],
        correct: 1,
        alt:
    },
    {
        sound: , 
        Option: [],
        correct: 1,
        alt:
    },
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
let pontuacao = 0;
let audio = new Audio();
let selectedOpition = null;
let gameActive = true;

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
    if(!gameActive) return;

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

    //criar opções - embaralhadas
    const shuffledOptions = shuffleArray([...currentSound.option]);
    const correctIndex = shuffledOptions.indexOf(currentSound.option[currentSound.correct]);

    shuffledOptions.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'opition-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => selectedOpition(index, correctIndex));
        opitionContainer.appendChild(btn);
    });
}

//select opção
function selectedOpition(optionIndex, correctIndex) {
    if(selectedOpition !== null || !gameActive) return;

    selectedOpition = optionIndex;
    const currentSound = sound[currentSoundIndex];
    const optionButtons = document.querySelectorAll('.option-btn');

    //efeito de pont. aleatoria
    const ramdomPoints = Math.floor(Math.ramdom() * 3) + 1;

    //deasbilita button 
    optionButtons.forEach(btn => {
        btn.disabled = true;
    });

    //marca resposta correta/incorreta
    if(optionIndex === currentSound.correct) {
        optionButtons[optionIndex].classList.add('correct');
        feedbackElement.textContent = `Correto! +${ramdomPoints} pontos!`;
        feedbackElement.classList.add('correct');
        pontuacao += ramdomPoints;
        updateScore();
    }else{
        optionButtons[optionIndex].classList.add('incorrect'); optionButtons[currentSound.correct].classList.add('correct');
        feedbackElement.textContent = `Ìncorreto! Era: ${currentSound.options[currentSound.correct]}`;
        feedbackElement.classList.add('incorrect');
    }

    //mostrar button de prox.
    nextBtn.style.display = 'inline-block';
    playSoundBtn.disabled = true;
}

//carregar prox. sons
function loadNextSound() {
    currentSoundIndex++;

    if(currentSoundIndex < sounds.length) {
        loadSound();
    }else {
        endGame();
    }
}

//atualiza pontuação:
function updateScore() {
    scoreElement.textContent = pontuacao;
}

//finalizar o jogo
function endGame() {
    gameActive = false;
    gameOverElement.style.display = 'block';
    document.querySelector('.sound-container').style.display = 'none';
    document.querySelector('.options').style.display = 'none';
    finalScoreElement.textContent = pontuacao;
}

//reiniciar o jogo
 function restartGame() {
    pontuacao = 0;
    gameActive = true;
    gameOverElement.style.display = 'none';
    document.querySelector('.sound-container').style.display = 'block';
    document.querySelector('.options').style.display = 'grid';
    updateScore();
    loadSound();
}

//iniciar o jogo quando reiniciar a pag.
window.addEventListener('DOMContentLoaded', initGame);