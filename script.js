document.getElementById('btndemarrage').addEventListener('click', testdemarrage, false);

var Pinv = [0, 0, 0, 0];    //Tableau de l'inventaire du perso (4 types de potion)  [0]:Force  [1]:Agilité  [2]:Endurance  [3]:Vie
var winCbt = 0; //nombre de combat gagné

var monstre = { //Objet Monstre avec 4 variable 
    Mnom: 'Méchant',
    Mfor: 5,
    Mend: 50,
    Mvie
}

var perso = {   //Objet Personnage avec 6 variable et 1 tableau
    Pnom: "NomDefault",
    Pfor: 10,
    Pagi: 50,
    Pend: 100,
    Pvie,
    Por: 10,   //nombre de piece d'or
    Pinv
}


             
perso.Pvie = perso.Pend;
monstre.Mvie = monstre.Mend;

function testdemarrage() {
    
    console.log(winCbt);
    perso.Pnom = document.getElementById('persoNom').value;
    console.log('FONCTION : Test si champ vide ');                  //Test si l'utilisateur a entré un nom
    if (document.getElementById('persoNom').value === "") {          //Si la valeur de la case persoNom est vide
        alert("Veuillez entrer un nom");                            //Alerte
        console.log('pas de nom');  
    } else {
        console.log('Nom : '+document.getElementById('persoNom').value);  
        jeu();                                                      //Sinon lancer la fonction jeu
    }

}


function jeu() {
    console.log('FONCTION : Jeu'); 
    
    //winCbt = 0;

    document.getElementById('btnattaquer').addEventListener('click', attaque, false);       //Si bouton btnattaquer cliqué -> executer fonction attaque
    document.getElementById('btnboutique').addEventListener('click', boutique, false);      //Si bouton btnboutique cliqué -> executer fonction boutique
    document.getElementById('btninventaire').addEventListener('click', inventaire, false);  //Si bouton btninventaire cliqué -> executer fonction inventaire
    document.getElementById('btncombat').addEventListener('click', combat, false);          //Si bouton btncombat cliqué -> executer fonction combat

    document.getElementById('btnPoFo').addEventListener('click', AjPoFo, false);    //Bouton d'ajout des potions
    document.getElementById('btnPoAg').addEventListener('click', AjPoAg, false);
    document.getElementById('btnPoEn').addEventListener('click', AjPoEn, false);
    document.getElementById('btnPoVi').addEventListener('click', AjPoVi, false);

    document.getElementById('UtilPoFo').addEventListener('click', UtilPoFo, false);    //Bouton d'utilisation des potions
    document.getElementById('UtilPoAg').addEventListener('click', UtilPoAg, false);
    document.getElementById('UtilPoEn').addEventListener('click', UtilPoEn, false);
    document.getElementById('UtilPoVi').addEventListener('click', UtilPoVi, false);




    //affichage des caracteristiques dans la div caractéristique
    document.getElementById('nom').value = perso.Pnom;
    document.getElementById('force').value = perso.Pfor;
    document.getElementById('agilite').value = perso.Pagi;
    document.getElementById('endurance').value = perso.Pend;
    document.getElementById('or').value = perso.Por;


    //Cycle Jour-Nuit

    jourNuit();

    function jourNuit() {

        //document.getElementById('journuit').innerHTML = 'Jour';


        function timerNuit() {                                                   //Cette fonction va appeler la fonction suivante
            var timerNuit;
            console.log("Le jour se lève");
            if (timerNuit) {
                clearInterval(timerNuit);
            }

            timerNuit = setInterval(function () {
                document.body.style.backgroundImage = "url('./img/nuit.jpg')";
                monstre.Mfor++;
                clearInterval(timerNuit);
                timerJour();
            }, 45000)
        }

        function timerJour() {                                                   //Cette fonction va appeler la fonction précédente
            var timerJour;
            console.log("La nuit tombe");
            if (timerJour) {
                clearInterval(timerJour);
            }

            timerJour = setInterval(function () {
                document.body.style.backgroundImage = "url('./img/jour.jpg')";
                monstre.Mfor--;
                clearInterval(timerJour);
                timerNuit();
            }, 45000);
        }

        timerNuit();

    }

    combat();//Lance le premier combat

}

