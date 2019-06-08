const SelectView = require('./views/select_view.js')
const Launch = require('./models/launches.js')
const LaunchView = require('./views/launch_view.js')

document.addEventListener('DOMContentLoaded', ()=>{
  const selectElement = document.querySelector('select.launches')
  const selectView = new SelectView(selectElement);
  selectView.bindEvents()

  const launchContainer = document.querySelector('.launch');
  const launchView = new LaunchView(launchContainer);
  launchView.bindEvents()


  const launches = new Launch('https://api.spacexdata.com/v2/launches')
  launches.bindEvents()
  launches.getData()
})
