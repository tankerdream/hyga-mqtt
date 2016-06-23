_               = require 'lodash'
url             = require 'url'
nodeUuid        = require 'node-uuid'
{EventEmitter2} = require 'eventemitter2'
debug           = require('debug')('hyga-mqtt')

class Hyga extends EventEmitter2
  constructor: (options={}, dependencies={})->
    super wildcard: true
    @mqtt = dependencies.mqtt ? require 'mqtt'
    defaults =
      keepalive: 10
      protocolId: 'MQIsdp'
      protocolVersion: 4
      qos: 0
      username: options.uuid
      password: options.token
      reconnectPeriod: 5000
    @options = _.defaults options, defaults
    @messageCallbacks = {}

  connect: (callback=->) =>
    uri = @_buildUri()
    @client = @mqtt.connect uri, @options
    @client.on 'error', @_errorHandler
    @setErrorHandler()
    @client.once 'connect', =>
      @client.subscribe @options.uuid, qos: @options.qos
      callback()
    @client.on 'message', @_messageHandler

  publish: (topic, data = {}, fn) =>
    throw new Error 'No Active Connection' unless @client?

    message = {}
    message.payload = data

    message.callbackId = nodeUuid.v1();
    @messageCallbacks[message.callbackId] = fn;

    messageString = JSON.stringify(message)
    debug 'publish', topic, messageString
    @client.publish topic, messageString

  # API Functions
  msg: (params, fn=->) =>
    @publish 'msg', params, fn

  brd: (params, fn=->) =>
    @publish 'brd', params, fn

  subBrd: (params, fn=->) =>
    @publish 'subBrd', params, fn

  device: (params, fn=->) =>
    @publish 'device', params, fn

  devices: (params, fn=->) =>
    @publish 'devices', params, fn

  unsubBrd: (params, fn=->) =>
    @publish 'unsubBrd', params, fn

  update: (params, fn=->) =>
    @publish 'update', params, fn

  pushWhiteList: (params, fn=->) =>
    @publish 'pushWhiteList', params, fn

  pullWhiteList: (params, fn=->) =>
    @publish 'pullWhiteList', params, fn

  pushBlackList: (params, fn=->) =>
    @publish 'pushBlackList', params, fn

  pullBlackList: (params, fn=->) =>
    @publish 'pullBlackList', params, fn

  getPublicKey: (params, fn=->) =>
    @publish 'getPublicKey', params, fn

  sesToken: (params, fn=->) =>
    @publish 'sesToken', params, fn

  whoAmI: (fn=->) =>
    @publish 'whoAmI', {}, fn

  unregister: (params, fn=->) =>
    @publish 'unregister', params, fn

  onMsg: (fn=@defaultHandler) =>
    @on 'msg', fn

  postData: (params, fn=->) =>
    @publish 'postData', params, fn

  putKey: (params, fn=->) =>
    @publish 'putKey', params, fn

  getKey: (params, fn=->) =>
    @publish 'getKey', params, fn

  onBrd: (fn=@defaultHandler) =>
    @on 'brd', fn

  setErrorHandler: (fn=@defaultHandler) =>
    @on 'err', fn

  defaultHandler: (message) =>
    console.log message

  # Private Functions
  _buildUri: =>
    uriOptions =
      protocol: 'mqtt'
      hostname: '127.0.0.1'
      port: 1883
    url.format uriOptions

  _errorHandler: (error,data) =>
    @emit 'err', error, data

  _messageHandler: (uuid, message) =>
    try
      message = JSON.parse message
    catch error
      debug 'unable to parse message', message

    debug '_messageHandler', message
    return @handleCallbackResponse message if message._callbackId?
    return @emit message.t, message.p

  handleCallbackResponse: (message) =>
    id = message._callbackId
    debug 'handleCallbackResponse', id
    callback = @messageCallbacks[id] ? ->
    callback message.s, message.p
    delete @messageCallbacks[id]
    return true

module.exports = Hyga