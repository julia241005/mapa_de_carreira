document.addEventListener('DOMContentLoaded', () => {
  // Timeline
  const timelineItems = document.querySelectorAll('.resume-timeline-item');
  function showTimelineItems() {
    timelineItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if(rect.top < window.innerHeight - 50) {
        item.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', showTimelineItems);
  showTimelineItems();

  // Barra de progresso
  const progressBar = document.getElementById('progress-bar');
  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }
  window.addEventListener('scroll', updateProgressBar);
  updateProgressBar();
});
// Espera o HTML carregar
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o botão de download do CV
    const downloadBtn = document.getElementById('download-cv');

    // Função para criar toast profissional
    function showToast(message) {
        // Cria o elemento do toast
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.padding = '15px 20px';
        toast.style.backgroundColor = '#4f46e5'; // roxo profissional
        toast.style.color = '#fff';
        toast.style.fontFamily = 'Roboto, sans-serif';
        toast.style.fontSize = '0.95rem';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.style.zIndex = '10000';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s ease';

        document.body.appendChild(toast);

        // Mostra o toast
        setTimeout(() => { toast.style.opacity = '1'; }, 100);

        // Esconde e remove após 3 segundos
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => { toast.remove(); }, 400);
        }, 3000);
    }

    // Adiciona o evento de clique
    downloadBtn.addEventListener('click', () => {
        showToast('Seu download do CV foi iniciado com sucesso. Obrigada pelo interesse em conhecer meu perfil!');
    });
});
