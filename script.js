const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

// Add New Item function
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  // Validate input
  if (newItem.value === '') {
    alert('Please add an item.');
    return; // we use a return to make sure nothing else happens
  }

  // Create list item & append to child
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));
  // Create button & append to child
  const button = createButton('remove-item btn-link text-red')
  li.appendChild(button);
  document.querySelector('.items').appendChild(li);
  itemInput.value = ''; // clears the text input after "Add Item" button is clicked
}


function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}


// Event Listeners
itemForm.addEventListener('submit', addItem);