function combat() {    //Fonction du combat
    console.log('FONCTION : combat'); 
    console.log("nombre de combat : "+ winCbt);
    
    if(winCbt = "0"){
        console.log("1er combat = pas de boost de monstre");
    }else{
        console.log("boost de monstre");
        monstre.Mfor ++ ;
        monstre.Mend ++ ;
    }

    var noms = [1, "Melanie", "Titouan", "Freddy", "Rabi", "Thomas"];
    random = Math.ceil(Math.random() * 5);
    monstre.Mnom = noms[random];

    var sprite = [1, '<img class="iconcombat" src="img/monster1.png">', '<img class="iconcombat" src="img/monster2.png">', '<img class="iconcombat" src="img/monster3.png">', '<img class="iconcombat" src="img/monster4.png">', '<img class="iconcombat" src="img/monster5.png">'];
    random1 = Math.ceil(Math.random() * 5);
    var imgMonstre = sprite[random1];

    document.getElementById('titrecombat').innerHTML = "Combat contre "+ monstre.Mnom;
    document.getElementById('imgcombat').innerHTML = "<img class=\"iconcombat\" src=\"img/iconperso.png\">"+ imgMonstre;

    monstre.Mvie = monstre.Mend; //Remet la vie du monstre au max (endurance)

    document.getElementById('win').style.display = 'none';                 //efface la div win
    document.getElementById('inventaire').style.display = 'none';          //efface la div inventaire
    document.getElementById('creation').style.display = 'none';            //efface la div creation     
    document.getElementById('caracteristique').style.display = 'block';    //affiche la div caracteristique
    document.getElementById('aventure').style.display = 'block';           //affiche la div aventure
    document.getElementById('btnattaquer').style.display = 'block';         //affiche le bouton btnattaquer

    /*Jet d'initiative*/
    if (perso.Pagi < opif(100)) {        //Perso attaque en premier
        console.log(perso.Pnom+' attaque en premier ' + monstre.Mnom + ' et lui retire ' + perso.Pfor + " PV");
        document.getElementById('Mvie').value = monstre.Mvie -= perso.Pfor;  // Vie du monstre = Vie du monstre - Force du personnage
        document.getElementById('vie').value = perso.Pvie;                   //Affiche la vie du perso dans les caractéristique
        document.getElementById('Pvie').value = perso.Pvie;                  //Affiche la vie du perso dans le combat

    } else {                              //Monstre attaque en premier
        console.log(monstre.Mnom+' attaque en premier ' + perso.Pnom + ' et lui retire ' + monstre.Mfor + " PV");
        document.getElementById('vie').value = perso.Pvie -= monstre.Mfor;   //Vie du perso = Vie du perso - Force du monstre
        document.getElementById('Pvie').value = perso.Pvie;                  //Affiche la vie du perso dans le combat
        document.getElementById('Mvie').value = monstre.Mvie;                //Affiche la vie du monstre dans le combat
    }




}

