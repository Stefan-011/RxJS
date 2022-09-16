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

export const BROJ_AKTIVNIH_DRZAVA = 2;

const DrzavaNameLabel: HTMLLabelElement[] = [];
const DrzavaPovLabel: HTMLLabelElement[] = [];
const BrojPoenaLabel: HTMLLabelElement[] = [];
const Zastave: HTMLImageElement[] = [];
const Btns: HTMLButtonElement[] = [];
const Drzave: Drzava[] = [];

let UserNameInput: HTMLInputElement;
let SubmitButton: HTMLButtonElement;
let BrojDrzava: number;
let ActiveModal: HTMLElement;
let Igrac: User;

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

  SubmitButton = document.getElementById("BtnPotvrdi") as HTMLButtonElement;

  UserNameInput = document.getElementById("KIme") as HTMLInputElement;

  BrojDrzava = await GetNumberOfCountries();

  ActiveModal = document.getElementById("myModal");

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

    InputObs$.subscribe((username: string) => {
      localStorage.setItem("username", username);
      if (localStorage.getItem("username") != null) {
        ActiveModal.style.display = "none";
        document.getElementById("UserName").innerHTML =
          localStorage.getItem("username");
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
