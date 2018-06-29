const fs = require("fs");
const routes = require("./docker_api.json");

exports.parseRoute =  function(method, url) {
  for (let route of routes) {
    if (route.method === method) {
			regex = new RegExp(route.pattern);
			matched = regex.test(url);
      if (matched) {
        return route.action;
      }
		}
	}
	return "";
}
