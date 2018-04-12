function rad(d) {
    return d * Math.PI / 180.0;
}
//纬度，经度
function GetDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = rad(lat1);
    var radLat2 = rad(lat2);
    var a = radLat1 - radLat2;
    var b = rad(lng1) - rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}
/*
function calDis() {
    var lat1 = document.getElementById("lat1").value * 1;
    var lat2 = document.getElementById("lat2").value * 1;
    var lng1 = document.getElementById("lng1").value * 1;
    var lng2 = document.getElementById("lng2").value * 1;
    var dis = GetDistance(lat1, lng1, lat2, lng2);
    document.getElementById("distance").value = dis;
}
*/
function locaback() {

}
var coords, dis;
var flag;
function showJson(lat, lon, dis) {
    $.getJSON("http://api.map.baidu.com/geocoder/v2/?location=" + lat + "," + lon + "&callback=?&output=json&ak=I2KCehM1RiQrm4rB2QCnwidiTDDh5egh", function (data) {
        console.log(data.result.addressComponent.city + " " + dis);
        if (data.result.addressComponent.city)
            window.location.href = "addQuest.html" + "?dis=" + dis + "&city=" + encodeURI(data.result.addressComponent.city);
    });

}
var time = 0;
var clearLater = 400;
var btn;
var Tex;
function clear() {
    if (time >= clearLater) {
        document.getElementById("Layer1").style.display = "none";
    }
    else {
        time++;
        document.getElementById("Layer1").style.opacity = (clearLater - time) / clearLater;
        setTimeout("clear()", 1);
    }

}

onload = function () {
    initShare();
    document.addEventListener("WeixinJSBridgeReady", function () {
        // console.log("a");
        document.getElementById('media').play();
    }, false);
    flag = false;
    $(".img_1").slideDown(3000);
    function downTop_0() {
        var x = 0;
        console.log(x);
        $("#down_" + x).css("top", "70%");
        var css = {
            "top": "80%"
        };
        $("#down_" + x).animate(css, 2000, downTop_0);
    }
    function downTop_1() {
        var x = 1;
        console.log(x);
        $("#down_" + x).css("top", "70%");
        var css = {
            "top": "80%"
        };
        $("#down_" + x).animate(css, 2000, downTop_1);
    }
    function downTop_2() {
        var x = 2;
        console.log(x);
        $("#down_" + x).css("top", "70%");
        var css = {
            "top": "80%"
        };
        $("#down_" + x).animate(css, 2000, downTop_2);
    }
    downTop_0();
    downTop_1();
    downTop_2();
    var fx = 1;
    function btnBlink() {
        if (fx == 1) {
            var css = {
                "opacity": 0.7
            }
            fx = 0;
        }
        else if (fx == 0) {
            var css = {
                "opacity": 1
            }
            fx = 1;
        }
        else {
            $(".fblink").css("opacity", 1);
            return;
        }
        $(".fblink").animate(css, 200, btnBlink);
    }
    btnBlink();
    //setTimeout("clear()", 1000);
}
function getLocation() {
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(108.95, 34.27);
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        console.log(r.point)
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            coords = r.point;
            dis = GetDistance(r.point.lat, r.point.lng, 26.22, 111.63);//永州经纬度(维度在前,经度在后)
            dis = Math.round(dis);
            Tex.innerHTML = "还有" + dis + "公里";
            btn.innerText = "参与活动";
            flag = true;
            btn.innerText = "参与活动";
        }
    }, { enableHighAccuracy: true })
}
function getdis() {
    btn = document.getElementById("disBtn");
    Tex = document.getElementById("disText");

    if (btn.innerText == "获取我的位置") {
        btn.innerText = "正在获取";
        getLocation();
    }
    else if (btn.innerText == "参与活动") {
        if (!flag)
            window.location.href = "addQuest.html" + "?dis=" + 0 + "&city=" + encodeURI("位置获取失败");
        else {
            if (coords.latitude)
                showJson(coords.latitude, coords.longitude, dis);
            else
                showJson(coords.lat, coords.lng, dis);
        }
    }
}
