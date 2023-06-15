import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  /* change to ul, li */
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

    //current=1;
    ul.append(li);
  });
  current=1;
  ul.querySelectorAll('img').forEach((img) => /*{ 
    var pic = img.closest('picture');
    var div = img.closest('.innerdiv');
    var src = img.src;
    pic.parentNode.removeChild(pic);
    div.style.backgroundImage = "url('"+ img.src +"')";
    
    //.replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  }*/img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);

  var next = function (isRight) {
    document.querySelector(".outerdiv").classList.add('slide-transition');
    if (isRight) {
      document.querySelector(".outerdiv").style.transform = 'translate3d(-50%, 0px,0px)';
    } else {
      document.querySelector(".outerdiv").style.transform = 'translate3d(50%, 0px,0px)';
    }
  };

  var changeOrder = function () {
    if(current === num_items) {
        current = 1;
    } else {
        current++;
    }
  
  
    let order = 1;
    for( let i = current; i <= num_items; i++) {
        document.querySelector(".innerdiv[data-position='" + i +"']").style.order = order;
        order++;
    }

    for( let i = 1 ; i < current; i++) {
        document.querySelector(".innerdiv[data-position='" + i +"']").style.order = order;
        order++;
    }
    document.querySelector(".outerdiv").classList.remove('slide-transition');
    document.querySelector(".outerdiv").style.transform = 'translate3d(0px, 0px,0px)'
};

  const button = document.createElement("button");
  button.classList.add("scrollRight");
  button.innerText = "Right";
  button.addEventListener("click", next, true);
  block.append(button);

  const buttonl = document.createElement("button");
  buttonl.classList.add("scrollLeft");
  buttonl.innerText = "Left";
  buttonl.addEventListener("click", next, true);
  block.append(buttonl);

  document.querySelector(".outerdiv").addEventListener("transitionend", () => {
    changeOrder();
}); 

  

}
