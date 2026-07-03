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

let currentPageTitle = null;

document.querySelectorAll('.side-icons-elements-image').forEach(item => {
    item.addEventListener('click', (event) => {
        const iconElement = event.currentTarget;
        const pageTitle = iconElement.parentNode.id;
        
        if (pageTitle === 'Settings') {
            document.getElementById('settingsPopup').classList.toggle('show');
            return;
        }
        
        const popup = document.getElementById('settingsPopup');
        if (popup && popup.classList.contains('show')) {
            popup.classList.remove('show');
        }
        
        navigateTo(pageTitle, iconElement.id);
    });
});

function changeTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

function updateActiveIcon(iconIdAttr) {
    document.querySelectorAll('.side-icons-elements-image.showed').forEach(el => el.classList.remove('showed'));
    if (iconIdAttr) {
        const iconEl = document.getElementById(iconIdAttr);
        if (iconEl) iconEl.classList.add('showed');
    }
}

function closeSideWindowOnMobile() {
    if (window.innerWidth <= 900) {
        const sideWindow = document.querySelector('.side-window');
        const mainScreen = document.querySelector('.main-screen');
        if (sideWindow && sideWindow.classList.contains('showed')) {
            sideWindow.classList.remove('showed');
            if (mainScreen) {
                mainScreen.classList.remove('rcz');
                mainScreen.classList.add('soloOpen');
            }
        }
    }
}
function navigateTo(pageTitle, iconIdAttr) {
    const sideWindow = document.querySelector('.side-window');
    const mainScreen = document.querySelector('.main-screen');
    const sideWindowTitle = document.querySelector('.side-window-ttl');
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    const isSamePage = (currentPageTitle === pageTitle);

    if (sideWindow.classList.contains('showed')) {
        if (isSamePage) {
            // Toggling side window close for current page
            sideWindow.classList.remove('showed');
            mainScreen.classList.remove('rcz');
            mainScreen.classList.add('soloOpen');
            // We do NOT clear currentPageTitle or active icon so the user stays on the current page context
        } else {
            // Navigating to a different page while side window is open
            if (mainScreen.classList.contains('soloOpen')) {
                mainScreen.classList.remove('soloOpen');
            }
            sideWindow.classList.remove('showed');
            mainScreen.classList.remove('rcz');
            setTimeout(() => {
                updateActiveIcon(iconIdAttr);
            }, 200);
            setTimeout(() => {
                loadPageContent(pageTitle, sideWindow, sideWindowTitle, mainScreen);
            }, 400);
        }
    } else {
        if (isSamePage) {
            // We are on the same page and side window is closed
            if (pageTitle === 'Home') return; // For Home, we don't open the side window.
            if (mainScreen.classList.contains('soloOpen')) {
                mainScreen.classList.remove('soloOpen');
            }
            sideWindow.classList.add('showed');
            mainScreen.classList.add('rcz');
            updateActiveIcon(iconIdAttr);
            const pageKey = pageTitle.toLowerCase().replace(/\s+/g, "");
            updateURL(pageKey, null);
        } else {
            // Navigating to a different page while side window is closed
            if (mainScreen.classList.contains('soloOpen')) {
                mainScreen.classList.remove('soloOpen');
            }
            updateActiveIcon(iconIdAttr);
            loadPageContent(pageTitle, sideWindow, sideWindowTitle, mainScreen);
        }
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

function loadPageContent(pageTitle, sideWindow, sideWindowTitle, mainScreen) {
    if (!pageTitle) return;

    currentPageTitle = pageTitle;

    sideWindow.classList.add('showed');
    mainScreen.classList.add('rcz');
    sideWindowTitle.innerHTML = pageTitle;

    const pageKey = pageTitle.toLowerCase().replace(/\s+/g, "");

    if (pageKey === "home") {
        updateURL(pageKey, null);
        sideWindow.classList.remove('showed');
        mainScreen.classList.remove('rcz');
        mainScreen.classList.add('soloOpen');
        mainScreen.style.overflowY = 'hidden';
        
        fetch(`pages/home/main.html`)
            .then(response => response.text())
            .then(data => {
                document.querySelector('.main-screen').innerHTML = data;
                // Bind the new massive home search bar
                const homeSearchInput = document.getElementById('homeSearchInput');
                // Create a local suggestions box for the home search bar
                const homeSuggestionsBox = document.getElementById('homeSearchSuggestions');
                bindSearchInput(homeSearchInput, homeSuggestionsBox);
            });
        fetch(`pages/home/side.html`)
            .then(response => response.text())
            .then(data => document.querySelector('.side-window-content').innerHTML = data);
        return;
    }

    mainScreen.style.overflowY = 'scroll';
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
                    <div class="side-window-element" onclick="documentation.manageBack('${cardId}'); scrollToEl('${cardId}'); updateURL('${pageKey}', '${cardId}'); closeSideWindowOnMobile();">
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
                                <div class="mod-card-button"
                                    onclick="closeNotification(); copyCode('${info.path}');">
                                    <div class="mod-card-button-image">content_copy</div>
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

    let pageTitle = "Home";
    let iconIdAttr = "Home-low";

    if (pageParam && pageParam !== 'home') {
        const originalIcons = document.querySelectorAll('.side-icons-elements-image');
        originalIcons.forEach(icon => {
            if (icon.parentNode && icon.parentNode.id && icon.parentNode.id.toLowerCase().replace(/\s+/g, "") === pageParam.toLowerCase()) {
                pageTitle = icon.parentNode.id;
                iconIdAttr = icon.id;
            }
        });
    }

    const sideWindow = document.querySelector('.side-window');
    const mainScreen = document.querySelector('.main-screen');
    const sideWindowTitle = document.querySelector('.side-window-ttl');

    updateActiveIcon(iconIdAttr);
    loadPageContent(pageTitle, sideWindow, sideWindowTitle, mainScreen);
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

function copyCode(url) {
    openNotification('hourglass_empty', 'Fetching code...');
    fetch(url)
        .then(response => response.text())
        .then(text => {
            navigator.clipboard.writeText(text)
                .then(() => openNotification('content_copy', 'Code copied!'))
                .catch(err => {
                    console.error('Erreur copie :', err);
                    openNotification('error', 'Copy failed');
                });
        })
        .catch(err => {
            console.error('Erreur fetch :', err);
            openNotification('error', 'Fetch failed');
        });
}

let globalSearchIndex = [];

function buildSearchIndex() {
    const categories = [
        { key: 'starblastmods', name: 'Starblast Mods' },
        { key: 'starblastsnippets', name: 'Starblast Snippets' },
        { key: 'starblastconsole', name: 'Starblast Console' },
        { key: 'starblastobjects', name: 'Starblast Objects' }
    ];

    categories.forEach(cat => {
        fetch(`pages/${cat.key}.json`)
            .then(res => res.json())
            .then(data => {
                if (data.main) {
                    data.main.forEach(item => {
                        const cardId = item.path.split("/").pop().replace(/\.js$/, "");
                        globalSearchIndex.push({
                            categoryKey: cat.key,
                            categoryName: cat.name,
                            cardId: cardId,
                            name: item.name,
                            logo: item.logo || '📦',
                            description: item.description || '',
                            creators: item.credits ? item.credits.map(c => c.name) : []
                        });
                    });
                }
            })
            .catch(err => console.log(`Could not load ${cat.key} for search indexing.`));
    });
}

function highlightText(text, term) {
    if (!term) return text;
    // Escape term to prevent regex errors
    const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safeTerm})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

function bindSearchInput(inputEl, suggestionsBoxEl) {
    if (!inputEl || !suggestionsBoxEl) return;
    inputEl.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        suggestionsBoxEl.innerHTML = '';
        
        if (term.length === 0) {
            suggestionsBoxEl.classList.remove('show');
            return;
        }

        const results = globalSearchIndex.filter(item => {
            const matchName = item.name.toLowerCase().includes(term);
            const matchDesc = item.description.toLowerCase().includes(term);
            const matchCreator = item.creators.some(c => c.toLowerCase().includes(term));
            return matchName || matchDesc || matchCreator;
        }).slice(0, 5);

        if (results.length === 0) {
            suggestionsBoxEl.innerHTML = '<div style="padding: 10px; color: var(--text-muted); text-align: center; font-family: Poppins, sans-serif;">No results found</div>';
            suggestionsBoxEl.classList.add('show');
            return;
        }

        results.forEach(res => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'search-suggestion-item';
            itemDiv.onclick = () => {
                inputEl.value = '';
                suggestionsBoxEl.classList.remove('show');
                
                const popup = document.getElementById('settingsPopup');
                if (popup) popup.classList.remove('show');
                
                const iconAttr = res.categoryName + '-low';
                navigateTo(res.categoryName, iconAttr);
                
                setTimeout(() => {
                    if(typeof documentation !== 'undefined' && documentation.manageBack) {
                        documentation.manageBack(res.cardId);
                        if(typeof scrollToEl === 'function') scrollToEl(res.cardId);
                    } else {
                        const card = document.getElementById(res.cardId);
                        if(card) {
                            card.scrollIntoView({behavior: 'smooth'});
                            const btn = card.querySelector('.mod-card-button');
                            if (btn) btn.click();
                        }
                    }
                }, 800);
            };

            const titleHtml = highlightText(res.name, term);
            
            let descSnippet = res.description;
            const matchCreator = res.creators.find(c => c.toLowerCase().includes(term));
            
            if (matchCreator) {
                descSnippet = `Creator: ${matchCreator} - ` + descSnippet.substring(0, 30) + '...';
            } else if (descSnippet.toLowerCase().includes(term)) {
                const idx = descSnippet.toLowerCase().indexOf(term);
                const start = Math.max(0, idx - 15);
                descSnippet = (start > 0 ? '...' : '') + descSnippet.substring(start, idx + term.length + 15) + '...';
            } else {
                descSnippet = descSnippet.substring(0, 40) + '...';
            }
            const descHtml = highlightText(descSnippet, term);

            itemDiv.innerHTML = `
                <div class="search-suggestion-head">
                    <div class="search-suggestion-logo">${res.logo}</div>
                    <div class="search-suggestion-title">${titleHtml}</div>
                </div>
                <div class="search-suggestion-desc">${descHtml}</div>
            `;
            suggestionsBoxEl.appendChild(itemDiv);
        });

        suggestionsBoxEl.classList.add('show');
    });

    document.addEventListener('click', (e) => {
        if (!inputEl.contains(e.target) && !suggestionsBoxEl.contains(e.target)) {
            suggestionsBoxEl.classList.remove('show');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    prepareMainPage();
    buildSearchIndex();

    const searchInput = document.getElementById('searchInput');
    const suggestionsBox = document.getElementById('searchSuggestions');
    bindSearchInput(searchInput, suggestionsBox);

    // Swipe down to close side window on mobile
    const sideWindowSwipeContainer = document.querySelector('.side-window-swipe-container');
    let touchStartY = 0;
    let touchEndY = 0;

    if (sideWindowSwipeContainer) {
        sideWindowSwipeContainer.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        }, {passive: true});

        sideWindowSwipeContainer.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipeDown();
        }, {passive: true});
    }

    function handleSwipeDown() {
        if (touchEndY - touchStartY > 20) { // Swipe down threshold
            const sideWindow = document.querySelector('.side-window');
            const mainScreen = document.querySelector('.main-screen');
            if (sideWindow.classList.contains('showed')) {
                sideWindow.classList.remove('showed');
                mainScreen.classList.remove('rcz');
                mainScreen.classList.add('soloOpen');
                // We do NOT clear the active icon or URL here so context is preserved
            }
        }
    }
});