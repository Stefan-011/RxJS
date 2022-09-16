import { ButtonType } from "../Enums/ButtonEnum";
import { Side } from "../Enums/SideEnum";
import { Drzava } from "../Models/Drzava";
import { User } from "../Models/User";
import { BrojPoena } from "../Enums/BrojPoenaEnum";
import { GetAllDrzave, GetDrzava, GetNewOne } from "./observables";

export function FormatPovrsina(Povrsina: number) {
  let UnFormattedReversed = Povrsina.toString().split("").reverse();
  let ToBeFormatted = Povrsina.toString().split("");
  for (let j = 0, i = 0; i < UnFormattedReversed.length; i++, j++) {
    if (i != 0 && i % 3 == 0) {
      ToBeFormatted[j] = ".";
      ToBeFormatted[j + 1] = UnFormattedReversed[i];
      j++;
    } else ToBeFormatted[j] = UnFormattedReversed[i];
  }
  return ToBeFormatted.reverse().toString().replace(/,/gi, "") + " km²";
}

export async function DrawDrzave(
  Drzave: Drzava[],
  DrzavaNameLabel: HTMLLabelElement[],
  DrzavaPovLabel: HTMLLabelElement[],
  Zastave: HTMLImageElement[],
  BrojDrzava: number
) {
  for (let i = 0; i < Drzave.length; i++) {
    do {
      Drzave[i] = await GetDrzava(BrojDrzava);
    } while (Drzave[i].ime == DrzavaNameLabel[Side.Leva].innerHTML);

    DrzavaNameLabel[i].innerHTML = Drzave[i].ime;
    DrzavaPovLabel[i].innerHTML = FormatPovrsina(Drzave[i].povrsina);
    Zastave[i].src = Drzave[i].zastava;
  }
  DrzavaPovLabel[Side.Desna].style.visibility = "hidden";
}

export function ContinueGame(
  Drzave: Drzava[],
  DrzavaNameLabel: HTMLLabelElement[],
  DrzavaPovLabel: HTMLLabelElement[],
  Zastave: HTMLImageElement[],
  BrojPoenaLabel: HTMLLabelElement[],
  BrojDrzava: number,
  Igrac: User
) {
  Igrac.score++;
  BrojPoenaLabel[BrojPoena.Trenutni].innerHTML = Igrac.score.toString();

  const PovsinaArray = Drzave.filter((item) => item.povrsina > 0).map(
    (item) => item.id
  );

  const fetchObs = GetNewOne(
    PovsinaArray[Side.Leva],
    PovsinaArray[Side.Desna],
    BrojDrzava
  );

  fetchObs.subscribe((NewDrzava) => {
    DrzavaNameLabel[Side.Leva].innerHTML =
      DrzavaNameLabel[Side.Desna].innerHTML;
    DrzavaPovLabel[Side.Leva].innerHTML = DrzavaPovLabel[Side.Desna].innerHTML;
    Zastave[Side.Leva].src = Zastave[Side.Desna].src;
    Drzave[Side.Leva] = Drzave[Side.Desna];
    Drzave[Side.Desna] = NewDrzava;

    DrzavaNameLabel[Side.Desna].innerHTML = NewDrzava.ime;
    DrzavaPovLabel[Side.Desna].innerHTML = FormatPovrsina(NewDrzava.povrsina);
    Zastave[Side.Desna].src = NewDrzava.zastava;
    DrzavaPovLabel[Side.Desna].style.visibility = "hidden";
  });
}

export function StopAndRestart(
  Drzave: Drzava[],
  DrzavaNameLabel: HTMLLabelElement[],
  DrzavaPovLabel: HTMLLabelElement[],
  Zastave: HTMLImageElement[],
  BrojPoena: HTMLLabelElement[],
  BrojDrzava: number,
  Igrac: User
) {
  if (Igrac.score > Igrac.high_score) {
    Igrac.high_score = Igrac.score;
    BrojPoena[1].innerHTML = Igrac.high_score.toString();
    localStorage.setItem("HighScore", Igrac.high_score.toString());
  }
  Igrac.score = 0;
  BrojPoena[0].innerHTML = Igrac.score.toString();
  DrawDrzave(Drzave, DrzavaNameLabel, DrzavaPovLabel, Zastave, BrojDrzava);
}

export function SolveProblem(
  Left: number,
  Right: number,
  Drzave: Drzava[],
  DrzavaNameLabel: HTMLLabelElement[],
  DrzavaPovLabel: HTMLLabelElement[],
  Zastave: HTMLImageElement[],
  BrojPoena: HTMLLabelElement[],
  BrojDrzava: number,
  Igrac: User,
  ButtonActivated: ButtonType
) {
  DrzavaPovLabel[Side.Desna].style.visibility = "visible";
  switch (ButtonActivated) {
    case ButtonType.Veca:
      if (Right >= Left)
        setTimeout(() => {
          ContinueGame(
            Drzave,
            DrzavaNameLabel,
            DrzavaPovLabel,
            Zastave,
            BrojPoena,
            BrojDrzava,
            Igrac
          );
        }, 1000);
      else {
        alert("Pogresli ste !!!");
        setTimeout(() => {
          StopAndRestart(
            Drzave,
            DrzavaNameLabel,
            DrzavaPovLabel,
            Zastave,
            BrojPoena,
            BrojDrzava,
            Igrac
          );
        }, 1000);
      }

      break;
    case ButtonType.Manja:
      if (Right <= Left)
        setTimeout(() => {
          ContinueGame(
            Drzave,
            DrzavaNameLabel,
            DrzavaPovLabel,
            Zastave,
            BrojPoena,
            BrojDrzava,
            Igrac
          );
        }, 1500);
      else {
        alert("Pogresli ste !!!");
        setTimeout(() => {
          StopAndRestart(
            Drzave,
            DrzavaNameLabel,
            DrzavaPovLabel,
            Zastave,
            BrojPoena,
            BrojDrzava,
            Igrac
          );
        }, 1500);

        break;
      }
  }
}

export async function GetNumberOfCountries() {
  let DrzaveList: Drzava[] = [];
  DrzaveList = await GetAllDrzave();
  return DrzaveList.length;
}
