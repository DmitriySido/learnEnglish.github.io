'use strict'

const loadingScreen = document.querySelector('.loading-screen')
const loadingClue = document.querySelector('.loading-clue')

function loading(){
	loadingScreen.classList.add('loading-screen--active')

	alertPopup.classList.remove('alerts--active')
	overlayAlert.classList.remove('overlay--active')
	main.classList.add('main-hidden')

	sectionPhrases.classList.remove('section-active')

	loadingProgress()
}

const clues = [
	{clue: 'Thanks a bunch. - означает ‘Большое спасибо.’'},
	{clue: "I'm so sorry! - означает ‘Мне очень жаль!’"},
	{clue: "Don't mention it! - означает ‘Не стоит благодарности!’"},

	{clue: "May I help you? - означает ‘Могу ли я вам помочь?’"},
	{clue: "No problem / that's ok! - означает ‘Все в порядке!’"},
	{clue: "Have a safe trip. - означает ‘Хорошей поездки.’"},

	{clue: "Could be better. - означает ‘Могло быть лучше.’"},
	{clue: "What do you do? - означает ‘Чем вы занимаетесь?’"},
	{clue: "I’ll say! - означает ‘Еще бы!’"},
]

let thisClue
function randomClue(){
	thisClue = clues[Math.floor(Math.random() * clues.length)];
	loadingClue.textContent = thisClue.clue
}
randomClue()

//Progress Bar
let progressLine = document.querySelector('#loading__progress-line')
function loadingProgress(){
	let progressProcent = document.querySelector('.loading__procent')
	let progressWidth = 1
	let id = setInterval(progressStatus, 20)

	function progressStatus(){
		if(progressWidth >= 100){
			progressLine.style.width = 0 + '%'
			clearInterval(id)
			loadingScreen.classList.remove('loading-screen--active')
		}else{
			progressWidth++
			progressLine.style.width = progressWidth + '%'
			progressProcent.textContent = progressWidth * 1 + '%'
		}
	}
}


const swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 30,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true,
  }
});