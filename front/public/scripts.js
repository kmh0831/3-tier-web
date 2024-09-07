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

// 휠 스크롤로 페이지 이동
window.addEventListener("wheel", function(event) {
    document.documentElement.scrollTop += event.deltaY;
});

// 모달 관련 코드 추가
document.addEventListener('DOMContentLoaded', () => {
    // 모달 요소 가져오기
    const modal = document.getElementById('movie-modal');
    
    // 페이지 로드 시 모달이 보이지 않도록 설정
    modal.style.display = 'none';

    // 영화 데이터를 가져와서 페이지에 표시하는 함수
    fetchMovies();

    // 모달 닫기 버튼에 이벤트 리스너 추가
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closeModal);
});

function closeModal() {
    const modal = document.getElementById('movie-modal');
    modal.style.display = 'none';
    document.getElementById('movie-trailer').src = ''; // 모달을 닫을 때 유튜브 영상도 중지
}

function openModal(movie) {
    const modal = document.getElementById('movie-modal');
    const trailer = document.getElementById('movie-trailer');
    const title = document.getElementById('movie-title');
    const description = document.getElementById('movie-description');

    // 모달에 영화 정보 추가
    trailer.src = movie.trailer_url;  // 유튜브 영상 URL 설정
    title.textContent = movie.title;
    description.textContent = movie.description;

    modal.style.display = 'block';  // 모달을 열기
}
