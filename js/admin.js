// ========== ADMIN PANEL JAVASCRIPT ==========

// Default credentials
const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'admin123';

// Sample Data
let placesData = [
    { id: 1, name: 'Sigiriya (Lion Rock)', category: 'UNESCO Heritage', province: 'Central', image: 'Image/sigiriya-rock-fortress_63882.jpg', description: 'Ancient rock fortress with frescoes and gardens' },
    { id: 2, name: 'Sri Dalada Maligawa', category: 'UNESCO Heritage', province: 'Central', image: 'Image/temple-204803_640.webp', description: 'Temple of the Sacred Tooth Relic in Kandy' },
    { id: 3, name: 'Galle Fort', category: 'UNESCO Heritage', province: 'Southern', image: 'Image/01.jpg', description: 'Dutch colonial fortress in Galle' },
    { id: 4, name: 'Yala National Park', category: 'Wildlife', province: 'Southern', image: 'Image/01.jpg', description: 'Famous wildlife sanctuary' },
    { id: 5, name: 'Ella', category: 'Hill Country', province: 'Uva', image: 'Image/sigiriya-rock-fortress_63882.jpg', description: 'Beautiful hill country town' },
    { id: 6, name: 'Anuradhapura', category: 'UNESCO Heritage', province: 'North Central', image: 'Image/Anuradhapura-1024x768.jpg', description: 'Ancient capital with ruins' },
    { id: 7, name: 'Mirissa Beach', category: 'Beach', province: 'Southern', image: 'Image/temple-204803_640.webp', description: 'Popular beach destination' },
    { id: 8, name: 'Adam\'s Peak', category: 'Sacred', province: 'Central', image: 'Image/1_4POzB-0n1PnLoAMEKZ4Eug.jpg', description: 'Sacred mountain pilgrimage site' }
];

let festivalsData = [
    { id: 1, month: 'January', name: 'Duruthu Poya', description: 'First Buddhist temple visit by Buddha' },
    { id: 2, month: 'February', name: 'Navam Maha Perahera', description: 'Grand procession in Colombo' },
    { id: 3, month: 'March', name: 'Maha Shivaratri', description: 'Hindu festival of Lord Shiva' },
    { id: 4, month: 'April', name: 'Sinhala & Tamil New Year', description: 'Traditional New Year celebration' },
    { id: 5, month: 'May', name: 'Vesak Poya', description: 'Birth, enlightenment and death of Buddha' },
    { id: 6, month: 'June', name: 'Poson Poya', description: 'Arrival of Buddhism to Sri Lanka' },
    { id: 7, month: 'July/August', name: 'Esala Perahera', description: 'Grand festival in Kandy' },
    { id: 8, month: 'October', name: 'Deepavali', description: 'Hindu Festival of Lights' },
    { id: 9, month: 'December', name: 'National Day', description: 'Independence celebration' }
];

let foodData = [
    { id: 1, name: 'Rice & Curry', description: 'Staple meal with various curries', image: 'Image/temple-204803_640.webp' },
    { id: 2, name: 'Hoppers (Appa)', description: 'Bowl-shaped pancake with egg', image: 'Image/1_4POzB-0n1PnLoAMEKZ4Eug.jpg' },
    { id: 3, name: 'Kottu Roti', description: 'Chopped roti with vegetables and meat', image: 'Image/01.jpg' },
    { id: 4, name: 'Kavum (Oil Cakes)', description: 'Traditional sweet snack', image: 'Image/sigiriya-rock-fortress_63882.jpg' },
    { id: 5, name: 'Ceylon Tea', description: 'World-famous premium tea', image: 'Image/Anuradhapura-1024x768.jpg' },
    { id: 6, name: 'Pol Sambol', description: 'Coconut relish with chili', image: 'Image/24f8df28-temple-of-the-sacred-tooth-relic.jpg' }
];

