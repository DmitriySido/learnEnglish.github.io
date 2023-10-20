'use strict'

const sectionText = document.querySelector('.section-text')
const ansverOptionsContainer = sectionText.querySelector('.answer-options__container')
const progressBarText = sectionText.querySelector('.progress-bar__wrapper-text')
const sectionTextContent = sectionText.querySelector('.section-text__content')
const startButton = sectionText.querySelector('.start-button')
const answerOptions = sectionText.querySelector('.answer-options')
const answerQuestion = sectionText.querySelector('.answer-question-text')
const sectionTextSubject = sectionText.querySelector('.section-text__subject')
const readText = sectionText.querySelector('.section-text__text')
const mainRememberTextButton = document.querySelector('#remember-text')
const exitButtonText = document.querySelector('.exit-button__text')

//Рандомный выбор текста
//Создание кнопок с ответами на основе текста

// text__content--hidden
// answer-options--hidden
// progress-bar--hidden

mainRememberTextButton.addEventListener('click', function(){
	setTimeout(() => {
		main.classList.add('main-hidden')
		sectionPhrases.classList.add('section-hidden')
    sectionWord.classList.add('section-hidden')
    sectionText.classList.remove('section-hidden')
    sectionText.classList.add('section-active')
	}, 2400)

	setTimeout(loading, 0);
})

//Нажатие на кнопку *Выйти*(Стрелочка назад)
exitButtonText.addEventListener('click', function(event){
	alertPopup.classList.add('alerts--active')
	overlayAlert.classList.add('overlay--active')
})

//Обработка нажатия на кнопку *Да*
alertOk.addEventListener('click', function(){
	sectionPhrases.classList.remove('section-hidden')
  sectionWord.classList.remove('section-hidden')
  sectionText.classList.remove('section-active')

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

const textsStack = [
  {
    title: 'My Wonderful Family',
    text: `I live in a house near the mountains. I have two brothers and one sister, and I was born last. My father teaches mathematics, and my mother is a nurse at a big hospital. My brothers are very smart and work hard in school. My sister is a nervous girl, but she is very kind. My grandmother also lives with us. She came from Italy when I was two years old. She has grown old, but she is still very strong. She cooks the best food!
          My family is very important to me. We do lots of things together. My brothers and I like to go on long walks in the mountains. My sister likes to cook with my grandmother. On the weekends we all play board games together. We laugh and always have a good time. I love my family very much.`,
    options: [
      {
        question: 'My mother is a...',
        answers: ['Doctor', 'Writer', 'Waitress', 'Nurse'],
        correctAnswer: 'Nurse',
        id: 1
      },
      {
        question: 'My house is near the...',
        answers: ['City', 'Monastery', 'Italy', 'Mountains'],
        correctAnswer: 'Mountains',
        id: 2
      },
      {
        question: 'How old was I when my grandmother came?',
        answers: ['Three years old', 'Ten years old', 'Two years old', 'Just born'],
        correctAnswer: 'Two years old',
        id: 3
      },
      {
        question: 'On the weekends, we...',
        answers: ['Play board games together', 'Go to a movie', 'Cook pasta', 'Clean the house'],
        correctAnswer: 'Play board games together',
        id: 4
      },
      {
        question: 'My sister is kind, but also...',
        answers: ['Mean', 'Strong', 'Nervous', 'Quiet'],
        correctAnswer: 'Nervous',
        id: 5
      },
    ]
  },
]

let randomText
function randomTexts(){
  randomText = textsStack[Math.floor(Math.random() * textsStack.length )]
  return randomText
}

let randomOption
let count = -1
function randomOptions(){
  for(let i = count; i < randomText.options.length + 1; i++){
    randomOption = randomText.options[i]
    return count
  }

  return randomOption
}

// Добавление кнопок с отвевтами на HTML разметку
function createReplyButton(){
  const answersButtonsWrapper = document.createElement('div')
  answersButtonsWrapper.className = 'answers-buttons__wrapper'
  for(let i = 0; i < randomOption.answers.length; i++){
    const answerButton = document.createElement('button')
    answerButton.className = 'answer-button'
    answerButton.textContent = randomOption.answers[i]

    answersButtonsWrapper.append(answerButton)
  }
  answerQuestion.after(answersButtonsWrapper)
}

//Обработка нажатия на ответ
let score = 0
let textClick = 0
let textProcent = document.querySelector('.procent__text')
const textTranslationCounter = document.querySelector('.text-remember__counter')

function progressText(){
  let elem = document.querySelector('#progress-line__text')
  let width = textClick
  elem.style.width = width + '%'
  textProcent.textContent = width * 1 + '%'

  function progressStatus(){
    elem.style.width = width + '%'
    textProcent.textContent = width * 1 + '%'
    if(width <= 100){
      width = textClick

      elem.style.width = width + '%'
      textProcent.textContent = width * 1 + '%'
    }else if(width > 99){
      width = 0
      textClick = 0

      elem.style.width = width + '%'
      textProcent.textContent = width * 1 + '%'

      return
    }
  }
  progressStatus()
}

function answerButtonListenter(){
  const answerButtons = document.querySelectorAll('.answer-button')
  answerButtons.forEach(button => {
    button.addEventListener('click', function(){
      textClick+= 20
      progressText()
      count++
      if(button.textContent === randomOption.correctAnswer){
        score++
        if(count < 5){
          randomOptions()
          createReplyButton()
          answerQuestion.textContent = randomOption.question
          console.log('You Won! ' + score)

          answerButtons.forEach(allButton => {
            allButton.remove()
          })
          
          answerButtonListenter()
        }else{
          textClick = 0
          count = -1
          sectionText.classList.remove('section-active')
          main.classList.remove('main-hidden')
          sectionText.classList.remove('section-active')
          sectionPhrases.classList.remove('section-hidden')
          sectionWord.classList.remove('section-hidden')
          alert(score)
          return
        }
      }else{
        if(count < 5){
          randomOptions()
          createReplyButton()
          answerQuestion.textContent = randomOption.question

          answerButtons.forEach(allButton => {
            allButton.remove()
          })
          answerButtonListenter()
        }else{
          textClick = 0
          count = -1

          console.log('Stop! ' + score)
          sectionText.classList.remove('section-active')
          sectionPhrases.classList.remove('section-hidden')
          sectionWord.classList.remove('section-hidden')
          main.classList.remove('main-hidden')  
          return
        }
        console.log('You Loose!')
      }
    })
  })
}
answerButtonListenter()

startButton.addEventListener('click', function(){
  randomTexts()
  progressText()
  score = 0
  count = -1 
  textClick = 0
  count++

  let elem = document.querySelector('#progress-line__text')

  elem.style.width = 0 + '%'
  textProcent.textContent =  '0%'

  randomOptions()
  createReplyButton()
  answerButtonListenter()

  answerQuestion.textContent = randomOption.question
  sectionTextSubject.textContent = randomText.title
  readText.textContent = randomText.text
  progressBarText.classList.remove('progress-bar--hidden')

  sectionTextContent.classList.add('text__content--hidden')
  ansverOptionsContainer.classList.toggle('answer-options--hidden')
})

