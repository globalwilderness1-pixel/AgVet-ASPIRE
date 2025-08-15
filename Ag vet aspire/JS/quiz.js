document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/').pop().replace('.html', '');
    const [subject, ...chapterParts] = path.split('-');
    const chapter = chapterParts.join('-');

    fetch('../data/subjects.json')
        .then(res => res.json())
        .then(subjects => {
            const data = subjects[subject];
            if (!data) return;

            document.body.classList.add(subject);
            document.getElementById('quiz-title').textContent = `${subject.charAt(0).toUpperCase() + subject.slice(1)} - ${chapter.charAt(0).toUpperCase() + chapter.slice(1)}`;
            document.getElementById('back-to-subject').href = `../subjects/${subject}.html`;

            fetch(`../data/${subject}-${chapter}.json`)
                .then(res => res.json())
                .then(quizData => {
                    const questions = quizData.questions.sort(() => Math.random() - 0.5); // Randomize
                    const form = document.getElementById('quiz-form');
                    questions.forEach((q, i) => {
                        const div = document.createElement('div');
                        div.classList.add('question');
                        div.innerHTML = `<p>${i+1}. ${q.question}</p>`;
                        q.options.forEach((opt, j) => {
                            div.innerHTML += `
                                <label>
                                    <input type="radio" name="q${i}" value="${j}">
                                    ${opt}
                                </label><br>
                            `;
                        });
                        form.appendChild(div);
                    });

                    document.getElementById('submit-quiz').addEventListener('click', () => {
                        let score = 0;
                        questions.forEach((q, i) => {
                            const selected = document.querySelector(`input[name="q${i}"]:checked`);
                            if (selected && parseInt(selected.value) === q.answer) score++;
                        });
                        document.getElementById('quiz-score').textContent = `Score: ${score} / ${questions.length}`;
                    });

                    document.getElementById('try-again').addEventListener('click', () => location.reload());
                });
        });
});