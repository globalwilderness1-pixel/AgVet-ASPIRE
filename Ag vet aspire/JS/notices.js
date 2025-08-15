document.addEventListener('DOMContentLoaded', () => {
    fetch('data/notices.json')
        .then(res => res.json())
        .then(notices => {
            notices.sort((a, b) => new Date(b.date) - new Date(a.date)); // Reverse chrono
            const allNotices = document.getElementById('all-notices');
            notices.forEach(notice => {
                allNotices.appendChild(createNoticeItem(notice));
            });
        });
});

function createNoticeItem(notice) {
    const div = document.createElement('div');
    div.classList.add('notice-item');
    div.innerHTML = `
        <h3>${notice.title}</h3>
        <p>Date: ${notice.date}</p>
        <p>${notice.description}</p>
        ${notice.pdf ? `<a href="${notice.pdf}" target="_blank">View PDF</a>` : ''}
    `;
    return div;
}