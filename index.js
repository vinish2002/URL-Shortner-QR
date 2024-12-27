async function shortenUrl() {
    const urlInput = document.getElementById('urlInput').value;
    if (!urlInput) {
        openPopup();
        return;
    }

    try {
        const response = await fetch(`https://api.tinyurl.com/create?api_token=UEnvJWSDfSWDKJVE7GtstiSOleQ5wYYp3S5312cHgS34NR7ZogiInItQ2WTa`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlInput })
        });

        const data = await response.json();
        const shortenedUrl = data.data.tiny_url;

        // Generate QR code URL-----------------------------------------------------
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(shortenedUrl)}&size=100x100`;

        // Display the result-------------------------------------------------------
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <a href="${shortenedUrl}" target="_blank">${shortenedUrl}</a>
            <img src="${qrCodeUrl}" alt="QR code for the shortened URL">
            <button class="copy-btn" onclick="copyToClipboard('${shortenedUrl}')">Copy URL</button>
            <button class="download-btn" onclick="downloadQRCode('${qrCodeUrl}')">Download QR Code</button>
        `;
    } catch (error) {
        console.error('Error shortening URL:', error);
        alert('Failed to shorten the URL. Please try again.');
    }
}

//Error Pop-Up ----------------------------------------------------------------------
function openPopup() {
    const popup = document.getElementById('alertPopup');
    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('alertPopup');
    popup.style.display = 'none';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('URL copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy URL:', err);
        alert('Failed to copy URL. Please try again.');
    });
}

//QR Code Download Option ------------------------------------------------------------
function downloadQRCode(qrCodeUrl) {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}