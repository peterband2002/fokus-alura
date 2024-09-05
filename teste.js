const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.getElementById('start-pause')
const musicaFocoInput = document.getElementById('alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarIcon = document.querySelector('#start-pause img')
const tempoNaTela = document.getElementById('timer')
const musica = new Audio('sons/luna-rise-part-one.mp3')
const iniciar = new Audio('sons/play.wav')
const pausar = new Audio('sons/pause.mp3')
const finalizar = new Audio('sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    musica.paused ? musica.play() : musica.pause()
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempoNaTela()
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
        finalizar.play()
        alert('Tempo finalizado!')
        finalizar.pause()
        zerar()
        iniciarOuPausarBt.textContent = 'Começar'
        iniciarOuPausarIcon.setAttribute('src', 'imagens/play_arrow.png')
        return // Isso é um early return (circuit breaker)
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempoNaTela()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        pausar.play()
        zerar()
        iniciarOuPausarBt.textContent = 'Retornar'
        iniciarOuPausarIcon.setAttribute('src', 'imagens/play_arrow.png')
        return
    }
    iniciarOuPausarBt.textContent = 'Pausar'
    iniciarOuPausarIcon.setAttribute('src', 'imagens/pause.png')
    iniciar.play()
    intervaloId = setInterval(contagemRegressiva, 1000) // Aqui seria 1 s, mas temos que informar em milissegundos
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempoNaTela() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempoNaTela()