const mongoose = require('mongoose')
const cfg = require('../../config') //최초 계정 생성(admin)에 사용되는 정보값, Token secet 값

// DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead. 메세지 삭제
mongoose.set('useCreateIndex', true) 

//mongodb "userSchema" 설정
const userSchema = new mongoose.Schema({
    name: { type: String, default: '', index: true },
    age: { type: Number, default: 1 },
    id: { type: String, default: '', unique: true, index: true },  
    pwd: { type: String, default: '' },
    lv: { type: Number, default: 2 }, // 사용자의 페이지 권한
    inCnt: { type: Number, default: 0 }, // 사용자의 접속 횟수
    retry: { type: Number, default: 0 }
  })
  
const User = mongoose.model('User', userSchema)

// User.collection.dropIndexes({ name: 1 }) //인덱스를 초기화

User.findOne({ id: cfg.admin.id })
  .then((r) => {
    // console.log(r)
    if (!r) return User.create({ id: cfg.admin.id, pwd: cfg.admin.pwd, name: cfg.admin.name, lv: 0 })
    // if (r.lv === undefined) return User.updateOne({ _id: r._id }, { $set: { lv: 0, inCnt: 0 } }) // 임시.. 관리자 계정 레벨 0으로..
    return Promise.resolve(null)
  })
  .then((r) => {
    if (r) console.log(`admin:${r.id} created!`)
  })
  .catch((e) => {
    console.error(e.message)
  })

module.exports = User 