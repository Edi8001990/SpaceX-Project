const PubSub = require('../helpers/pub_sub.js')


const SelectView = function (selectElement) {
  this.element = selectElement;
}

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe("Launch:launch-data-ready", (event) =>{
    this.populate(event.detail)
  })

  this.element.addEventListener('change', (event) =>{
    const selectedIndex = event.target.value
    PubSub.publish('SelectView:change', selectedIndex)

  })
}

SelectView.prototype.populate = function(launches) {
  launches.forEach((launch, index) =>{
    const launchOption = this.createOption(launch.flight_number + ". " + launch.mission_name, index);

    this.element.appendChild(launchOption)
  })
}


SelectView.prototype.createOption = function (name, index) {
  const option = document.createElement('option')
  option.textContent = name
  option.value = index
  

  return option

}

module.exports = SelectView
