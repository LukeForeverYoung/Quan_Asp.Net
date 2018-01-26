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
function getdis () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            var coords = pos.coords;
            console.log(coords);
            var dis = GetDistance(coords.latitude, coords.longitude, 26.22, 111.63);//永州经纬度(维度在前,经度在后)
            window.location.href = "addQuest.html" + "?dis=" + dis;
        });
    }
    else
        console.log("获取失败，请检查是否支持位置信息读取。");
}
