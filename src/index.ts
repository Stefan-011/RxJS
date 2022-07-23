import {Drzava} from "./Models/Drzava"
import {User} from "./Models/User"
import {GetDrzava} from "./Logic/observables"

let Btns: HTMLButtonElement[] = []; // 0 - veca | 1 - manja 
let Zastave: HTMLImageElement[] = []; // 0 - Leva | 1 - Desna
let DrzavaNameLabel: HTMLLabelElement[] = []; // 0 - Leva | 1 - Desna
let DrzavaPovLabel: HTMLLabelElement[] = []; // 0 - Leva | 1 - Desna
let BrojPoena: HTMLLabelElement[] = []; // 0 - score | 1 - highscore
let Drzave:Drzava[] = [];// 0 - Leva | 1 - Desna
let Igrac:User;

window.onload =  async function()
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

  Drzave[0] = new Drzava();
  Drzave[1] = new Drzava();

  Drzave[0] = await GetDrzava();
  DrzavaNameLabel[0].innerHTML = Drzave[0].ime;
  DrzavaPovLabel[0].innerHTML = Drzave[0].povrsina.toString();
  Zastave[0].src = Drzave[0].zastava;
}
