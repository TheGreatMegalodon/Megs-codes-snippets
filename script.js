const popupWindow = document.querySelector('.notification-popup');
function openNotification(icon, text) {
    clearTimeout(this.timeout);
    popupWindow.classList.add("isShowed");
    document.querySelector('.notification-popup-concerned-part').innerHTML = icon;
    document.querySelector('.notification-popup-affilied-text').innerHTML = text; 
    this.timeout = setTimeout(() => closeNotification(), 2500);
}
function closeNotification() {
    clearTimeout(this.timeout);
    popupWindow.classList.remove("isShowed");
}

document.querySelectorAll('.side-icons-elements-image').forEach(item => {
    item.addEventListener('mouseover', (event) => {
        clearTimeout(this.timeouted);
        event.target.parentNode.querySelector('.side-icons-elements-slider').classList.add('showed');
        this.timeouted = setTimeout(() => event.target.parentNode.querySelector('.side-icons-elements-slider').classList.remove('showed'), 1000);
    });
    item.addEventListener('mouseout', (event) => {
        event.target.parentNode.querySelector('.side-icons-elements-slider').classList.remove('showed');
        clearTimeout(this.timeouted);
    });
});

let oldTarget_id;
let oldTerget_id_b;
let veryOldTarget_id; 
let veryOldTarget_id_b;
document.querySelectorAll('.side-icons-elements-image').forEach(item => {
    item.addEventListener('click', (event) => {
        magic(event);
    });
});

function magic(event, id = undefined) {
    const sideWindow = document.querySelector('.side-window');
    const mainScreen = document.querySelector('.main-screen');
        const sideWindowTitle = document.querySelector('.side-window-ttl');
        if (mainScreen.classList.contains('soloOpen')) {
            mainScreen.classList.remove('soloOpen');
        }
        if (sideWindow.classList.contains('showed')) {
            if (oldTarget_id === event.target.parentNode.id||id) {
                sideWindow.classList.remove('showed');
                mainScreen.classList.remove('rcz');
                mainScreen.classList.add('soloOpen');
                oldTarget_id = null;
                oldTerget_id_b = null;
                veryOldTarget_id = event.target.parentNode.id||id;
                veryOldTarget_id_b = event.target.id||id;
            } else {
                mainScreen.classList.remove('soloOpen');
                sideWindow.classList.remove('showed');
                mainScreen.classList.remove('rcz');
                setTimeout(() => {
                    document.getElementById(event.target.id||id).classList.add('showed');
                    if (oldTarget_id_b) document.getElementById(oldTarget_id_b).classList.remove('showed');
                }, 200);
                setTimeout(() => sidemainUpdate(event||id, sideWindow, sideWindowTitle, mainScreen), 400);
            }
        } else {
            if (veryOldTarget_id === event.target.parentNode.id||id) {
                sidemainUpdate(event||id, sideWindow, sideWindowTitle, mainScreen);
                return;
            }
            setTimeout(() => {
                document.getElementById(event.target.id||id).classList.add('showed');
                document.getElementById(veryOldTarget_id_b).classList.remove('showed');
            }, 200);
            setTimeout(() => sidemainUpdate(event||id, sideWindow, sideWindowTitle, mainScreen), 400);
        }
}

const badges = {
    idea: {
        icon: "emoji_objects",
        name: "Original Idea"
    },
    dev: {
        icon: "code",
        name: "Main Developer"
    },
    dev_sup: {
        icon: "accessibility_new",
        name: "Coding Support"
    },
    design: {
        icon: "design_services",
        name: "UI/Obj Designer"
    },
    ships: {
        icon: "construction",
        name: "Ship Builder"
    },
    contrib: {
        icon: "privacy_tip",
        name: "Contributor"
    }
}

