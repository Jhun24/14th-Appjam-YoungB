/**
 * Created by janghunlee on 2017. 12. 16..
 */

module.exports = menu;

function menu(app) {

    app.get('/menu/list',(req,res)=>{
        "use strict";
        console.log("Yeha")
        var menuList = [
            {
                "name":"라뽁이",
                "price":500,
                "image":"images/1.jpg"
            },
            {
                "name":"감자알칩",
                "price":500,
                "image":"images/2.jpg"
            },
            {
                "name":"계란쿠키",
                "price":500,
                "image":"images/3.jpg"
            },
            {
                "name":"캔디요미",
                "price":500,
                "image":"images/4.jpg"
            },
            {
                "name":"피크닉",
                "price":500,
                "image":"images/5.jpg"
            },
            {
                "name":"나나콘",
                "price":500,
                "image":"images/6.jpg"
            },
            {
                "name":"호두마루",
                "price":700,
                "image":"images/7.jpg"
            },
            {
                "name":"맛스타",
                "price":1200,
                "image":"images/8.jpg"
            },
            {
                "name":"나나콘",
                "price":500,
                "image":"images/9.jpg"
            }
        ]

        res.send(200,menuList);
    });
}