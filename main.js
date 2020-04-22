$(document).ready(function() {
  var contPage = $("#cont-film");
  var source = $("#movie-template").html();
  var template = Handlebars.compile(source);

  $("#button").click(function(){
    contPage.html("");
    var film = $("#search");
    var filmVAl = film.val();

    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: 'GET',
      data: {
        api_key: "a581ed7fd10829db7bb800ef1b7f1f05",
        language: "it-IT",
        query: filmVAl,
      },
      success: function(risultato) {
        var listaFilm = risultato.results;
        for (var i = 0; i < listaFilm.length; i++) {
          listaFilm[i]
          var filmCorrente = listaFilm[i]
          var voto = filmCorrente.vote_average
          var voto5 = parseInt(voto / 2);
          var stelle = "";
          for(var s = 1; s <= 5; s++) {
            if(s <= voto5) {
              stelle += '<i class="fas fa-star"></i>';
            } else {
              stelle += '<i class="far fa-star"></i>';
            }
          };
          var arrayLanguage = ["it", "en"];
          if(arrayLanguage.includes(filmCorrente.original_language)){
            var bandiera = '<img src="img/' + filmCorrente.original_language + '.png" alt="">';
          } else {
            bandiera = filmCorrente.original_language;
          };
          var context = {
            title: "Il titolo del film è :" + " " + filmCorrente.title,
            original_title: "Il titolo originale del film è :" + " " + filmCorrente.original_title,
            original_language: "La lingua originale del film è :" + " " + bandiera,
            vote_average: "Il voto del film è :" + " " + stelle,
            type: "Film",
          };
          var html = template(context);
          contPage.append(html);
        }
      },
      error: function(){
        alert("Errore, chiamata fallita!");
      },
    });

    $.ajax({
      url: "https://api.themoviedb.org/3/search/tv",
      method: 'GET',
      data: {
        api_key: "a581ed7fd10829db7bb800ef1b7f1f05",
        language: "it-IT",
        query: filmVAl,
      },
      success: function(risultato) {
        var listaSerieTv = risultato.results;
        for (var i = 0; i < listaSerieTv.length; i++) {
          listaSerieTv[i]
          var serieTvCorrente = listaSerieTv[i]
          var voto = serieTvCorrente.vote_average;
          var voto5 = parseInt(voto / 2);
          var stelle = "";
          for(var s = 1; s <= 5; s++) {
            if(s <= voto5) {
              stelle += '<i class="fas fa-star"></i>';
            } else {
              stelle += '<i class="far fa-star"></i>';
            }
          };
          var arrayLanguage = ["it", "en"];
          if(arrayLanguage.includes(serieTvCorrente.original_language)){
            var bandiera = '<img src="img/' + serieTvCorrente.original_language + '.png" alt="">';
          } else {
            bandiera = serieTvCorrente.original_language;
          };
          var context = {
            title: "Il titolo del film è :" + " " + serieTvCorrente.name,
            original_title: "Il titolo originale del film è :" + " " + serieTvCorrente.original_name,
            original_language: "La lingua originale del film è :" + " " + bandiera,
            vote_average: "Il voto del film è :" + " " + stelle,
            type: "Serie TV",
          };
          var html = template(context);
          contPage.append(html);
        }
      },
      error: function(){
        alert("Errore, chiamata fallita!");
      },
    });
  });
});