function sidemainUpdate(event, sideWindow, sideWindowTitle, mainScreen) {
    sideWindow.classList.add('showed');
    mainScreen.classList.add('rcz');
    sideWindowTitle.innerHTML = event.target.parentNode.id;
    oldTarget_id = event.target.parentNode.id;
    oldTarget_id_b = event.target.id;

    if (event.target.parentNode.id.toLowerCase().replace(/\s+/g, "") === "home") {
        fetch(`pages/home/main.html`)
            .then(response => response.text())
            .then(data => document.querySelector('.main-screen').innerHTML = data);
        fetch(`pages/home/side.html`)
            .then(response => response.text())
            .then(data => document.querySelector('.side-window-content').innerHTML = data);
        return;
    }

    fetch(`pages/${event.target.parentNode.id.toLowerCase().replace(/\s+/g, "")}.json`)
        .then(response => response.json())
        .then(data => {
            const info = data.side;
            document.querySelector('.side-window-content').scrollTo({top: 0, behavior: "smooth"});
            document.querySelector('.side-window-content').innerHTML = `
                ${Object.entries(info).map(([key, value]) => {
                    let cleanKey = key.replace(/\d+/g, "");
                    let tag = cleanKey[0] === '!' ? cleanKey.split('!')[1] : cleanKey;
                    
                    let content = Array.isArray(value) 
                        ? value.map(el => `<${tag}>${el}</${tag}>`).join('') 
                        : `<${tag}>${value}</${tag}>`;
                
                    return key[0] === '!' ? `<div class="${tag}">${content}</div>` : content;
                }).join('')}
                ${data.main.map(el => `
                    <div class="side-window-element" onclick="documentation.manageBack('${el.path.split("/").pop().replace(/\.js$/, "")}'); scrollToEl('${el.path.split("/").pop().replace(/\.js$/, "")}')">
                        <div class="side-window-element-name-logo">${el.logo}</div>${el.name}
                    </div>
                `).join('')}
            `;
        })
        .catch(err => {
            document.querySelector('.side-window-content').innerHTML = `
            <div class="error">
                <div class="text">Wasn't able to fetch the file</div>
                <div class="content">${err}</div>
            </div>`;
        });

    fetch(`pages/${event.target.parentNode.id.toLowerCase().replace(/\s+/g, "")}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.main-screen').scrollTo({top: 0, behavior: "smooth"});
            document.querySelector('.main-screen').innerHTML = data.main.map(info => `
                <div class="mod-card" id="${info.path.split("/").pop().replace(/\.js$/, "")}">
                    <div class="mod-card-head">
                        <div class="mod-card-head-container">
                            <div class="mod-card-head-sub-container">
                                <div class="mod-card-image">
                                    <img src="${info.image}" alt="front-logo">
                                </div>
                                <div class="mod-card-title">
                                    <div class="mod-card-title-name">${info.name}</div>
                                    <div class="mod-card-title-credits">
                                        ${info.credits.map(el => `
                                            <div class="mod-card-title-credit">
                                                <img src="${el.image}" alt="image">
                                                <div class="mod-card-title-credit-name" style="color: ${el.color};">${el.name}</div>
                                                <div class="mod-card-title-credit-badges" style="font-family: 'Material Symbols Rounded'; background-color: ${el.background?el.background:'rgba(140, 150, 156, 0.7)'};">
                                                    ${el.badges.map(bg => {
                                                        let badge = badges[bg];
                                                        return `
                                                        <div class="mod-card-title-credit-badge">${badge.icon}
                                                            <div class="mod-card-title-credit-badge-meaning">${badge.name}</div>
                                                        </div>`
                                                    }).join('')}
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                            <div class="mod-card-buttons">
                                <div class="mod-card-button" 
                                    style="font-family: 'Material Symbols Rounded';"
                                    onclick="closeNotification(); documentation.toggle('${info.path.split("/").pop().replace(/\.js$/, "")}');">
                                    <div class="mod-card-button-image">description</div>
                                    <div class="mod-card-button-name">Guide</div>
                                </div>
                                <div class="mod-card-button"
                                    onclick="closeNotification(); redirectToSite('https://github.com/TheGreatMegalodon/Megs-codes-snippets/blob/main/${info.path}');">
                                    <div class="mod-card-button-image">open_in_new</div>
                                </div>
                                <div class="mod-card-button"
                                    onclick="closeNotification(); downloadCode('${info.path}'); openNotification('hourglass_empty', '${info.path.split("/").pop()}')">
                                    <div class="mod-card-button-image" id="mcbi-download-code-${info.path.split("/").pop()}">download</div>
                                    <div id="progress-bar-download-code-${info.path.split("/").pop()}" class="mod-card-button-progress-bar hidden">0%</div>
                                </div>
                            </div>
                        </div>
                        <div class="mod-card-description">${info.description}</div>
                    </div>
                    <div class="mod-card-body">
                        <div class="mod-card-separation"></div>
                        <div class="mod-card-documentation">
                            ${Object.entries(info.documentation).map(([key, value]) => {
                                let button = '';
                                let cleanKey = key.replace(/\d+/g, "");
                                let tag = cleanKey[0] === '!' ? cleanKey.split('!')[1] : cleanKey;
                                let content = Array.isArray(value) ? value.join('<br>') : value;

                                if (tag == "code") {
                                    let id = `copy-${info.path.split("/").pop().replace(/\.js$/, "")}-${Math.random()*10**10}`;
                                    button = `<div id="${id}" class="copy-button" onclick="copyText('${id}')">content_copy</div>`;
                                }

                                if (tag == "link") {
                                    button = `
                                        <div class="icon" onclick="redirectToSite('${content}')">
                                            <div class="text">${content}</div>
                                            open_in_new
                                        </div>`;
                                    content = '';
                                }
                                
                                return key[0] === '!' 
                                ? `<div class="${tag}">
                                      ${content}
                                      ${button}
                                   </div>`
                                : `<${tag}>${content}</${tag}>`;
                            }).join('')}
                        </div>
                    </div>
                </div>
            `).join('');
        })
        .catch(err => {
            document.querySelector('.main-screen').innerHTML = `
            <div class="error">
                <div class="text">Wasn't able to fetch the file</div>
                <div class="content">${err}</div>
            </div>`;
        });
}

