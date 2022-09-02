import { DrawDrzave,GetNumberOfCountries,SolveProblem } from "./Logic/utilities";
import { SetupButtons, TakeUserName } from "./Logic/observables"
import { Drzava } from "./Models/Drzava"
import { User } from "./Models/User"
import { SideEnum } from "./Enums/SideEnum";

//--------------------Pretvoriti is niz u single----------------------------//
const DrzavaNameLabel: HTMLLabelElement[] = []; 
const DrzavaPovLabel: HTMLLabelElement[] = []; 
const BrojPoena: HTMLLabelElement[] = []; 
const Zastave: HTMLImageElement[] = []; 
const Btns: HTMLButtonElement[] = [];
const Drzave:Drzava[] = [];
//------------------------------------------------------//
let UserNameInput:HTMLInputElement;
let SubmitButton:HTMLButtonElement;
let BrojDrzava:number;
let ActiveModal:HTMLElement; 
let Igrac:User;

/* Taskovi 
- Srediti imena 
- Zameniti promise
- Optimizovati rad funkcija
- Ciscenje side effekata
- Ciscenje hardcodiranja */ 


async function SetElements()
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

  SubmitButton = document.getElementById("BtnPotvrdi") as HTMLButtonElement;
  
  UserNameInput = document.getElementById("KIme") as HTMLInputElement;
  
  BrojDrzava = await GetNumberOfCountries();

  ActiveModal= document.getElementById("myModal");  ;

  for(let i = 0 ; i < 2; i++ )
  {
    let NewDrzava:Drzava
    Drzave[i] = NewDrzava;
  }

  Igrac = {
    score:0,
    high_score:0
  }
}


function SetData()
{
  
  if(localStorage.getItem("username") == null)
  {
    TakeUserName(UserNameInput,SubmitButton,ActiveModal);
    ActiveModal.style.display = "block";
    localStorage.clear();
  }
  else
  document.getElementById("UserName").innerHTML = localStorage.getItem("username");
  
  if(localStorage.getItem("HighScore") != null)
  {
    Igrac.high_score = parseInt(localStorage.getItem("HighScore"));
    BrojPoena[1].innerHTML = Igrac.high_score.toString(); 
  }
}


window.onload =  async function()
{ 
   
   await SetElements()
   SetData();
   DrawDrzave(
     Drzave,
     DrzavaNameLabel,
     DrzavaPovLabel,
     Zastave,
     BrojDrzava
     );

   let $DugmeEvent = SetupButtons(Btns);

  $DugmeEvent[0].subscribe(async function()
    {
      await SolveProblem(
        Drzave[1].povrsina,
        Drzave[0].povrsina,
        Drzave,
        DrzavaNameLabel,
        DrzavaPovLabel,
        Zastave,
        BrojPoena,
        BrojDrzava,
        Igrac
        );
    })

  $DugmeEvent[1].subscribe(async function()
    { 
      await SolveProblem(
        Drzave[0].povrsina,
        Drzave[1].povrsina,
        Drzave,
        DrzavaNameLabel,
        DrzavaPovLabel,
        Zastave,
        BrojPoena,
        BrojDrzava,
        Igrac
        );
    });

}

