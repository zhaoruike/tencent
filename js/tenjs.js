/**
 * Created by Administrator on 2016/6/15 0015.
 */
var tools = (function () {
    function lunbotu() {
        var oLunbotu = document.getElementById("lunbotu");
        var selectBox = document.getElementById("select_box")
        var selecttextBox = document.getElementById("select_textbox")
        var selectspans = utils.getChildren(selecttextBox, "span")
        var selectul = utils.getChildren(selectBox, "ul")
        var selectul1 = selectul[0]
        var selectul2 = selectul[1]
        var selectlis1 = utils.getChildren(selectul1, "li")
        var selectlis2 = utils.getChildren(selectul2, "li")
        var selecti = utils.getChildren(selectBox, "i")
        var oUls = oLunbotu.getElementsByTagName("ul");
        var oUl1 = oUls[0]
        var oLis = oUl1.getElementsByTagName("li");
        var step = 0;
        oLis[0].style.zIndex = 6
        oLunbotu.autotimer = window.setInterval(auto, 2000)
        function auto() {
            autoshow(step)
            autoshowul(step)
            step++
            if (step > 13) {
                step = 0;
            }
        }

        function autoshow(step) {
            for (var i = 0; i < oLis.length; i++) {
                var curl = oLis[i]
                var curspan = selectspans[i]
                animate(curl, {"opacity": "0"}, 600)
                utils.removeClass(curspan, "select_ontxt")
                curl.style.zIndex = 0
            }
            animate(oLis[step], {"opacity": "1"}, 600)
            utils.addClass(selectspans[step], "select_ontxt")
            oLis[step].style.zIndex = 6
        }

        function autoshowul(step) {
            if (step < 7 && step >= 0) {
                utils.removeClass(selectul1, "set_circle_select1")
                utils.addClass(selectul2, "set_circle_select1")
                for (var i = 0; i < selectlis1.length; i++) {
                    var curul = selectlis1[i];
                    utils.removeClass(curul, "select_sonon")
                }
                utils.addClass(selectlis1[step], "select_sonon")
            } else if (step < 14 && step > 6) {
                utils.removeClass(selectul2, "set_circle_select1")
                utils.addClass(selectul1, "set_circle_select1")
                for (var i = 0; i < selectlis2.length; i++) {
                    var curul = selectlis2[i];
                    utils.removeClass(curul, "select_sonon")
                }
                var curstep = step % 7
                utils.addClass(selectlis2[curstep], "select_sonon")
            }
        }

        oLunbotu.onmouseover = function () {
            window.clearInterval(oLunbotu.autotimer)
        }
        oLunbotu.onmouseout = function () {
            oLunbotu.autotimer = window.setInterval(auto, 2000)
        }
        function handul() {
            if (step < 7 && step >= 0) {
                utils.removeClass(selectul2, "set_circle_select1")
                utils.addClass(selectul1, "set_circle_select1")
                step = 7
                autoshow(step)
                var curstep = step % 7
                for (var i = 0; i < selectlis1.length; i++) {
                    var curul = selectlis1[i];
                    utils.removeClass(curul, "select_sonon")
                }
                utils.addClass(selectlis1[curstep], "select_sonon")
            } else if (step < 14 && step > 6) {
                utils.removeClass(selectul1, "set_circle_select1")
                utils.addClass(selectul2, "set_circle_select1")
                for (var i = 0; i < selectlis2.length; i++) {
                    var curul = selectlis2[i];
                    utils.removeClass(curul, "select_sonon")
                }
                step = 0
                autoshow(step)
                utils.addClass(selectlis2[step], "select_sonon")
            }
        }

        selecti[0].onclick = handul;
        selecti[1].onclick = handul;
        function handli(step) {
            autoshow(step)
            autoshowul(step)
            //for(var i=0;i<7;i++){
            //    if(step<7&&step>=0){
            //        utils.removeClass(selectlis1[i],select_sonon)
            //        utils.addClass(selectlis1[step],select_sonon)
            //    }
            //    else if(step>7&&step<14){
            //        var curstep=step%7
            //        utils.removeClass(selectlis2[i],select_sonon)
            //        utils.addClass(selectlis2[curstep],select_sonon)
            //    }
            //}
        }

        for (var i = 0; i < 7; i++) {
            selectlis1[i].i = i
            selectlis2[i].i = i
            selectlis1[i].onclick = function () {
                step = this.i
                handli(step)
            }
            selectlis2[i].onclick = function () {
                step = this.i + 7
                handli(step)
            }
        }
    }

    function toMimute() {
        var toShowBox = document.getElementById("toshowBox")
        var oLis = toShowBox.getElementsByTagName("li")
        var siblings = []
        for (var i = 0; i < oLis.length; i++) {
            oLis[i].onmouseover = function () {
                var childlast = utils.lastChild(this)
                siblings = utils.siblings(this)
                var next = utils.next(this) || utils.pre(this)
                animate(this, {"width": 992}, 100)
                animate(childlast, {"width": 744}, 100)
                for (var i = 0; i < siblings.length; i++) {
                    animate(siblings[i], {"width": 0}, 100)
                }
                animate(next, {"width": 248}, 100)
            }
            oLis[i].onmouseout = function () {
                var childlast = utils.lastChild(this)
                siblings = utils.siblings(this)
                var next = utils.next(this)
                animate(childlast, {"width": 0}, 100)
                animate(this, {"width": 248}, 100)
                for (var i = 0; i < siblings.length; i++) {
                    animate(siblings[i], {"width": 248}, 100)
                }
            }
        }
    }

    function headSH() {
        var head = document.getElementById("head")
        var preScroll = document.documentElement.scrollTop || document.body.scrollTop;
        window.onscroll = function () {
            var nextScroll = document.documentElement.scrollTop || document.body.scrollTop;

            if (nextScroll > preScroll) {
                utils.setCss(head, "display", "none")
            }
            else {
                utils.setCss(head, "display", "block")
            }
            preScroll = nextScroll;
        }
    }

    function toHead() {
        var lazy1 = document.getElementById("board1")
        var head = document.getElementById("head")
        var preScroll = document.documentElement.scrollTop || document.body.scrollTop;
        var toTop = document.getElementById("totop")
        window.onscroll = function () {
            lazy(lazy1);
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop >= utils.getWin("clientHeight")) {
                utils.setCss(toTop, "display", "block")
            } else {
                utils.setCss(toTop, "display", "none")
            }
            if (scrollTop > preScroll) {
                utils.setCss(head, "display", "none")
            }
            else {
                utils.setCss(head, "display", "block")
            }
            preScroll = scrollTop;
            toTop.onclick = function () {
                toTop.timer = window.setInterval(function () {
                    if (scrollTop <= 0) {
                        window.clearInterval(toTop.timer)
                        return
                    }
                    utils.getWin("scrollTop", scrollTop)
                    scrollTop -= 10;
                }, 10)
            }
        }
    }

    function lazy(ele) {
        var oImg = ele.getElementsByTagName("img")
        var offsetTop = utils.offset(ele).t + ele.offsetHeight;
        var winScrollTop = utils.getWin("scrollTop") + utils.getWin("clientHeight")
        for (var i = 0; i < oImg.length; i++) {
            var realsrc = oImg[i].getAttribute("realsrc");
            if (offsetTop <= (winScrollTop)) {
                oImg[i].src = realsrc;
            }
        }
    }

    function dataBind() {
        var link = document.getElementById("link");
        var oLis = utils.getChildren(link, 'li')
        var data = null
        var xhr = new XMLHttpRequest();
        xhr.open("get", "data/data.json", true)
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (/^2\d{2}$/.test(xhr.status))) {
                data = utils.toJSON(xhr.responseText)
                for (var i = 0; i < data.length; i++) {
                    var frag = document.createDocumentFragment();
                    var obj = data[i]
                    for (var attr in obj) {
                        var oA = document.createElement("a")
                        oA.innerHTML = obj[attr]
                        frag.appendChild(oA)
                    }
                    oLis[i].appendChild(frag)
                }
            }
        }

        xhr.send(null)
        console.log(data)

    }
    function loginjs(){
        var login=document.getElementById("login")
        var setlogin=document.getElementById("setlogin")
        var qqlogin=document.getElementById("qqlogin")
        var wxlogin=document.getElementById("wxlogin")
        var spans=utils.getChildren(login,"span")
        var user=document.getElementById("quick_user")
        spans[0].onmouseover=function(){
            utils.setCss(this,"display","none");
            utils.setCss(spans[1],"display","block")
        }
        spans[1].onmouseout=function(){
            utils.setCss(this,"display","none");
            utils.setCss(spans[0],"display","block")
        }
        spans[1].onclick=function(){
         utils.setCss(setlogin,"display","none")
        }
        user.onclick=function(){
            utils.setCss(setlogin,"display","block")
        }
        qqlogin.onmouseover=function(){
            utils.setCss(this,"backgroundPosition","-200px -280px")
        }
        qqlogin.onmouseout=function(){
            utils.setCss(this,"backgroundPosition","0px -280px")
        }
        wxlogin.onmouseover=function(){
            utils.setCss(this,"backgroundPosition","-200px -230px")
        }
        wxlogin.onmouseout=function(){
            utils.setCss(this,"backgroundPosition","0px -230px")
        }
    }
    return {
        lunbotu: lunbotu,
        toMinute: toMimute,
        headSH: headSH,
        toHead: toHead,
        dataBind: dataBind,
        login:loginjs
    }
})()


