const repoOwner = 'TheGreatMegalodon';
const repoName = 'Megs-codes-snippets';
let githubToken = localStorage.getItem('github_pat') || '';
let currentFileSha = '';
let currentJsonData = null;
let currentSelectedIndex = -1;

// Elements
const loginScreen = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const patInput = document.getElementById('patInput');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const fileSelect = document.getElementById('fileSelect');
const itemsList = document.getElementById('itemsList');
const editorEmpty = document.getElementById('editorEmpty');
const editorForm = document.getElementById('editorForm');
const pushStatus = document.getElementById('pushStatus');

// Form Elements
const itemName = document.getElementById('itemName');
const itemImage = document.getElementById('itemImage');
const itemPath = document.getElementById('itemPath');
const itemLogo = document.getElementById('itemLogo');
const itemDescription = document.getElementById('itemDescription');
const creditsContainer = document.getElementById('creditsContainer');
const documentationContainer = document.getElementById('documentationContainer');

// Init
if (githubToken) {
    showDashboard();
}

// Login
loginBtn.addEventListener('click', () => {
    const token = patInput.value.trim();
    if (token) {
        githubToken = token;
        localStorage.setItem('github_pat', githubToken);
        showDashboard();
    } else {
        loginError.style.display = 'block';
        loginError.innerText = 'Please enter a valid token.';
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('github_pat');
    githubToken = '';
    dashboardScreen.style.display = 'none';
    loginScreen.style.display = 'flex';
});

function showDashboard() {
    loginScreen.style.display = 'none';
    dashboardScreen.style.display = 'flex';
    loadFile(fileSelect.value);
}

fileSelect.addEventListener('change', (e) => {
    loadFile(e.target.value);
});

async function loadFile(filePath) {
    pushStatus.innerText = 'Loading...';
    pushStatus.style.color = 'var(--text-muted)';
    itemsList.innerHTML = '';
    hideEditor();
    
    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
            headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (response.status === 401) {
            throw new Error('Unauthorized. Invalid Token.');
        }
        
        if (!response.ok) {
            throw new Error('Failed to fetch file.');
        }

        const data = await response.json();
        currentFileSha = data.sha;
        
        // Decode base64 UTF-8 safely
        const jsonString = decodeURIComponent(escape(atob(data.content)));
        currentJsonData = JSON.parse(jsonString);
        
        renderItemsList();
        pushStatus.innerText = 'Loaded successfully.';
        pushStatus.style.color = 'var(--leading)';
        
    } catch (err) {
        pushStatus.innerText = err.message;
        pushStatus.style.color = 'var(--accent)';
        if (err.message.includes('Unauthorized')) {
            logoutBtn.click();
        }
    }
}

function renderItemsList() {
    itemsList.innerHTML = '';
    if (!currentJsonData || !currentJsonData.main) return;
    
    currentJsonData.main.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'item-row';
        row.innerHTML = `<span>${item.name || 'Unnamed Item'}</span> <span class="material-symbols-rounded">edit</span>`;
        row.onclick = () => editItem(index);
        itemsList.appendChild(row);
    });
}

function hideEditor() {
    editorEmpty.style.display = 'flex';
    editorForm.style.display = 'none';
    currentSelectedIndex = -1;
    updateActiveRow();
}

function updateActiveRow() {
    document.querySelectorAll('.item-row').forEach((row, idx) => {
        if (idx === currentSelectedIndex) {
            row.classList.add('active');
        } else {
            row.classList.remove('active');
        }
    });
}

document.getElementById('addNewBtn').addEventListener('click', () => {
    if (!currentJsonData) return;
    const newItem = {
        name: "New Item",
        image: "images/front-LOGO.png",
        path: "",
        logo: "a",
        description: "",
        credits: [],
        documentation: {}
    };
    currentJsonData.main.push(newItem);
    renderItemsList();
    editItem(currentJsonData.main.length - 1);
});

function editItem(index) {
    currentSelectedIndex = index;
    updateActiveRow();
    editorEmpty.style.display = 'none';
    editorForm.style.display = 'block';
    
    const item = currentJsonData.main[index];
    
    document.getElementById('formTitle').innerText = `Edit: ${item.name || 'New Item'}`;
    document.getElementById('editIndex').value = index;
    
    itemName.value = item.name || '';
    itemImage.value = item.image || '';
    itemPath.value = item.path || '';
    itemLogo.value = item.logo || '';
    itemDescription.value = item.description || '';
    
    renderCredits(item.credits || []);
    renderDocumentation(item.documentation || {});
}

