document.addEventListener('DOMContentLoaded', () => {
    
    // --- UI Interactions ---
    
    // Mobile Menu Logic
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const closeMenuBtn = document.getElementById('closeMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(mobileMenu.classList.contains('active')) toggleMenu();
        });
    });

    // Modal Handling
    window.openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    };

    window.closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    };

    // Close modal on outside click
    window.onclick = (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('show');
            setTimeout(() => event.target.style.display = 'none', 300);
        }
    };

    // Search Functionality
    const searchInput = document.getElementById('toolSearch');
    const toolCards = document.querySelectorAll('.tool-card');

    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        toolCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const desc = card.querySelector('p').innerText.toLowerCase();
            if (title.includes(val) || desc.includes(val)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Category Filtering
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            const cat = tag.getAttribute('data-cat');
            
            toolCards.forEach(card => {
                if(cat === 'all' || card.getAttribute('data-cat') === cat) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Tool Logics ---

    // 1. Password Generator
    window.generatePassword = () => {
        const length = document.getElementById('passLength').value;
        const hasNum = document.getElementById('incNumbers').checked;
        const hasSym = document.getElementById('incSymbols').checked;
        
        const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        
        let chars = letters;
        if (hasNum) chars += numbers;
        if (hasSym) chars += symbols;
        
        let pass = '';
        for (let i = 0; i < length; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        document.getElementById('passwordResult').innerText = pass;
    };

    window.updatePassLen = () => {
        document.getElementById('lenValue').innerText = document.getElementById('passLength').value;
    };

    window.copyToClipboard = (id) => {
        const text = document.getElementById(id).innerText;
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        });
    };

    // 2. QR Generator
    window.generateQR = () => {
        const input = document.getElementById('qrInput').value;
        if(!input) return;
        const img = document.getElementById('qrImage');
        // Using Google Chart API for easy QR generation
        img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(input)}`;
        img.style.display = 'block';
    };

    // 3. Word Counter
    window.countWords = () => {
        const text = document.getElementById('wordInput').value;
        const wCount = text.trim() ? text.trim().split(/\s+/).length : 0;
        const cCount = text.length;
        document.getElementById('wCount').innerText = wCount;
        document.getElementById('cCount').innerText = cCount;
    };

    // 4. Color Converter
    window.convertColor = (isText = false) => {
        let hex;
        if(isText) {
            hex = document.getElementById('hexInput').value;
            document.getElementById('colorPicker').value = hex;
        } else {
            hex = document.getElementById('colorPicker').value;
            document.getElementById('hexInput').value = hex;
        }

        // Hex to RGB
        let r = 0, g = 0, b = 0;
        if (hex.length === 7) {
            r = parseInt(hex.slice(1, 3), 16);
            g = parseInt(hex.slice(3, 5), 16);
            b = parseInt(hex.slice(5, 7), 16);
        }
        document.getElementById('rgbResult').innerText = `rgb(${r}, ${g}, ${b})`;
    }

    // 5. Speed Test (Simulation)
    window.runSpeedTest = () => {
        const needle = document.getElementById('speedNeedle');
        const valText = document.getElementById('speedValue');
        let speed = 0;
        let interval = setInterval(() => {
            speed = Math.floor(Math.random() * 100) + 20;
            needle.style.width = speed + '%';
            valText.innerText = speed + ' Mbps';
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            const finalSpeed = Math.floor(Math.random() * 50) + 80;
            needle.style.width = '85%';
            valText.innerText = finalSpeed + ' Mbps';
            needle.style.backgroundColor = '#10b981';
        }, 3000);
    };

    // Initial Calls
    generatePassword(); // Generate a password on load
});