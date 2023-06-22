import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  
  const ul = document.createElement('div');
  ul.classList.add("outerdiv");
  var num_items = block.children.length;
  var current = 1;

  [...block.children].forEach((row) => {
    const li = document.createElement('div');
    li.classList.add("innerdiv");
    li.innerHTML = row.innerHTML;
    li.style.order = current;
    li.dataset.position = current;
    current++;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });


    ul.append(li);
  });
  current=1;
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';


  var next = function (event) {
    var isRight = event.target.className === "scrollRight";
    var outerdiv = event.target.parentElement.getElementsByClassName("outerdiv")[0];
    if (isRight) {
      outerdiv.classList.add('slide-transition-right');
      outerdiv.style.transform = 'translate3d(-25%, 0px,0px)';
    } else {
      outerdiv.classList.add('slide-transition-left');
      outerdiv.style.transform = 'translate3d(25%, 0px,0px)';
    }
  };

  const buttonl = document.createElement("button");
  buttonl.classList.add("scrollLeft");
  buttonl.innerText = "<";
  buttonl.addEventListener("click", next, this);
  block.append(buttonl);

  block.append(ul);


  var changeOrder = function (event) {
    
    var outerdiv = event.target.parentElement.getElementsByClassName("outerdiv")[0];
    var isRight = outerdiv.classList.contains("slide-transition-right");
    
    if(isRight) {
      if(current === num_items) {
          current = 1;
      } else {
          current++;
      }
    } else {
      if(current == 1) {
        current = num_items;
      } else {
        current--;
      }
    }

    let order = 1;

    for( let i = current; i <= num_items; i++) {
        outerdiv.querySelector(".innerdiv[data-position='" + i +"']").style.order = order;
        order++;
    }

    for( let i = 1 ; i < current; i++) {
        outerdiv.querySelector(".innerdiv[data-position='" + i +"']").style.order = order;
        order++;
    }

    outerdiv.classList.remove('slide-transition-right');
    outerdiv.classList.remove('slide-transition-left');
    outerdiv.style.transform = 'translate3d(0px, 0px,0px)'
};

  const button = document.createElement("button");
  button.classList.add("scrollRight");
  button.innerText = ">";
  button.addEventListener("click", next, this);
  block.append(button);

  block.querySelector(".outerdiv").addEventListener("transitionend", (event) => {
    changeOrder(event);
}); 

var blockParent = block.parentElement;
var title =  block.parentElement.parentElement.dataset.title;


var heading = document.createElement("h3");
heading.classList.add("carouselheading")
heading.innerText = title;
blockParent.textContent = '';
blockParent.append(heading);
blockParent.append(block);


}
