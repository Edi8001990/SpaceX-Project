const RequestHelper = require('../helpers/request_helper.js')
const PubSub = require('../helpers/pub_sub.js')


const Launch = function(url) {
  this.url = url;
  this.launches = [];
}

Launch.prototype.bindEvents = function() {
  PubSub.subscribe('SelectView:change', (event) =>{
    selectedIndex = event.detail
    const selectedLaunch = this.launches[selectedIndex]

    PubSub.publish('Launch:selected-launch-ready:', selectedLaunch)
  })

}

Launch.prototype.getData = function() {
  const request = new RequestHelper(this.url)

  request.get()
    .then((data) =>{
      this.launches = data;
      PubSub.publish('Launch:launch-data-ready', this.launches)
      console.log("Give all launches", this.launches);
    })
}



Launch.prototype.handleData = function(data) {
  this.launches = data;
  PubSub.publish('Launch:launch-data-ready', this.launches)


}


//console.log("Launches: loaded");

module.exports = Launch;
