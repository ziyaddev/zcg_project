var lbl_eq1 = [];
var lbl_eq2 = [];
var forme_eq1 = [];
var attaque_eq1 = [];
var def_eq1 = [];

var forme_eq2 = [];
var attaque_eq2 = [];
var def_eq2 = [];

$.getJSON("imworld.json", data2 => { // On appel notre fichier .json
  data.all.info.forEach(e => { // On lit notre fichier
    lbl_eq1.push(e['teams']['equipe1']['team_name']);
    lbl_eq2.push(e['teams']['equipe2']['team_name']);
  });
});

  new Chart(document.getElementById('myChart'), {
    type: 'bar',
    data: {
      labels: ['Forme','Attaque','Défense'],
      datasets: [{
        label: lbl_eq1, // On retrouve ici les info du fichier JSON.
        data: [forme_eq1, attaque_eq1, def_eq1],
        backgroundColor: 'rgba(253, 48, 76, 0.2)',
        borderColor: 'rgb(253, 48, 76)',
        pointBackgroundColor: 'rgb(253, 48, 76)'
      },  
      {
        label: lbl_eq2, // Et là !
        data: [forme_eq2, attaque_eq2, def_eq2],
        backgroundColor: 'rgba(60, 48, 76, 0.2)',
        borderColor: 'rgb(60, 48, 76)',
        pointBackgroundColor: 'rgb(60, 48, 76)'
      },
	  ],
    },
    options: {
      //...
    }
  });