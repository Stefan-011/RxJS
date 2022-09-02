import { debounceTime, filter, from, fromEvent, merge, Observable, of, switchMap } from "rxjs";
import { environments } from "../environments";
import { SideEnum } from "../Enums/SideEnum";

export function GetDrzava(BrojDrzava:number)
  {
   
    const ID = Math.round(Math.random()* ((BrojDrzava-1) - 1 + 1) + 1);
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
    let $DugmeEvent1 = fromEvent(Btns[SideEnum.Veca],"click");
    let $DugmeEvent2 = fromEvent(Btns[SideEnum.Manja],"click");

    let $MobileEvent1= fromEvent(document.getElementById("desna_drzava_zastava") as HTMLDivElement,"click");
    let $MobileEvent2 = fromEvent(document.getElementById("leva_drzava_zastava") as HTMLDivElement,"click");

    $DugmeEvent1 = merge($DugmeEvent1,$MobileEvent1);
    $DugmeEvent2 = merge($DugmeEvent2,$MobileEvent2);

    let ObsArr:Observable<Event> [] = [];
    ObsArr[0] = $DugmeEvent1.pipe(debounceTime(500));
    ObsArr[1] = $DugmeEvent2.pipe(debounceTime(500));
    return ObsArr;
  }


  export function GetNewOne(id1:number,id2:number,BrojDrzava:number)
  {
    let ID = id1;
    while(ID == id1 || ID == id2)
    {
      ID = Math.round(Math.random()* ((BrojDrzava-1) - 1 + 1) + 1);
    }
    
    return from(fetch(environments.API_URL+`/Countries/?id=${ID}`)
    .then((data)=>
    {
      if(data.ok)
      return data.json();
      else throw new Error("Drzava nije pronadjena");
    })
    .catch((err) => (console.log(err)))
    );
    
  }


  export function TakeUserName(Input:HTMLInputElement,SubmitButton:HTMLButtonElement,ActiveModal:HTMLElement)
  {
     let Event = fromEvent(SubmitButton,"click").pipe(
      switchMap(() => of(Input.value.toString())),
      filter((Kime:string) => Kime.length > 3)
    );

    Event.subscribe((username: string) => 
    {
      localStorage.setItem("username", username)
      if(localStorage.getItem("username") == null)
      ActiveModal.style.display = "block";
      else
     {
      ActiveModal.style.display = "none";
      document.getElementById("UserName").innerHTML = localStorage.getItem("username");
     }
      })
  }


  export function GetAllDrzave()
  {
    return fetch(environments.API_URL+`/Countries/`)
    .then((data) => {
        if(data.ok)
        return data.json();
        else throw new Error("Drzava nije pronadjena");
    }        
    )
    .then(function(data){
        return data;
    }).catch((err) => (console.log(err)) 
    );
  }