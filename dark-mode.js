// Versão à prova de falhas
function initDarkMode() {
    const toggle = document.querySelector('#dark-mode-toggle');
    const style = document.querySelector('#dark-mode-style');
    
    if (!style) {
        console.error('CSS não encontrado - crie o elemento com ID "dark-mode-style"');
        return;
    }

    if (!toggle) {
        console.error('Botão não encontrado - crie o elemento com ID "dark-mode-toggle"');
        return;
    }

    // Estado inicial
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    style.disabled = savedTheme !== 'dark';
    toggle.innerHTML = style.disabled ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';

    // Toggle function
    toggle.onclick = () => {
        style.disabled = !style.disabled;
        localStorage.setItem('theme', style.disabled ? 'light' : 'dark');
        toggle.innerHTML = style.disabled ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        console.log('Modo escuro:', style.disabled ? 'OFF' : 'ON');
    };
}

// Inicialize quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
    initDarkMode();
}
