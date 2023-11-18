//  Storage Controller

// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //    Data Structure / State
  const data = {
    items: [
      // { id: 0, name: "Steak Dinner", calories: 1200 },
      // { id: 1, name: "Cookies", calories: 120 },
      // { id: 2, name: "Egg", calories: 4200 },
      // { id: 3, name: "Chana", calories: 1500 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // public method
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      // console.log(name, calories);
      let Id;
      // Create Id
      if (data.items.length > 0) {
        Id = data.items[data.items.length - 1].id + 1;
      } else {
        Id = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // create new item
      newItem = new Item(Id, name, calories);

      // add to item array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function (id) {
      let found = null;
      // Loop through items
      data.items.forEach(function (item) {
        if (item.id == id) {
          found = item;
        }
      });
      return found;
    },

    updateItem: function (name, calories) {
      //calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },

    deleteItem: function (id) {
      const ids = data.items.map(function (item) {
        return item.id;
      });
      // Get index
      const index = ids.indexOf(id);

      // Remove item
      data.items.splice(index, 1);
    },
    clearAllItems: function () {
      data.items = [];
    },

    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    getCurrentItem: function () {
      return data.currentItem;
    },
    getTotalCalories: function () {
      let total = 0;
      // loop through items and add cals
      data.items.forEach(function (item) {
        total += item.calories;
      });
      // Set total cal in data structure
      data.totalCalories = total;
      // return total
      return data.totalCalories;
    },
    logData: function () {
      return data;
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
  };
  // public method
  return {
    populatedItemList: function (items) {
      let html = " ";

      items.forEach(function (item) {
        html += `<li id="item-${item.id}" class="collection-item">
        <strong>${item.name}: </strong> <em>${item.calories}</em>
        <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i></a>  `;
      });

      //   Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem: function (item) {
      // show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // create li element
      const li = document.createElement("li");
      // Add a class
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      // Add Htmml
      li.innerHTML = `<strong>${item.name}: 
      </strong> <em>${item.calories}</em>
      <a href="#" class="secondary-content">
      <i class="edit-item fa fa-pencil"></i></a> `;

      // Insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },

    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn node list into arary
      listItems = Array.from(listItems);
      listItems.forEach(function (listItem) {
        const itemID = listItem.getAttribute("id");

        if (itemID === `item-${item.id}`) {
          document.querySelector(
            `#${itemID}`
          ).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories}</em>
          <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i></a> `;
        }
      });
    },
    deleteListItem: function (id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },

    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value =
        ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value =
        ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    removeItems: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node list into array 
      listItems = Array.from(listItems);
      listItems.forEach(function(item){
        item.remove();
      })
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: function (totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent =
        totalCalories;
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    getSelector: function () {
      return UISelectors;
    },
  };
})();

// App Controler
const App = (function (ItemCtrl, UICtrl) {
  // console.log(ItemCtrl.logData());

  // Load event listener
  const loadEventListeners = function () {
    // Get UI selectors
    const UISelectors = UICtrl.getSelector();

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // Disable submit on enter
    document.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        return false;
      }
    });
    // Edit icon Click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    // Update item event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    // Delete item event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    // Back button event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);

    // clearAll item event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItemsClick);
  };

  // Add item submit
  const itemAddSubmit = function (e) {
    // Get form input from UI controller
    const input = UICtrl.getItemInput();
    // console.log(input);
    // check for name and calories input
    if (input.name !== "" && input.calories !== " ") {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add totalCalories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Clear fields
      UICtrl.clearInput();
    }
    e.preventDefault();
  };

  // Click edit item
  const itemEditClick = function (e) {
    if (e.target.classList.contains("edit-item")) {
      // Get list item id (item-0 ,item-1)
      const listId = e.target.parentNode.parentNode.id;
      // console.log(listId);

      // Break into an array
      const listIdArr = listId.split("-");

      //Get the actual id  //give the actual id
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);
      // console.log(itemToEdit);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };

  // Update item submit
  const itemUpdateSubmit = function (e) {
    // Get item input
    const input = UICtrl.getItemInput();
    // update Item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add totalCalories to UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Delete button event
  const itemDeleteSubmit = function (e) {
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add totalCalories to UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // clear item event
  const clearAllItemsClick = function () {
    // console.log(3232);
    // Delete All items from data structure
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add totalCalories to UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    // Remove from UI
    UICtrl.removeItems();

    // hide a Ul
    UICtrl.hideList();

  };

  // public method
  return {
    init: function () {
      //clear edit state / set initial set
      UICtrl.clearEditState();

      // console.log("Initializing App...");

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // populated list with items
        UICtrl.populatedItemList(items);
      }

      const totalCalories = ItemCtrl.getTotalCalories();

      // Add totalCalories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listener
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

// Initializing App
App.init();
