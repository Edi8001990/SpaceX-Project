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

  if ((launch.details !== null)){
  const mission_details = this.createElement('p', "Mission Details: " + launch.details);
  this.container.appendChild(mission_details);}
  else{
  const mission_details = this.createElement('p', "No details about this mision from API");
  this.container.appendChild(mission_details);
  }


  if ((launch.launch_success === true)){
  const launch_success = this.createElement('p', "Lauch result: Succeed");
  this.container.appendChild(launch_success)}
  else{
  const launch_success = this.createElement('p', "Lauch result: Failure");
  this.container.appendChild(launch_success)}



  if (launch.launch_success === false){

  const launch_failure_reason = this.createElement('p', "Launch failure details: " + launch.launch_failure_details.reason)
  this.container.appendChild(launch_failure_reason)

  const launch_failure_time_since_start = this.createElement('p', "Launch Failure Time Since Start: " + launch.launch_failure_details.time + "s")
  this.container.appendChild(launch_failure_time_since_start)

  if (launch.launch_failure_details.altitude != null){
  const launch_failure_altitude = this.createElement('p', "Launch failure altitude: " + launch.launch_failure_details.altitude + "000m")
  this.container.appendChild(launch_failure_altitude)}

  else{
    const launch_failure_altitude = this.createElement('p', "Launch failure altitude: " + " 0m")
    this.container.appendChild(launch_failure_altitude);
  }
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const date = launch.launch_date_utc
  const localDate = new Date(date)
  const lauchFormattedDate = localDate.getDate() + " " + monthNames[(localDate.getMonth() + 1)]
  + " " + localDate.getFullYear() + " " + localDate.getHours() + ":" + localDate.getMinutes()
  + " British timezone"
  const launch_date = this.createElement('p', "Launch date: " + lauchFormattedDate)
  this.container.appendChild(launch_date)

  const rocket_name = this.createElement('p', "Rocket Name: " +  launch.rocket.rocket_name)
  this.container.appendChild(rocket_name)

  const rocket_type = this.createElement('p', "Rocket Type: " +  launch.rocket.rocket_type)
  this.container.appendChild(rocket_type)

  const launchImage = document.createElement('img')
  launchImage.src = launch.links.mission_patch
  launchImage.classList.add('launch-logo')
  this.container.appendChild(launchImage)

  const launchVideo = document.createElement('iframe')
  launchVideo.src = "https://www.youtube.com/embed/" + launch.links.youtube_id
  launchVideo.classList.add('launch-yt-video')
  launchVideo.style.width = "560px";
  launchVideo.style.height = "315px";
  this.container.appendChild(launchVideo)


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
