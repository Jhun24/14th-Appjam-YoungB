# API Docs

# Schema

## User Schema

> id : String

    유저 id를 의미합니다

> password : String

    유저 비밀번호를 의미합니다

> name : String

    유저 이름을 의미합니다

> school : String

    유저 학교를 의미합니다
    
> class : String

    유저 반을 의미합니다

> token : String

    유저 토큰을 의미합니다

> cardNumber : String

    유저 카드 번호를 의미합니다

> cardPassword : String

    유저 카드 비밀번호를 의미합니다

> cardBirthday : String

    유저 카드에 등록된 생일을 의미합니다

> cardExpiry : String
    
    유저 카드 만료일을 의미합니다

> status : String

    유저가 빵셔틀을 불렀는지 체크를 의미합니다

## call Schema

> school : String

    빵셔틀을 불른 유저의 학교를 의미합니다

> name : String

    빵셔틀을 불른 유저의 이름을 의미합니다
    
> class : String
    
    빵셔틀을 불른 유저의 반을 의미합니다

> price : String

    빵 사올 가격을 의미합니다

> tip : String

    빵 사올때 주는 수수료를 의미합니다

> type : String

    빵 결재 방식을 의미합니다

> menu : Object

    빵 종류를 의미합니다

> userToken : String

    빵셔틀을 불른 유저의 토큰을 의미합니다

> callToken : String

    요청 리스트의 토큰
    
    
## Shuttle Schema

> school

    빵셔틀을 불른 유저의 학교를 의미합니다

> name : String

    빵셔틀을 불른 유저의 이름을 의미합니다
    
> class : String
    
    빵셔틀을 불른 유저의 반을 의미합니다

> price : String

    빵 사올 가격을 의미합니다

> tip : String

    빵 사올때 주는 수수료를 의미합니다

> type : String

    빵 결재 방식을 의미합니다

> menu : Object

    빵 종류를 의미합니다

> userToken : String

    빵셔틀을 불른 유저의 토큰을 의미합니다
    
> shuttleToken : String
    
    빵셔틀의 토큰을 의미합니다
    
> shuttleName : String

    빵셔틀의 이름을 의미합니다

# Query

## /auth

## /auth/facebook/token

## /auth/facebook/callback

### POST : /auth/login

    로그인 때 사용하는 쿼리입니다

> request

    id : 유저 id
    
    password : 유저 비밀번호
    
> response

    유저토큰을 반환합니다

> response : Error

    server status 404
    
    Error Message : User Not Found
    
### POST : /auth/register

    회원가입때 사용하는 쿼리입니다

> request

    id : 유저 id
    
    password : 유저 비밀번호
    
    name : 유저 이름
    
> response

    유저토큰을 반환합니다
    
> response : Error

    server status 409
    
    Error Message : User Already Exist

### POST : /auth/update/school

    학교정보와 반정보를 업데이트할때 쓰는 쿼리입니다

> request

    school : 유저 학교
    
    class : 유저 반
    
    token : 유저 토큰
    
> response

    sever code 200
    
> response : Error

    server status 404
    
        
## /call

### GET : /call/list?token=유저토큰

    현재 매점 주문 목록을 받아오는 쿼리입니다
    
    학교별로만 출력됨

> request

    token : 유저 토큰
    
> response

    현재 학교의 빵셔틀 요청 array 반환
    
    call Schema 참조
    
> response : Error

    server status 404
    
    Error Message : User Not Found    
   
### POST :  /call/shuttle

    매점 주문을 추가하는 쿼리입니다

> request

    token : 유저 토큰
    
    tip : 빵셔틀 수수료
    
    price: 빵가격
    
    type : 지불 방식 (미리결제 , 현금결제 , 대신구매)
    
    menu : 빵 목록
    
    EX : { "맛스타" : 2,"호두마루" : 1}
    
>  response

    server status 200
    
> response : Error

    server status 404
    
    Error Message : User Not Found
        
        
### POST :  /call/shuttle/accept

    매점 주문을 수락하는 쿼리입니다

> request

    token : 빵셔틀 하는 유저의 토큰
    
    callToken : 빵셔틀 요청글의 토큰
    
> response

    server status 200
    
> response : Error

    server status 404
    
    Error Message : Token Error
    
### GET : /call/shuttle/list?token=유저토큰

    현재 매점 주문 배달 상태를 확인하는 쿼리입니다
    
    카카오택시 배차상태

> request

    token : 유저 토큰
    
> response

    현재 빵셔틀을 시키거나 빵셔틀 중인 리스트 array
    
> response : Error

    server status 404

### POST : /call/shuttle/finish

    매점 배달을 완료했을때 보내는 쿼리입니다

> request

    token : 유저 토큰
    
> response

    server status 200
    
> response : Error

    server status 404
    
    Error Message : User Not Found

## /menu

### GET : /menu/list

    매점 매뉴를 받아오는 쿼리입니다

> request

    파라미터가 없습니다
    
> response

    매뉴 리스트 array
    
## /payment

### POST : /payment/update/card

    카드 번호를 등록하는 쿼리입니다
    
> request

    token : 유저토큰
    
    cardNumber : 유저 카드 번호
    
    cardPassword : 유저 카드 비밀번호 앞 두자리
    
    cardExpiry : 유저 카드 만료일
    
    cardBirthday : 유저 생일
    
> response

    server code 200
    
> response : Error

    server status 404
    
    Error Message : User Not Found

### POST : /payment/charge

    등록된 카드로 파라미터 액수만큼 결재합니다
    
> request
    
    token : 유저 토큰
    
    amount : 결재할 액수
    
> response

    server stauts 200
    
> response : Error

    server status 404
    
    Error Message : User Not Found
    
