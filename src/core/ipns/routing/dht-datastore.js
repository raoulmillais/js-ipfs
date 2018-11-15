'use strict'

const { Key } = require('interface-datastore')
const { encodeBase32 } = require('./utils')

// Offline datastore aims to mimic the same encoding as routing when storing records
// to the local datastore ????????
class DhtDatastore {
  constructor(dht) {
    this._dht = dht
  }

  /**
   * Put a value to the local datastore indexed by the received key properly encoded.
   * @param {Buffer} key identifier of the value.
   * @param {Buffer} value value to be stored.
   * @param {function(Error)} callback
   * @returns {void}
   */
  put(key, value, callback) {
    // encode key properly - base32(/ipns/{cid})
    const routingKey = new Key('/' + encodeBase32(key), false)

    this._dht.put(routingKey.toBuffer(), value, callback)
  }

  /**
   * Get a value from the local datastore indexed by the received key properly encoded.
   * @param {Buffer} key identifier of the value to be obtained.
   * @param {function(Error, Buffer)} callback
   * @returns {void}
   */
  get(key, callback) {
    // encode key properly - base32(/ipns/{cid})
    const routingKey = new Key('/' + encodeBase32(key), false)

    this._dht.get(routingKey.toBuffer(), callback)
  }
}

exports = module.exports = DhtDatastore
