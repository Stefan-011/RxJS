import { Drzava } from "../Models/Drzava";
import { GetDrzava } from "./observables";

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
