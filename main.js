const faqList = document.querySelector('.faq__list');
console.log('faqList');
const questions = faqList.querySelectorAll('.faq__question');
console.log('questions');

questions.forEach((question)=>{
  question.addEventListener('click', ()=>{
  question.classList.toggle('faq__question--active');
  const activeAnswer = question.parentElement.querySelector('.faq__answer');

  activeAnswer.classList.toggle('faq__answer--visible');

  if(activeAnswer.classList.contains('faq__answer--visible')){
    activeAnswer.style.maxHeight = activeAnswer.scrollHeight + 15+ "px";
  } else {
    activeAnswer.style.maxHeight = null;
  }
  });
});

const slides =  document.querySelectorAll('.gallery__item');
const btnPrev = document.querySelector('.pets__button--prev');
const btnNext = document.querySelector('.pets__button--next');

let counter = 0;
const maxStep = slides.length - 1;

slides[counter].classList.add('gallery__item--current');


const nextBtnHendler = ()=> {
  slides[counter].classList.remove('gallery__item--current');
  slides[counter].setAttribute('style', 'transform: translateX(0%);');
  counter++;
  if(counter === 0){
    btnPrev.setAttribute("disabled", "disabled");
  } else {
    btnPrev.removeAttribute('disabled', 'disabled')
  }
  if(counter === maxStep){
    btnNext.setAttribute("disabled", "disabled");
  } else {
    btnNext.removeAttribute("disabled", "disabled");
  }
  slides[counter].classList.add('gallery__item--current');
}

const prevBtnHendler = ()=> {
  slides[counter].classList.remove('gallery__item--current');
  slides[counter].removeAttribute('style');
  counter--;
  if(counter === 0){
    btnPrev.setAttribute("disabled", "disabled");
  } else {
    btnPrev.removeAttribute('disabled', 'disabled')
  }
  if(counter === maxStep){
    btnNext.setAttribute("disabled", "disabled");
  } else {
    btnNext.removeAttribute("disabled", "disabled");
  }
  slides[counter].classList.add('gallery__item--current');
}

btnNext.addEventListener('click', nextBtnHendler);
btnPrev.addEventListener('click', prevBtnHendler);



