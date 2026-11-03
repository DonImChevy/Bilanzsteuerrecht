// English section – four formats as in the online test (all texts written for this app):
// Sätze ergänzen, Satzbau und Verstehen, Lückentext, Texte zuordnen.
// Each item has exactly one correct answer (first option) and a short rule in German.

import { mcText, esc } from "./zufall.js";

// [sentence with ___, correct, wrong1, wrong2, wrong3, rule]
export const SAETZE = [
  ["If the central bank ___ interest rates, borrowing would become more expensive.", "raised", "raises", "will raise", "has raised", "If-Satz Typ 2 (vorgestellte Situation): if + Simple Past, Hauptsatz mit would."],
  ["The annual report ___ by the board next Monday.", "will be presented", "will present", "is presenting", "presented", "Passiv Futur: will be + 3. Form – der Bericht wird präsentiert, er präsentiert nicht selbst."],
  ["She has worked at the bank ___ 2019.", "since", "for", "from", "ago", "since + Zeitpunkt (seit 2019), for + Zeitraum (seit drei Jahren)."],
  ["We have been waiting for the results ___ three weeks.", "for", "since", "during", "ago", "for + Zeitraum beim Present Perfect (Continuous)."],
  ["The new branch, ___ opened last year, is already profitable.", "which", "who", "what", "whose", "which für Sachen im Relativsatz mit Komma (non-defining) – that ist nach Komma nicht möglich."],
  ["The analyst ___ advice we followed was right.", "whose", "who's", "which", "whom", "whose = dessen/deren (Besitz). who's = who is."],
  ["By the time the meeting starts, the manager ___ the figures.", "will have checked", "checks", "checked", "has checked", "Future Perfect: Handlung ist bis zu einem Zeitpunkt in der Zukunft abgeschlossen."],
  ["I look forward to ___ from you.", "hearing", "hear", "heard", "be hearing", "look forward to + -ing (to ist hier Präposition)."],
  ["The committee decided ___ the decision.", "to postpone", "postponing", "postpone", "postponed", "decide + to-Infinitiv."],
  ["He avoided ___ the question directly.", "answering", "to answer", "answer", "answered", "avoid + -ing."],
  ["Last year the company ___ a record profit.", "made", "has made", "makes", "was making", "Abgeschlossener Zeitpunkt in der Vergangenheit (last year) → Simple Past."],
  ["The figures are ___ than we expected.", "better", "more good", "best", "more better", "Unregelmäßige Steigerung: good – better – best."],
  ["This is the ___ investment we have ever made.", "most profitable", "more profitable", "profitablest", "most profitably", "Superlativ langer Adjektive: the most + Adjektiv."],
  ["Could you tell me where ___?", "the head office is", "is the head office", "the head office be", "does the head office", "Indirekte Frage: Aussagesatz-Wortstellung (Subjekt vor Verb)."],
  ["Prices have risen ___ over the past months.", "sharply", "sharp", "sharper", "sharpness", "Ein Verb (risen) wird durch ein Adverb beschrieben: sharply."],
  ["We need ___ information before we can decide.", "more", "many", "a few", "fewer", "information ist unzählbar → more/much, nicht many/few."],
  ["There isn't ___ money left in the budget.", "much", "many", "few", "a few", "money ist unzählbar → much."],
  ["If I had known about the delay, I ___ the client.", "would have informed", "would inform", "had informed", "will inform", "If-Satz Typ 3: if + Past Perfect, would have + 3. Form."],
  ["The documents must ___ by Friday.", "be signed", "sign", "signed", "signing", "Passiv mit Modalverb: must be + 3. Form."],
  ["She suggested ___ the meeting to Thursday.", "moving", "to move", "move", "moved", "suggest + -ing."],
  ["The central bank is responsible ___ the stability of prices.", "for", "of", "to", "about", "responsible for (verantwortlich für)."],
  ["The interest rate depends ___ several factors.", "on", "of", "from", "at", "depend on (abhängen von)."],
  ["We are interested ___ expanding into new markets.", "in", "on", "for", "at", "interested in."],
  ["While I ___ the report, the phone rang.", "was writing", "wrote", "have written", "am writing", "Past Progressive für die laufende Handlung, die unterbrochen wird."],
  ["The euro was introduced as cash ___ 2002.", "in", "on", "at", "since", "in + Jahreszahl."],
  ["The meeting takes place ___ Monday morning.", "on", "in", "at", "by", "on + Wochentag (auch: on Monday morning)."],
  ["Have you sent the invoice ___?", "yet", "still", "since", "ago", "yet am Satzende in Fragen und Verneinungen (schon/noch nicht)."],
  ["The more you save, the ___ you will have later.", "more", "most", "much", "many", "the + Komparativ …, the + Komparativ (je …, desto …)."],
  ["Unless the market ___, we will cancel the project.", "recovers", "recover", "will recover", "recovered", "unless = if not; im Nebensatz kein will (Typ 1: Simple Present)."],
  ["The board ___ approved the budget yet.", "hasn't", "didn't", "wasn't", "isn't", "yet + Present Perfect: hasn't approved."],
  ["She is used to ___ long hours.", "working", "work", "worked", "works", "be used to + -ing (an etwas gewöhnt sein)."],
  ["The amount of cash in circulation ___ increased.", "has", "have", "are", "were", "Subjekt ist the amount (Singular) → has."],
  ["This is the city ___ the European Central Bank is based.", "where", "which", "who", "what", "where für Orte im Relativsatz (in which)."],
  ["The bank charges a small ___ for each international transfer.", "fee", "fare", "rent", "wage", "fee = Gebühr; fare = Fahrpreis; rent = Miete; wage = Lohn."],
  ["The company had to ___ 200 employees because of falling sales.", "lay off", "lay down", "lay out", "lay by", "lay off = entlassen."],
  ["Customers can ___ money from the cash machine 24 hours a day.", "withdraw", "deposit", "invest", "owe", "withdraw money from = Geld abheben von."],
  ["Inflation ___ the purchasing power of money.", "reduces", "increases", "improves", "strengthens", "Inflation verringert die Kaufkraft (reduce)."],
  ["Neither the manager nor the employees ___ aware of the problem.", "were", "was", "is", "has been", "neither … nor: Das Verb richtet sich nach dem näheren Subjekt (the employees → Plural)."],
  ["He has ___ finished the presentation.", "just", "yet", "ever", "ago", "just (gerade eben) steht beim Present Perfect zwischen has und Partizip."],
  ["Our profits were ___ affected by the crisis.", "badly", "bad", "worse", "worst", "Adverb (badly) beschreibt das Partizip affected."],
];

// Satzbau und Verstehen: { a: "ordnung"|"bedeutung"|"fehler", q?, o: [correct, …], e }
export const SATZBAU = [
  { a: "ordnung", o: ["She always arrives at the office early.", "She arrives always at the office early.", "Always she arrives at the office early.", "She arrives at the office always early."], e: "Häufigkeitsadverbien (always, often, never) stehen vor dem Vollverb." },
  { a: "ordnung", o: ["I have never seen such high figures.", "I have seen never such high figures.", "Never I have seen such high figures.", "I have such high figures never seen."], e: "never steht zwischen Hilfsverb (have) und Partizip (seen). Steht never am Satzanfang, muss invertiert werden (Never have I …)." },
  { a: "ordnung", o: ["Do you know when the meeting starts?", "Do you know when does the meeting start?", "Do you know when starts the meeting?", "Do you know the meeting when starts?"], e: "Indirekte Frage: nach dem Fragewort folgt Subjekt + Verb, ohne do/does." },
  { a: "ordnung", o: ["He gave the client the documents yesterday.", "He gave yesterday the client the documents.", "He gave the documents yesterday the client.", "Yesterday he gave to the client the documents."], e: "Subjekt – Verb – Objekte; Zeitangaben stehen am Ende oder am Anfang, nie zwischen Verb und Objekt." },
  { a: "ordnung", o: ["Not only did prices rise, but wages also fell.", "Not only prices rose, but wages also fell.", "Not only did rise prices, but wages also fell.", "Not only rose prices, but wages also fell."], e: "Not only am Satzanfang → Inversion mit did: Not only did prices rise …" },
  { a: "ordnung", o: ["The new rules will be introduced next year.", "Next year will the new rules be introduced.", "The new rules be will introduced next year.", "Will be introduced the new rules next year."], e: "Aussagesatz: Subjekt – will be – Partizip – Zeitangabe." },
  { a: "ordnung", o: ["I would like to know whether the payment has arrived.", "I would like to know whether has the payment arrived.", "I would like to know whether the payment arrived has.", "I would like to know has whether the payment arrived."], e: "Nach whether/if (ob) folgt normale Wortstellung: Subjekt + Verb." },
  { a: "ordnung", o: ["Rarely have we seen such strong growth.", "Rarely we have seen such strong growth.", "Rarely have seen we such strong growth.", "Rarely we seen have such strong growth."], e: "Verneinende Adverbien am Satzanfang (rarely, never, hardly) → Inversion: Hilfsverb vor Subjekt." },
  { a: "ordnung", o: ["The manager asked me where I had put the file.", "The manager asked me where had I put the file.", "The manager asked me where I put had the file.", "The manager asked me where did I put the file."], e: "Indirekte Rede/Frage: Subjekt vor Verb, keine Inversion." },
  { a: "ordnung", o: ["There are not enough staff to open the branch on Saturdays.", "There are not staff enough to open the branch on Saturdays.", "There enough staff are not to open the branch on Saturdays.", "There are not enough to open staff the branch on Saturdays."], e: "enough steht vor Nomen (enough staff), aber nach Adjektiven (good enough)." },
  { a: "bedeutung", q: "The project was called off.", o: ["The project was cancelled.", "The project was postponed.", "The project was started.", "The project was completed."], e: "call off = absagen, abbrechen (cancel)." },
  { a: "bedeutung", q: "She is unlikely to accept the offer.", o: ["She probably won't accept the offer.", "She will certainly accept the offer.", "She has already accepted the offer.", "She was not offered anything."], e: "unlikely = unwahrscheinlich → sie wird es wahrscheinlich nicht annehmen." },
  { a: "bedeutung", q: "Had we known about the risks, we would not have invested.", o: ["We invested because we did not know about the risks.", "We knew about the risks and did not invest.", "We knew about the risks but invested anyway.", "We will not invest because of the risks."], e: "Had we known = If we had known (Typ 3): Tatsächlich wussten sie es nicht und haben investiert." },
  { a: "bedeutung", q: "The meeting has been put off until next week.", o: ["The meeting has been postponed.", "The meeting has been cancelled for good.", "The meeting took place last week.", "The meeting has been moved forward."], e: "put off = verschieben (postpone), nicht absagen." },
  { a: "bedeutung", q: "Sales went up despite the bad weather.", o: ["Although the weather was bad, sales increased.", "Because the weather was bad, sales increased.", "Sales fell because of the bad weather.", "The weather was good, so sales increased."], e: "despite = trotz → Gegensatz (although), nicht Grund (because)." },
  { a: "bedeutung", q: "You needn't send the documents by post.", o: ["It is not necessary to send the documents by post.", "You must not send the documents by post.", "You have to send the documents by post.", "You cannot send the documents by post."], e: "needn't = muss nicht (nicht nötig). must not = darf nicht!" },
  { a: "bedeutung", q: "I used to work in London.", o: ["I worked in London in the past, but I don't any more.", "I am used to working in London.", "I work in London at the moment.", "I have never worked in London."], e: "used to + Infinitiv = früher (regelmäßig), heute nicht mehr." },
  { a: "bedeutung", q: "The director had the report checked.", o: ["Someone checked the report for the director.", "The director checked the report herself.", "The director had already checked the report.", "The report was never checked."], e: "have something done = etwas machen lassen (jemand anderes macht es)." },
  { a: "bedeutung", q: "Hardly had the market opened when prices fell.", o: ["Prices fell immediately after the market opened.", "Prices fell before the market opened.", "The market hardly opened that day.", "Prices fell slowly during the day."], e: "Hardly … when = kaum …, als (direkt danach)." },
  { a: "bedeutung", q: "She can't have read the email.", o: ["I am sure she did not read the email.", "She is not allowed to read the email.", "She is not able to read emails.", "She should not read the email."], e: "can't have + 3. Form = Schlussfolgerung über die Vergangenheit: Es ist ausgeschlossen, dass sie sie gelesen hat." },
  { a: "fehler", q: "(A) The number of customers (B) have increased (C) significantly (D) since last year.", o: ["(B)", "(A)", "(C)", "(D)"], e: "Subjekt ist the number (Singular) → has increased." },
  { a: "fehler", q: "If I (A) would have (B) more time, I (C) would read (D) the whole report.", o: ["(A)", "(B)", "(C)", "(D)"], e: "Im if-Satz steht kein would: If I had more time …" },
  { a: "fehler", q: "He (A) has worked (B) for the bank (C) since (D) five years.", o: ["(C)", "(A)", "(B)", "(D)"], e: "Zeitraum (five years) → for, nicht since." },
  { a: "fehler", q: "(A) Each of the employees (B) have (C) received a bonus (D) this year.", o: ["(B)", "(A)", "(C)", "(D)"], e: "each of … ist Singular → has received." },
  { a: "fehler", q: "The bank (A) has (B) less (C) branches (D) than ten years ago.", o: ["(B)", "(A)", "(C)", "(D)"], e: "branches ist zählbar → fewer branches (less nur bei Unzählbarem)." },
  { a: "fehler", q: "She (A) explained (B) me (C) the new rules (D) in detail.", o: ["(B)", "(A)", "(C)", "(D)"], e: "explain something to somebody: She explained the new rules to me." },
];

