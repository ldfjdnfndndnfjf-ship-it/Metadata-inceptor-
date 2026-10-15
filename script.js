document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // WhatsApp Channel Lock Logic
    // ---------------------------------------------------------
    const lockModal = document.getElementById('lockModal');
    const followBtn = document.getElementById('followBtn');
    const unlockBtn = document.getElementById('unlockBtn');

    // Check if already unlocked in browser storage
    if (localStorage.getItem('nawab_channel_unlocked') === 'true') {
        lockModal.classList.add('hidden');
    }

    followBtn.addEventListener('click', () => {
        // Mark that user clicked follow button
        localStorage.setItem('nawab_clicked_follow', 'true');
    });

    unlockBtn.addEventListener('click', () => {
        const hasClickedFollow = localStorage.getItem('nawab_clicked_follow') === 'true';
        
        if (hasClickedFollow || localStorage.getItem('nawab_channel_unlocked') === 'true') {
            localStorage.setItem('nawab_channel_unlocked', 'true');
            lockModal.classList.add('hidden');
        } else {
            alert('1st follow whatsapp Channel!');
            window.open('https://whatsapp.com/channel/0029VbB47ttDDmFNztpnZf2m', '_blank');
            localStorage.setItem('nawab_clicked_follow', 'true');
        }
    });

    // ---------------------------------------------------------
    // Tool Core Logic (Metadata Embedder)
    // ---------------------------------------------------------
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const metaTextInput = document.getElementById('metaTextInput');
    const processBtn = document.getElementById('processBtn');
    const outputSection = document.getElementById('outputSection');
    const resultImage = document.getElementById('resultImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyDataBtn = document.getElementById('copyDataBtn');

    let selectedFile = null;

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            selectedFile = e.target.files[0];
            fileNameDisplay.textContent = `Selected: ${selectedFile.name}`;
        }
    });

    processBtn.addEventListener('click', () => {
        if (!selectedFile) {
            alert('1st select emoji or picture!');
            return;
        }

        const secretText = metaTextInput.value.trim();
        if (!secretText) {
            alert('Write Your Text for Hide in background !');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const dataUrl = canvas.toDataURL('image/png');

                resultImage.src = dataUrl;
                outputSection.classList.remove('hidden');

                downloadBtn.href = dataUrl;
                downloadBtn.download = `nawab_secure_${selectedFile.name.split('.')[0]}.png`;

                copyDataBtn.onclick = () => {
                    navigator.clipboard.writeText(secretText);
                    alert('Hidden metadata text copied to clipboard successfully!');
                };

                outputSection.scrollIntoView({ behavior: 'smooth' });
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(selectedFile);
    });
});
