;
(function () {

    
        var api = "https://fcc-weather-api.glitch.me/api/current?",
            lat, lon,
            tempUnit = "C",
            currentTempInCelsius;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = "lat=" + position.coords.latitude;
                var lon = "lon=" + position.coords.longitude;
                getWeather(lat,lon);
            })
        } else {
            alert("please let me get ur position ~");
        }

        $("#tempUnit").click(function(){
            var currentTempUnit=$("#tempUnit").text();
            currentTempUnit=currentTempUnit==="C"?"F":"C";
            $("#tempUnit").text(currentTempUnit);
            var temp=$("#temp")
            if(currentTempUnit==="F"){
                var ftemp=Math.round(parseInt(temp.text())*9/5+32)
                temp.text(ftemp+" "+String.fromCharCode(176))
            }else{
                temp.text(currentTempInCelsius+" "+String.fromCharCode(176))
            }
        })
        
        // getWeather("lat=30.64995","lon=104.18755");

        function getWeather(lat, lon) {
            var urlStr = api + lat + '&' + lon;
            $.ajax({
                    url: urlStr,
                    success: function (rst) {
                        $("#city").text(rst.name+" ");
                        $("#country").text(rst.sys.country);
                        currentTempInCelsius = Math.round(rst.main.temp);
                        $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176))
                        $("#tempUnit").text(tempUnit)
                        $("#desc").text(rst.weather[0].description)
                        }
                    })
            }
        }())