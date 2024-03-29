const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
const liText = document.querySelector('li');
let isEditMode = false;


// DISPLAY ITEMS FROM LOCAL STORAGE
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
}


// ADD NEW LIST ITEM
function onAddItemSubmit(e) {
  e.preventDefault(); // prevent form default action

  const newItem = itemInput.value; 
  
  if (newItem === '') {
    alert('You forgot to type your list item.');
    return; // empty return interupts the function
  } if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert('This item already exists.');
      return;
    }
  }

  // Create item DOM element
  addItemToDOM(newItem);

  // Add item to local storage
  addItemToStorage(newItem);
  
  resetUI();

  itemInput.value = ''; // clears the text input after "Add Item" button is clicked
}


// ADD NEW LIST ITEM TO DOM
function addItemToDOM(item) {

  // Create list item & append to child
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  // Validate input
  if (item === '') {
    alert('You forgot to type your list item.');
    return;
  }

  // Call button function & append to child
  const button = createButton('remove-item btn-link text-red') // classes passed as argument
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
  
  itemInput.value = '';
  resetUI();
}


// CREATE NEW BUTTON
function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes; // assign the button elem classes = to the param of classes passed to createButton func
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

// CREATE NEW "X" delete ICON
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// TO DO - CREATE NEW "PEN" (EDIT) ICON




// ADD TO LOCAL STORAGE
function addItemToStorage(item) {
  // Validate input
  if (item === '') {
    return;
  }

  const itemsFromStorage = getItemsFromStorage();

  //add new item to array
  itemsFromStorage.push(item); 

  // Convert to JSON string & set to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


// GET LOCAL STORAGE
function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) { // is anything in there?
    itemsFromStorage = []; // if not, set to empty array
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items')); // if not empty then add to array
  }

  return itemsFromStorage;
}


// REMOVE OR EDIT ITEM ON CLICK
function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else if (e.target.tagName === "LI") {
    setItemToEdit(e.target)
  }
}


// PREVENT DUPLICATE LIST ITEMS
function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();

  if (itemsFromStorage.includes(item)) {
    return true;
  } else {
    return false;
  }
}


// EDIT LIST ITEM
function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}


// REMOVE A SINGLE LIST ITEM
function removeItem(item) {
  if (confirm('Are you sure you want to delete list item?')) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    resetUI();
  }
}


// REMOVE FROM LOCAL STORAGE
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out list item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Reset to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


// REMOVE ALL ITEMS FROM LOCAL STORAGE
function clearItems() {
  if (confirm('Are you sure you want to delete all items?')) {
    while (itemList.firstChild) { 
      itemList.removeChild(itemList.firstChild); 
    } // The while loop is saying, remove the firstChild so long as there is a firstChild to remove.
  }
  
  // Clear from localStorage
  localStorage.removeItem('items');
  
  resetUI();
};


// FILTER ITEMS TO FIND LIST ITEM
function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li');

  items.forEach((item) => {
    //firstChild = textNode; textContent gives text w/o ""; toLowerCase() just makes the comparison lowercase
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) { 
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  })
};

// RESET THE UI - This function must be called everwhere a list item can be deleted or created.
// hides the "Clear All" button UI and the "Filter Items" input UI if there are no list items, returns them when new list items are created.
function resetUI() { 
  itemInput.value = '';
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) { // array-like
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';

  isEditMode = false;
};


// INITIALIZE APP
function init() {
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  resetUI();
}

init();
