
const { gte } = require('semver');

module.exports = function computeBabelEnvTarget(isRenderer, electronVersion) {
  if (isRenderer) {
    return {
      electron: electronVersion
    };
  }

  let nodeVersion = "7.4.0";
  if (gte(electronVersion, "3.0.0")) {
    nodeVersion = "10.2.0";
  }
  else if (gte(electronVersion, "2.0.0")) {
    nodeVersion = "8.9.3";
  }
  else if (gte(electronVersion, "1.8.2")) {
    nodeVersion = "8.2.1";
  }
  else if (gte(electronVersion, "1.7.3")) {
    nodeVersion = "7.9.0";
  }

  return {
    node: nodeVersion
  };
}