function attaque() {
    console.log('FONCTION : attaque'); 

    //Attaque
    perso.Pvie -= monstre.Mfor;
    monstre.Mvie -= perso.Pfor;
    document.getElementById('vie').value = perso.Pvie;          //Vie du perso = Vie du perso - Force du monstre
    document.getElementById('Pvie').value = perso.Pvie;         //Affiche la vie du monstre dans le combat
    document.getElementById('Mvie').value = monstre.Mvie        //Vie du monstre = Vie du monstre - Force du personnage

    console.log(perso.Pnom+' perd ' + monstre.Mfor + 'PV il lui reste '+ perso.Pvie +'/'+ perso.Pend);
    console.log(monstre.Mnom + ' perd ' + perso.Pfor + 'PV il lui reste '+ monstre.Mvie +'/'+ monstre.Mend);

    if (perso.Pvie <= 0) {            //Combat Perdu

        alert("Game Over de " + perso.Pnom);
        console.log(monstre.Mnom + " vous a vaincu, vous avez survecu a "+winCbt+" combat");

        document.getElementById('tableau').innerHTML += "<li>" + perso.Pnom + " : " + winCbt + "</li>"
        document.getElementById('win').style.display = 'none';                 //efface la div win
        document.getElementById('inventaire').style.display = 'none';          //efface la div inventaire    
        document.getElementById('caracteristique').style.display = 'none';     //efface la div caracteristique
        document.getElementById('aventure').style.display = 'none';            //efface la div aventure
        document.getElementById('btnattaquer').style.display = 'none';          //efface le bouton btnattaquer

        document.getElementById('creation').style.display = 'block';           //affiche la div creation 

        monstre.Mvie = monstre.Mend;                                            //vie du monstre = endurance du monstre
        perso.Pvie = perso.Pend;                                                //vie du perso = endurance du perso

        
        

    } else if (monstre.Mvie <= 0) {    //Combat Gagné
        winCbt++;
        document.getElementById('win').style.display = 'block';                //affiche la div win
        document.getElementById('btnattaquer').style.display = 'none';         //efface le bouton attaquer
        var butin = opif(20); 
        perso.Por += butin;                                                //Drop de 1 a 20 Or
        document.getElementById('or').value = perso.Por;                        //affiche l'or du personnage dans les caractéristique
        console.log(perso.Pnom+ " a triomphé de son "+winCbt+"eme combat contre "+ monstre.Mnom+" et recoit " + butin + " pièces d'or");
    }
}

function boutique() {
    console.log('FONCTION : boutique'); 
    console.log("Nombre de pièces d'or = " + perso.Por); 

    document.getElementById('boutique').style.display = 'block';               //Affiche
    document.getElementById('aventure').style.display = 'none';                //efface
}

function inventaire() {
    console.log('FONCTION : inventaire');
    document.getElementById('nbPoFo').value = perso.Pinv[0];                   //Affiche le nombre de potion dans la div inventaire
    document.getElementById('nbPoAg').value = perso.Pinv[1];
    document.getElementById('nbPoEn').value = perso.Pinv[2];
    document.getElementById('nbPoVi').value = perso.Pinv[3];

    document.getElementById('boutique').style.display = 'none';                //efface
    document.getElementById('inventaire').style.display = 'block';              //Affiche    
}

/*--------------------------------------------- Fonction Ajouter des potions (Boutique) ------------------------------------------------------------------- */

function AjPoFo() {
    
    if (perso.Por < 2) {                                                          //Test si assez d'argent
        alert("Vous n'avez pas assez d'argent");
        console.log("Pas assez d'argent / nombre de potion = "+ perso.Pinv[0]);
    } else {
        perso.Por -= 2;                                                         //Or du perso -2
        perso.Pinv[0] += 1;                                                     //Nombre de potion +1   
        document.getElementById('or').value = perso.Por;                       //affiche Or du perso dans la div caracteristique
        document.getElementById('nbPoFo').value = perso.Pinv[0];               //affiche le nombre de potion
        console.log("Achat d'une potion de force / nombre de potion = "+ perso.Pinv[0]);
    }

}
function AjPoAg() {
    if (perso.Por < 2) {
        alert("Vous n'avez pas assez d'argent");
        console.log("Pas assez d'argent / nombre de potion = "+ perso.Pinv[1]);
    } else {
        perso.Por -= 2;
        perso.Pinv[1] += 1;
        document.getElementById('or').value = perso.Por;
        document.getElementById('nbPoAg').value = perso.Pinv[1];
 
        console.log("Achat d'une potion d'agilité / nombre de potion = "+ perso.Pinv[1]);
    }

}
function AjPoEn() {
    if (perso.Por < 2) {
        alert("Vous n'avez pas assez d'argent");
        console.log("Pas assez d'argent / nombre de potion = "+ perso.Pinv[2]);
    } else {
        perso.Por -= 2;
        perso.Pinv[2] += 1;
        document.getElementById('or').value = perso.Por;
        document.getElementById('nbPoEn').value = perso.Pinv[2];

        console.log("Achat d'une potion d'endurance / nombre de potion = "+ perso.Pinv[2]);
    }

}
function AjPoVi() {
    if (perso.Por < 5) {
        alert("Vous n'avez pas assez d'argent");
        console.log("Pas assez d'argent / nombre de potion = "+ perso.Pinv[3]);
    } else {
        perso.Por -= 5;
        perso.Pinv[3] += 1;
        document.getElementById('or').value = perso.Por;
        document.getElementById('nbPoVi').value = perso.Pinv[3];

        console.log("Achat d'une potion de vie / nombre de potion = "+ perso.Pinv[3]);
    }

}

