const spellingWord = document.querySelector('.spelling-word')
const spellingLetterWrapper = document.querySelector('.spelling__letter-wrapper')
const sectionSpelling = document.querySelector('.section-spelling')

if(localStorage.getItem('ProgressData')) progressData = JSON.parse(localStorage.getItem('ProgressData'))

//ALERT
function funcAlertOk(sectionHidden){
  for(section of [...sectionHidden]){
    section.classList.remove('section-active')
    section.classList.add('section-hidden')
  }
	alertPopup.classList.remove('alerts--active')
	overlayAlert.classList.remove('overlay--active')
	main.classList.remove('main-hidden')
}

//CLOSE SECTION
function closeSection(sectionActive, [...sectionHidden]){
  for(section of [...sectionHidden]){
    section.classList.remove('section-active')
    section.classList.add('section-hidden')
  }

  sectionActive.classList.remove('section-hidden')
  sectionActive.classList.add('section-active')

	main.classList.add('main-hidden')
}

const spellingButton = document.querySelector('#spelling')

spellingButton.addEventListener('click', function(){
  setTimeout(() => {
    closeSection(sectionSpelling, [sectionPhrases, sectionWord, sectionSpelling])
	}, 2400)

	setTimeout(loading, 0);
})

const exitButton = sectionSpelling.querySelector('.exit-button')
exitButton.addEventListener('click', function(){
  alertPopup.classList.add('alerts--active')
	overlayAlert.classList.add('overlay--active')
})

alertOk.addEventListener('click', function(){
  funcAlertOk([sectionPhrases, sectionWord, sectionSpelling])
})

const wordsArray = new Map([
  ['Mother', 'Мама'],
  ['Animal', 'Животное'],
  ['World', 'Мир'],
])

let spellingArray = []

let newArray = [...wordsArray]
let randomIndex = Math.floor(Math.random() * newArray.length)

let wordEn = newArray[randomIndex][0]
let wordRu = newArray[randomIndex][1]

spellingWord.textContent = wordRu

// Размещение кнопок в случайной последовательности
wordEn = wordEn.split('').splice(',')
const randomPositionButtons = () => Math.random() - 0.5;
wordEn.sort(randomPositionButtons);

// Создание кнопок с буквами
function createButton(){
  for(let btn = 0; btn < wordEn.length; btn++){
    const letterButton = document.createElement('button')
    letterButton.className = 'spelling__letter-button'
    letterButton.textContent = wordEn[btn]
  
    spellingLetterWrapper.append(letterButton)
  }
}
createButton()

function randomSpellingWord(){
  // Нажатие на кнопку с буквой
  const wrapperToSpellingWord = document.querySelector('.wrapper-to-spelling__word')

  let spellingletterButtons = document.querySelectorAll('.spelling__letter-button')
  spellingletterButtons.forEach(button =>{
    button.addEventListener('click', function(){
      let buttonTap = document.createElement('button')
      buttonTap.className = 'spelling__letter-button--tap'
      buttonTap.textContent = this.textContent
      wrapperToSpellingWord.append(buttonTap)
      spellingArray.push(this.textContent)

      if(spellingArray.join('') === newArray[randomIndex][0]){
        nextButton.disabled = false
      }

      this.classList.add('inactive')
      removeButton(this, buttonTap)
    })
  })

  // Удаление кнопки
  function removeButton(button, thisLetter){
    let spellingKetterButtonTap = document.querySelectorAll('.spelling__letter-button--tap')
    spellingKetterButtonTap.forEach(buttonTap => {
      buttonTap.addEventListener('click', function(){
        if(thisLetter.textContent === this.textContent){
          button.classList.remove('inactive')
          spellingArray.pop(spellingArray.indexOf(this.textContent))
        }
        this.remove()
      })
    })
  }
}

// Удаление всех кнопок
const removeAllButtonfunction = function(){
  document.querySelectorAll('.spelling__letter-button').forEach(button => button.remove())
  document.querySelectorAll('.spelling__letter-button--tap').forEach(buttonTap => buttonTap.remove())
}

let spellingClick = 0;
let spellingProcent = document.querySelector('.procent__spelling')
const spellingCounter = document.querySelector('.spelling-counter')

function progressSpelling(){
  let elem = document.querySelector('#progress-line__spelling')
  let width = spellingClick

  function progressStatus(){
    if(width <= 100){
      width = spellingClick

      elem.style.width = width + '%'
      spellingProcent.textContent = width * 1 + '%'
    }else if(width > 99){
      width = 0
      spellingClick = 0

      if(progressData.spellingProgress < 15){
      	spellingButton.disabled = false
      	spellingButton.classList.remove('task__button--inactive')
      	progressData.spellingProgress += 1
  			spellingCounter.textContent = progressData.spellingProgress + '/15'
 				saveToLocalStorage()
      }else{
      	spellingButton.disabled = true
      	spellingButton.classList.add('task__button--inactive')
      	progressData.spellingProgress += 1
      	spellingCounter.textContent = progressData.spellingProgress + '/15'
      }

      elem.style.width = width + '%'
      spellingProcent.textContent = width * 1 + '%'

      sectionSpelling.classList.remove('section-active')
      sectionSpelling.classList.add('section-hidden')
      main.classList.remove('main-hidden')

      return
    }
  }
  progressStatus()
}

spellingCounter.textContent = `${progressData.spellingProgress}/15`

// Кнопка *Продолжить*
const nextButton = sectionSpelling.querySelector('.next-button__spelling')
nextButton.disabled = true

nextButton.addEventListener('click', function(){
  nextButton.disabled = true

  spellingClick += 10

  removeAllButtonfunction()
  progressSpelling()
  spellingArray = []

  randomIndex = Math.floor(Math.random() * newArray.length)

  wordEn = newArray[randomIndex][0]
  wordRu = newArray[randomIndex][1]

  spellingWord.textContent = wordRu

  wordEn = wordEn.split('').splice(',')
  randomPositionButtons()
  wordEn.sort(randomPositionButtons);
  
  createButton()
  randomSpellingWord()

  if(spellingClick === 20 || spellingClick === 60 || spellingClick === 90){
    const spellingWrapper = document.querySelector('.spelling__wrapper')
    renderComment(spellingWrapper)
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
})

randomSpellingWord()