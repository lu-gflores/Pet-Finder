$(document).ready(function () {
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: '2',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        }
    })


// ----hiking project API
    function getTrails(a, b){

        $.ajax({
            url: "https://www.hikingproject.com/data/get-trails?lat=" + a + "&lon=" + b +"&maxDistance=10&key=200758271-3165bfaa7d6b0bedfbf0fcdfbad4ec16",
            method: 'GET'
        }).then(function(response){
            console.log(response.trails[0])
            $('#trail1').attr('src',response.trails[0].imgSmallMed)
            $('#trail2').attr('src',response.trails[1].imgSmallMed)
            $('#trail3').attr('src',response.trails[2].imgSmallMed)
            $('#trail4').attr('src',response.trails[3].imgSmallMed)
            $('#trail5').attr('src',response.trails[4].imgSmallMed)

            //append results to cards?
        
    })
    }



    
//search event listener, changing certain elements to ids soon
var savedPages =  JSON.parse(localStorage.getItem("searches")) || []; //may put this in a function to load saved pages

$("button").on("click", function(event) {
    event.preventDefault();
    var searchInput = $("input").val().trim();

    savedPages.push(searchInput); 
    localStorage.setItem("searches").JSON.stringify(savedPages);

    cityLocation(searchInput);//passing user input to cityLocation

})


// ----Weather API for retrieving longitude and latitude and pass to hiking project api
function cityLocation(cityName) {

    var locationAPIKey = "&appid=0888bb26c1d027c60cb2417244156801";
    var locationURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + locationAPIKey;

    $.ajax ({
        url: locationURL,
        method: "GET"
    }).then(function(response) {
       
        var long = response.coord.lon;
        var lat = response.coord.lat;
        console.log(lat);
        console.log(long);

        //not needed for now, only need to pass lat & long
        /*
        var divEl = $("<div>").addClass("coordinates")
        var locationLon = $("<p>").text("Longitude: " + long);
        var locationLat = $("<p>").text("Latitude: " + lat);
        divEl.append(locationLon, locationLat);
        */
        getTrails(lat, long); //passing longitude and latitude parameters to get trail results
    })
}   

    //cityLocation("Charlotte") testing
})