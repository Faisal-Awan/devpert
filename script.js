// Scroll Reveal

window.addEventListener("scroll", () => {

const reveals = document.querySelectorAll(".reveal");

reveals.forEach((el)=>{

const windowHeight = window.innerHeight;

const elementTop = el.getBoundingClientRect().top;

if(elementTop < windowHeight - 100){

el.classList.add("active");

}

});

});


// Counter Animation

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

const update = () => {

const target = +counter.getAttribute("data-target");

const count = +counter.innerText;

const increment = target / 100;

if(count < target){

counter.innerText = Math.ceil(count + increment);

setTimeout(update,20);

}else{

counter.innerText = target;

}

};

update();

});