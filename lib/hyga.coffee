_               = require 'lodash'
url             = require 'url'
nodeUuid        = require 'node-uuid'
{EventEmitter2} = require 'eventemitter2'
debug           = require('debug')('hyga-mqtt')

PROXY_EVENTS = ['close', 'error', 'reconnect', 'offline', 'pong', 'open', 'config', 'data']

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
      response = _.pick @options, 'uuid', 'token'
      @client.subscribe @options.uuid, qos: @options.qos
      @client.on 'message', @_messageHandler
      callback response

  publish: (topic, data, fn) =>
    throw new Error 'No Active Connection' unless @client?

    if !data
      dataString = {}
    else if _.isString data
      dataString = data
    else
#      TODO 暂时没必要判断,为将来添加ack参考格式
      if _.isFunction(fn)
        data.callbackId = nodeUuid.v1();
        @messageCallbacks[data.callbackId] = fn;
      dataString = JSON.stringify(data)
    debug 'publish', topic, dataString
    @client.publish topic, dataString

  # API Functions
  message: (params, fn=->) =>
    @publish 'message', params, fn

  broadcast: (params, fn=->) =>
    @publish 'broadcast', params, fn

  subBroadcast: (params, fn=->) =>
    @publish 'subBroadcast', params, fn

  unsubBroadcast: (params, fn=->) =>
    @publish 'unsubBroadcast', params, fn

  update: (data, fn=->) =>
    @publish 'update', data, fn

  getPublicKey: (data, fn=->) =>
    @publish 'getPublicKey', data, fn

  getToken: (data, fn=->) =>
    @publish 'getToken', data, fn

  whoami: (fn=->) =>
    @publish 'whoami', {}, fn

  setMessageHandler: (fn=@defaultHandler) =>
    @on 'message', fn

  setConfigHandler: (fn=@defaultHandler) =>
    @on 'config', fn

  setDataHandler: (fn=@defaultHandler) =>
    @on 'data', fn

  setBroadcastHandler: (fn=@defaultHandler) =>
    @on 'broadcast', fn

  setErrorHandler: (fn=@defaultHandler) =>
    @on 'error', fn

  defaultHandler: (message) =>
    console.log message

  # Private Functions
  _buildUri: =>
    uriOptions =
      protocol: 'mqtt'
      hostname: 'localhost'
      port: 1883
    url.format uriOptions

  _errorHandler: (error,data) =>
    @emit 'error', error, data

  _messageHandler: (uuid, message) =>
    try
      message = JSON.parse message
    catch error
      debug 'unable to parse message', message

    debug '_messageHandler', message
    return @handleCallbackResponse message if message._callbackId?
    return @emit message.type, message.payload

  handleCallbackResponse: (message) =>
    id = message._callbackId
    debug 'handleCallbackResponse', id
    callback = @messageCallbacks[id] ? ->
    callback message.success, message.payload
    delete @messageCallbacks[id]
    return true

module.exports = Hyga