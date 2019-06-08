const PubSub = require('../helpers/pub_sub.js')

const LaunchView = function(container) {
 this.container = container;
}


LaunchView.prototype.bindEvents = function() {
  PubSub.subscribe('Launch:selected-launch-ready:', (event) =>{
    this.clearLaunch()
    this.render(event.detail);

  })
}

LaunchView.prototype.render = function(launch) {
  const mission_name = this.createElement('h3',"Mission name: " + launch.mission_name);
  this.container.appendChild(mission_name)

  const launch_success = this.createElement('p',"Lauch success: " +  launch.launch_success)
  this.container.appendChild(launch_success)

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const date = launch.launch_date_utc
  const localDate = new Date(date)
  const lauchFormattedDate = localDate.getDate() + " " + monthNames[(localDate.getMonth() + 1)]
  + " " + localDate.getFullYear() + " " + localDate.getHours() + ":" + localDate.getMinutes()
  + " British timezone"
  const launch_date = this.createElement('p', "Launch date: " + lauchFormattedDate)
  this.container.appendChild(launch_date)

  const launchImage = document.createElement('img')
  launchImage.src = launch.links.mission_patch
  this.container.appendChild(launchImage)

}

LaunchView.prototype.createElement = function(elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element

}

LaunchView.prototype.clearLaunch = function() {
  this.container.innerHTML = '';
}


module.exports = LaunchView;
