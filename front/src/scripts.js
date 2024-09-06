function fetchNewImageUrl(imageKey) {
    fetch(`/api/getPresignedUrl/${imageKey}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('image').src = data.url; // 이미지 갱신
        })
        .catch(error => console.error('Error fetching URL:', error));
}

setInterval(() => {
    fetchNewImageUrl('your-image-key');
}, 1800000); // 30분마다 갱신
