const RequestHelper = function(url) {
  this.url = url;
}


RequestHelper.prototype.get = function () {
  return fetch(this.url)
    .then(response => response.json())
    .catch(err => console.log("Error in get", err))
}
//console.log("RequestHelper loaded");

module.exports = RequestHelper;
