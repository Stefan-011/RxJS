import {
  debounceTime,
  filter,
  from,
  fromEvent,
  merge,
  Observable,
  of,
  switchMap,
} from "rxjs";
import { environments } from "../environments";
import { ButtonType } from "../Enums/ButtonEnum";

export function GetDrzava(BrojDrzava: number) {
  const ID = Math.round(Math.random() * (BrojDrzava - 1 - 1 + 1) + 1);
  return fetch(environments.API_URL + `/Countries/?id=${ID}`)
    .then((Drzava_Package) => {
      if (Drzava_Package.ok) return Drzava_Package.json();
      else throw new Error("Drzava nije pronadjena");
    })
    .then(function (Drzava_Package) {
      return Drzava_Package[0];
    })
    .catch((err) => console.log(err));
}

export function SetupButtons(Btns: HTMLButtonElement[]) {
  let $DugmeEvent1 = fromEvent(Btns[ButtonType.Veca], "click");
  let $DugmeEvent2 = fromEvent(Btns[ButtonType.Manja], "click");

  let $MobileEvent1 = fromEvent(
    document.getElementById("desna_drzava_zastava") as HTMLDivElement,
    "click"
  );
  let $MobileEvent2 = fromEvent(
    document.getElementById("leva_drzava_zastava") as HTMLDivElement,
    "click"
  );

  $DugmeEvent1 = merge($DugmeEvent1, $MobileEvent1);
  $DugmeEvent2 = merge($DugmeEvent2, $MobileEvent2);

  let ObsArr$: Observable<Event>[] = [];
  ObsArr$[ButtonType.Veca] = $DugmeEvent1.pipe(debounceTime(500));
  ObsArr$[ButtonType.Manja] = $DugmeEvent2.pipe(debounceTime(500));
  return ObsArr$;
}

export function GetNewOne(
  ID_prve_drzave: number,
  ID_druge_drzave: number,
  BrojDrzava: number
) {
  let SearchID = ID_prve_drzave;
  while (SearchID == ID_prve_drzave || SearchID == ID_druge_drzave) {
    SearchID = Math.round(Math.random() * (BrojDrzava - 1 - 1 + 1) + 1);
  }

  return from(
    fetch(environments.API_URL + `/Countries/?id=${SearchID}`)
      .then((Drzava_Package) => {
        if (Drzava_Package.ok) return Drzava_Package.json();
        else throw new Error("Drzava nije pronadjena");
      })
      .then(function (Drzave_Package) {
        return Drzave_Package[0];
      })
      .catch((err) => console.log(err))
  );
}

export function TakeUserName(
  Input: HTMLInputElement,
  SubmitButton: HTMLButtonElement
) {
  return fromEvent(SubmitButton, "click").pipe(
    switchMap(() => of(Input.value.toString())),
    filter((Korisnicko_ime: string) => Korisnicko_ime.length > 3)
  );
}

export function GetAllDrzave() {
  return fetch(environments.API_URL + `/Countries/`)
    .then((Drzave_Package) => {
      if (Drzave_Package.ok) return Drzave_Package.json();
      else throw new Error("Drzava nije pronadjena");
    })
    .then(function (Drzave_Package) {
      return Drzave_Package;
    })
    .catch((err) => console.log(err));
}