// Lückentexte: text with {1}…{5}, gaps: [correct, w1, w2, w3, rule]
export const LUECKENTEXTE = [
  {
    titel: "The role of central banks",
    text: "Central banks are responsible {1} keeping prices stable. When inflation is too high, they usually {2} interest rates. This makes loans more expensive, {3} reduces spending. If spending {4}, prices tend to rise more slowly. However, it can take several months {5} the effects become visible.",
    luecken: [["for", "of", "to", "about", "responsible for."], ["raise", "rise", "arise", "rose", "raise (etwas erhöhen, mit Objekt) – rise (steigen, ohne Objekt)."], ["which", "what", "who", "that", "which bezieht sich auf den ganzen vorigen Satz; nach Komma kein that."], ["falls", "fall", "fell", "fallen", "If-Satz Typ 1 / allgemeine Regel: Simple Present, 3. Person -s."], ["before", "since", "during", "despite", "it takes … before … = es dauert …, bis …"]],
  },
  {
    titel: "A job application",
    text: "Dear Ms Carter, I am writing to apply {1} the position of junior analyst. I {2} economics at university for three years and will graduate next summer. During my internship, I {3} the opportunity to work with large data sets. I would be grateful if you {4} consider my application. I look forward to {5} from you.",
    luecken: [["for", "to", "at", "on", "apply for a position."], ["have been studying", "am studying", "study", "was studying", "Seit drei Jahren und noch andauernd → Present Perfect Continuous."], ["had", "have", "has", "having", "Abgeschlossenes Praktikum (during my internship) → Simple Past."], ["would", "are", "did", "have", "Höfliche Bitte: I would be grateful if you would …"], ["hearing", "hear", "heard", "be hearing", "look forward to + -ing."]],
  },
  {
    titel: "Digital payments",
    text: "In recent years, the way people pay {1} changed dramatically. Many customers now prefer to pay by card or smartphone {2} in cash. Banks {3} that the share of cash payments will continue to fall. Nevertheless, cash is still popular among people {4} value privacy. Experts believe that cash {5} disappear completely in the near future.",
    luecken: [["has", "have", "is", "was", "Subjekt the way (Singular) + in recent years → has changed."], ["rather than", "instead", "than", "as", "prefer A rather than B."], ["expect", "expects", "expecting", "are expect", "Banks (Plural) → expect."], ["who", "which", "whose", "whom", "Personen als Subjekt des Relativsatzes → who."], ["won't", "doesn't", "isn't", "hasn't", "Vorhersage für die Zukunft → will not (won't) + Infinitiv."]],
  },
  {
    titel: "A conference trip",
    text: "Last month, our team {1} to Frankfurt for a conference. We {2} planned the trip for weeks, but the train was cancelled at short notice. {3}, we managed to arrive on time by renting a car. The conference was {4} interesting than we had expected. Next year, we {5} probably send two more colleagues.",
    luecken: [["travelled", "has travelled", "travels", "was travel", "last month → Simple Past."], ["had", "have", "has", "were", "Vorvergangenheit (vor der Absage) → Past Perfect: had planned."], ["Fortunately", "Unfortunately", "Therefore", "Because", "Gegensatz zum Problem davor, gutes Ende → Fortunately."], ["more", "most", "much", "very", "Komparativ mit than: more interesting than."], ["will", "are", "did", "have", "Zukunft (next year) → will."]],
  },
  {
    titel: "Saving money",
    text: "Many young people find it difficult {1} money. Experts recommend {2} a fixed amount at the beginning of each month. Even small amounts can grow {3} over time because of compound interest. {4} you start saving early, you will benefit from this effect. It is also important to keep some money aside {5} unexpected expenses.",
    luecken: [["to save", "saving", "save", "saved", "find it difficult + to-Infinitiv."], ["putting aside", "to put aside", "put aside", "puts aside", "recommend + -ing."], ["considerably", "considerable", "consider", "consideration", "Adverb zum Verb grow → considerably."], ["If", "Unless", "Although", "Despite", "Bedingung mit positiver Folge → If."], ["for", "of", "at", "by", "keep money aside for something."]],
  },
  {
    titel: "Working in a team",
    text: "Working in a team {1} many advantages. Team members can share ideas and learn {2} each other. However, conflicts can arise if responsibilities are not {3} defined. A good team leader makes sure that everyone {4} what their tasks are. In the end, a team is only as strong as {5} weakest member.",
    luecken: [["has", "have", "is having", "are", "Gerund-Subjekt (Working in a team) ist Singular → has."], ["from", "at", "to", "for", "learn from somebody."], ["clearly", "clear", "clearness", "clearer", "Adverb zum Partizip defined → clearly."], ["knows", "know", "knowing", "known", "everyone ist Singular → knows."], ["its", "it's", "it", "theirs", "Possessivbegleiter von a team → its (it's = it is)."]],
  },
];