let traditionsData = [
    { id: 1, icon: 'fa-gift', title: 'Sinhala & Tamil New Year', description: 'Traditional New Year celebrated in April with customs and rituals' },
    { id: 2, icon: 'fa-om', title: 'Vesak Festival', description: 'Buddhist festival celebrating the birth, enlightenment and death of Buddha' },
    { id: 3, icon: 'fa-horse', title: 'Esala Perahera', description: 'Grand procession in Kandy with decorated elephants' },
    { id: 4, icon: 'fa-music', title: 'Sri Lankan Dance Forms', description: 'Kandyan, Pahatharata, and Sabaragamuwa dances' },
    { id: 5, icon: 'fa-palette', title: 'Sri Lankan Painting & Art', description: 'Traditional art forms including temple paintings' },
    { id: 6, icon: 'fa-handshake', title: 'Hospitality & Greetings', description: 'Warm welcome customs with Ayubowan greeting' }
];

let isLoggedIn = false;
let currentSection = 'dashboard';
let editingItem = null;
let currentDataType = '';

// ========== DOM ELEMENTS ==========
const loginPage = document.getElementById('loginPage');
const adminWrapper = document.getElementById('adminWrapper');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const sidebar = document.getElementById('sidebar');
const toggleSidebar = document.getElementById('toggleSidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');
const sections = document.querySelectorAll('.admin-section');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalCancel = document.getElementById('modalCancel');
const modalSave = document.getElementById('modalSave');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ========== LOGIN SYSTEM ==========
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Get stored credentials or use defaults
    const storedUsername = localStorage.getItem('adminUsername') || DEFAULT_USERNAME;
    const storedPassword = localStorage.getItem('adminPassword') || DEFAULT_PASSWORD;
    
    if (username === storedUsername && password === storedPassword) {
        isLoggedIn = true;
        sessionStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
        showToast('Welcome to Admin Panel!');
    } else {
        showToast('Invalid credentials!', true);
    }
});

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isLoggedIn = false;
    sessionStorage.removeItem('adminLoggedIn');
    adminWrapper.style.display = 'none';
    loginPage.style.display = 'flex';
    loginForm.reset();
    showToast('Logged out successfully');
});

function showAdminPanel() {
    loginPage.style.display = 'none';
    adminWrapper.style.display = 'flex';
    loadAllData();
}

// Check if already logged in
if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    showAdminPanel();
}

// ========== SIDEBAR NAVIGATION ==========
toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        navigateToSection(section);
        
        // Close sidebar on mobile
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
        }
    });
});

function navigateToSection(section) {
    currentSection = section;
    
    // Update sidebar links
    sidebarLinks.forEach(l => l.classList.remove('active'));
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Update sections
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(`section-${section}`).classList.add('active');
}

// ========== DATA LOADING ==========
function loadAllData() {
    loadPlacesTable();
    loadFestivalsTable();
    loadFoodTable();
    loadTraditionsTable();
    updateStats();
}

function updateStats() {
    document.getElementById('placesCount').textContent = placesData.length;
    document.getElementById('festivalsCount').textContent = festivalsData.length;
    document.getElementById('foodCount').textContent = foodData.length;
    document.getElementById('traditionsCount').textContent = traditionsData.length;
}

