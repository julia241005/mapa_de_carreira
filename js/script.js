document.addEventListener('DOMContentLoaded', () => {
    // ---------------- Timeline ----------------
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

    // ---------------- Barra de progresso ----------------
    const progressBar = document.getElementById('progress-bar');
    function updateProgressBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar();

    // ---------------- Badges interativas ----------------
    const badges = document.querySelectorAll(".badge, .badge-light");
    badges.forEach(badge => {
        badge.addEventListener("mouseenter", () => {
            badge.style.transform = "scale(1.07)";
            badge.style.boxShadow = "0 0 12px #8b5cf6";
            badge.style.backgroundColor = "#6d28d9";
            badge.style.color = "#fff";
        });
        badge.addEventListener("mouseleave", () => {
            badge.style.transform = "scale(1)";
            badge.style.boxShadow = "none";
            if (badge.classList.contains("badge-light")) {
                badge.style.backgroundColor = "#e5e7eb";
                badge.style.color = "#4f46e5";
            } else {
                badge.style.backgroundColor = "#6b7280";
                badge.style.color = "#fff";
            }
        });
    });

    // ---------------- Toast animado ----------------
    const downloadBtn = document.getElementById('download-cv');
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.padding = '15px 20px';
        toast.style.background = 'linear-gradient(270deg, #6d28d9, #9333ea, #6742d8ff)';
        toast.style.backgroundSize = '600% 600%';
        toast.style.color = '#fff';
        toast.style.fontFamily = 'Roboto, sans-serif';
        toast.style.fontSize = '0.95rem';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s ease';
        toast.style.zIndex = '10000';

        document.body.appendChild(toast);
        setTimeout(() => toast.style.opacity = '1', 100);

        // Animação do fundo
        let bgPos = 0;
        const interval = setInterval(() => {
            bgPos += 1;
            toast.style.backgroundPosition = `${bgPos}% 0%`;
        }, 50);

        // desaparece depois de 6s
        setTimeout(() => {
            toast.style.opacity = '0';
            clearInterval(interval);
            setTimeout(() => toast.remove(), 400);
        }, 6000);
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            showToast('Seu download do CV foi iniciado com sucesso. Obrigada pelo interesse em conhecer meu perfil!');
        });
    }

    // ---------------- Fundo tecnológico animado ----------------
    const canvas = document.createElement('canvas');
    canvas.id = 'tech-bg';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none'; // não interfere no clique
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const numDots = 60;
    const dots = [];
    for (let i = 0; i < numDots; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: 2 + Math.random() * 2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // desenha pontos
        dots.forEach(dot => {
            dot.x += dot.vx;
            dot.y += dot.vy;
            if(dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
            if(dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI*2);
            ctx.fillStyle = '#8b5cf6';
            ctx.fill();
        });

        // conecta pontos próximos
        for(let i = 0; i < numDots; i++) {
            for(let j = i + 1; j < numDots; j++) {
                const dx = dots[i].x - dots[j].x;
                const dy = dots[i].y - dots[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if(dist < 120){
                    ctx.beginPath();
                    ctx.moveTo(dots[i].x, dots[i].y);
                    ctx.lineTo(dots[j].x, dots[j].y);
                    ctx.strokeStyle = `rgba(139,92,246,${1 - dist/120})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }
    animate();
});
