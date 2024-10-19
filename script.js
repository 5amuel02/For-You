    document.getElementById('start-btn').addEventListener('click', startAnimation);

    function startAnimation() {
        const audio = document.getElementById("birthday-audio");
        audio.play();
        const message = document.getElementById("birthday-message");
        const cake = document.getElementById("birthday-cake");
        const startButton = document.getElementById("start-btn"); // Ambil elemen tombol
        const hoverMessage = document.getElementById("hover-message");
        const cakebutton = document.getElementById('cake-button')

        // Sembunyikan tombol setelah ditekan
        startButton.style.display = "none";
        cakebutton.style.display = "none";
         // Menyembunyikan tombol
        cake.style.display = "block"; // Tampilkan gambar kue setelah tombol ditekan

        // Kata-kata ulang tahun yang muncul satu per satu
        const words = ["happy", "birthday", "Gloria",".", "May", "you", "always", "be", "happy", "from", "someone", "you", "have", "never", "meet", "😁"];

        // GSAP animasi teks
        gsap.fromTo(
            message, 
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.inOut", onComplete: animateText }
        );

        function animateText() {
            let tl = gsap.timeline();
            message.innerHTML = "";

            const shadows = [
                "2px 2px 5px rgba(255, 0, 0, 0.5)",  // Merah
                "2px 2px 5px rgba(0, 255, 0, 0.5)",  // Hijau
                "2px 2px 5px rgba(0, 0, 255, 0.5)",  // Biru
                "2px 2px 5px rgba(255, 255, 0, 0.5)", // Kuning
                "2px 2px 5px rgba(255, 0, 255, 0.5)", // Magenta
                "2px 2px 5px rgba(0, 255, 255, 0.5)", // Cyan
                "2px 2px 5px rgba(255, 165, 0, 0.5)", // Orange
                "2px 2px 5px rgba(128, 0, 128, 0.5)", // Ungu
                "2px 2px 5px rgba(255, 20, 147, 0.5)", // Deep Pink
                "2px 2px 5px rgba(0, 0, 0, 0.5)"      // Hitam
            ];

            words.forEach((word, i) => {
                let span = document.createElement("span");
                span.textContent = word + " ";
                message.appendChild(span);

                // Mengatur gaya khusus untuk kata "Gloria"
                if (word === "Gloria") {
                    gsap.fromTo(span, 
                        { opacity: 0, y: 50, scale: 0.5, rotation: 360, color: "gold" }, 
                        { 
                            opacity: 1, 
                            y: 0, 
                            scale: 1.5, 
                            rotation: 0, 
                            duration: 1, 
                            ease: "back.out(2)", 
                            delay: i * 0.4,
                            onComplete: () => gsap.to(span, { textShadow: "2px 2px 10px rgba(255, 215, 0, 0.7)" }) // Bayangan emas
                        }
                    );
                } else {
                    // Mengatur warna bayangan teks yang berbeda untuk kata lainnya
                    const shadow = shadows[i % shadows.length]; // Mengulang warna bayangan jika lebih banyak kata
                    gsap.fromTo(span, 
                        { opacity: 0, y: 50 }, 
                        { 
                            opacity: 1, 
                            y: 0, 
                            duration: 0.8, 
                            ease: "back.out(2)", 
                            delay: i * 0.4,
                            onComplete: () => gsap.to(span, { textShadow: shadow }) // Menerapkan bayangan setelah kata muncul
                        }
                    );
                }

                // Setelah semua kata ditambahkan, tampilkan gambar kue dengan efek fade
                if (i === words.length - 1) {
                    tl.to(cake, { opacity: 0, duration: 0 }); // Set opacity 0 di awal
                    tl.to(cake, { opacity: 1, duration: 5, ease: "power2.inOut" }); // Fade in gambar kue
                }
            });
        }

        // Animasi balon dengan GSAP
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach((balloon, i) => {
            gsap.fromTo(balloon, 
                { opacity: 0, y: 500 }, // Mulai dari bawah layar
                { opacity: 1, y: -600, duration: 5 + i, ease: "power1.out", repeat: -1, yoyo: true } // Bergerak ke atas, lalu turun
            );
        });
        

    }

    // Efek hover pada gambar kue
    const birthdayCake = document.getElementById('birthday-cake');
    
    birthdayCake.addEventListener('mouseenter', () => {
        hoverMessage.style.display = 'block'; // Tampilkan pesan
    });

    birthdayCake.addEventListener('mouseleave', () => {
        hoverMessage.style.display = 'none'; // Sembunyikan pesan
    });

    birthdayCake.addEventListener('mousemove', (e) => {
        // Atur posisi pesan di dekat kursor
        hoverMessage.style.left = e.pageX + 10 + 'px'; // 10px dari kiri kursor
        hoverMessage.style.top = e.pageY + 10 + 'px'; // 10px dari atas kursor
    });