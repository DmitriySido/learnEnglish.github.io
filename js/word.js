'use strict'

const sectionWord = document.querySelector('.section-word')
const translateWordText = sectionWord.querySelector('.translate-word')
const nextButtonWord = document.querySelector('.next-button__word')
const mainWordButton = document.querySelector('#translation-of-words')
const exitButtonWord = sectionWord.querySelector('.exit-button__word')

if(localStorage.getItem('ProgressData')) progressData = JSON.parse(localStorage.getItem('ProgressData'))

//Слова с переводом
const words = [
	{en: 'School', rus: 'Школа'}, {en: 'Bed', rus: 'Кровать'},
	{en: 'Book ', rus: 'Книга'}, {en: 'Tree', rus: 'Дерево'},
	{en: 'Ball', rus: 'Мяч'}, {en: 'Carpet', rus: 'Ковер'},
	{en: 'Beer', rus: 'Пиво'}, {en: 'Curtains', rus: 'Шторы'},
  {en: 'Apple  ', rus: 'Яблоко'}, {en: 'Pillow', rus: 'Подушка'},
  {en: 'Evening ', rus: 'Вечер'}, {en: 'Armchair', rus: 'Кресло'},
  {en: 'Lemon ', rus: 'Лимон'}, {en: 'Fireplace', rus: 'Камин'},
  {en: 'Plum ', rus: 'Слива'}, {en: 'Sofa', rus: 'Диван'},
  {en: 'Morning ', rus: 'Утро'}, {en: 'Air', rus: 'Воздух'},
  {en: 'Melon ', rus: 'Дыня'}, {en: 'Wind', rus: 'Ветер'},
  {en: 'Cherry ', rus: 'Вишня'}, {en: 'Water', rus: 'Вода'},
  {en: 'Raspberry ', rus: 'Малина'}, {en: 'West', rus: 'Запад'},
  {en: 'Watermelon ', rus: 'Арбуз'}, {en: 'Rast', rus: 'Восток'},
  {en: 'Cabbage ', rus: 'Капуста'}, {en: 'North', rus: 'Север'},
  {en: 'Bird ', rus: 'Птица'}, {en: 'Animal', rus: 'Животное'},
  {en: 'Fish ', rus: 'Рыба'}, {en: 'People', rus: 'Люди'},
  {en: 'World ', rus: 'Мир'}, {en: 'Happiness', rus: 'Счастье'},
  {en: 'Apartment ', rus: 'Квартира'}, {en: 'Market', rus: 'Рынок'}
]

//Список побочных слов
let sideWords = [
  'Кукла', 'Блокнот', 'Ручка', 'Мама', 'Машина', 'Собака', 'Кукуруза', 'Уверенный', 'Закрывать', 'Еда',
  'История', 'Диалог', 'Слово', 'Время', 'Театр', 'Клуб', 'Дружба', 'Кофейня', 'Студент', 'Досуг', 'Дорога'
]

//Нажатие на кнопку *Перевод Фраз*
mainWordButton.addEventListener('click', function(event){
	setTimeout(() => {
		main.classList.add('main-hidden')
		sectionPhrases.classList.add('section-hidden')
    sectionWord.classList.remove('section-hidden')
    sectionWord.classList.add('section-active')
	}, 2400)

	setTimeout(loading, 0);
})

//Нажатие на кнопку *Выйти*(Стрелочка назад)
exitButtonWord.addEventListener('click', function(event){
	alertPopup.classList.add('alerts--active')
	overlayAlert.classList.add('overlay--active')
})

//Обработка нажатия на кнопку *Да*
alertOk.addEventListener('click', function(){
	sectionPhrases.classList.remove('section-hidden')
  sectionWord.classList.remove('section-active')
	alertPopup.classList.remove('alerts--active')
	overlayAlert.classList.remove('overlay--active')
	main.classList.remove('main-hidden')
})

//Закрытие на клик по оверлею
overlayAlert.addEventListener('click', function(event){
	let target = event.target;

	if(!target.closest('.alerts')){
		alertPopup.classList.remove('alerts--active')
		overlayAlert.classList.remove('overlay--active')
	}
})

//Генерация случайных побочных слов
function randomSideWords(){
	const randomWord = sideWords[Math.floor(Math.random() * sideWords.length)]
	const deleteWord = sideWords.indexOf(randomWord)
	sideWords.splice(deleteWord, 0)

	return deleteWord
}
let wrdSide = randomSideWords()

//Генерация случайного слова, которое нужно перевести
let word
const randomWord = (() => word = words[Math.floor(Math.random() * words.length)])
randomWord()

translateWordText.textContent = word.en

//Создание кнопок со словами
let arrButtons = []
function createWordButtons(){
  //Создание кнопки с правильным ответом
	let correctAnswer = word.rus
  arrButtons.push(correctAnswer)

  //Создание побочных кнопок
	for(let i = 0; i < 3; i++){
    wrdSide = randomSideWords()
		let ansver = sideWords[wrdSide]

    arrButtons.push(ansver)
	}
  return arrButtons
}
createWordButtons()

