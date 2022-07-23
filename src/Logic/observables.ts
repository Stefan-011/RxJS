import { environments } from "../environments";

export function GetDrzava()
  {
    let ID = Math.round(Math.random()* (8 - 1 + 1) + 1);
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
  