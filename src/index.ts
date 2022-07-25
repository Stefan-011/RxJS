import {Drzava} from "./Models/Drzava"
import {User} from "./Models/User"
import {GetDrzava, GetNewOne, SetupButtons} from "./Logic/observables"
import { FormatPovrsina } from "./Logic/utilities";

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

  for(let i = 0 ; i < Drzave.length; i++)
  {
    do{
      Drzave[i] = await GetDrzava();
    }
    while(Drzave[i].ime == DrzavaNameLabel[0].innerHTML) 
    DrzavaNameLabel[i].innerHTML = Drzave[i].ime;
    DrzavaPovLabel[i].innerHTML = FormatPovrsina(Drzave[i].povrsina);
    Zastave[i].src = Drzave[i].zastava;
  }
  DrzavaPovLabel[1].style.visibility ="hidden";

  let $DugmeEvent = SetupButtons(Btns);

  $DugmeEvent[0].subscribe(async function()
{
  if(Drzave[1].povrsina >= Drzave[0].povrsina)
  {
    alert("tacno");
    DrzavaPovLabel[1].style.visibility ="visible";
    let PovArr = Drzave
    .filter(item=>item.povrsina > 0)
    .map(item=>item.id)
    let fetchObs = await GetNewOne(PovArr[0],PovArr[1]);
    fetchObs.subscribe((data)=>
   {
    setTimeout(function() {
      DrzavaNameLabel[0].innerHTML =  DrzavaNameLabel[1].innerHTML
      DrzavaPovLabel[0].innerHTML = DrzavaPovLabel[1].innerHTML;
      Zastave[0].src = Zastave[1].src;
      Drzave[0] = Drzave[1];
      Drzave[1] = data[0];
    
      DrzavaNameLabel[1].innerHTML = data[0].ime;
      DrzavaPovLabel[1].innerHTML = FormatPovrsina(data[0].povrsina);
      Zastave[1].src = data[0].zastava;
      DrzavaPovLabel[1].style.visibility ="hidden";
     
  }, 1000);
   })
  }
  else
  {
    alert("greska")
  }
  
})
$DugmeEvent[1].subscribe(async function(){ 

    if(Drzave[1].povrsina <= Drzave[0].povrsina)
  {
    alert("tacno")
    DrzavaPovLabel[1].style.visibility ="visible";
    let PovArr = Drzave
    .filter(item=>item.povrsina > 0)
    .map(item=>item.id)
    let fetchObs = await GetNewOne(PovArr[0],PovArr[1]);
    fetchObs.subscribe((data)=>
    {
      setTimeout(function() {
        DrzavaNameLabel[0].innerHTML =  DrzavaNameLabel[1].innerHTML
        DrzavaPovLabel[0].innerHTML = DrzavaPovLabel[1].innerHTML;
        Zastave[0].src = Zastave[1].src;
        Drzave[0] = Drzave[1];
        Drzave[1] = data[0];
      
        DrzavaNameLabel[1].innerHTML = data[0].ime;
        DrzavaPovLabel[1].innerHTML = FormatPovrsina(data[0].povrsina);
        Zastave[1].src = data[0].zastava;
        DrzavaPovLabel[1].style.visibility ="hidden";
       
    }, 1000);
    })
  }
  else
  {
    alert("greska")
  }
});
}