//Добавление кнопок в HTML разметку
const windowWithWordButtons = document.createElement('div')
windowWithWordButtons.className = 'window-with-words__word'
function renderRandomButton(){
  for(let btn = 0; btn < arrButtons.length; btn++){
    const wordButton = document.createElement('button')
	  wordButton.className = 'translate__word--word'
    wordButton.textContent = arrButtons[btn]

    windowWithWordButtons.append(wordButton)
  }
  
	nextButtonWord.before(windowWithWordButtons)
}
renderRandomButton()

//Удаление кнопок со словами
const removeWordButtons = (() => windowWithWordButtons.remove())

//Нажатие на кнопку
const wrapperWithWordss = document.querySelector('.wrapper-to-translate__word')


function wordButtonListener(){
  const allButtonsWord = document.querySelectorAll('.translate__word--word')
  allButtonsWord.forEach(button =>{
    button.addEventListener('click', function(){
      allButtonsWord.forEach(btn =>{
        btn.disabled = true
      })

      this.classList.add('inactive')

      //Рендер кнопки, которая была нажата
      const tapButton = document.createElement('button')
      tapButton.className = 'translate__word--word-tap'
      tapButton.textContent = this.textContent

      wrapperWithWordss.append(tapButton)
      windowWithWordButtons.before(wrapperWithWordss)

      //Нажатие на ответ
      tapButton.addEventListener('click', function(){
        this.remove()
        button.classList.remove('inactive')

        allButtonsWord.forEach(btn =>{
          btn.disabled = false
          nextButtonWord.disabled = true
        })
      })

      //Проверка на првильно нажатую кнопку
      if(this.textContent === word.rus){
        nextButtonWord.disabled = false
      }
    })
  })
}
wordButtonListener()

//удаление кнопок с ответами
// const removeButton = (() =>wrapperWithWordss.remove())
const removeButton = function(){
  document.querySelectorAll('.translate__word--word').forEach(button => button.remove())
  document.querySelectorAll('.translate__word--word-tap').forEach(button => button.remove())
}

if(progressData.wordProgress < 15){
	mainWordButton.disabled = false
	mainWordButton.classList.remove('task__button--inactive')
}else{
	mainWordButton.disabled = true
	mainWordButton.classList.add('task__button--inactive')
}

//Progress Bar
let wordClick = 0
let wordProcent = document.querySelector('.procent__word')

const wordTranslationCounter = document.querySelector('.word-translation__counter')
function progressWord(){
  let elem = document.querySelector('#progress-line__word')
  let width = wordClick

  function progressStatus(){
    if(width <= 100){
      width = wordClick

      elem.style.width = width + '%'
      wordProcent.textContent = width * 1 + '%'
    }else if(width > 99){
      width = 0
      wordClick = 0

      if(progressData.wordProgress < 15){
      	mainWordButton.disabled = false
      	mainWordButton.classList.remove('task__button--inactive')
      	progressData.wordProgress += 1
  			wordTranslationCounter.textContent = progressData.wordProgress + '/15'
 				saveToLocalStorage()
      }else{
      	mainWordButton.disabled = true
      	mainWordButton.classList.add('task__button--inactive')
      	progressData.wordProgress += 1
      	wordTranslationCounter.textContent = progressData.wordProgress + '/15'
      }

      elem.style.width = width + '%'
      wordProcent.textContent = width * 1 + '%'

      main.classList.remove('main-hidden')
			sectionPhrases.classList.remove('section-hidden')
      sectionWord.classList.remove('section-active')
      return
    }
  }
  progressStatus()
}

wordTranslationCounter.textContent = progressData.wordProgress + '/15'

nextButtonWord.disabled = true
nextButtonWord.addEventListener('click', function(){
    wordClick += 10
    if(wordClick === 20 || wordClick === 60 || wordClick === 90){
      const wordWrapper = document.querySelector('.word__wrapper')
      renderComment(wordWrapper)
      let comment = document.querySelector('.comment')
      comment.classList.add('comment--active')
      // setTimeout(() => {
      //   comment.classList.add('comment--active')
      // }, 100)
      // setTimeout(() => {
      //   comment.classList.remove('comment--active')
      // }, 2000)
  
      // setTimeout(() => {
      //   comment.remove()
      // }, 2500)
    }

  //Обнуление

  randomSideWords()
  arrButtons = []
  wrdSide = randomSideWords()

  //Обновление случайного слова
  translateWordText.textContent = ''
  randomWord()
  translateWordText.textContent = word.en

  document.querySelectorAll('.translate__word--word').forEach(button => button.remove())
  document.querySelectorAll('.translate__word--word-tap').forEach(button =>  button.remove())
  removeButton()
  removeWordButtons()

  createWordButtons()
  shuffle(arrButtons)
  renderRandomButton()
  wordButtonListener()

  progressWord()

  nextButtonWord.disabled = true
})