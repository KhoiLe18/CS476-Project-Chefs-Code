document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const logoutBtn = document.getElementById('logout-btn');
    const usersTableBody = document.getElementById('users-table-body');
    const userSearch = document.getElementById('user-search');
    const searchBtn = document.getElementById('search-btn');
    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    
    // State variables
    let currentUsers = [];
    let userToDelete = null;
    
    // Event Listeners
    logoutBtn.addEventListener('click', handleLogout);
    searchBtn.addEventListener('click', handleSearch);
    userSearch.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
    cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    
    // Load users immediately when page loads
    loadUsers();
    
    // Functions
    function loadUsers(searchTerm = '') {
        // Show loading state
        usersTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Loading users...</td></tr>';
        
        // Fetch users from backend
        fetch('/api/users' + (searchTerm ? `?search=${searchTerm}` : ''))
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                currentUsers = data;
                renderUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                usersTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Error loading users. Please try again.</td></tr>';
            });
    }
    
    function renderUsers(users) {
        // Clear table
        usersTableBody.innerHTML = '';
        
        if (users.length === 0) {
            usersTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No users found</td></tr>';
            return;
        }
        
        // Add each user to the table
        users.forEach(user => {
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${user.user_id}</td>
                <td><img src="${user.profile_picture || 'img/default-profile.png'}" alt="Profile" class="user-profile-pic"></td>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.email}</td>
                <td class="user-actions">
                    <button class="delete-btn" data-user-id="${user.user_id}">Delete</button>
                </td>
            `;
            
            usersTableBody.appendChild(tr);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                showDeleteModal(userId);
            });
        });
    }
    
    function handleSearch() {
        const searchTerm = userSearch.value.trim();
        loadUsers(searchTerm);
    }
    
    function showDeleteModal(userId) {
        userToDelete = userId;
        deleteModal.style.display = 'flex';
    }
    
    function closeDeleteModal() {
        deleteModal.style.display = 'none';
        userToDelete = null;
    }
    
    function confirmDelete() {
        if (!userToDelete) return;
        
        // Find the user name before deletion for the message
        const fullName = currentUsers.find(user => user.user_id == userToDelete);
        
        // Send delete request to server
        fetch(`/api/users/${userToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Remove the user from the table
                loadUsers();
                closeDeleteModal();
                
            } else {
                alert('Error deleting user: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error deleting user:', error);
            alert('Error deleting user. Please try again.');
        });

        //save the user that was deleted into local storage to be accessed in the login.html page
        localStorage.setItem('deletedUser', JSON.stringify(fullName));
        console.log("The user deleted was ", localStorage.getItem('deletedUser'));
    }
    
    function handleLogout() {
        // Clear any auth tokens or session data
        localStorage.removeItem('adminToken');
        // Redirect to login page
        window.location.href = '/adminPage.html';
    }
});