$(document).ready(function(){
    $(".logo").on("tap click",function(){
        if(navigator.geolocation){
            $(".container .name").html("<p class='city'> Loading... </p>")
            navigator.geolocation.getCurrentPosition(function(position){
            var yourWeather = "https://api.openweathermap.org/data/2.5/weather?lat="+ position.coords.latitude +"&lon="+position.coords.longitude+"&appid=0b06c0ee98969574f9f671e32e66fdbd"
            $.get(yourWeather, function(res){
                if(res.weather[0].main.toLowerCase() == "clear"){
                    userWeather = "Clear Skies"
                    $(".clouds").addClass("clear-skies")
                    $(".header").removeClass("snow-header rain-header")  
                    $(".container").removeClass("snow rain");                         
                }else if(res.weather[0].main.toLowerCase() == "rain" || res.weather[0].main.toLowerCase() == "drizzle"){
                    userWeather = "raining"
                    $(".clouds").removeClass("clear-skies snow-cloud").addClass("rain");
                    $(".header").addClass("rain-header");
                    $(".container").addClass("rain-container").removeClass("snow");
                }else if(res.weather[0].main.toLowerCase() == "snow" ){
                    userWeather = "snowing"
                    $(".container").addClass("snow");     
                    $(".clouds").removeClass("clear-skies").addClass("snow-cloud");                    
                    $(".header").addClass("snow-header")            
                }else if(res.weather[0].main.toLowerCase() == "clouds" ){
                    userWeather = "cloudy"
                    $(".clouds").removeClass("sclear-skies snow-cloud rain snow")
                    $(".header").removeClass("snow-header rain-header")  
                    $(".container").removeClass("snow rain");                         
                }else{
                    userWeather = res.weather[0].main
                    $(".header").removeClass("snow-header rain-header")            
                }
                $(".container .statement").html("<p>It is...</p>")
                $(".container .weather").html("<p>"+userWeather+"</p>")
                $(".container .name").html("<p class='city'> In "+res.name+"</p>").end()
                
                },"json");
            });
        }else{
            console.log("geoLocation is not supported on this browser");
        }
    });

});