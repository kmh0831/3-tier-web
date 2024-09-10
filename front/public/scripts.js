// 슬라이드 쇼 기능
let slideIndex = 0;
const slides = document.querySelectorAll(".slides");

if (slides.length > 0) {
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
}

// 휠 스크롤로 페이지 이동
window.addEventListener("wheel", function(event) {
    const delta = event.deltaY || event.wheelDelta;
    if (delta) {
        window.scrollBy({
            top: delta,
            behavior: 'auto'
        });
    }
});

// 모달 관련 코드
document.addEventListener('DOMContentLoaded', () => {
    const movieModal = document.getElementById('movie-modal');
    const closeMovieBtn = document.querySelector('.close');

    // 모달 표시 설정
    if (movieModal && closeMovieBtn) {
        // 모달 닫기 버튼 클릭 시 모달 닫기
        closeMovieBtn.addEventListener('click', () => {
            movieModal.style.display = 'none';
            document.getElementById('movie-trailer').src = ''; // 비디오 멈춤
        });

        // 모달 표시 함수 (화면 중앙에 위치하도록)
        const openModal = () => {
            movieModal.style.display = 'block';
            movieModal.style.position = 'fixed';
            movieModal.style.top = '50%';
            movieModal.style.left = '50%';
            movieModal.style.transform = 'translate(-50%, -50%)';
            movieModal.style.width = '660px';
            movieModal.style.height = '750px';
            movieModal.style.zIndex = '1000'; // 다른 요소들 위에 표시
            movieModal.style.backgroundColor = '#2a2c30'; // 모달 배경색
        };

        // 모달 열기 이벤트 (예: 포스터 클릭 시)
        const posterElements = document.querySelectorAll('.movie-item');
        posterElements.forEach((poster) => {
            poster.addEventListener('click', openModal);
        });
    }

    // 로그인 상태 확인 후 로그인 모달 표시
    const token = localStorage.getItem('token');
    if (!token) {
        const loginModal = document.getElementById('login-modal');
        if (loginModal) {
            loginModal.style.display = 'block';
        }
    } else {
        if (typeof fetchMovies === 'function') {
            fetchMovies();
        }
        const loginModal = document.getElementById('login-modal');
        if (loginModal) {
            loginModal.style.display = 'none';
        }
    }

    // 로그인 처리
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        fetch(`${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_PORT}/api/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                document.getElementById('login-modal').style.display = 'none';
                if (typeof fetchMovies === 'function') {
                    fetchMovies();
                }
            } else {
                alert('로그인 실패');
            }
        })
        .catch(err => console.error("로그인 요청 중 오류 발생:", err));
    });
});