// Texte zuordnen: four short texts, statements → text number (1–4)
export const TEXTSETS = [
  {
    titel: "Working from home",
    texte: [
      "Since my company introduced remote work, I've saved almost two hours a day on commuting. I use that time to go running before I start work. The only thing I miss is chatting with colleagues over lunch, so I go into the office every Friday.",
      "I tried working from home for a few months, but it wasn't for me. My flat is small and my children are noisy, so I could hardly concentrate. Now I'm back in the office full-time and my productivity has improved a lot.",
      "As a team leader, I find it harder to notice when someone is struggling if I only see them on a screen. If I could change one thing, I would make sure the whole team met in person at least once a week. Still, I appreciate the flexibility.",
      "Working remotely allowed me to move back to the village where I grew up. Housing is much cheaper there, and I've been able to save money for the first time. My employer pays for my internet connection, which is a nice bonus.",
    ],
    aussagen: [["This person mentions a financial advantage.", 4], ["An imagined situation is mentioned in this text.", 3], ["This person has returned to their previous way of working.", 2], ["This person uses the time gained for exercise.", 1], ["This person regularly combines working at home and at the office.", 1], ["Someone else covers one of this person's costs.", 4], ["This person is concerned about other people's well-being.", 3]],
  },
  {
    titel: "Choosing a bank",
    texte: [
      "I chose my bank because it has a branch right next to my office. I know it's old-fashioned, but I like to talk to a real person when I have questions about my money. I don't mind paying a monthly fee for this service.",
      "My account is completely free, and I can manage everything with an app. I've never been inside a branch. Last year I almost switched to another bank because the app kept crashing, but the problems have been fixed since then.",
      "When I opened my first account as a student, I simply went to the bank my parents used. Looking back, I should have compared the offers. I would have saved quite a lot of money on fees over the years.",
      "For me, the most important thing is that my bank invests responsibly. I checked several banks' reports before deciding. My current bank doesn't finance coal or weapons, and that matters more to me than the interest rate.",
    ],
    aussagen: [["This person regrets a past decision.", 3], ["This person nearly left their bank.", 2], ["This person is willing to pay for personal advice.", 1], ["Ethical values influenced this person's choice.", 4], ["An imagined situation is mentioned in this text.", 3], ["This person has never visited a branch.", 2], ["This person did some research before choosing.", 4]],
  },
  {
    titel: "Learning a language for work",
    texte: [
      "I started learning Spanish because our company opened an office in Madrid. I take a lesson every Tuesday evening, and my employer pays half of the course fee. Progress is slow, but I can already handle simple phone calls.",
      "I've lived in Germany for ten years, but I only began to learn German properly two years ago. Before that, everyone at work spoke English with me, so I never felt it was necessary. Today I'm glad I finally made the effort.",
      "Our team uses an app for ten minutes a day. We compete with each other, and the person with the most points each month gets a small prize. It's fun, although I'm not sure how much we actually remember.",
      "I don't think language courses are worth it for adults. I learned English by watching films and talking to people when I travelled. If I had taken classes, I would probably have given up quickly.",
    ],
    aussagen: [["This person describes a competition.", 3], ["An employer shares the costs of learning.", 1], ["This person did not see the need to learn at first.", 2], ["An imagined situation is mentioned in this text.", 4], ["This person learned without formal lessons.", 4], ["This person can already use the language on the phone.", 1]] ,
  },
];

