// eslint-disable-next-line import/no-cycle
import { sampleRUM, createOptimizedPicture } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

var recentUpdates = document.querySelector(".recent-updates");

var innerDivs = recentUpdates.querySelectorAll(".innerdiv");
innerDivs.forEach(function(innerDiv) {
    innerDiv.addEventListener("mouseover", function(event) {
        console.log(event.target.tagName);
        var currentImage = event.target;
        if(event.target.tagName === "H3" || event.target.tagName === "A") {
            currentImage = event.target.parentElement.querySelector("img");
        }
    
        var hero = document.querySelector(".hero");
        var picture = hero.querySelector("picture");
        picture.replaceWith(createOptimizedPicture(currentImage.src, currentImage.alt, false, [{ width: '750' }]));
    });
});

var outerDiv = document.querySelector(".outerdiv");
outerDiv.addEventListener("transitionend", function(event) {
    var innerDiv = outerDiv.querySelector(".innerdiv[data-order='1']");
    var currentImage = innerDiv.querySelector("img");
    var hero = document.querySelector(".hero");
    var picture = hero.querySelector("picture");
    picture.replaceWith(createOptimizedPicture(currentImage.src, currentImage.alt, false, [{ width: '750' }]));
});


