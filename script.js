// Globally scoped variables
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

// Add New List Item function
function addItem(e) {
  e.preventDefault(); // prevent the form from submmiting

  const newItem = itemInput.value; 
  // Validate input
  if (newItem.value === '') {
    alert('Please add an item.');
    return; // we use a return to make sure nothing else happens
  }

  // Create list item & append to child
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  // Call button function & append to child
  const button = createButton('remove-item btn-link text-red') // classes passed as argument
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
  resetUI(); // called here because if there was previously an empty list, the call brings back the hidden items
  itemInput.value = ''; // clears the text input after "Add Item" button is clicked
}

// Create new button
function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes; // assign the button elem classes = to the param of classes passed to createButton func
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

// Create new "x" icon
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// Remove a single list item
function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) { // if parent of clicked on elem contains the class
    if (confirm('Are you sure you want to delete this item?')) {
      e.target.parentElement.parentElement.remove(); // e.click-on.button-Elem.li-Elem.remove()
      resetUI();
    }
  }
}

// Remove all items
function clearItems() {
  if (confirm('Are you sure you want to delete all items?')) {
    while (itemList.firstChild) { 
      itemList.removeChild(itemList.firstChild); 
    } // The while loop is saying, remove the firstChild so long as there is a firstChild to remove.
  }
  resetUI();
}

// Filter function to find list items
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

  console.log(text);
}

// This function must be called everwhere a list item can be deleted or created.
// hides the "Clear All" button UI and the "Filter Items" input UI if there are no list items, returns them when new list items are created.
function resetUI() { 
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) { // array-like
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}





// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

resetUI(); // global call