export function saetzeErgaenzen(r, _stufe, idx = null) {
  const [satz, ok, f1, f2, f3, regel] = SAETZE[idx ?? r.int(0, SAETZE.length - 1)];
  return {
    englisch: true, frage: "Choose the word or phrase that best completes the sentence.",
    satz: esc(satz).replace("___", '<span class="luecke">_____</span>'),
    ...mcText(r, ok, [f1, f2, f3]),
    schritte: [`Richtig: <b>${esc(satz.replace("___", ok))}</b>`, regel],
    schema: ["Signalwörter suchen (since/for, yesterday, if, by the time …)", "Satzglied bestimmen: Verbform, Präposition, Adjektiv oder Adverb?", "Zählbar oder unzählbar? Singular oder Plural?"],
  };
}

export function satzbau(r, _stufe, idx = null) {
  const it = SATZBAU[idx ?? r.int(0, SATZBAU.length - 1)];
  const frage = it.a === "ordnung" ? "Which sentence is correct?" : it.a === "bedeutung" ? "Which sentence has the same meaning?" : "Which part of the sentence contains a mistake?";
  const opt = it.a === "fehler" ? { optionen: ["(A)", "(B)", "(C)", "(D)"], richtig: ["(A)", "(B)", "(C)", "(D)"].indexOf(it.o[0]) } : mcText(r, it.o[0], it.o.slice(1));
  return {
    englisch: true, frage,
    satz: it.q ? esc(it.q).replace(/\((A|B|C|D)\)/g, '<span class="marke">($1)</span>') : "",
    ...opt, festeReihenfolge: it.a === "fehler",
    schritte: [it.a === "fehler" ? `Fehler bei <b>${it.o[0]}</b>` : `Richtig: <b>${esc(it.o[0])}</b>`, it.e],
    schema: it.a === "ordnung" ? ["Grundmuster: Subjekt – Verb – Objekt – Ort – Zeit", "Indirekte Fragen: keine Inversion", "Never/rarely/not only am Anfang: Inversion"] : it.a === "bedeutung" ? ["Schlüsselwort übersetzen (call off, despite, needn't …)", "Verneinung und Zeitform genau vergleichen", "Falsche Freunde beachten (must not ≠ needn't)"] : ["Subjekt-Verb-Kongruenz prüfen", "Zeitform und Signalwörter prüfen", "Präpositionen und zählbar/unzählbar prüfen"],
  };
}

