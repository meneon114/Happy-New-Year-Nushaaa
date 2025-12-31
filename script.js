        // --- DATA & CONFIG ---
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        
        function toRoman(year) {
            const romans = { 2025: "MMXXV", 2026: "MMXXVI", 2027: "MMXXVII" };
            return romans[year] || "MMXX" + (year - 2020); 
        }

        document.getElementById('roman-year').innerText = `-- ${toRoman(nextYear)} --`;

        const letterData = [
            { text: "Kemon acho amar pretty little beibii? Ki kolooo? Ami bhalooo achiii. Tomay chiti likhiii :3", color: "text-slate-300" },
            { text: `Janoo love, New Year’s never meant much to me, kokhonoii na. My life was sooooo boring. Amar kache each and every day same chilo, ajibon dhorei. Plain, empty, boringg. Din niyei care kortam na, ar bochor niye to aro na. ${currentYear-5} ki ar ${currentYear-4} ki, shob e to samee chilo.`, color: "text-slate-300" },
            { text: "This all changed when I met you. My life is not boring anymoree. I don’t feel empty anymoree. My life is not plain white anymoree. ", color: "text-white" },
            { text: "The canvas of my life has been colored with the prettiest color called “Nusaiba”", color: "accent-text font-bold" },
            { text: "Now each day is special to me, because I have you. And each passing year is like a countdown to me. A countdown to the day I marry you.", color: "text-slate-300" },
            { text: `I love you babuuu, I love you soooo much. Thank you for making my life sooo beautiful. I feel sooo blessed when I think about you. I know ${currentYear} hasn’t been the kindest to us. There was soo much pressure, soo many sorrows, soo many ups and downs. Yet, this is going to be a year that I’ll remember for the rest of my life. Because I found you this year—the best gift I could receive ❤`, color: "text-slate-300" },
            { text: `I love you jaan. Best wishes. May ${nextYear} bring nothing but happiness in our lives. May God give you the strength to keep pushing forward. Have faith in yourself babuu, you can do it. Everything will be okay, don’t worry. Let’s make soo many good memories this year. To this year and millennia more.`, color: "text-slate-300" },
            { text: `HAPPY NEW YEAR NUSHAA.`, color: "accent-text text-2xl sm:text-3xl md:text-4xl mt-10 text-center font-bold" }
        ];

        function renderLetter() {
            const container = document.getElementById('letter-content');
            container.innerHTML = ""; 
            letterData.forEach(item => {
                const p = document.createElement('p');
                p.className = `${item.color}`;
                let content = item.text.replace(/❤/g, '<span class="heart">❤</span>');
                p.innerHTML = content;
                container.appendChild(p);
            });
        }

        // --- UI LOGIC ---
        function openLetter() {
            const intro = document.getElementById('intro-ui');
            const main = document.getElementById('main-ui');
            
            intro.style.opacity = '0';
            intro.style.pointerEvents = 'none';
            
            setTimeout(() => {
                intro.style.display = 'none';
                main.classList.add('ui-appear');
            }, 600);
        }

        // --- STARRY NIGHT CANVAS ---
        const starsCanvas = document.getElementById('stars-canvas');
        const sCtx = starsCanvas.getContext('2d');
        let starList = [];
        let shootingStars = [];

        function initStars() {
            const dpr = window.devicePixelRatio || 1;
            starsCanvas.width = window.innerWidth * dpr;
            starsCanvas.height = window.innerHeight * dpr;
            sCtx.scale(dpr, dpr);
            starList = [];
            for (let i = 0; i < (window.innerWidth < 640 ? 150 : 400); i++) {
                starList.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: Math.random() * (window.innerWidth < 640 ? 1 : 1.5),
                    opacity: Math.random(),
                    speed: 0.005 + Math.random() * 0.02
                });
            }
        }

        function createShootingStar() {
            shootingStars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight * 0.5,
                len: Math.random() * 80 + 20,
                speed: Math.random() * 10 + 5,
                opacity: 1
            });
        }

        function animateStars() {
            requestAnimationFrame(animateStars);
            sCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            starList.forEach(star => {
                star.opacity += star.speed;
                if (star.opacity > 1 || star.opacity < 0) star.speed *= -1;
                sCtx.globalAlpha = Math.max(0, star.opacity);
                sCtx.fillStyle = "#fff";
                sCtx.beginPath();
                sCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                sCtx.fill();
            });
            sCtx.globalAlpha = 1;
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                let s = shootingStars[i];
                sCtx.strokeStyle = `rgba(94, 234, 212, ${s.opacity})`;
                sCtx.lineWidth = 2;
                sCtx.beginPath();
                sCtx.moveTo(s.x, s.y);
                sCtx.lineTo(s.x - s.len, s.y + s.len);
                sCtx.stroke();
                s.x += s.speed;
                s.y -= s.speed;
                s.opacity -= 0.02;
                if (s.opacity <= 0) shootingStars.splice(i, 1);
            }
            if (Math.random() < 0.005) createShootingStar();
        }

        // --- 2D FIREWORKS CANVAS ---
        const fwCanvas = document.getElementById('fireworks-canvas');
        const fwCtx = fwCanvas.getContext('2d');
        let particles = [];
        let isShowMode = false;

        function resizeFw() {
            const dpr = window.devicePixelRatio || 1;
            fwCanvas.width = window.innerWidth * dpr;
            fwCanvas.height = window.innerHeight * dpr;
            fwCanvas.style.width = window.innerWidth + 'px';
            fwCanvas.style.height = window.innerHeight + 'px';
            fwCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        class Particle {
            constructor(x, y, color, velocity) {
                this.x = x; this.y = y; this.color = color; this.velocity = velocity;
                this.alpha = 1; this.friction = 0.96; this.gravity = 0.05;
                this.size = Math.random() * 2 + 2;
            }
            draw() {
                fwCtx.globalAlpha = Math.max(0, this.alpha);
                fwCtx.fillStyle = this.color;
                fwCtx.fillRect(Math.floor(this.x), Math.floor(this.y), this.size, this.size);
            }
            update() {
                this.velocity.x *= this.friction;
                this.velocity.y *= this.friction;
                this.velocity.y += this.gravity;
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.alpha *= 0.975; 
            }
        }

        function createFirework(x, y, isHeart = false) {
            const colors = ['#5eead4', '#22d3ee', '#ffffff', '#e2e8f0', '#94a3b8'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const count = isHeart ? 120 : 40;
            if (isHeart) {
                for (let i = 0; i < count; i++) {
                    const t = (i / count) * Math.PI * 2;
                    const hx = 16 * Math.pow(Math.sin(t), 3);
                    const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                    particles.push(new Particle(x, y, '#5eead4', { x: hx * 0.65, y: hy * 0.65 }));
                }
            } else {
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 6 + 2;
                    particles.push(new Particle(x, y, color, { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed }));
                }
            }
        }

        function startTheShow() {
            // Trigger CRT collapse effect (reverse of appear)
            document.getElementById('main-ui').classList.add('ui-fade-out');
            isShowMode = true;
            createFirework(window.innerWidth / 2, window.innerHeight / 2, true);
            for(let i=1; i<15; i++) {
                setTimeout(() => {
                    createFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.5 + 50);
                }, i * 500 + 400);
            }
        }

        function animateFw() {
            requestAnimationFrame(animateFw);
            fwCtx.globalAlpha = 1;
            fwCtx.globalCompositeOperation = 'destination-out';
            fwCtx.fillStyle = 'rgba(0, 0, 0, 0.25)'; 
            fwCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            fwCtx.globalCompositeOperation = 'source-over';
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.update(); p.draw();
                if (p.alpha < 0.01) particles.splice(i, 1);
            }
            if (isShowMode && Math.random() < 0.08) {
                createFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.7);
            }
        }

        window.onload = () => {
            renderLetter();
            initStars();
            animateStars();
            resizeFw();
            animateFw();
            window.addEventListener('resize', () => { 
                initStars();
                resizeFw(); 
            });
        };