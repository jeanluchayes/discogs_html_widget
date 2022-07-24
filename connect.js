var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};
  
  var AppSecret = {
    client_id  : "lkAgTInocxZZfKsTSasn",
    client_secret : "tcBYdskqALSsLDENnoBBRxXtJWCgwboj"
  }

  $(document).ready(function()
  {
    //$("#myid").addClass("highlight");
    $(".discogs-loading").show();

    var release_param = getUrlParameter('release');

    $.getJSON("https://api.discogs.com/releases/" + release_param + "?&format=js&key=" + AppSecret.client_id + "&secret=" + AppSecret.client_secret + "&callback=", function(data)
    {  
      $(".discogs-loading").hide();

      //Getting the Album Info
      // content = '<tr class="discogs-table"><td>'+data.artists[0].name+
      //     '</td><td class="discogs-link"><a href="http://www.discogs.com/release/'+data.id+'">'+
      //       data.title+'</a></td><td>'+
      //         data.labels[0].name+'</td><td>'+
      //           data.formats[0].name+'</td><td>'+
      //             data.year+'</td></tr>';
      //   $(content).appendTo("#discogs_albums_body");

      //Change Image SRC
      document.getElementById("discogs_album_art").src = data.images[0].resource_url;

      //Change Album Title
    //   document.getElementsByClassName("discogs_album_title")[0].innerHTML += '<span class="discogs_album_title_span">' +
    //     '<a href="http://www.discogs.com/artist/' + data.artists[0].id + '" hreflang="en" class="discogs_album_artist_href">' +
    //       data.artists[0].name + '</a></span> - <!-- --><a href="http://www.discogs.com/release/' + data.id + '"' +
    //        'hreflang="en" class="discogs_album_title_href">' + data.title + '</h1>';

      document.getElementsByClassName("discogs_album_title")[0].innerHTML += '<span class="discogs_album_title_span">' +
        '<a href="http://www.discogs.com/release/' + data.id + '"' + 'hreflang="en" class="discogs_album_title_href">' +
        data.title + '</a></span> <br> by <!-- --><a href="http://www.discogs.com/artist/' + data.artists[0].id + '"' + 
        'hreflang="en" class="discogs_album_artist_href">' + data.artists[0].name + '</h1>';


 

      //Change Album Label
      document.getElementsByClassName("discogs_album_label")[0].innerHTML += '<a href="http://www.discogs.com/label/'+ data.labels[0].id +'"'+
      'hreflang="en" class="link_1ctor">' + data.labels[0].name + '</a> - ' + data.labels[0].catno + '</td>';

      //Change Album Format
      content_album_format = '<a class="discogs_album_format_href">' +
          data.formats[0].name + '</a> <!-- -->';
      $.each(data.formats[0].descriptions, function(i, format_desc){
        content_album_format += ',' + format_desc;
      });
      document.getElementsByClassName("discogs_album_format")[0].innerHTML += content_album_format;

      //Change Country
      document.getElementsByClassName("discogs_album_country")[0].innerHTML += '<a class="discogs_album_country">' + data.country + '</a>';

      //Change Released Date
      document.getElementsByClassName("discogs_album_release_date")[0].innerHTML += '<a class="discogs_album_release_date"><time datetime="' +
        data.released + '"' + '>' + data.released_formatted + '</time></a>';

      //Change Genre
      document.getElementsByClassName("discogs_album_genre")[0].innerHTML += '<a class="discogs_album_genre">' + 
        data.genres[0] + '</a>';

      //Change Style
      content_album_styles = '<a class="discogs_album_style">';
      $.each(data.styles, function(i, album_styles){
        if (i == 0)
        {
          content_album_styles += album_styles;
        }
        else
        {
          content_album_styles += ',' + album_styles;
        }
      });
      content_album_styles += '</a> <!-- -->';
      document.getElementsByClassName("discogs_album_style")[0].innerHTML += content_album_styles;


      
      //Getting the Album Tracklist
      $.each(data.tracklist, function(i, track){
        content_album_tracklist = '<tr class="discogs_tracklist_data"><td>' + track.position + '</td>'+
        //style="width: max-content
          '<td>' + track.title + '</td>';
          $(content_album_tracklist).appendTo("#discogs_tracklist_body");
          //console.log(data.tracklist);
      });

        //console.log(data);


    });
      //$(".discogs-link").click(function() {
      //  window.open($(this).data("href"));
      //});

    //console.log(data);
});