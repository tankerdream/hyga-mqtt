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

  connect: (callback=->) =>
    uri = @_buildUri()
    @client = @mqtt.connect uri, @options
    @client.on 'error', @_errorHandler

    @client.once 'connect', =>
      response = _.pick @options, 'uuid', 'token'
      @client.subscribe @options.uuid, qos: @options.qos
      callback response

    @client.on 'message', @_messageHandler

  publish: (topic, data, fn=->) =>
    throw new Error 'No Active Connection' unless @client?

    if !data
      dataString = {}
    else if _.isString data
      dataString = data
    else
      data.callbackId = nodeUuid.v1();
      @messageCallbacks[data.callbackId] = fn;
      dataString = JSON.stringify(data)
    debug 'publish', topic, dataString
    @client.publish topic, dataString

  # API Functions
  message: (params) =>
    @publish 'message', params

  subscribe: (params) =>
    @client.subscribe params

  unsubscribe: (params) =>
    @client.unsubscribe params

  update: (data, fn=->) =>
    @publish 'update', data, fn

  resetToken: (data, fn=->) =>
    @publish 'resetToken', data, fn

  getPublicKey: (data, fn=->) =>
    @publish 'getPublicKey', data, fn

  generateAndStoreToken: (data, fn=->) =>
    @publish 'generateAndStoreToken', data, fn

  whoami: (fn=->) =>
    @publish 'whoami', {}, fn

  # Private Functions
  _buildUri: =>
    uriOptions =
      protocol: 'mqtt'
      hostname: 'localhost'
      port: 1883
    url.format uriOptions

  _errorHandler: (error,data) =>
    @onError(error,data)

  _messageHandler: (uuid, message) =>
    message = message.toString()
    try
      message = JSON.parse message
    catch error
      debug 'unable to parse message', message

    debug '_messageHandler', message.topic, message.data
    return if @handleCallbackResponse message
    return @emit message.topic, message.data

  handleCallbackResponse: (message) =>
    id = message._request?.callbackId
    return false unless id?
    callback = @messageCallbacks[id] ? ->
    callback message.data if message.topic == 'error'
    callback null, message.data if message.topic != 'error'
    delete @messageCallbacks[id]
    return true

module.exports = Hyga
