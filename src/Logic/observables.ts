import { debounceTime, fromEvent, merge, Observable } from "rxjs";
import { environments } from "../environments";

export function GetDrzava()
  {
    let ID = Math.round(Math.random()* (7 - 1 + 1) + 1);
    return fetch(environments.API_URL+`/Countries/?id=${ID}`)
     .then((data) => {
         if(data.ok)
         return data.json();
         else throw new Error("Drzava nije pronadjena");
     }        
     )
     .then(function(data){
         return data[0];
     }).catch((err) => (console.log(err)) 
     ); 
  }
  
  export function SetupButtons(Btns: HTMLButtonElement[])
  {
    let $DugmeEvent1 = fromEvent(Btns[0],"click");
    let $DugmeEvent2 = fromEvent(Btns[1],"click");

    let $MobileEvent1= fromEvent(document.getElementById("desna_drzava_zastava") as HTMLDivElement,"click");
    let $MobileEvent2 = fromEvent(document.getElementById("leva_drzava_zastava") as HTMLDivElement,"click");

    $DugmeEvent1 = merge($DugmeEvent1,$MobileEvent1);
    $DugmeEvent2 = merge($DugmeEvent2,$MobileEvent2);
    let ObsArr:Observable<Event> [] = [];
    ObsArr[0] = $DugmeEvent1.pipe(debounceTime(500));
    ObsArr[1] = $DugmeEvent2.pipe(debounceTime(500));
    return ObsArr;
  }