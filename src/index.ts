import {Drzava} from "./Models/Drzava"
import {User} from "./Models/User"
import {GetDrzava, GetNewOne, SetupButtons, TakeUserName} from "./Logic/observables"
import { DrawDrzave, FormatPovrsina,NetacanSlucaj,SolveProblem,TacanSlucaj} from "./Logic/utilities";
import { fromEvent } from "rxjs";

let Btns: HTMLButtonElement[] = []; // 0 - veca | 1 - manja 
let Zastave: HTMLImageElement[] = []; // 0 - Leva | 1 - Desna
let DrzavaNameLabel: HTMLLabelElement[] = []; // 0 - Leva | 1 - Desna
let DrzavaPovLabel: HTMLLabelElement[] = []; // 0 - Leva | 1 - Desna
let BrojPoena: HTMLLabelElement[] = []; // 0 - score | 1 - highscore
let Drzave:Drzava[] = [];// 0 - Leva | 1 - Desna
export let Igrac:User;

export let modal = document.getElementById("myModal");
export let OpenBtn:HTMLButtonElement;
export let UserNameInput:HTMLInputElement;

// Funkcija za postavljanje elemenata
function SetElements()
{
  DrzavaNameLabel[0] = document.getElementById("leva_drzava_ime") as HTMLLabelElement;
  DrzavaNameLabel[1] = document.getElementById("desna_drzava_ime") as HTMLLabelElement;
  
  DrzavaPovLabel[0] = document.getElementById("leva_drzava_povrsina") as HTMLLabelElement;
  DrzavaPovLabel[1] = document.getElementById("desna_drzava_povrsina") as HTMLLabelElement;
  
  Zastave[0] = document.getElementById("leva_drzava_zastava") as HTMLImageElement;
  Zastave[1] = document.getElementById("desna_drzava_zastava") as HTMLImageElement;
  
  Btns[0] = document.getElementById("btn-veca") as HTMLButtonElement;
  Btns[1] = document.getElementById("btn-manja") as HTMLButtonElement;

  BrojPoena[0] = document.getElementById("br_poena") as HTMLLabelElement;
  BrojPoena[1] = document.getElementById("max_poena") as HTMLLabelElement;

  OpenBtn = document.getElementById("BtnPotvrdi") as HTMLButtonElement;
  UserNameInput = document.getElementById("KIme") as HTMLInputElement;
  
  for(let i = 0 ; i < 2; i++ )
  {
    Drzave[i] = new Drzava();
  }

  Igrac = new User();
}


// Funkcija za postavljanje podataka iz localstorage-a
function SetData()
{
  if(localStorage.getItem("username") == null)
  modal.style.display = "block";
  else
  document.getElementById("UserName").innerHTML = localStorage.getItem("username")
  
  if(localStorage.getItem("HighScore") != null)
  {
    Igrac.high_score = parseInt(localStorage.getItem("HighScore"));
    BrojPoena[1].innerHTML = Igrac.high_score.toString(); 
  }
}



window.onload =  async function()
{ 
   SetElements()
   SetData();
   TakeUserName();
   DrawDrzave(Drzave,DrzavaNameLabel,DrzavaPovLabel,Zastave);

  let $DugmeEvent = SetupButtons(Btns);
  $DugmeEvent[0].subscribe(async function()
{
  await SolveProblem(Drzave[1].povrsina,Drzave[0].povrsina,Drzave,DrzavaNameLabel,DrzavaPovLabel,Zastave,BrojPoena)
})
$DugmeEvent[1].subscribe(async function()
{ 
  await SolveProblem(Drzave[0].povrsina,Drzave[1].povrsina,Drzave,DrzavaNameLabel,DrzavaPovLabel,Zastave,BrojPoena)
});

}