// Credits Management
function renderCredits(credits) {
    creditsContainer.innerHTML = '';
    credits.forEach((credit, idx) => {
        addCreditElement(credit, idx);
    });
}

document.getElementById('addCreditBtn').addEventListener('click', () => {
    addCreditElement({name: '', image: '', color: '#ffffff', background: '#333333', badges: []}, creditsContainer.children.length);
});

function addCreditElement(credit, idx) {
    const div = document.createElement('div');
    div.className = 'credit-item';
    div.innerHTML = `
        <button class="delete-btn" onclick="this.parentElement.remove()">close</button>
        <div class="credit-grid">
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="cred-name" value="${credit.name || ''}">
            </div>
            <div class="form-group with-upload">
                <label>Image</label>
                <div class="input-upload-row">
                    <input type="text" class="cred-img" id="cred_img_${idx}" value="${credit.image || ''}">
                    <button class="upload-btn" onclick="openUploadModal('cred_img_${idx}', 'images/pfpDiscord/')"><span class="material-symbols-rounded">upload</span></button>
                </div>
            </div>
            <div class="form-group">
                <label>Text Color</label>
                <input type="text" class="cred-color" value="${credit.color || ''}">
            </div>
            <div class="form-group">
                <label>Background</label>
                <input type="text" class="cred-bg" value="${credit.background || ''}">
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label>Badges (comma separated: idea, dev, dev_sup, design, ships, contrib)</label>
                <input type="text" class="cred-badges" value="${(credit.badges || []).join(', ')}">
            </div>
        </div>
    `;
    creditsContainer.appendChild(div);
}

// Documentation Management
function renderDocumentation(docs) {
    documentationContainer.innerHTML = '';
    for (const [key, value] of Object.entries(docs)) {
        addDocElement(key, value);
    }
}

document.getElementById('addDocBtn').addEventListener('click', () => {
    addDocElement('', '');
});

function addDocElement(key, value) {
    const div = document.createElement('div');
    div.className = 'doc-item';
    div.innerHTML = `
        <button class="delete-btn" onclick="this.parentElement.remove()">close</button>
        <div class="doc-grid">
            <div class="form-group">
                <label>Key</label>
                <input type="text" class="doc-key" value="${key}">
            </div>
            <div class="form-group">
                <label>Value</label>
                <input type="text" class="doc-value" value="${value.replace(/"/g, '&quot;')}">
            </div>
        </div>
    `;
    documentationContainer.appendChild(div);
}

// Save Local Item
document.getElementById('saveItemBtn').addEventListener('click', () => {
    if (currentSelectedIndex === -1) return;
    
    const credits = [];
    document.querySelectorAll('.credit-item').forEach(el => {
        credits.push({
            name: el.querySelector('.cred-name').value.trim(),
            image: el.querySelector('.cred-img').value.trim(),
            color: el.querySelector('.cred-color').value.trim(),
            background: el.querySelector('.cred-bg').value.trim(),
            badges: el.querySelector('.cred-badges').value.split(',').map(s => s.trim()).filter(s => s)
        });
    });
    
    const documentation = {};
    document.querySelectorAll('.doc-item').forEach(el => {
        const key = el.querySelector('.doc-key').value.trim();
        const val = el.querySelector('.doc-value').value.trim();
        if (key) documentation[key] = val;
    });
    
    currentJsonData.main[currentSelectedIndex] = {
        name: itemName.value.trim(),
        image: itemImage.value.trim(),
        path: itemPath.value.trim(),
        logo: itemLogo.value.trim(),
        description: itemDescription.value.trim(),
        credits: credits,
        documentation: documentation
    };
    
    renderItemsList();
    updateActiveRow();
    document.getElementById('formTitle').innerText = `Edit: ${currentJsonData.main[currentSelectedIndex].name}`;
    
    pushStatus.innerText = 'Changes saved locally. Dont forget to Push!';
    pushStatus.style.color = 'var(--text)';
});

// Delete Local Item
document.getElementById('deleteItemBtn').addEventListener('click', () => {
    if (currentSelectedIndex === -1) return;
    if (confirm('Are you sure you want to delete this item?')) {
        currentJsonData.main.splice(currentSelectedIndex, 1);
        hideEditor();
        renderItemsList();
        pushStatus.innerText = 'Item deleted locally. Dont forget to Push!';
        pushStatus.style.color = 'var(--text)';
    }
});

