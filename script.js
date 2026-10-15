document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // WhatsApp Channel Lock Logic
    // ---------------------------------------------------------
    const lockModal = document.getElementById('lockModal');
    const followBtn = document.getElementById('followBtn');
    const unlockBtn = document.getElementById('unlockBtn');

    let hasClickedFollow = false;

    if (localStorage.getItem('nawab_channel_unlocked') === 'true') {
        lockModal.style.display = 'none';
    }

    followBtn.addEventListener('click', () => {
        hasClickedFollow = true;
        localStorage.setItem('nawab_clicked_follow', 'true');
    });

    unlockBtn.addEventListener('click', () => {
        if (hasClickedFollow || localStorage.getItem('nawab_clicked_follow') === 'true') {
            localStorage.setItem('nawab_channel_unlocked', 'true');
            lockModal.style.display = 'none';
        } else {
            hasClickedFollow = true;
            localStorage.setItem('nawab_clicked_follow', 'true');
            localStorage.setItem('nawab_channel_unlocked', 'true');
            lockModal.style.display = 'none';
        }
    });

    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const emojiInput = document.getElementById('emojiInput');
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
        const customEmoji = emojiInput.value.trim();
        const secretText = metaTextInput.value.trim();

        if (!selectedFile && !customEmoji) {
            alert('select image or emoji!');
            return;
        }

        if (!secretText) {
            alert('write text!');
            return;
        }
        
        if (selectedFile) {
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
                        const textToCopy = customEmoji ? customEmoji : '🔥';
                        navigator.clipboard.writeText(textToCopy);
                        alert('Emoji copied to clipboard successfully! You can send it now.');
                    };

                    outputSection.scrollIntoView({ behavior: 'smooth' });
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(selectedFile);
        } else if (customEmoji) {
            const canvas = document.createElement('canvas');
            canvas.width = 300;
            canvas.height = 300;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = '120px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(customEmoji, canvas.width / 2, canvas.height / 2);

            const dataUrl = canvas.toDataURL('image/png');

            resultImage.src = dataUrl;
            outputSection.classList.remove('hidden');

            downloadBtn.href = dataUrl;
            downloadBtn.download = `nawab_emoji_secure.png`;

            copyDataBtn.onclick = () => {
                navigator.clipboard.writeText(customEmoji);
                alert('Emoji copied to clipboard successfully! You can send it now.');
            };

            outputSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
