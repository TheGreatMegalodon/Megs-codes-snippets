/*var audio = {
    slide: {
        woosh: new Audio("sounds/slide/sound-Woosh1.mp3"),
    },
    background: {
        playlist: new Audio("sounds/background/sound-Background2.mp3"),
    },
    warning: {
        tilt: new Audio("sounds/warning/sound-Warning1.mp3"),
    }
};

//onclick="playBackgroundMusic()"
function playBackgroundMusic() {
    audio.background.playlist.currentTime = 0;
    audio.background.playlist.volume = 0.05;
    audio.background.playlist.play();
    audio.background.playlist.addEventListener("ended", function() {
        playBackgroundMusic();
    });
}

function playWooshSound() {
    setTimeout(() => {
        const track = audio.slide.woosh;
        track.volume = 0.35;
        track.play();
    }, 200);
}

function playWarningSound() {
    const track = audio.warning.tilt;
    track.volume = 0.01;
    track.play();
}*/

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
        event.target.parentNode.querySelector('.side-icons-elements-slider').classList.add('showed');
    });
    item.addEventListener('mouseout', (event) => {
        event.target.parentNode.querySelector('.side-icons-elements-slider').classList.remove('showed');
    });
});

let oldTarget_id;
let oldTerget_id_b;
let veryOldTarget_id; 
let veryOldTarget_id_b;
document.querySelectorAll('.side-icons-elements-image').forEach(item => {
    item.addEventListener('click', (event) => {
        magic(event)
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
                    document.getElementById(oldTarget_id_b).classList.remove('showed');
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

function sidemainUpdate(event, sideWindow, sideWindowTitle, mainScreen) {
    sideWindow.classList.add('showed');
    mainScreen.classList.add('rcz');
    sideWindowTitle.innerHTML = event.target.parentNode.id;
    oldTarget_id = event.target.parentNode.id;
    oldTarget_id_b = event.target.id;
    fetch(`pages/${event.target.parentNode.id.toLowerCase().replace(/\s+/g, "")}/sideWindow.html`)
        .then(response => response.text())
        .then(data => {
            document.querySelector('.side-window-content').innerHTML = data;
        });
    fetch(`pages/${event.target.parentNode.id.toLowerCase().replace(/\s+/g, "")}/mainScreen.html`)
        .then(response => response.text())
        .then(data => {
            document.querySelector('.main-screen').innerHTML = data;
        });
}

const documentation = {
    toggle: function(id) {
        const modCard = document.getElementById(id);
        modCard.classList.toggle('opened');
    },
    manageBack: function(id) {
        const container = document.querySelector('.main-screen');
        const modCard = document.getElementById(id);
        if (modCard.classList.contains('opened')) {
            return;
        }
        const openedElement = container.querySelector('.opened');
        if (openedElement && openedElement !== modCard) {
            openedElement.classList.remove('opened');
        }
        modCard.classList.toggle('opened');
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function prepareMainPage() {
    veryOldTarget_id = "Home";
    veryOldTarget_id_b = "Home-low";
    document.getElementById("Home-low").classList.add('showed');
    document.querySelector('.main-screen').classList.add('soloOpen');
    fetch(`pages/home/mainScreen.html`)
        .then(response => response.text())
        .then(data => {
            document.querySelector('.main-screen').innerHTML = data;
        });
}

function redirectToSite(url) {
    window.open(url, "_blank");
}

function scrollToEl(id) {
    const targetElement = document.getElementById(id);
    if (targetElement) {
        document.querySelector('.main-screen').scrollTo({
            top: targetElement.offsetTop - 10,
            behavior: "smooth"
        });
    }
}

function downloadCode(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.blob();  // On récupère le fichier en blob
        })
        .then(blob => {
            const downloadFile = document.createElement("a");
            const objectURL = URL.createObjectURL(blob);
            downloadFile.href = objectURL;
            downloadFile.download = `megs-snippets_${url.split("/").pop()}`;
            document.body.appendChild(downloadFile);
            downloadFile.click();
            document.body.removeChild(downloadFile);
            URL.revokeObjectURL(objectURL);
        })
        .catch(error => {
            console.error("Erreur lors du téléchargement :", error);
        });
}

prepareMainPage();