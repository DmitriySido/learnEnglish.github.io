'use strict'

let translateApp = document.querySelector('.translate-app')
const wordButton = document.querySelectorAll('.word')
const nextButtonPhrases = document.querySelector('.next-button__phrases')

const phrasesButton = document.querySelector('#phrase-translation')
const main = document.querySelector('.main-wrapper')
const sectionPhrases = document.querySelector('.section-phrases')

//Кнопки отвечающие за выход
const exitButtonPhrases = sectionPhrases.querySelector('.exit-button')
const overlayAlert = document.querySelector('.overlay')
const alertPopup = overlayAlert.querySelector('.alerts')
const alertOk = alertPopup.querySelector('.alert-ok')

const phraseTranslationCounter = document.querySelector('.phrase-translation__counter')

let progressData = {
  phrasesProgress: 0,
  wordProgress: 0,
  spellingProgress: 0
}

if(localStorage.getItem('ProgressData')) progressData = JSON.parse(localStorage.getItem('ProgressData'))

//Нажатие на кнопку *Перевод Фраз*
phrasesButton.addEventListener('click', function(event){
	setTimeout(() => {
    closeSection(sectionPhrases, [sectionPhrases, sectionWord, sectionSpelling])
	}, 2400)

	setTimeout(loading, 0);
})

//Нажатие на кнопку *Выйти*(Стрелочка назад)
exitButtonPhrases.addEventListener('click', function(event){
	alertPopup.classList.add('alerts--active')
	overlayAlert.classList.add('overlay--active')
})

//Обработка нажатия на кнопку *Да*
alertOk.addEventListener('click', function(){
  funcAlertOk([sectionPhrases, sectionWord, sectionSpelling])
})

//Закрытие на клик по оверлею
overlayAlert.addEventListener('click', function(event){
	let target = event.target;

	if(!target.closest('.alerts')){
		alertPopup.classList.remove('alerts--active')
		overlayAlert.classList.remove('overlay--active')
	}
})

//Приложения
let stringArray = [
	{en: 'Hello my name is Dima', rus: 'Привет меня зовут Дима', id: 1},
	{en: "I love my four dogs so much!", rus: 'Я люблю моих четырех собак так сильно!', id:2},
	{en: "I'm from Ukraine", rus: 'Я из Украины', id:3},
	{en: "My cat is really small.", rus: 'Моя кошка очень маленькая', id:4},
	{en: "My old bird is really cute.", rus: 'Моя старая птица очень славная', id:5},
	{en: "Yes, i have a good dog", rus: 'Да, у меня есть хорошая собака.', id:6},
	{en: "My bird is crazy, she plays chess!", rus: 'Моя птица сумасшедшая, она играет в шахматы!', id:7},
]

//Рандомное приложение из массива объектов
let item
function randomWordInPhrases(){
	item = stringArray[Math.floor(Math.random() * stringArray.length)];
	return item
}
randomWordInPhrases()

//String in array
translateApp.textContent = item.rus
let newTranslateApp = translateApp.textContent.split(' ').join(' ')
let translateAppLength = translateApp.textContent.split(' ')
translateApp.textContent = item.en

//Создаем обертку для кнопок со словами
let wrapperWordsTranslate = document.querySelector('.wrapper-to-translate')

//Рандомная последовательность сгинерированных кнопок
const shuffle = ((arrays) => arrays.sort(() => Math.random() - 0.5))
shuffle(translateAppLength)

//Переменные в которых будут записываться слова
let appArray = []
let trnaslateString

//Создание слов
let tapToButton
function createCeill(application){
	let word
	for(let i = 0; i < 1; i++){
		word = document.createElement('button')
		word.className = 'word-tap'
		word.textContent = tapToButton
		appArray.push(word.textContent)
		trnaslateString = appArray.join(' ')
		comparison(trnaslateString)
		wrapperWordsTranslate.append(word)
	}
	// translateApp.after(wrapperWordsTranslate)
}

//Удаление всех ячеек со словами
function removeAllCeills(){
	// wrapperWordsTranslate.remove()
  console.log('yes')
}

//Удаление слов
function removeCeill(thisWord, thisButton){
	thisWord.forEach(word =>{
		word.addEventListener('click', function(){
			if(thisButton.textContent === this.textContent){
				thisButton.disabled = false
				thisButton.classList.remove('inactive')
				let removeInArray = appArray.indexOf(this.textContent)
				appArray.pop(removeInArray)
				
				this.remove()
				nextButtonPhrases.disabled = true
			}
		})
	})
}

//Создание кнопок в зависимости от приложения
let wrapperWithWord = document.createElement('div')

