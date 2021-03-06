/**
 * @author Juliano Castilho <julianocomg@gmail.com>
 */
var Transport = require('./Transport');
var dgram = require('dgram');

/**
 * @param {String} host
 * @param {Number} port
 */
function Udp(host, port) {
  this.host = host.replace('udp://', '');
  this.port = port;
};
 
Udp.prototype = new Transport();
 
/**
 * @param {String} payload
 */
Udp.prototype.send = function(payload) {
  var client = dgram.createSocket('udp4');
  var payload = new Buffer(payload);

  client.send(payload, 0, payload.length, this.port, this.host, function(error) {
      if (error) {
        throw error;
      }
      client.close();
    }
  );
};

module.exports = Udp;
