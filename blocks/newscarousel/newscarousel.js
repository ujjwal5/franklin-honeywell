import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

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
    current=1;
    outerDiv.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
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

    block.append(outerDiv);

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

        var e1 = document.querySelector(".bullet-active");
        e1.classList.remove("bullet-active");
        var ele = document.getElementById(""+current);
        ele.classList.add("bullet-active");

        outerdiv.classList.remove('slide-transition-right');
        outerdiv.classList.remove('slide-transition-left');
        outerdiv.style.transform = 'translate3d(0px, 0px,0px)'
    };

    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");
    const span4 = document.createElement("span");
    const span5 = document.createElement("span");
    span1.classList.add("bullet");
    span1.id = "1";
    span1.classList.add("bullet-active");
    span2.classList.add("bullet");
    span2.id = "2";
    span3.classList.add("bullet");
    span3.id = "3";
    span4.classList.add("bullet");
    span4.id = "4";
    span5.classList.add("bullet");
    span5.id = "5";


    const buttonl = document.createElement("button");
    buttonl.classList.add("scrollLeft");
    buttonl.innerText = "<";
    buttonl.addEventListener("click", next, this);
    block.append(buttonl);

    block.append(span1);
    block.append(span2);
    block.append(span3);
    block.append(span4);
    block.append(span5);

    const button = document.createElement("button");
    button.classList.add("scrollRight");
    button.innerText = ">";
    button.addEventListener("click", next, this);
    block.append(button);

    block.querySelector(".outerdiv").addEventListener("transitionend", (event) => {
        changeOrder(event);
    });

}
