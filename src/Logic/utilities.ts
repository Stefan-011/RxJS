import { Igrac } from "..";
import { Drzava } from "../Models/Drzava";
import { GetDrzava, GetNewOne } from "./observables";

export function FormatPovrsina(Povrsina:number)
{
    let Array1 = Povrsina.toString().split("").reverse();
    let Array2 = Povrsina.toString().split("");
    for(let j = 0 ,i = 0 ; i < Array1.length; i++,j++)
    {
        if(i!=0 && i%3 == 0)
        {
            Array2[j] = ".";
            Array2[j+1] = Array1[i];
            j++;    
        }
        else
            Array2[j] = Array1[i];   
    }
    return Array2.reverse().toString().replace(/,/gi,"")+" km²";
}

export async function DrawDrzave(Drzave:Drzava[],DrzavaNameLabel:HTMLLabelElement[],DrzavaPovLabel:HTMLLabelElement[],Zastave:HTMLImageElement[])
{
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
    console.log("wat")
}
export function TacanSlucaj(Drzave:Drzava[],DrzavaNameLabel:HTMLLabelElement[],DrzavaPovLabel:HTMLLabelElement[],Zastave:HTMLImageElement[],BrojPoena:HTMLLabelElement[])
{
  Igrac.score++;
  BrojPoena[0].innerHTML = Igrac.score.toString();
  DrzavaPovLabel[1].style.visibility ="visible";

  let PovArr = Drzave
  .filter(item=>item.povrsina > 0)
  .map(item=>item.id);
  let fetchObs =  GetNewOne(PovArr[0],PovArr[1]);
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

export function NetacanSlucaj(Drzave:Drzava[],DrzavaNameLabel:HTMLLabelElement[],DrzavaPovLabel:HTMLLabelElement[],Zastave:HTMLImageElement[],BrojPoena:HTMLLabelElement[])
{
  if(Igrac.score > Igrac.high_score)
      {
       Igrac.high_score = Igrac.score;
       BrojPoena[1].innerHTML = Igrac.high_score.toString();
       localStorage.setItem("HighScore",Igrac.high_score.toString());
      }
      Igrac.score = 0;
      BrojPoena[0].innerHTML = Igrac.score.toString();
      DrawDrzave(Drzave,DrzavaNameLabel,DrzavaPovLabel,Zastave);
}

export async function SolveProblem(Left:number,Right:number,Drzave:Drzava[],DrzavaNameLabel:HTMLLabelElement[],DrzavaPovLabel:HTMLLabelElement[],Zastave:HTMLImageElement[],BrojPoena:HTMLLabelElement[] ) {
    let promise = new Promise(function(resolve,reject){
      if(Left >= Right)     
        resolve(TacanSlucaj(Drzave,DrzavaNameLabel,DrzavaPovLabel,Zastave,BrojPoena))  
       else
       {
         alert("greska")
        reject(NetacanSlucaj(Drzave,DrzavaNameLabel,DrzavaPovLabel,Zastave,BrojPoena));
       }
       
    })
    return promise;
  }