function createWord(app){
	let word
	for(let i = 0; i < translateAppLength.length; i++){
		word = document.createElement('button')
		word.className = 'word'
		word.textContent = app[i]
		wrapperWithWord.append(word)
	}
	nextButtonPhrases.before(wrapperWithWord)
}
createWord(translateAppLength)

//Удаление кнопок
function removeWord(){
	// wrapperWithWord.remove()
  document.querySelectorAll('.word').forEach(button => button.remove())
  document.querySelectorAll('.word-tap').forEach(buttonTap => buttonTap.remove())
}

//Обработка нажатия на кнопку со словом
function listenerClickOnButton(){
	let buttons = document.querySelectorAll('.word')
	buttons.forEach(button => {
		button.addEventListener('click', function(event){
			event.preventDefault()
			this.classList.add('inactive')
			tapToButton = this.textContent
			this.disabled = true
			createCeill(translateApp)
			let words = document.querySelectorAll('.word-tap')
			removeCeill(words, this)
		})
	})
}
listenerClickOnButton()

if(progressData.phrasesProgress < 10){
	phrasesButton.disabled = false
	phrasesButton.classList.remove('task__button--inactive')
}else{
	phrasesButton.disabled = true
	phrasesButton.classList.add('task__button--inactive')
}


//Progress Bar
let click = 0
let procent = document.querySelector('.procent')

function progress(){
  let elem = document.querySelector('#progress-line')
  let width = click

  function phrasesButtonState(state){
    phrasesButton.disabled = state //это
    progressData.phrasesProgress += 1
  	phraseTranslationCounter.textContent = progressData.phrasesProgress + '/10'
    // Save To local Storage
  }
  function progressStatus(){
    if(width <= 100){
      width = click

      elem.style.width = width + '%'
      procent.textContent = width * 1 + '%'
    }else if(width > 99){
      width = 0
      click = 0

      if(progressData.phrasesProgress < 10){
        phrasesButton.classList.remove('task__button--inactive')
        phrasesButtonState(false)
 				saveToLocalStorage()
      }else{
        phrasesButton.classList.add('task__button--inactive')
        phrasesButtonState(true)
      }

      elem.style.width = width + '%'
      procent.textContent = width * 1 + '%'

      main.classList.remove('main-hidden')
			sectionPhrases.classList.remove('section-active')
      sectionWord.classList.remove('section-hidden')
      return
    }
  }
  progressStatus()
}

phraseTranslationCounter.textContent = progressData.phrasesProgress + '/10'

//Обработка нажатия на кнопку *Продолжить*
nextButtonPhrases.disabled = true
nextButtonPhrases.addEventListener('click', function(){
	click += 10
	if(click === 20 || click === 60 || click === 90){
		renderComment(phrasesWrapper)
		let comment = document.querySelector('.comment')
		setTimeout(() => {
			comment.classList.add('comment--active')
		}, 100)
		setTimeout(() => {
			comment.classList.remove('comment--active')
		}, 2000)

		setTimeout(() => {
			comment.remove()
		}, 2500)
	}

	item = ''
	appArray = []
	trnaslateString = []

	randomWordInPhrases()

	document.querySelectorAll('.inactive').forEach(btn => btn.remove())

	document.querySelectorAll('.word-tap').forEach(btn => btn.remove())

	removeWord()
	removeAllCeills()

	//String in array
	translateApp.textContent = item.rus
	newTranslateApp = translateApp.textContent.split(' ').join(' ')
	translateAppLength = translateApp.textContent.split(' ')
	translateApp.textContent = item.en

	shuffle(translateAppLength)

	createWord(translateAppLength)
	listenerClickOnButton()
	progress()
	
	nextButtonPhrases.disabled = true
})

//Проверка
const comparison = (app => app === item.rus ? nextButtonPhrases.disabled = false : nextButtonPhrases.disabled = true)

/*Мотивация*/
const phrasesWrapper = document.querySelector('.phrases__wrapper')
function renderComment(wrapper){
	const motivationPhrases = ['Молодец!', 'Так держать!', 'У тебя хорошо получается!']
	const motivationImg = [1, 2, 3]

	let randomImg = motivationImg[Math.floor(Math.random() * motivationImg.length)]
	let randomPhrases = motivationPhrases[Math.floor(Math.random() * motivationPhrases.length)]

	const commentHTML = `
	<div class="comment">
		<div class="comment-img__wrapper">
			<div class="comment-text__wrapper">
				<h3 class="comment-text">${randomPhrases}</h3>
			</div>

			<img class="comment-img" src="pictures/illustrations/people-${randomImg}.png" alt="People">
		</div>
	</div>`

	wrapper.insertAdjacentHTML('beforeend', commentHTML)
}

const saveToLocalStorage = (() => localStorage.setItem('ProgressData', JSON.stringify(progressData)))