export function lueckentext(r, _stufe, idx = null) {
  const alle = LUECKENTEXTE.flatMap((t, ti) => t.luecken.map((_, li) => [ti, li]));
  const [ti, li] = alle[idx ?? r.int(0, alle.length - 1)];
  const t = LUECKENTEXTE[ti], [ok, f1, f2, f3, regel] = t.luecken[li];
  const html = esc(t.text).replace(/\{(\d)\}/g, (_, n) => (Number(n) === li + 1 ? `<span class="luecke aktiv">(${n}) _____</span>` : `<span class="luecke">(${n}) ___</span>`));
  return {
    englisch: true, frage: `Choose the correct word for gap (${li + 1}).`,
    titel: t.titel, lesetext: html,
    ...mcText(r, ok, [f1, f2, f3]),
    schritte: [`Lücke (${li + 1}): <b>${esc(ok)}</b>`, regel],
    schema: ["Den ganzen Satz um die Lücke lesen", "Bezug klären: Subjekt, Zeitform, feste Verbindung (responsible for, look forward to)", "Satzlogik prüfen: Gegensatz, Grund oder Bedingung?"],
  };
}

export function texteZuordnen(r, _stufe, idx = null) {
  const alle = TEXTSETS.flatMap((s, si) => s.aussagen.map((_, ai) => [si, ai]));
  const [si, ai] = alle[idx ?? r.int(0, alle.length - 1)];
  const s = TEXTSETS[si], [aussage, nr] = s.aussagen[ai];
  return {
    englisch: true, frage: "Read the four texts. Which text does the statement refer to?",
    titel: s.titel, texte: s.texte.map(esc), aussage: esc(aussage),
    optionen: ["(1)", "(2)", "(3)", "(4)"], richtig: nr - 1, festeReihenfolge: true,
    schritte: [`Richtig ist <b>Text (${nr})</b>`, `Beleg: „${esc(belegSatz(s.texte[nr - 1], aussage))}“`],
    schema: ["Erst die Aussage lesen, dann gezielt suchen", "Auf Umschreibungen achten (financial advantage = save money)", "„Imagined situation“ = if/would-Sätze (Konditional)", "Jede Aussage passt genau zu einem Text"],
  };
}

