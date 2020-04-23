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
        getListaOggetti(listaFilm, "Film");
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
        var listaSerieTV = risultato.results;
        getListaOggetti(listaSerieTV, "Serie TV");
      },
      error: function(){
        alert("Errore, chiamata fallita!");
      },
    });
  });

  function getListaOggetti(listaOggetti, tipo){
    for (var i = 0; i < listaOggetti.length; i++) {
      listaOggetti[i]
      var filmCorrente = listaOggetti[i]
      var title, original_title;
      if (tipo === "Film") {
        title = filmCorrente.title;
        original_title = filmCorrente.original_title;
      }else if (tipo === "Serie TV"){
        title = filmCorrente.name
        original_title = filmCorrente.original_name
      };
      var inizioUrl = "https://image.tmdb.org/t/p/"
      var dimensioneImg = "w342"
      var fineUrl = filmCorrente.poster_path
      var urlCompleto = inizioUrl + dimensioneImg + fineUrl
      var immagine = '<img src="' + urlCompleto + '" alt="">'
      if (fineUrl === null) {
        immagine = "L'immagine non è disponibile";
      }
      var context = {
        poster_path: immagine,
        title: "Il titolo è :" + " " + title,
        original_title: "Il titolo originale è :" + " " + original_title,
        original_language: "La lingua originale è :" + " " + linguaBandiere(filmCorrente.original_language),
        vote_average: "Il voto è :" + " " + votoStelle(filmCorrente.vote_average),
        type: tipo,
      };
      var html = template(context);
      contPage.append(html);
    };
  };

  function votoStelle(voto){
    var voto5 = Math.ceil(voto / 2);
    var stelle = "";
    for(var s = 1; s <= 5; s++) {
      if(s <= voto5) {
        stelle += '<i class="fas fa-star"></i>';
      } else {
        stelle += '<i class="far fa-star"></i>';
      }
    };
    return stelle;
  };

  function linguaBandiere(lingua){
    var arrayLanguage = ["it", "en"];
    var bandiera;
    if(arrayLanguage.includes(lingua)){
      bandiera = '<img src="img/' + lingua + '.png" alt="">';
    } else {
      bandiera = lingua;
    };
    return bandiera;
  };
});
