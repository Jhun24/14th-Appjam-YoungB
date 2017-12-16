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

### /auth/login

> request

    id : 유저 id
    
    password : 유저 비밀번호
    
> response

    유저토큰을 반환합니다
    
### /auth/register

> request

    id : 유저 id
    
    password : 유저 비밀번호
    
    name : 유저 이름
    
> response

    유저토큰을 반환합니다

### /auth/update/school


> request

    school : 유저 학교
    
    class : 유저 반
    
    token : 유저 토큰
    
> response

    sever code 200