// pick the sentence of the text that best supports the statement (simple word overlap; conditional for "imagined")
function belegSatz(text, aussage) {
  const saetze = text.match(/[^.!?]+[.!?]/g) || [text];
  if (/imagined/i.test(aussage)) return (saetze.find((x) => /\b(if|would)\b/i.test(x)) || saetze[0]).trim();
  const w = new Set(aussage.toLowerCase().match(/[a-z']{4,}/g) || []);
  const syn = { financial: ["money", "cheaper", "save", "fee"], exercise: ["running"], regrets: ["should have", "would have"], costs: ["pays"], research: ["checked", "reports"], competition: ["compete", "prize"], phone: ["phone"], branch: ["branch"], left: ["switched"], advice: ["talk to a real person"], ethical: ["responsibly", "coal"], formal: ["watching films"], need: ["necessary"], "well-b": ["struggling"], returned: ["back in the office"], combines: ["every friday"] };
  let best = saetze[0], bestN = -1;
  for (const s of saetze) {
    const l = s.toLowerCase();
    let n = [...w].filter((x) => l.includes(x)).length;
    for (const [k, v] of Object.entries(syn)) if (aussage.toLowerCase().includes(k.slice(0, 6)) && v.some((x) => l.includes(x))) n += 3;
    if (n > bestN) { bestN = n; best = s; }
  }
  return best.trim();
}

export const ANZAHL = { saetze: SAETZE.length, satzbau: SATZBAU.length, luecken: LUECKENTEXTE.reduce((a, t) => a + t.luecken.length, 0), zuordnen: TEXTSETS.reduce((a, s) => a + s.aussagen.length, 0) };