// ========== PLACES TABLE ==========
function loadPlacesTable() {
    const tbody = document.getElementById('placesTableBody');
    tbody.innerHTML = placesData.map(place => `
        <tr>
            <td>${place.id}</td>
            <td><div class="table-img-wrapper"><img src="${place.image}" alt="${place.name}" onerror="this.src='https://via.placeholder.com/100x50?text=No+Image'"></div></td>
            <td><strong>${place.name}</strong></td>
            <td><span class="table-badge badge-heritage">${place.category}</span></td>
            <td>${place.province}</td>
            <td class="table-actions">
                <button class="btn-edit" onclick="editPlace(${place.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-delete" onclick="deletePlace(${place.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function editPlace(id) {
    const place = placesData.find(p => p.id === id);
    if (!place) return;
    
    editingItem = place;
    currentDataType = 'place';
    modalTitle.textContent = 'Edit Tourist Place';
    modalBody.innerHTML = `
        <div class="form-group">
            <label>Place Name</label>
            <input type="text" id="editName" value="${place.name}" required>
        </div>
        <div class="form-group">
            <label>Category</label>
            <select id="editCategory">
                <option ${place.category === 'UNESCO Heritage' ? 'selected' : ''}>UNESCO Heritage</option>
                <option ${place.category === 'Wildlife' ? 'selected' : ''}>Wildlife</option>
                <option ${place.category === 'Beach' ? 'selected' : ''}>Beach</option>
                <option ${place.category === 'Hill Country' ? 'selected' : ''}>Hill Country</option>
                <option ${place.category === 'Sacred' ? 'selected' : ''}>Sacred</option>
                <option ${place.category === 'City' ? 'selected' : ''}>City</option>
                <option ${place.category === 'Adventure' ? 'selected' : ''}>Adventure</option>
                <option ${place.category === 'Nature' ? 'selected' : ''}>Nature</option>
                <option ${place.category === 'Culture' ? 'selected' : ''}>Culture</option>
            </select>
        </div>
        <div class="form-group">
            <label>Province</label>
            <input type="text" id="editProvince" value="${place.province}" required>
        </div>
        <div class="form-group">
            <label>Image URL</label>
            <input type="url" id="editImage" value="${place.image}">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="editDescription">${place.description}</textarea>
        </div>
    `;
    openModal();
}

function deletePlace(id) {
    if (confirm('Are you sure you want to delete this place?')) {
        placesData = placesData.filter(p => p.id !== id);
        loadPlacesTable();
        updateStats();
        showToast('Place deleted successfully');
    }
}

// ========== FESTIVALS TABLE ==========
function loadFestivalsTable() {
    const tbody = document.getElementById('festivalsTableBody');
    tbody.innerHTML = festivalsData.map(festival => `
        <tr>
            <td>${festival.id}</td>
            <td>${festival.month}</td>
            <td><strong>${festival.name}</strong></td>
            <td>${festival.description}</td>
            <td class="table-actions">
                <button class="btn-edit" onclick="editFestival(${festival.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-delete" onclick="deleteFestival(${festival.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function editFestival(id) {
    const festival = festivalsData.find(f => f.id === id);
    if (!festival) return;
    
    editingItem = festival;
    currentDataType = 'festival';
    modalTitle.textContent = 'Edit Festival';
    modalBody.innerHTML = `
        <div class="form-group">
            <label>Month</label>
            <input type="text" id="editMonth" value="${festival.month}" required>
        </div>
        <div class="form-group">
            <label>Festival Name</label>
            <input type="text" id="editName" value="${festival.name}" required>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="editDescription">${festival.description}</textarea>
        </div>
    `;
    openModal();
}

function deleteFestival(id) {
    if (confirm('Are you sure you want to delete this festival?')) {
        festivalsData = festivalsData.filter(f => f.id !== id);
        loadFestivalsTable();
        updateStats();
        showToast('Festival deleted successfully');
    }
}

// ========== FOOD TABLE ==========
function loadFoodTable() {
    const tbody = document.getElementById('foodTableBody');
    tbody.innerHTML = foodData.map(food => `
        <tr>
            <td>${food.id}</td>
            <td><div class="table-img-wrapper"><img src="${food.image}" alt="${food.name}" onerror="this.src='https://via.placeholder.com/100x50?text=No+Image'"></div></td>
            <td><strong>${food.name}</strong></td>
            <td>${food.description}</td>
            <td class="table-actions">
                <button class="btn-edit" onclick="editFood(${food.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-delete" onclick="deleteFood(${food.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function editFood(id) {
    const food = foodData.find(f => f.id === id);
    if (!food) return;
    
    editingItem = food;
    currentDataType = 'food';
    modalTitle.textContent = 'Edit Food Item';
    modalBody.innerHTML = `
        <div class="form-group">
            <label>Food Name</label>
            <input type="text" id="editName" value="${food.name}" required>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="editDescription">${food.description}</textarea>
        </div>
        <div class="form-group">
            <label>Image URL</label>
            <input type="url" id="editImage" value="${food.image}">
        </div>
    `;
    openModal();
}

function deleteFood(id) {
    if (confirm('Are you sure you want to delete this food item?')) {
        foodData = foodData.filter(f => f.id !== id);
        loadFoodTable();
        updateStats();
        showToast('Food item deleted successfully');
    }
}

// ========== TRADITIONS TABLE ==========
function loadTraditionsTable() {
    const tbody = document.getElementById('traditionsTableBody');
    tbody.innerHTML = traditionsData.map(tradition => `
        <tr>
            <td>${tradition.id}</td>
            <td>
                <div class="table-icon">
                    <i class="fas ${tradition.icon}"></i>
                </div>
            </td>
            <td><strong>${tradition.title}</strong></td>
            <td>${tradition.description}</td>
            <td class="table-actions">
                <button class="btn-edit" onclick="editTradition(${tradition.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-delete" onclick="deleteTradition(${tradition.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function editTradition(id) {
    const tradition = traditionsData.find(t => t.id === id);
    if (!tradition) return;
    
    editingItem = tradition;
    currentDataType = 'tradition';
    modalTitle.textContent = 'Edit Tradition';
    modalBody.innerHTML = `
        <div class="form-group">
            <label>Title</label>
            <input type="text" id="editTitle" value="${tradition.title}" required>
        </div>
        <div class="form-group">
            <label>Icon (Font Awesome class)</label>
            <input type="text" id="editIcon" value="${tradition.icon}" placeholder="fa-gift">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="editDescription">${tradition.description}</textarea>
        </div>
    `;
    openModal();
}

function deleteTradition(id) {
    if (confirm('Are you sure you want to delete this tradition?')) {
        traditionsData = traditionsData.filter(t => t.id !== id);
        loadTraditionsTable();
        updateStats();
        showToast('Tradition deleted successfully');
    }
}

// ========== ADD NEW ITEMS ==========
document.getElementById('addPlaceBtn').addEventListener('click', () => {
    editingItem = null;
    currentDataType = 'place';
    modalTitle.textContent = 'Add New Tourist Place';
    modalBody.innerHTML = `
        <div class="form-group">
            <label>Place Name</label>
            <input type="text" id="editName" required>
        </div>
        <div class="form-group">
            <label>Category</label>
            <select id="editCategory">
                <option>UNESCO Heritage</option>
                <option>Wildlife</option>
                <option>Beach</option>
                <option>Hill Country</option>
                <option>Sacred</option>
                <option>City</option>
                <option>Adventure</option>
                <option>Nature</option>
                <option>Culture</option>
            </select>
        </div>
        <div class="form-group">
            <label>Province</label>
            <input type="text" id="editProvince" required>
        </div>
        <div class="form-group">
            <label>Image URL</label>
            <input type="url" id="editImage">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="editDescription"></textarea>
        </div>
    `;
    openModal();
});

document.getElementById('addFestivalBtn').addEventListener('click', () => {
    editingItem = null;
    currentDataType = 'festival';
    modalTitle.textContent = 'Add New Festival';
    modalBody.innerHTML = `
        <div class="form-group">
            <label>Month</label>
            <input type="text" id="editMonth" required>
        </div>
        <div class="form-group">
            <label>Festival Name</label>
            <input type="text" id="editName" required>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="editDescription"></textarea>
        </div>
    `;
    openModal();
});

document.getElementById('addFoodBtn').addEventListener('click', () => {
    editingItem = null;
    currentDataType = 'food';
    modalTitle.textContent = 'Add New Food Item';
    modalBody.innerHTML = `
        <div class="form-group">
            <label>Food Name</label>
            <input type="text" id="editName" required>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="editDescription"></textarea>
        </div>
        <div class="form-group">
            <label>Image URL</label>
            <input type="url" id="editImage">
        </div>
    `;
    openModal();
});

document.getElementById('addTraditionBtn').addEventListener('click', () => {
    editingItem = null;
    currentDataType = 'tradition';
    modalTitle.textContent = 'Add New Tradition';
    modalBody.innerHTML = `
        <div class="form-group">
            <label>Title</label>
            <input type="text" id="editTitle" required>
        </div>
        <div class="form-group">
            <label>Icon (Font Awesome class)</label>
            <input type="text" id="editIcon" placeholder="fa-gift">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="editDescription"></textarea>
        </div>
    `;
    openModal();
});

// ========== MODAL FUNCTIONS ==========
function openModal() {
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
    editingItem = null;
}

modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);

modalSave.addEventListener('click', () => {
    saveData();
});

function saveData() {
    if (currentDataType === 'place') {
        const name = document.getElementById('editName').value;
        const category = document.getElementById('editCategory').value;
        const province = document.getElementById('editProvince').value;
        const image = document.getElementById('editImage').value;
        const description = document.getElementById('editDescription').value;
        
        if (!name) {
            showToast('Please enter a name', true);
            return;
        }
        
        if (editingItem) {
            // Update
            editingItem.name = name;
            editingItem.category = category;
            editingItem.province = province;
            editingItem.image = image;
            editingItem.description = description;
        } else {
            // Add new
            const newId = Math.max(...placesData.map(p => p.id), 0) + 1;
            placesData.push({ id: newId, name, category, province, image, description });
        }
        loadPlacesTable();
        
    } else if (currentDataType === 'festival') {
        const month = document.getElementById('editMonth').value;
        const name = document.getElementById('editName').value;
        const description = document.getElementById('editDescription').value;
        
        if (!name) {
            showToast('Please enter a name', true);
            return;
        }
        
        if (editingItem) {
            editingItem.month = month;
            editingItem.name = name;
            editingItem.description = description;
        } else {
            const newId = Math.max(...festivalsData.map(f => f.id), 0) + 1;
            festivalsData.push({ id: newId, month, name, description });
        }
        loadFestivalsTable();
        
    } else if (currentDataType === 'food') {
        const name = document.getElementById('editName').value;
        const description = document.getElementById('editDescription').value;
        const image = document.getElementById('editImage').value;
        
        if (!name) {
            showToast('Please enter a name', true);
            return;
        }
        
        if (editingItem) {
            editingItem.name = name;
            editingItem.description = description;
            editingItem.image = image;
        } else {
            const newId = Math.max(...foodData.map(f => f.id), 0) + 1;
            foodData.push({ id: newId, name, description, image });
        }
        loadFoodTable();
        
    } else if (currentDataType === 'tradition') {
        const title = document.getElementById('editTitle').value;
        const icon = document.getElementById('editIcon').value;
        const description = document.getElementById('editDescription').value;
        
        if (!title) {
            showToast('Please enter a title', true);
            return;
        }
        
        if (editingItem) {
            editingItem.title = title;
            editingItem.icon = icon;
            editingItem.description = description;
        } else {
            const newId = Math.max(...traditionsData.map(t => t.id), 0) + 1;
            traditionsData.push({ id: newId, icon, title, description });
        }
        loadTraditionsTable();
    }
    
    updateStats();
    closeModal();
    showToast(editingItem ? 'Item updated successfully' : 'Item added successfully');
}

// ========== PASSWORD CHANGE ==========
document.getElementById('passwordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    const storedPassword = localStorage.getItem('adminPassword') || DEFAULT_PASSWORD;
    
    if (currentPassword !== storedPassword) {
        showToast('Current password is incorrect', true);
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showToast('New passwords do not match', true);
        return;
    }
    
    localStorage.setItem('adminPassword', newPassword);
    document.getElementById('passwordForm').reset();
    showToast('Password changed successfully');
});

// ========== SETTINGS SAVE ==========
document.getElementById('saveSettings').addEventListener('click', () => {
    const siteName = document.getElementById('siteName').value;
    const contactEmail = document.getElementById('contactEmail').value;
    
    localStorage.setItem('siteName', siteName);
    localStorage.setItem('contactEmail', contactEmail);
    showToast('Settings saved successfully');
});

// ========== TOAST NOTIFICATION ==========
function showToast(message, isError = false) {
    toastMessage.textContent = message;
    toast.className = 'toast active' + (isError ? ' error' : '');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
});
