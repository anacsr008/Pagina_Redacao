let currentStep = 1;
let chosenTheme = "O papel da literatura na formação do cidadão brasileiro";

function navigateToStep(step) {
    currentStep = step;
    
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById(`view-${step}`).classList.add('active');

    for (let i = 1; i <= 3; i++) {
        const pill = document.getElementById(`pill-step-${i}`);
        if (i === step) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    }

    const headerTitle = document.getElementById('header-title');
    const headerSubtitle = document.getElementById('header-subtitle');
    const headerWordCount = document.getElementById('header-word-count');
    const backBtn = document.getElementById('back-btn');

    if (step === 1) {
        headerTitle.innerText = "Escrever Redação";
        headerSubtitle.innerText = "Escolha um tema para começar";
        headerWordCount.style.display = "none";
        backBtn.style.display = "none";
    } else if (step === 2) {
        headerTitle.innerText = "Redigindo...";
        headerSubtitle.innerText = chosenTheme;
        headerWordCount.style.display = "block";
        backBtn.style.display = "flex";
    } else if (step === 3) {
        headerTitle.innerText = "Correção da IA";
        headerSubtitle.innerText = chosenTheme;
        headerWordCount.style.display = "none";
        backBtn.style.display = "flex";
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
    if (currentStep > 1) {
        navigateToStep(currentStep - 1);
    }
}

function selectTheme(themeName, category, level, xp) {
    chosenTheme = themeName;
    document.getElementById('selected-theme-title').innerText = themeName;
    
    const badge = document.getElementById('theme-level-badge');
    badge.innerText = level;
    badge.className = `badge ${level.toLowerCase() === 'médio' ? 'medio' : level.toLowerCase() === 'difícil' ? 'dificil' : 'facil'}`;
    
    document.getElementById('theme-xp-badge').innerText = `${xp} ao completar`;
    document.getElementById('essay-input').placeholder = `Escreva sua redação sobre "${themeName}"...\n\nDica: Comece com uma introdução que apresente o tema e sua tese. Use pelo menos 2 parágrafos de desenvolvimento e finalize com uma conclusão e proposta de intervenção.`;
    
    navigateToStep(2);
}

function updateEditorStats() {
    const text = document.getElementById('essay-input').value;
    const chars = text.length;
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const minWords = 150;
    
    document.getElementById('word-count-header').innerText = `${words} palavras`;
    document.getElementById('chars-count').innerText = `${chars} chars`;
    document.getElementById('words-count-footer').innerText = `${words} palavras`;

    let percent = Math.min(Math.round((words / minWords) * 100), 100);
    document.getElementById('progress-percent').innerText = `${percent}%`;
    document.getElementById('progress-fill').style.width = `${percent}%`;

    const wordsLeftText = document.getElementById('words-left-text');
    if (words >= minWords) {
        wordsLeftText.innerText = "Meta de palavras atingida! Pronto para enviar.";
        wordsLeftText.style.color = "var(--success)";
    } else {
        const diff = minWords - words;
        wordsLeftText.innerText = `Faltam ${diff} palavras para poder enviar`;
        wordsLeftText.style.color = "var(--text-muted)";
    }
}

function submitEssay() {
    const text = document.getElementById('essay-input').value.trim();
    const words = text === "" ? 0 : text.split(/\s+/).length;
    
    if (words < 5) {
        alert("Escreva um pouco mais antes de enviar para correção.");
        return;
    }
    navigateToStep(3);
}