export default function decorate(block) {



  const outerDiv = document.createElement('div');
  outerDiv.classList.add("outerdiv");
  var num_items = block.children.length;
  var current = 1;


  [...block.children].forEach((row) => {
    const innerDiv = document.createElement('div');
    innerDiv.classList.add("innerdiv");
    innerDiv.innerHTML = row.innerHTML;
    innerDiv.style.order = current;
    innerDiv.dataset.position = current;
    current++;
    [...innerDiv.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    outerDiv.append(innerDiv);
  });

  current=0;
  var isRightClick;
  block.textContent = '';

  const buttonl = document.createElement("button");
  buttonl.classList.add("scrollLeft");
  buttonl.innerText = "Left";
  buttonl.addEventListener("click", function() {
    next(false);
  });
  block.append(buttonl);

  block.append(outerDiv);

  const button = document.createElement("button");
  button.classList.add("scrollRight");
  button.innerText = "Right";
  button.addEventListener("click", function() {
    next(true);
  });
  block.append(button);


  document.querySelector(".outerdiv").addEventListener("transitionend", () => {
    changeOrder();
});

  var next = function (isRight) {
    document.querySelector(".outerdiv").classList.add('slide-transition');
    if (isRight) {
      isRightClick = true;
      document.querySelector(".outerdiv").style.transform = 'translate3d(-25%, 0px,0px)';
    } else {
      isRightClick = false;
      document.querySelector(".outerdiv").style.transform = 'translate3d(25%, 0px,0px)';
    }
  };

  var changeOrder = function () {
    if(isRightClick === undefined) {
      return;
    }
    if(isRightClick) {
      let currItem = ((current%num_items) + num_items)%num_items + 1;
      document.querySelector(".innerdiv[data-position='" + currItem +"']").style.order = current+num_items+1;
      current++;
    } else {
      let currItem = (((current-1)%num_items)+ num_items)%num_items +1;
      document.querySelector(".innerdiv[data-position='" + currItem +"']").style.order = current;
      current--;
    }
    /*
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
    }*/
    document.querySelector(".outerdiv").classList.remove('slide-transition');
    document.querySelector(".outerdiv").style.transform = 'translate3d(0px, 0px,0px)'
  };


}
