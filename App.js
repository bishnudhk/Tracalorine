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
    logData: function () {
      return data;
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
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
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
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

      // Clear fields
      UICtrl.clearInput();
    }
    e.preventDefault();
  };

  // public method
  return {
    init: function () {
      console.log("Initializing App...");

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // populated list with items
      UICtrl.populatedItemList(items);

      // Load event listener
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

// Initializing App
App.init();