/*--------------------------------------------- Fonction Utiliser les potions (Inventaire) ------------------------------------------------------------------- */

function UtilPoFo() {
    if (perso.Pinv[0] != 0) {                                             //Test si il reste des potion
        if (perso.Pfor >= 100) {                                          //Test si le maximum est atteint
            alert("Vous avez atteint la force maximale");
            console.log("Force au max / nombre de potion = "+ perso.Pinv[0]);
        } else {
            perso.Pinv[0] -= 1;                                         //  -1 potion
            perso.Pfor += 1;                                            //  +1 caracteristique
            document.getElementById('nbPoFo').value = perso.Pinv[0];   //affichage du nombre de potion dans l'inventaire
            document.getElementById('force').value = perso.Pfor;       //affichage de la force dans les caractéristique
            console.log("Utilisation d'une potion de force / nombre de potion = "+ perso.Pinv[0]);
            console.log("La force de "+ perso.Pnom + " monte a "+perso.Pfor);
        }
    } else {
        alert("Vous n'avez plus de potion");
        console.log("Pas de potion de force / nombre de potion = "+ perso.Pinv[0]);
    }

}

function UtilPoAg() {
    if (perso.Pinv[1] != 0) {
        if (perso.Pagi >= 100) {
            alert("Vous avez atteint l'agilité maximale");
            console.log("Agilité au max / nombre de potion = "+ perso.Pinv[1]);
        } else {
            perso.Pinv[1] -= 1;
            perso.Pagi += 1;
            document.getElementById('nbPoAg').value = perso.Pinv[1];
            document.getElementById('agilite').value = perso.Pagi;
            console.log("Utilisation d'une potion d'agilité / nombre de potion = "+ perso.Pinv[1]);
            console.log("L'agilité de "+ perso.Pnom + " monte a "+perso.Pagi);
        }

    } else {
        alert("Vous n'avez plus de potion");
        console.log("Pas de potion d'agilité / nombre de potion = "+ perso.Pinv[1]);
    }

}

function UtilPoEn() {
    if (perso.Pinv[2] != 0) {
        if (perso.Pend >= 200) {
            alert("Vous avez atteint l'endurance maximale");
            console.log("Endrance au max / nombre de potion = "+ perso.Pinv[2]);
        } else {
            perso.Pinv[2] -= 1;
            perso.Pend += 5;
            document.getElementById('nbPoEn').value = perso.Pinv[2];
            document.getElementById('endurance').value = perso.Pend;
            console.log("Utilisation d'une potion d'endurance / nombre de potion = "+ perso.Pinv[2]);
            console.log("L'endurance de "+ perso.Pnom + " monte a "+perso.Pend);
        }
    } else {
        alert("Vous n'avez plus de potion");
        console.log("Pas de potion d'endurance' / nombre de potion = "+ perso.Pinv[2]);
    }

}

function UtilPoVi() {
    if (perso.Pinv[3] != 0) {
        var viemax = perso.Pvie + 20;
        if (viemax >= perso.Pend) {
            perso.Pvie = perso.Pend;
            document.getElementById('vie').value = perso.Pvie;
            alert("Vous etes entièrement remis de vos blessures");
            console.log("Vie au max / nombre de potion = "+ perso.Pinv[3]);
        } else {
            perso.Pinv[3] -= 1;
            perso.Pvie += 20;
            document.getElementById('nbPoVi').value = perso.Pinv[3];
            document.getElementById('vie').value = perso.Pvie;
            console.log("Utilisation d'une potion de vie / nombre de potion = "+ perso.Pinv[3]);
            console.log("La vie de "+ perso.Pnom + " monte a "+perso.Pvie);
        }
    } else {
        alert("Vous n'avez plus de potion");
        console.log("Pas de potion de vie / nombre de potion = "+ perso.Pinv[3]);
    }

}

function opif(max) { //Chiffre au hasard
    return Math.floor(Math.random() * Math.floor(max));
}