// Push to GitHub
document.getElementById('saveToGithubBtn').addEventListener('click', async () => {
    if (!currentJsonData) return;
    
    const btn = document.getElementById('saveToGithubBtn');
    btn.disabled = true;
    pushStatus.innerText = 'Pushing to GitHub...';
    pushStatus.style.color = 'var(--text-muted)';
    
    try {
        // Encode JSON to base64 safely supporting utf-8
        const jsonStr = JSON.stringify(currentJsonData, null, 4);
        const base64Content = btoa(unescape(encodeURIComponent(jsonStr)));
        
        const filePath = fileSelect.value;
        
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Update ${filePath} via Admin Panel`,
                content: base64Content,
                sha: currentFileSha
            })
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Failed to push changes.');
        }
        
        currentFileSha = result.content.sha;
        pushStatus.innerText = 'Successfully pushed to GitHub!';
        pushStatus.style.color = 'var(--leading)';
        
    } catch (err) {
        pushStatus.innerText = err.message;
        pushStatus.style.color = 'var(--accent)';
    } finally {
        btn.disabled = false;
    }
});

// File Upload Logic
const uploadModal = document.getElementById('uploadModal');
const fileUploadInput = document.getElementById('fileUploadInput');
const fileUploadPath = document.getElementById('fileUploadPath');
const cancelUploadBtn = document.getElementById('cancelUploadBtn');
const confirmUploadBtn = document.getElementById('confirmUploadBtn');
const uploadStatusMsg = document.getElementById('uploadStatusMsg');
let currentUploadTargetId = '';

function openUploadModal(targetId, defaultPrefix) {
    currentUploadTargetId = targetId;
    fileUploadInput.value = '';
    fileUploadPath.value = defaultPrefix;
    uploadStatusMsg.innerText = '';
    uploadModal.style.display = 'flex';
}

fileUploadInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const prefix = fileUploadPath.value.split('/')[0] + '/';
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        fileUploadPath.value = prefix + sanitizedName;
    }
});

cancelUploadBtn.addEventListener('click', () => {
    uploadModal.style.display = 'none';
});

confirmUploadBtn.addEventListener('click', async () => {
    const file = fileUploadInput.files[0];
    const targetPath = fileUploadPath.value.trim();
    
    if (!file) {
        uploadStatusMsg.innerText = 'Please select a file first.';
        uploadStatusMsg.style.color = 'var(--accent)';
        return;
    }
    
    if (!targetPath) {
        uploadStatusMsg.innerText = 'Destination path is required.';
        uploadStatusMsg.style.color = 'var(--accent)';
        return;
    }
    
    confirmUploadBtn.disabled = true;
    uploadStatusMsg.innerText = 'Checking existing file...';
    uploadStatusMsg.style.color = 'var(--text-muted)';
    
    try {
        let fileSha = null;
        
        // 1. Check if file already exists to get its SHA
        try {
            const checkRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${targetPath}`, {
                headers: {
                    'Authorization': `token ${githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            if (checkRes.ok) {
                const checkData = await checkRes.json();
                fileSha = checkData.sha;
            }
        } catch (e) {
            // File might not exist, which is fine
        }
        
        uploadStatusMsg.innerText = 'Reading and uploading...';
        
        // 2. Read file as base64
        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64Data = event.target.result.split(',')[1];
            
            // 3. Upload to GitHub
            const bodyData = {
                message: `Upload ${targetPath} via Admin Panel`,
                content: base64Data
            };
            if (fileSha) bodyData.sha = fileSha;
            
            const putRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${targetPath}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${githubToken}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });
            
            if (!putRes.ok) {
                const errorData = await putRes.json();
                throw new Error(errorData.message || 'Upload failed');
            }
            
            // 4. Update the input field and close modal
            const targetInput = document.getElementById(currentUploadTargetId);
            if (targetInput) {
                targetInput.value = targetPath;
            }
            uploadModal.style.display = 'none';
        };
        
        reader.onerror = () => {
            throw new Error('Failed to read local file.');
        };
        
        reader.readAsDataURL(file);
        
    } catch (err) {
        uploadStatusMsg.innerText = err.message;
        uploadStatusMsg.style.color = 'var(--accent)';
        confirmUploadBtn.disabled = false;
    }
});
