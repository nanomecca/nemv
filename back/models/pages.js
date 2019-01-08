const mongoose = require('mongoose')
const cfg = require('../../config')

mongoose.set('useCreateIndex', true)
const pageSchema = new mongoose.Schema({
  name: { type: String, default: '', index: true }, // 주소의 URL을 등록
  inCnt: { type: Number, default: 0 }, // 페이지 조회수
  lv: { type: Number, default: 0 } //page의 접속 레벌
})

module.exports = mongoose.model('Page', pageSchema)
