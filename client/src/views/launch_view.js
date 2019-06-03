const PubSub = require('../helpers/pub_sub.js')

const LaunchView = function(container) {
 this.container = container;


}


LaunchView.prototype.bindEvents = function() {
  PubSub.subscribe('Launch:launch-loaded', (event)=>{
    const allLaunches = event.detail;

     this.populate(allLaunches)


  })

}
console.log("Launch View Test");

module.exports = LaunchView;
