
const URL = "http://localhost:5670/items";

document.getElementById('add-item-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const image = document.getElementById('add-image').value;
    const name = document.getElementById('add-name').value;
    const description = document.getElementById('add-description').value;
    const price = document.getElementById('add-price').value;
    if (!image || !name || !description || !price) {
        alert('her yeri doldur');
        return;
    }
    const newItem = { image, name, description, price };
    try {
        const res = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });
        if (res.ok) {
            console.log(' əlavə olundu');
            
            document.getElementById('add-item-form').reset();
            const modal = document.getElementById('addModal');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();

            getData(); 
        } 
        // else {
        //     console.error('Məlumat əlavə olunarkən səhv:', res.status);
        // }
    } catch (err) {
        console.error( err);
    }
});

async function getData() {
    try {
        const res = await fetch(URL);
        const data = await res.json();
        console.log(data);
        displData(data); 
        return data;
    } catch (err) {
        console.error( err);
    }
}

function displData(data) {
    const tBody = document.getElementById('user-table');
    tBody.innerHTML = ""; 
    console.log("obyekt", data);
    data.forEach(element => {
        console.log("element", element);
        const userRow = document.createElement('tr');
        
        userRow.innerHTML = `
            <td><img src="${element.image}" alt="" style="width: 80px; height: auto;"></td>
            <td>${element.name}</td>
            <td>${element.description}</td>
            <td>${element.price} $</td>
            <td><button class="edit-btn" style="border:none; background-color:orange; color:white; font-size:20px">Edit</button></td>
            <td><button class="delete-btn" style="border:none; background-color:red; color:white; font-size:20px">Delete</button></td>
        `;
        
        tBody.appendChild(userRow); 

        const deleteBtn = userRow.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteData(element._id));

        const editBtn = userRow.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => editForm(element));
    });
}

async function deleteData(id) {
    try {
        const res = await fetch(`${URL}/${id}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            console.log(`ID ilə ${id} element silindi`);
            getData(); 
        } else {
            console.error('Məlumat silinərkən səhv:', res.status);
        }
    } catch (err) {
        console.error('Məlumat silinərkən səhv:', err);
    }
}

function editForm(item) {
    document.getElementById('edit-image').value = item.image;
    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-description').value = item.description;
    document.getElementById('edit-price').value = item.price;

    const editForm = document.getElementById('edit-item-form');
    editForm.onsubmit = async (event) => {
        event.preventDefault();
        await updateData(item._id);
    };

    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}

async function updateData(id) {
    const image = document.getElementById('edit-image').value;
    const name = document.getElementById('edit-name').value;
    const description = document.getElementById('edit-description').value;
    const price = document.getElementById('edit-price').value;

    const updatedItem = { image, name, description, price };

    try {
        const res = await fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        });
        if (res.ok) {
            console.log(`ID ilə ${id} element yeniləndi`);
            
            const editModal = document.getElementById('editModal');
            const modalInstance = bootstrap.Modal.getInstance(editModal);
            modalInstance.hide();

            getData(); 
        } else {
            console.error('Məlumat yenilənərkən səhv:', res.status);
        }
    } catch (err) {
        console.error('Məlumat yenilənərkən səhv:', err);
    }
}

getData();
