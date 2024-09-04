const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.getElementById('start-pause')
const musicaFocoInput = document.getElementById('alternar-musica')
const musica = new Audio('sons/luna-rise-part-one.mp3')
const iniciar = new Audio('sons/play.wav')
const pausar = new Audio('sons/pause.mp3')
const finalizar = new Audio('sons/beep.mp3')

let tempoDecorridoEmSegundos = 5
let intervalorId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    musica.paused ? musica.play() : musica.pause()
})

focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    botoes.forEach(botao => { // Essa opção dá certo porque a função é chamada antes de adicionar
        botao.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML =
            `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            
            break
        case 'descanso-curto':
            titulo.innerHTML =
            `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break
        case 'descanso-longo':
            titulo.innerHTML =
            `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break
    }
    
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        zerar()
        finalizar.play()
        alert('Tempo finalizado!')
        finalizar.pause()
        return
    }
    tempoDecorridoEmSegundos -= 1
    console.log(`Temporizador: ${tempoDecorridoEmSegundos}`)
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervalorId) {
        zerar()
        pausar.play()
        return
    }
    iniciar.play()
    intervalorId = setInterval(contagemRegressiva, 1000) // Aqui seria 1 s, mas temos que informar em milissegundos
}

function zerar() {
    clearInterval(intervalorId)
    intervalorId = null
}