function copyText(id) {
    const parent = document.getElementById(id).parentElement;
    let treatedText = Array.from(parent.childNodes).filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent.trim()).join(' ').trim();
    let formattedText = js_beautify(treatedText, {
        indent_size: 2,
        space_in_empty_paren: true
    });
    navigator.clipboard.writeText(formattedText)
        .then(() => openNotification('content_copy', 'Code copied'))
        .catch(err => console.error('Erreur copie :', err));
}

const documentation = {
    toggle: function(id) {
        const modCard = document.getElementById(id);
        if (modCard) {
            modCard.classList.toggle('opened');
        }
    },

    manageBack: function(id) {
        const container = document.querySelector('.main-screen');
        const modCard = document.getElementById(id);
        if (!container || !modCard) return;

        const openedElements = container.querySelectorAll('.opened');
        [...openedElements].forEach(el => {
            el.classList.remove('opened');
        });

        modCard.classList.add('opened');
    }
};

function prepareMainPage() {
    veryOldTarget_id = "Home";
    veryOldTarget_id_b = "Home-low";
    document.getElementById("Home-low").classList.add('showed');
    document.querySelector('.main-screen').classList.add('rcz');
    document.querySelector('.side-window').classList.add('showed');
    document.querySelector('.side-window-ttl').innerHTML = 'Home';
    fetch(`pages/home/main.html`)
        .then(response => response.text())
        .then(data => document.querySelector('.main-screen').innerHTML = data);
    fetch(`pages/home/side.html`)
        .then(response => response.text())
        .then(data => document.querySelector('.side-window-content').innerHTML = data);
}

function redirectToSite(url) {
    window.open(url, "_blank");
}

function scrollToEl(id) {
    const targetElement = document.getElementById(id);
    if (targetElement) {
        document.querySelector('.main-screen').scrollTo({
            top: targetElement.offsetTop - 8,
            behavior: "smooth"
        });
    }
}

function downloadCode(url) {
    const id = url.split("/").pop();
    fetch(url)
        .then(response => {
            document.getElementById(`mcbi-download-code-${id}`)?.classList.toggle('hidden');
            document.getElementById(`progress-bar-download-code-${id}`)?.classList.toggle('hidden');
            return response;
        })
        .then(response => {
            const contentLength = +response.headers.get('Content-Length');
            const reader = response.body.getReader();
            let receivedLength = 0;
            const chunks = [];

            async function pump() {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        const blob = new Blob(chunks);
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = id;
                        document.body.appendChild(link);
                        link.click();
                        link.remove();

                        return;
                    }

                    chunks.push(value);
                    receivedLength += value.length;

                    const percent = Math.floor((receivedLength / contentLength) * 100);
                    const bar = document.getElementById(`progress-bar-download-code-${id}`);
                    if (bar) {
                        bar.textContent = percent + '%';
                    }
                }
            }
            return pump();
        })
        .then(() => {
            return new Promise(resolve => setTimeout(resolve, 2000));
        })
        .then(() => {
            document.getElementById(`mcbi-download-code-${id}`)?.classList.toggle('hidden');
            document.getElementById(`progress-bar-download-code-${id}`)?.classList.toggle('hidden');
        })
}

prepareMainPage();