var slideIndex = 1;
showSlides(slideIndex);


/**
 * Next/previous controls
 * @param {number} n 
 */
function plusSlides(n) {
  console.log("plusSlides",n)
  showSlides(slideIndex += n);
}

/**
 * Thumbnail image controls
 * @param {number} n 
 */
function currentSlide(n) {
  console.log("currentSlide",n)
  showSlides(slideIndex = n);
}

/**
 * 
 * @param {number} n 
 */
function showSlides(n) {
  console.log("showSlides",n)
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}