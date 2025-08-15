document.addEventListener('DOMContentLoaded', () => {
    const subject = window.location.pathname.split('/').pop().replace('.html', '');
    fetch('../data/subjects.json')
        .then(res => res.json())
        .then(subjects => {
            const data = subjects[subject];
            if (!data) return;

            document.body.classList.add(subject);
            document.getElementById('subject-title').textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
            document.getElementById('subject-intro').textContent = data.intro;

            const ul = document.getElementById('chapters-ul');
            data.chapters.forEach(chap => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `../chapters/${subject}-${chap.toLowerCase()}.html`;
                a.textContent = chap;
                li.appendChild(a);
                ul.appendChild(li);
            });
        });
});