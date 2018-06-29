const policies = require("../core/policies.json");
const rp = require("../core/route_parser");


function authorizeAction(action, user, daemon) {
  for (let policy of policies) {
    for (let policy_user of policy.users) {
      if (!daemon.includes(policy.daemon)) {
        return false;
      } else {
        if (policy_user === user) {
          for (let policy_action of policy.actions) {
            let allowed = new RegExp(policy_action).test(action);
            if (allowed) {
              return allowed;
            }
          }
          return false;
        }
      }
    }
  }
  return false;
}
exports.plugin_activate = function(req, res) {
  res.json({ Implements: ["authz"] });
};

exports.plugin_authreq = function(req, res) {
  let method = req.body.RequestMethod;
  let uri = req.body.RequestUri;
  let user = req.body.User;
  let daemon = req.headers["x-ssl-cert-dn"];
  let action = rp.parseRoute(method, uri);
  console.log(`Received request, ${method}:${uri}`);
  console.log(`Request action: ${action} for ${user}`);
  console.log(req.headers);
  let allowed = authorizeAction(action, user, daemon);

  if (allowed) {
    let msg = `\nAction ${action} granted for [${user}] from [${daemon}]\n`;
    res.json({
      Allow: true,
      Msg: msg
    });
    console.log(msg);
  } else {
    let msg = `\nAction ${action} deined for [${user}] from [${daemon}]\n`;
    res.json({
      Allow: false,
      Msg: msg
    });
    console.log(msg);
  }
  return false;
};

exports.plugin_authres = function(req, res) {
  res.json({
    Allow: true,
    Msg: "Allowed"
  });
};
