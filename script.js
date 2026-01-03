function upload() {
    const title = document.getElementById('up-title').value;
    const file = document.getElementById('up-file').files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    
    // Tworzymy link do "osobnej strony" filmu
    const videoLink = `video.html?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

    const card = document.createElement('div');
    card.className = "video-card";
    card.innerHTML = `
        <div onclick="window.location.href='${videoLink}'">
            <video src="${url}"></video>
            <h4>${title}</h4>
        </div>
    `;
    document.getElementById('main-grid').prepend(card);
}
