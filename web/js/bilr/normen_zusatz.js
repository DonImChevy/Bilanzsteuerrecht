// Von Hand übernommene Normen für das Bilanzrecht (Quelle: www.gesetze-im-internet.de), für die kein Gesetzes-PDF vorliegt.
import { gliederungText } from "./gliederung.js";

export const NORMEN_BILR_ZUSATZ = [
  { g: "BGB", nr: "449", titel: "Eigentumsvorbehalt", abs: [
    { abs: "1", text: "Hat sich der Verkäufer einer beweglichen Sache das Eigentum bis zur Zahlung des Kaufpreises vorbehalten, so ist im Zweifel anzunehmen, dass das Eigentum unter der aufschiebenden Bedingung vollständiger Zahlung des Kaufpreises übertragen wird (Eigentumsvorbehalt)." },
    { abs: "2", text: "Auf Grund des Eigentumsvorbehalts kann der Verkäufer die Sache nur herausverlangen, wenn er vom Vertrag zurückgetreten ist." },
    { abs: "3", text: "Die Vereinbarung eines Eigentumsvorbehalts ist nichtig, soweit der Eintritt des Eigentumsübergangs davon abhängig gemacht wird, dass der Käufer Forderungen eines Dritten, insbesondere eines mit dem Verkäufer verbundenen Unternehmens, erfüllt." },
  ] },
  // Das Schema (Abs. 2, 3) ist im PDF zerstückelt; es wird in der App als Grafik gezeigt (gliederung.js).
  { g: "HGB", nr: "266", titel: "Gliederung der Bilanz", schema: true, abs: [
    { abs: "1", text: "Die Bilanz ist in Kontoform aufzustellen. Dabei haben mittelgroße und große Kapitalgesellschaften (§ 267 Absatz 2 und 3) auf der Aktivseite die in Absatz 2 und auf der Passivseite die in Absatz 3 bezeichneten Posten gesondert und in der vorgeschriebenen Reihenfolge auszuweisen. Kleine Kapitalgesellschaften (§ 267 Abs. 1) brauchen nur eine verkürzte Bilanz aufzustellen, in die nur die in den Absätzen 2 und 3 mit Buchstaben und römischen Zahlen bezeichneten Posten gesondert und in der vorgeschriebenen Reihenfolge aufgenommen werden. Kleinstkapitalgesellschaften (§ 267a) brauchen nur eine verkürzte Bilanz aufzustellen, in die nur die in den Absätzen 2 und 3 mit Buchstaben bezeichneten Posten gesondert und in der vorgeschriebenen Reihenfolge aufgenommen werden." },
    { abs: "2", text: "Aktivseite\n" + gliederungText("aktiva") },
    { abs: "3", text: "Passivseite\n" + gliederungText("passiva") },
  ] },
  { g: "EStDV", nr: "9a", titel: "Anschaffung, Herstellung", abs: [
    { abs: "", text: "Jahr der Anschaffung ist das Jahr der Lieferung, Jahr der Herstellung ist das Jahr der Fertigstellung." },
  ] },
];
