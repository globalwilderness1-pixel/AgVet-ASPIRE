document.addEventListener('DOMContentLoaded', () => {
    fetch('data/past-papers.json')
        .then(res => res.json())
        .then(papers => {
            const list = document.getElementById('past-papers-list');
            papers.forEach(p => {
                const div = document.createElement('div');
                div.classList.add('paper-item');
                const a = document.createElement('a');
                a.href = '#';
                a.textContent = `${p.subject} - ${p.year}`;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    const viewer = document.getElementById('pdf-viewer');
                    viewer.innerHTML = `<embed src="${p.file}" type="application/pdf">`;
                });
                const download = document.createElement('a');
                download.href = p.file;
                download.download = '';
                download.textContent = ' Download';
                div.appendChild(a);
                div.appendChild(download);
                list.appendChild(div);
            });
        });
});