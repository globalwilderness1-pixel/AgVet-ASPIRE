document.addEventListener('DOMContentLoaded', () => {
    fetch('data/subjects.json')
        .then(res => res.json())
        .then(subjects => {
            // Subjects navigation
            const subjectsList = document.getElementById('subjects-list');
            Object.keys(subjects).forEach(sub => {
                const a = document.createElement('a');
                a.href = `subjects/${sub}.html`;
                a.textContent = sub.charAt(0).toUpperCase() + sub.slice(1);
                subjectsList.appendChild(a);
            });

            // Search bar
            const searchBar = document.getElementById('search-bar');
            const searchResults = document.getElementById('search-results');
            searchBar.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                searchResults.innerHTML = '';
                if (query) {
                    Object.entries(subjects).forEach(([sub, data]) => {
                        if (sub.toLowerCase().includes(query)) {
                            addSearchResult(sub, null);
                        }
                        data.chapters.forEach(chap => {
                            if (chap.toLowerCase().includes(query)) {
                                addSearchResult(sub, chap.toLowerCase());
                            }
                        });
                    });
                }
            });

            function addSearchResult(sub, chap) {
                const div = document.createElement('div');
                const a = document.createElement('a');
                if (chap) {
                    a.href = `chapters/${sub}-${chap}.html`;
                    a.textContent = `${sub} - ${chap.charAt(0).toUpperCase() + chap.slice(1)}`;
                } else {
                    a.href = `subjects/${sub}.html`;
                    a.textContent = sub.charAt(0).toUpperCase() + sub.slice(1);
                }
                div.appendChild(a);
                searchResults.appendChild(div);
            }
        });

    fetch('data/notices.json')
        .then(res => res.json())
        .then(notices => {
            notices.sort((a, b) => new Date(b.date) - new Date(a.date)); // Reverse chrono
            const preview = document.getElementById('notices-preview');
            notices.slice(0, 3).forEach(notice => {
                preview.appendChild(createNoticeItem(notice));
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