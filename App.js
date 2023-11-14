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
      { id: 0, name: "Steak Dinner", calories: 1200 },
      { id: 1, name: "Cookies", calories: 120 },
      { id: 2, name: "Egg", calories: 4200 },
      { id: 3, name: "Chana", calories: 1500 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // public method
  return {
    getItems: function () {
      return data.items;
    },
    logData: function () {
      return data;
    },
  };
})();


// UI Controller
const UICtrl = (function () {
    const UISelectors ={
        itemList: "#item-list"
    }
  // public method
  return {
    populatedItemList: function (items) {
      let html = " ";

      items.forEach(function (item) {
        html += `<li id="item-${item.id}" class="collection-item">
        <strong>${item.name}: </strong> <em>${item.calories}</em>
        <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i></a>  `
      });

    //   Insert list items 
    document.querySelector(UISelectors.itemList).innerHTML = html;
    },
  }; 
})();



// App Controler
const App = (function (ItemCtrl, UICtrl) {
  // console.log(ItemCtrl.logData());

  // public method
  return {
    init: function () {
      console.log("Initializing App...");

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // populated list with items
      UICtrl.populatedItemList(items);
    },
  };
})(ItemCtrl, UICtrl);

// Initializing App
App.init();
