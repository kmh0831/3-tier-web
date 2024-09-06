let slideIndex = 0;
const slides = document.querySelectorAll(".slides");

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].classList.add("active");
    setTimeout(showSlides, 3000); // 3초마다 슬라이드 전환
}

showSlides();
