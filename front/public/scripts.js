let slideIndex = 0;
const slides = document.querySelectorAll(".slides");

// 첫 번째 슬라이드 활성화
slides[0].classList.add("active");

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slideIndex++;
    if (slideIndex >= slides.length) { slideIndex = 0; }
    slides[slideIndex].classList.add("active");
    setTimeout(showSlides, 3000); // 3초마다 슬라이드 전환
}

showSlides();
