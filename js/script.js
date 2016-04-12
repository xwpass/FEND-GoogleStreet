
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr+','+cityStr;

    $greeting.text('you want to see'+address+'?');


    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+address+'';


    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    //NYTimes AJAX request 
    //NYT api
var nytimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+cityStr+'=2&sort=newest&api-key=c346f4c7b9599929d2dbdb2448f05e90:10:73016388';

$.getJSON(nytimesURL, function (data){
    $nytHeaderElem.text('New York Times' +cityStr);

    articles = data.response.docs;
    for (var i =0; i< articles.length; i++){
        var article = articles[i];
        $nytElem.append('<li class = "article"><a href="'+article.web_url+'">'+article.headline.main+'</a><p>'+article.snippet+'</p></li>');
    };

}).fail(function(){
    $nytHeaderElem.text('NYT can not be loaded!');
});

//wiki api
var wikiUrl = "http://en.wikipdsadsaedia.org/w/api.php?action=opensearch&search="+cityStr+"&format=json&callback=wikiCallback";


//Error Handling with JSON P 
var wikiRequestTimeout = setTimeout(function(){
    $wikiElem.text("failed to get wikipedia resources");
}, 5000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);


