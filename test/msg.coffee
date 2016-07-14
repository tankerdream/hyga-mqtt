chai = require 'chai'
expect = chai.expect
Hyga = require '../'
config = 
  uuid:'9c417707-420d-4ff1-95b5-dfe9171d5cba',
  token:'52435eb0d78a761e1909793a6fdb15d4bf90570a'

hyga = new Hyga(config)

describe 'Testing msg', ->
  beforeEach (done) ->
    @result = false
    message =
      uuids: '3e9fd243-2d75-42a4-89b9-a4e70a51b58d',
      payload: '欢迎来到超星系!',
      from: '——超星系全体伙伴'
    getMsg = (@result, @resp) =>
      done()
    hyga.connect ->
      hyga.msg message, getMsg
          
  it 'should send message successfully', ->
    expect(@result).to.equal true
    
describe 'Testing onMsg', ->
  beforeEach (done) ->
    @message =
      uuids: '3e9fd243-2d75-42a4-89b9-a4e70a51b58d',
      payload: '欢迎来到超星系!',
      from: '——超星系全体伙伴'
    @expectedmessage =
      payload: '欢迎来到超星系!',
      from: '——超星系全体伙伴',
      fromuuids: '9c417707-420d-4ff1-95b5-dfe9171d5cba'
    msgHandler = (@message) => done()  
    hyga.connect ->
      hyga.msg @message
      hyga.onMsg msgHandler
        
  it 'should receive message successfully', ->
    expect(@message).to.equal @expectedmessage;