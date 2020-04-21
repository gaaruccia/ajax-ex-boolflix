$(document).ready(function() {
  $("#button").click(function(){
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
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        var listaFilm = risultato.results;
        for (var i = 0; i < listaFilm.length; i++) {
          listaFilm[i]
          var filmCorrente = listaFilm[i]
          var context = {
            title: "Il titolo del film è :" + " " + filmCorrente.title,
            original_title: "Il titolo originale del film è :" + " " + filmCorrente.original_title,
            original_language: "La lingua originale del film è :" + " " + filmCorrente.original_language,
            vote_average: "Il voto del film è :" + " " + filmCorrente.vote_average,
          };
          var risultatoDaAggiungere = template(context);
          $("body").append(risultatoDaAggiungere);
        }
      },
      error: function(){
      },
    });
  });
});
