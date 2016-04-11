
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');


    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ',' +cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';

    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    //NYT AJAX request 
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' +cityStr + '&sort=newest&api-key=c346f4c7b9599929d2dbdb2448f05e90:10:73016388'
    $.getJSON (nytimesUrl, function(data) {

        $nytHeaderElem.text('New York Times Articles About '+ cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article =articles[i];
            $nytElem.append('<li class="article">' + 
                '<a href="'+article.web_url+'">'+article.headline.main+
                '</a>'+
                '<p>' + article.snippet + '</p>' +
                '</li>')
        };

    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');

    });


        return false;
};

$('#form-container').submit(loadData);

    
    //real post 
   
$(document).ready(function() {

            $("#submit").click(function() {
                //console.log($("#lastName").val());
                var formData = ConvertFormToJSON("#emailListForm");
                console.log("Data from form (to be sent): ", formData);

                $.ajax({
                    url: "ajax-post.php",
                    type: "POST",
                    dataType: "JSON",
                    data: formData,
                    success: function(data) {
                        console.log("Data returned from server: ", data);
                        var listData = "";
                       /*for(var key in data) {
                            listData += key + ":" + data[key] + " ";
                        }*/
                        $("#p1").text(data['firstName'] + [' '] + data['lastName']+[' '] + data['email']);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        $("#p1").text(jqXHR.statusText);
                    }
                });

                // from: http://www.developerdrive.com/2013/04/turning-a-form-element-into-json-and-submiting-it-via-jquery/
                function ConvertFormToJSON(form){
                    var array = $(form).serializeArray();
                    var json = {};

                    /*
                        Read the following as:
                          For every object in the array, use it's name and value
                          to add a new property to the JavaScript object that is
                          assigned to the variable 'json'. If the value of the
                          input/textArea/select is undefined, use an empty string
                          as the value.
                     */
                    jQuery.each(array, function() {
                        json[this.name] = this.value || '';
                    });
                    return json;
                }

            });

        });





 $( "#NMB" ).click(function() {
  $( "#form-container" ).fadeToggle( "slow", "linear" );
});
 
 // mini-game
 
 
var n = 0;
$( "div.enterleave" )
  .mouseenter(function() {
    $( "p:first", this ).text( "Game Start!" );
    $( "p:last", this ).text( ++n );
  })
  .mouseleave(function() {
    $( "p:first", this ).text( "Game Over!" );
  });
