var express = require('express');
var router = express.Router();
var createError = require('http-errors'); //예외처리
const jwt = require('jsonwebtoken')
const cfg = require('../../../config')
router.use('/sign', require('./sign'))

const verifyToken = (t) => { // 't'는 생성된 Token값
  return new Promise((resolve, reject) => {
    if (!t) resolve({ id: 'guest', name: '손님', lv: 3 }) // token이 undefined 이면 손님
    if ((typeof t) !== 'string') reject(new Error('문자가 아님 토큰입니다.'))
    if (t.length < 10) resolve({ id: 'guest', name: '손님', lv: 3 }) //문자열 체크를 넣은 이유는 토큰이 없을때 ‘null’로 문자 4글자가 오기 때문입니다. null도 손님
    jwt.verify(t, cfg.secretKey, (err, v) => { // secretKey를 이용하여 전달 받은 Token을 복호화하여 ID, Age값을 확인함
      if (err) reject(err)
      console.log('토큰복호화:', v)
      resolve(v)
    })
  })
}
router.all('*', function(req, res, next) {
  // 토큰 검사
  const token = req.headers.authorization // headers로 전송되는 값 중 authorization(Token 키값)
  console.log(token);  
  verifyToken(token) // verifyToken 함수를 호출
    .then(v => {
      req.user = v // req.user에 값을 저장
      console.log('req.user값', req.user);      
      next()
    })
    .catch(e => res.send({ success: false, msg: e.message }))
})

router.use('/page', require('./manage/page'))

router.all('*', function(req, res, next) {
  // 또 검사해도 됨
  if (req.user.lv > 2) return res.send({ success: false, msg: '권한이 없습니다.' })
  next()
})
router.use('/manage', require('./manage'))
router.use('/user', require('./user'))
router.use('/test', require('./test'))

//예외처리 라우터
router.all('*', function(req, res, next) {
    next(createError(404, '그런 api 없어'));
  });

module.exports = router;
