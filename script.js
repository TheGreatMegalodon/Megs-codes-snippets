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
        if (oldTarget_id === (event ? event.target.parentNode.id : null) || id) {
            sideWindow.classList.remove('showed');
            mainScreen.classList.remove('rcz');
            mainScreen.classList.add('soloOpen');
            oldTarget_id = null;
            oldTerget_id_b = null;
            veryOldTarget_id = event ? event.target.parentNode.id : id;
            veryOldTarget_id_b = event ? event.target.id : id;
            updateURL(null, null);
        } else {
            mainScreen.classList.remove('soloOpen');
            sideWindow.classList.remove('showed');
            mainScreen.classList.remove('rcz');
            setTimeout(() => {
                const targetId = event ? event.target.id : id;
                if (targetId) document.getElementById(targetId).classList.add('showed');
                if (oldTerget_id_b) document.getElementById(oldTerget_id_b).classList.remove('showed');
            }, 200);
            setTimeout(() => sidemainUpdate(event || id, sideWindow, sideWindowTitle, mainScreen), 400);
        }
    } else {
        if (veryOldTarget_id === (event ? event.target.parentNode.id : null) || id) {
            sidemainUpdate(event || id, sideWindow, sideWindowTitle, mainScreen);
            return;
        }
        setTimeout(() => {
            const targetId = event ? event.target.id : id;
            if (targetId) document.getElementById(targetId).classList.add('showed');
            if (veryOldTarget_id_b) document.getElementById(veryOldTarget_id_b).classList.remove('showed');
        }, 200);
        setTimeout(() => sidemainUpdate(event || id, sideWindow, sideWindowTitle, mainScreen), 400);
    }
}

const badges = {
    idea: { icon: "emoji_objects", name: "Original Idea" },
    dev: { icon: "code", name: "Main Developer" },
    dev_sup: { icon: "accessibility_new", name: "Coding Support" },
    design: { icon: "design_services", name: "UI/Obj Designer" },
    ships: { icon: "construction", name: "Ship Builder" },
    contrib: { icon: "privacy_tip", name: "Contributor" }
};

function updateURL(category, cardId) {
    const url = new URL(window.location.href);
    if (category) {
        url.searchParams.set('page', category.toLowerCase().replace(/\s+/g, ""));
    } else {
        url.searchParams.delete('page');
    }
    if (cardId) {
        url.searchParams.set('card', cardId);
    } else {
        url.searchParams.delete('card');
    }
    window.history.pushState({}, '', url);
}

function sidemainUpdate(event, sideWindow, sideWindowTitle, mainScreen) {
    let targetParam;
    let targetIdAttr;
    
    if (event && event.target) {
        targetParam = event.target.parentNode.id;
        targetIdAttr = event.target.id;
    } else {
        targetParam = event;
        targetIdAttr = event ? event.toLowerCase().replace(/\s+/g, "") + "-low" : null;
    }

    if (!targetParam) return;

    sideWindow.classList.add('showed');
    mainScreen.classList.add('rcz');
    sideWindowTitle.innerHTML = targetParam;
    oldTarget_id = targetParam;
    oldTerget_id_b = targetIdAttr;

    const pageKey = targetParam.toLowerCase().replace(/\s+/g, "");

    if (pageKey === "home") {
        updateURL(pageKey, null);
        fetch(`pages/home/main.html`)
            .then(response => response.text())
            .then(data => document.querySelector('.main-screen').innerHTML = data);
        fetch(`pages/home/side.html`)
            .then(response => response.text())
            .then(data => document.querySelector('.side-window-content').innerHTML = data);
        return;
    }

    fetch(`pages/${pageKey}.json`)
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
                ${data.main.map(el => {
                    const cardId = el.path.split("/").pop().replace(/\.js$/, "");
                    return `
                    <div class="side-window-element" onclick="documentation.manageBack('${cardId}'); scrollToEl('${cardId}'); updateURL('${pageKey}', '${cardId}');">
                        <div class="side-window-element-name-logo">${el.logo}</div>${el.name}
                    </div>`;
                }).join('')}
            `;
        })
        .catch(err => {
            document.querySelector('.side-window-content').innerHTML = `
            <div class="error">
                <div class="text">Wasn't able to fetch the file</div>
                <div class="content">${err}</div>
            </div>`;
        });

    fetch(`pages/${pageKey}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.main-screen').scrollTo({top: 0, behavior: "smooth"});
            document.querySelector('.main-screen').innerHTML = data.main.map(info => {
                const cardId = info.path.split("/").pop().replace(/\.js$/, "");
                return `
                <div class="mod-card" id="${cardId}">
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
                                    onclick="closeNotification(); documentation.toggle('${cardId}'); updateURL('${pageKey}', '${cardId}');">
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
                                    let id = `copy-${cardId}-${Math.random()*10**10}`;
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
                                ? `<div class="${tag}">${content}${button}</div>`
                                : `<high>${content}</high>`;
                            }).join('')}
                        </div>
                    </div>
                </div>`;
            }).join('');

            const urlParams = new URLSearchParams(window.location.search);
            const cardParam = urlParams.get('card');
            if (cardParam) {
                setTimeout(() => {
                    documentation.manageBack(cardParam);
                    scrollToEl(cardParam);
                    updateURL(pageKey, cardParam);
                }, 300);
            } else {
                updateURL(pageKey, null);
            }
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
            const urlParams = new URLSearchParams(window.location.search);
            const pageParam = urlParams.get('page');
            if (modCard.classList.contains('opened')) {
                updateURL(pageParam, id);
            } else {
                updateURL(pageParam, null);
            }
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
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');

    if (pageParam && pageParam !== 'home') {
        veryOldTarget_id = pageParam;
        
        let targetIdLow = "";
        const originalIcons = document.querySelectorAll('.side-icons-elements-image');
        originalIcons.forEach(icon => {
            if (icon.parentNode && icon.parentNode.id && icon.parentNode.id.toLowerCase().replace(/\s+/g, "") === pageParam.toLowerCase()) {
                targetIdLow = icon.id;
            }
        });

        if (!targetIdLow) {
            targetIdLow = pageParam + "-low";
        }
        veryOldTarget_id_b = targetIdLow;
        
        const targetBtn = document.getElementById(targetIdLow);
        if (targetBtn) {
            targetBtn.classList.add('showed');
        }
        
        const sideWindow = document.querySelector('.side-window');
        const mainScreen = document.querySelector('.main-screen');
        const sideWindowTitle = document.querySelector('.side-window-ttl');
        
        sidemainUpdate(pageParam, sideWindow, sideWindowTitle, mainScreen);
    } else {
        veryOldTarget_id = "Home";
        veryOldTarget_id_b = "Home-low";
        const homeLowEl = document.getElementById("Home-low");
        if (homeLowEl) homeLowEl.classList.add('showed');
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

document.addEventListener('DOMContentLoaded', () => {
    prepareMainPage();
});