Module.register("MMM-MyGarbarge", {
  // Default module config.
  defaults: {
    updateInterval: 3600000, // 1 hour in milliseconds
  },

  start: function () {
    this.getPickupInfo();
    setInterval(() => this.getPickupInfo(), this.config.updateInterval);
  },

  getPickupInfo: function () {
    this.sendSocketNotification("GET_PICKUP_INFO");
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "PICKUP_INFO") {
      this.updatePickupInfo(payload);
    }
  },

  updatePickupInfo: function (pickupData) {
    this.loaded = true;
    this.pickupData = pickupData;
    this.updateDom();
    console.log(JSON.stringify(pickupData));
  },

  getDom: function () {
    const wrapper = document.createElement("div");

    if (!this.loaded) {
      wrapper.innerHTML = "Loading...";
      return wrapper;
    }
    
    if (this.pickupData && this.pickupData.length > 0) {
      const list = document.createElement("ul");
      this.pickupData.forEach((entry) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `Date: ${entry.date}, Type: ${entry.type}`;
        list.appendChild(listItem);
      });
      wrapper.appendChild(list);
    } else {
      wrapper.innerHTML = "No garbage pickup information available.";
    }

    return wrapper;
  }
});
