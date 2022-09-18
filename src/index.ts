import {
  DrawDrzave,
  GetNumberOfCountries,
  SolveProblem,
} from "./Logic/utilities";
import { SetupButtons, TakeUserName } from "./Logic/observables";
import { Drzava } from "./Models/Drzava";
import { User } from "./Models/User";
import { Side } from "./Enums/SideEnum";
import { BrojPoena } from "./Enums/BrojPoenaEnum";
import { ButtonType } from "./Enums/ButtonEnum";
import { Subject, takeUntil } from "rxjs";

export const BROJ_AKTIVNIH_DRZAVA = 2;

const Unsubscribe$: Subject<void> = new Subject<void>();

const DrzavaNameLabel: HTMLLabelElement[] = [];
const DrzavaPovLabel: HTMLLabelElement[] = [];
const BrojPoenaLabel: HTMLLabelElement[] = [];
const Zastave: HTMLImageElement[] = [];
const Btns: HTMLButtonElement[] = [];
const Drzave: Drzava[] = [];

const UserNameInput: HTMLInputElement = document.getElementById(
  "KIme"
) as HTMLInputElement;

const SubmitButton: HTMLButtonElement = document.getElementById(
  "BtnPotvrdi"
) as HTMLButtonElement;

const ActiveModal: HTMLElement = document.getElementById("myModal");

let Igrac: User;
let BrojDrzava: number;

async function SetElements() {
  DrzavaNameLabel[Side.Leva] = document.getElementById(
    "leva_drzava_ime"
  ) as HTMLLabelElement;

  DrzavaNameLabel[Side.Desna] = document.getElementById(
    "desna_drzava_ime"
  ) as HTMLLabelElement;

  DrzavaPovLabel[Side.Leva] = document.getElementById(
    "leva_drzava_povrsina"
  ) as HTMLLabelElement;

  DrzavaPovLabel[Side.Desna] = document.getElementById(
    "desna_drzava_povrsina"
  ) as HTMLLabelElement;

  Zastave[Side.Leva] = document.getElementById(
    "leva_drzava_zastava"
  ) as HTMLImageElement;

  Zastave[Side.Desna] = document.getElementById(
    "desna_drzava_zastava"
  ) as HTMLImageElement;

  Btns[ButtonType.Veca] = document.getElementById(
    "btn-veca"
  ) as HTMLButtonElement;

  Btns[ButtonType.Manja] = document.getElementById(
    "btn-manja"
  ) as HTMLButtonElement;

  BrojPoenaLabel[BrojPoena.Trenutni] = document.getElementById(
    "br_poena"
  ) as HTMLLabelElement;

  BrojPoenaLabel[BrojPoena.Maksimalni] = document.getElementById(
    "max_poena"
  ) as HTMLLabelElement;

  BrojDrzava = await GetNumberOfCountries();

  for (let i = 0; i < BROJ_AKTIVNIH_DRZAVA; i++) {
    let NewDrzava: Drzava;
    Drzave[i] = NewDrzava;
  }

  Igrac = {
    score: 0,
    high_score: 0,
  };
}

function SetData() {
  if (localStorage.getItem("username") == null) {
    localStorage.clear();
    ActiveModal.style.display = "block";
    const InputObs$ = TakeUserName(UserNameInput, SubmitButton);

    InputObs$.pipe(takeUntil(Unsubscribe$)).subscribe((username: string) => {
      localStorage.setItem("username", username);
      if (localStorage.getItem("username") != null) {
        ActiveModal.style.display = "none";
        document.getElementById("UserName").innerHTML =
          localStorage.getItem("username");
        Unsubscribe$.next();
        Unsubscribe$.complete();
      }
    });
  } else
    document.getElementById("UserName").innerHTML =
      localStorage.getItem("username");

  if (localStorage.getItem("HighScore") != null) {
    Igrac.high_score = parseInt(localStorage.getItem("HighScore"));
    BrojPoenaLabel[BrojPoena.Maksimalni].innerHTML =
      Igrac.high_score.toString();
  }
}

window.onload = async function () {
  await SetElements();
  SetData();
  DrawDrzave(Drzave, DrzavaNameLabel, DrzavaPovLabel, Zastave, BrojDrzava);
  let $DugmeEvent = SetupButtons(Btns);

  $DugmeEvent[ButtonType.Veca].subscribe(async function () {
    SolveProblem(
      Drzave[Side.Leva].povrsina,
      Drzave[Side.Desna].povrsina,
      Drzave,
      DrzavaNameLabel,
      DrzavaPovLabel,
      Zastave,
      BrojPoenaLabel,
      BrojDrzava,
      Igrac,
      ButtonType.Veca,
      Btns
    );
  });

  $DugmeEvent[ButtonType.Manja].subscribe(async function () {
    SolveProblem(
      Drzave[Side.Leva].povrsina,
      Drzave[Side.Desna].povrsina,
      Drzave,
      DrzavaNameLabel,
      DrzavaPovLabel,
      Zastave,
      BrojPoenaLabel,
      BrojDrzava,
      Igrac,
      ButtonType.Manja,
      Btns
    );
  });
};
