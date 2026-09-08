export type Locale = "en" | "it"

export const LOCALE_STORAGE_KEY = "ida-workshop-locale"

const IT_TEXT: Record<string, string> = {
  "Timer segment": "Segmento timer",
  "IDA Product Strategy Workshop": "Workshop Strategia Prodotto IDA",
  "60-minute core team alignment": "Allineamento core team in 60 minuti",
  "Pause timer": "Pausa timer",
  "Start timer": "Avvia timer",
  "Next segment": "Segmento successivo",
  "Board": "Lavagna",
  "Guide": "Guida",
  "Export": "Esporta",
  "Saved": "Salvato",
  "Loading workspace…": "Caricamento workspace…",
  "Unlisted team workspace. Ask Florentin for the password.":
    "Workspace del team non indicizzato. Chiedi la password a Florentin.",
  "Password": "Password",
  "Unlock workshop": "Sblocca workshop",
  "Real-time decision board": "Lavagna decisionale in tempo reale",
  "Fill in as the group speaks. Notes stay in this browser — put one machine on the projector as the canonical board.":
    "Compila mentre il gruppo parla. Le note restano in questo browser: usa una macchina sul proiettore come lavagna di riferimento.",
  "Date": "Data",
  "Facilitator": "Facilitatore",
  "Participants": "Partecipanti",
  "Add participant": "Aggiungi partecipante",
  "Role (e.g. Legal)": "Ruolo (es. Legale)",
  "Name": "Nome",
  "Everyone contributes their expertise — if a department is in the room, add its row to the owner and sign-off tables in Segment 5 too.":
    "Tutti contribuiscono con la propria competenza: se un dipartimento e' presente, aggiungi la sua riga anche nelle tabelle owner e approvazioni del Segmento 5.",
  "Outcomes": "Risultati",
  "Segment": "Segmento",
  "Complete": "Completato",
  "Mark complete": "Segna come completato",
  "Facilitator script": "Script facilitatore",
  "Outcome:": "Risultato:",
  "The 24-hour email": "Email entro 24 ore",
  "Assembled live from the board. Review it, fill any [TBD] gaps on the Board tab, then copy and send to the team within 24 hours. This is binding for the next 30 days — next review":
    "Generata in tempo reale dalla lavagna. Rivedila, completa eventuali [TBD] nella scheda Lavagna, poi copia e invia al team entro 24 ore. Vale per i prossimi 30 giorni — prossimo review",
  "Copied ✓": "Copiata ✓",
  "Copy email": "Copia email",
  "Download .txt": "Scarica .txt",
  "Board record & backups": "Storico lavagna e backup",
  "The board autosaves to this browser on every keystroke. Snapshots are taken automatically about once a minute while you edit, and always before a reset or restore. Download the board file after the session to keep the record outside the browser — it restores on any machine.":
    "La lavagna si salva automaticamente in questo browser a ogni modifica. Le istantanee vengono create circa ogni minuto durante la modifica e sempre prima di reset o ripristino. Scarica il file della lavagna a fine sessione per conservarlo fuori dal browser: puo' essere ripristinato su qualsiasi macchina.",
  "Download board file (.json)": "Scarica file lavagna (.json)",
  "Restore from file…": "Ripristina da file…",
  "Snapshots on this browser": "Istantanee in questo browser",
  "No snapshots yet — they appear automatically as you edit the board.":
    "Nessuna istantanea ancora: appariranno automaticamente mentre modifichi la lavagna.",
  "Restore": "Ripristina",
  "Workshop outcomes": "Risultati del workshop",
  "What we decided": "Cosa abbiamo deciso",
  "Who owns what": "Chi e' owner di cosa",
  "Critical blockers (resolve by)": "Blocker critici (da risolvere entro)",
  "Next board update": "Prossimo aggiornamento lavagna",
  "Notes & parking lot": "Note e parking lot",
  "Items that came up but don't fit in 60 min — revisit later.":
    "Temi emersi ma non gestibili in 60 minuti: da riprendere dopo.",
  "Post-workshop checklist": "Checklist post-workshop",
  "Generate the 24-hour email →": "Genera email entro 24 ore →",
  "Everyone replies: “Confirmed — I own [my piece]”.":
    "Tutti rispondono: “Confermato — sono owner di [mia parte]”.",
  "Reset board": "Reset lavagna",
  "Lock": "Blocca",
  "Segments complete": "Segmenti completati",
  "minutes": "minuti",
  "Clear this browser's workshop notes? A snapshot is kept — you can restore it from the Export tab. This does not affect anyone else's device.":
    "Cancellare le note del workshop in questo browser? Viene mantenuta un'istantanea: puoi ripristinarla dalla scheda Esporta. Non influisce sugli altri dispositivi.",
  "Quick poll · 30 seconds each, stick on board, read aloud":
    "Sondaggio rapido · 30 secondi ciascuno, aggiungi in lavagna, leggi ad alta voce",
  "One sticky per frustration — type, then add":
    "Una nota per frustrazione: scrivi e aggiungi",
  "Add sticky": "Aggiungi nota",
  "Themes emerge instantly — write them as the group reads the stickies aloud.":
    "I temi emergono subito: scrivili mentre il gruppo legge le note.",
  "e.g. trust and verification dominate; payouts second":
    "es. fiducia e verifica dominano; pagamenti al secondo posto",
  "Breakout by role · 2 minutes each, parallel thinking":
    "Breakout per ruolo · 2 minuti ciascuno, pensiero in parallelo",
  "Write in parallel — 2 minutes": "Scrivi in parallelo — 2 minuti",
  "Facilitator synthesizes · 3 minutes": "Il facilitatore sintetizza · 3 minuti",
  "What AI solves for sellers": "Cosa risolve l'AI per i venditori",
  "What AI solves for buyers": "Cosa risolve l'AI per gli acquirenti",
  "What AI solves for IDA": "Cosa risolve l'AI per IDA",
  "Speed, trust, reach…": "Velocita', fiducia, copertura…",
  "Discovery, authenticity…": "Scoperta, autenticita'…",
  "Scale, differentiation…": "Scalabilita', differenziazione…",
  "Tier 1 · Must have": "Tier 1 · Essenziale",
  "Italia MVP": "MVP Italia",
  "check ✓ when everyone agrees the feature is in. Tier 1 must include exactly ONE AI feature.":
    "spunta ✓ quando tutti concordano che la feature e' inclusa. Il Tier 1 deve includere esattamente UNA feature AI.",
  "Feature everyone agrees on": "Feature su cui tutti concordano",
  "Add": "Aggiungi",
  "Agreed": "Concordato",
  "TBD": "Da definire",
  "Can we launch with this? (launch readiness)": "Possiamo lanciare con questo? (prontezza al lancio)",
  "yes": "si",
  "no": "no",
  "Design owner": "Owner design",
  "Est. engineering weeks": "Stima settimane engineering",
  "e.g. 8–12": "es. 8-12",
  "Tier 2 · Should have": "Tier 2 · Importante",
  "Italia follow-on + U.S. launch": "Evoluzione Italia + lancio USA",
  "Defer to later (note why)": "Rimanda a dopo (indica il motivo)",
  "Timeline (weeks after launch?)": "Timeline (settimane dopo il lancio?)",
  "e.g. 6–8 weeks post-launch": "es. 6-8 settimane post-lancio",
  "Tier 3 · Nice to have": "Tier 3 · Nice to have",
  "Post-launch — deprioritize or postpone": "Post-lancio — de-prioritizza o rimanda",
  "Deprioritize completely": "De-prioritizza completamente",
  "Challenge questions · 8 minutes — facilitator writes decisions as they speak":
    "Domande sfida · 8 minuti — il facilitatore scrive le decisioni mentre il team parla",
  "asks:": "chiede:",
  "Scaffolding starts 8 Sep 2026 — most likely 12–16 weeks from today to first real users.":
    "Lo scaffolding parte l'8 set 2026 — in genere servono 12-16 settimane da oggi ai primi utenti reali.",
  "Week 1–2": "Settimana 1-2",
  "Week 3–4": "Settimana 3-4",
  "What happens?": "Cosa succede?",
  "What can slip this month?": "Cosa puo' slittare questo mese?",
  "Launch — the team writes this date in this room":
    "Lancio — la data viene definita qui dal team",
  "Launch date": "Data lancio",
  "e.g. 19 Jan 2027": "es. 19 gen 2027",
  "Target sellers (Day 1)": "Venditori target (Giorno 1)",
  "e.g. 50+": "es. 50+",
  "Revenue target": "Target ricavi",
  "e.g. €20K MRR in 3 months": "es. €20K MRR in 3 mesi",
  "Late December / New Year is a holiday freeze. If this is a real target, name who works through the holidays.":
    "Fine dicembre / Capodanno e' un periodo di fermo. Se e' un target reale, indicate chi lavora durante le festivita'.",
  "Critical blockers (must resolve)": "Blocker critici (da risolvere)",
  "Add blocker": "Aggiungi blocker",
  "Blocker": "Blocker",
  "Owner": "Owner",
  "Deadline": "Scadenza",
  "Status": "Stato",
  "Remove": "Rimuovi",
  "e.g.": "es.",
  "Open / in progress": "Aperto / in corso",
  "Red rows stay highlighted until resolved. Never let a blocker hide until Week 6.":
    "Le righe rosse restano evidenziate finche' non risolte. Non lasciare mai un blocker nascosto fino alla settimana 6.",
  "Red flags (what could derail us)": "Red flag (cosa puo' far deragliare il piano)",
  "What needs agreement · 5 min": "Cosa richiede allineamento · 5 min",
  "Owned by": "Owner",
  "Current": "Attuale",
  "✓ Agree or change": "✓ Concorda o modifica",
  "✓ agree — or the modification": "✓ concorda — oppure modifica",
  "Owner assignments & sign-offs": "Assegnazioni owner e approvazioni",
  "Add owner": "Aggiungi owner",
  "Role": "Ruolo",
  "Owner name": "Nome owner",
  "Commitment": "Impegno",
  "Blocker?": "Blocker?",
  "Owner role": "Ruolo owner",
  "None identified": "Nessuno identificato",
  "Does everyone sign off?": "Tutti approvano?",
  "Add person": "Aggiungi persona",
  "Facilitator asks each person: “Do you sign up for this? What's your blocker if not?”":
    "Il facilitatore chiede a ciascuno: \"Confermi questo piano? Qual e' il blocker se no?\"",
  "Role / name": "Ruolo / nome",
  "Sign-off role": "Ruolo approvazione",
  "Yes": "Si",
  "No": "No",
  "With conditions": "Con condizioni",
  "I'm in, unless… / conditions": "Ci sto, a patto che... / condizioni",
  "Rapid-fire · 1 minute per owner — due by": "Round rapido · 1 minuto per owner — entro",
  "Adds a row for every Segment 5 owner missing here, carrying their commitment over.":
    "Aggiunge una riga per ogni owner del Segmento 5 non presente qui, riportando anche il suo impegno.",
  "Pull owners from Segment 5": "Importa owner dal Segmento 5",
  "What they own": "Di cosa sono owner",
  "Due date": "Data prevista",
  "Deliverable": "Deliverable",
  "Sprint owner role": "Ruolo owner sprint",
  "What lands on the table?": "Cosa viene consegnato?",
  "Success metrics (Day 1 of launch)": "Metriche di successo (Giorno 1 del lancio)",
  "Investor conversations": "Conversazioni con investitori",
  "e.g. 20 first meetings": "es. 20 primi incontri",
  "Sellers onboarded": "Venditori onboarded",
  "€ MRR": "€ MRR",
  "% seller retention": "% retention venditori",
  "% system uptime": "% uptime sistema",
  "Media mentions": "Menzioni media",
  "Facilitator & participant guide": "Guida facilitatore e partecipanti",
  "Agenda · 60 minutes, hard stop": "Agenda · 60 minuti, hard stop",
  "Roles during the session": "Ruoli durante la sessione",
  "Who fills in each segment": "Chi compila ogni segmento",
  "Task": "Attivita'",
  "Who fills in": "Chi compila",
  "Formatting conventions": "Convenzioni di formattazione",
  "Facilitation": "Facilitazione",
  "Prep": "Preparazione",
  "Facilitator, before the session": "Facilitatore, prima della sessione",
  "Participants should know before arriving": "Cosa i partecipanti devono sapere prima",
  "What to bring": "Cosa portare",
  "Physical": "Fisico",
  "Digital": "Digitale",
  "Before starting": "Prima di iniziare",
  "What makes it work / what kills it": "Cosa funziona / cosa lo manda fuori strada",
  "Works": "Funziona",
  "Kills it": "Da evitare",
  "Do this": "Da fare",
  "Don't do this": "Da non fare",
  "After the workshop": "Dopo il workshop",
  "Weekly 15-min standup format": "Formato standup settimanale (15 min)",
  "Subject": "Oggetto",
  "Decisions & Next Steps": "Decisioni e prossimi passi",
  "Team": "Team",
  "Yesterday we locked the product direction and timeline. Here's what we committed to:":
    "Ieri abbiamo definito direzione prodotto e timeline. Ecco gli impegni presi:",
  "TIER 1 MVP": "MVP TIER 1",
  "launch target": "target lancio",
  "Defer to Phase 2 (post-launch)": "Rinvia alla Fase 2 (post-lancio)",
  "REALISTIC TIMELINE": "TIMELINE REALISTICA",
  "OWNER COMMITMENTS": "IMPEGNI OWNER",
  "CRITICAL BLOCKERS (Must resolve immediately)": "BLOCKER CRITICI (da risolvere subito)",
  "DECISIONS": "DECISIONI",
  "SIGN-OFFS": "APPROVAZIONI",
  "30-DAY SPRINT": "SPRINT 30 GIORNI",
  "SUCCESS METRICS (Day 1 of launch)": "METRICHE DI SUCCESSO (Giorno 1)",
  "NEXT STEPS": "PROSSIMI PASSI",
  "Everyone reply to this email: \"Confirmed — I own [your piece]\"":
    "Tutti rispondono a questa email: \"Confermato — sono owner di [mia parte]\"",
  "Add to calendars": "Aggiungere in calendario",
  "Weekly 15-min standups": "Standup settimanali da 15 min",
  "30-day review": "Review a 30 giorni",
  "Monthly reviews (1st Friday of each month)": "Review mensili (primo venerdi' del mese)",
  "Blocker owners: start TODAY — legal timelines don't compress.":
    "Owner dei blocker: partire OGGI — i tempi legali non si comprimono.",
  "30-DAY REVIEW": "REVIEW A 30 GIORNI",
  "Question": "Domanda",
  "on track or pivoting?": "in linea o da pivotare?",
  "This is binding for the next 30 days. If your timeline or constraints change, flag it in standup — don't wait.":
    "Queste decisioni valgono per i prossimi 30 giorni. Se timeline o vincoli cambiano, segnalarlo subito in standup.",
  "We're close. Let's execute.": "Ci siamo quasi. Eseguiamo.",
  "investor conversations": "conversazioni con investitori",
  "sellers onboarded": "venditori onboarded",
  "seller retention": "retention venditori",
  "system uptime": "uptime sistema",
  "media mentions": "menzioni media",
  "Responsible for": "Responsabile di",
  "[not asked]": "[non chiesto]",
  "[not captured]": "[non registrato]",
  "before reset": "prima del reset",
  "before restore": "prima del ripristino",
  "auto": "auto",
  "Context setting": "Contesto iniziale",
  "AI opportunity map": "Mappa opportunita' AI",
  "MVP definition": "Definizione MVP",
  "Timeline & dependencies": "Timeline e dipendenze",
  "Decisions & commitments": "Decisioni e impegni",
  "30-day sprint plan": "Piano sprint a 30 giorni",
  "What's ONE thing our sellers are frustrated with RIGHT NOW?":
    "Qual e' UNA frustrazione dei venditori in QUESTO momento?",
  "In an AI-driven marketplace, where do we WIN vs. compete?":
    "In un marketplace guidato dall'AI, dove VINCIAMO e dove competiamo?",
  "What's the MINIMUM viable product for the Italia launch vs. the later U.S. launch?":
    "Qual e' il prodotto MINIMO sostenibile per il lancio Italia rispetto al successivo lancio USA?",
  "What's the realistic timeline? What blocks us?":
    "Qual e' la timeline realistica? Cosa ci blocca?",
  "Do we agree on this plan, or do we need to pivot?":
    "Siamo allineati su questo piano o serve un pivot?",
  "What happens in the next 30 days?":
    "Cosa succede nei prossimi 30 giorni?",
  "Shared problem agreement, not abstract theory":
    "Allineamento su problemi concreti, non teoria astratta",
  "Clear picture of where AI fits in IDA's differentiation":
    "Visione chiara di dove l'AI rafforza la differenziazione di IDA",
  "Written Tier 1 list everyone agrees to (or disagrees specifically on)":
    "Lista Tier 1 scritta con accordo esplicito (o dissenso specifico)",
  "Everyone knows their piece, sees dependencies, knows what blocks us":
    "Tutti conoscono il proprio perimetro, le dipendenze e i blocker",
  "Written, signed agreement everyone owns":
    "Accordo scritto e approvato da tutti gli owner",
  "Everyone knows what success looks like by 8 Oct 2026":
    "Tutti sanno che aspetto ha il successo entro l'8 ott 2026",
  "We have 60 minutes to answer three questions and leave here aligned. We'll make decisions, not debate. Everyone here knows something the others don't — design knows user friction, finance knows constraints, comms knows market signals, strategy knows competitive moves. We need all of you. Our job: define what IDA is building in the next 6 months and WHY — not perfectly, but clearly enough to execute.":
    "Abbiamo 60 minuti per rispondere a tre domande e uscire allineati. Prendiamo decisioni, non dibattiti infiniti. Ognuno qui ha un punto di vista unico: design conosce l'attrito utente, finance i vincoli, communications i segnali di mercato, strategy le mosse competitive. Servono tutti. Obiettivo: definire cosa IDA costruira' nei prossimi 6 mesi e PERCHE', in modo abbastanza chiaro da eseguire.",
  "Two minutes of parallel thinking by role, then we synthesize onto the board: what AI solves for sellers, for buyers, and for IDA.":
    "Due minuti di riflessione per ruolo in parallelo, poi sintesi in lavagna: cosa risolve l'AI per venditori, acquirenti e IDA.",
  "Three tiers. Tier 1 must include exactly one AI feature — pick ONE. Then each role asks its challenge question. Ask: can we launch with this? YES / NO.":
    "Tre tier. Il Tier 1 deve includere esattamente una feature AI: scegline UNA. Poi ogni ruolo pone la sua domanda sfida. Domanda finale: possiamo lanciare con questo? SI / NO.",
  "Build the timeline together, month by month. Launch date stays blank until the team writes it. Blockers are typically payments, legal, API integrations, or fundraising timing — not design or engineering. Most likely 12–16 weeks from today to first real users.":
    "Costruiamo la timeline insieme, mese per mese. La data di lancio resta vuota finche' il team non la scrive. I blocker tipici sono pagamenti, legale, integrazioni API o tempi di fundraising, non design o engineering. In genere servono 12-16 settimane da oggi ai primi utenti reali.",
  "I will ask each person: do you sign up for this? What's your blocker if not? We leave with written statements, not vibes.":
    "Chiedero' a ciascuno: ti impegni su questo piano? Se no, qual e' il blocker? Usciamo con impegni scritti, non impressioni.",
  "Rapid-fire. One minute per owner. What do you deliver in the next 30 days?":
    "Round rapido. Un minuto per owner. Cosa consegni nei prossimi 30 giorni?",
  "If the workshop goes over time, cut Segment 4 or 5 to hit the 1-hour hard stop. Everything else is higher priority.":
    "Se il workshop va lungo, taglia il Segmento 4 o 5 per rispettare l'hard stop a 60 minuti. Tutto il resto ha priorita' piu' alta.",
  "Design — “AI can solve friction in…”":
    "Design — \"L'AI puo' ridurre attrito in...\"",
  "Auto-verify products; smart seller onboarding; smart search":
    "Verifica prodotti automatica; onboarding venditori intelligente; ricerca intelligente",
  "Finance — “AI features investors will fund & we can monetize…”":
    "Finance — \"Feature AI finanziabili dagli investitori e monetizzabili...\"",
  "Premium verification badge; AI recommendations; the metrics that anchor the seed narrative":
    "Badge premium di verifica; raccomandazioni AI; metriche che sostengono la narrativa seed",
  "Communications — “AI stories that resonate with the market…”":
    "Communications — \"Story AI che risuonano con il mercato...\"",
  "“Trust through tech”; “Verification that works”; “Sellers get an AI assistant”":
    "\"Fiducia tramite tecnologia\"; \"Verifica che funziona\"; \"I venditori hanno un assistente AI\"",
  "Strategy — “Competitors doing AI right now…”":
    "Strategy — \"Competitor che stanno facendo bene con l'AI ora...\"",
  "Etsy (search), Amazon (recommendations), other marketplaces (verification)":
    "Etsy (ricerca), Amazon (raccomandazioni), altri marketplace (verifica)",
  "Core marketplace (sellers, buyers, transactions) · One AI feature (pick ONE) · VerificationBadge (RINA partnership) · Basic search":
    "Marketplace core (venditori, acquirenti, transazioni) · Una feature AI (scegline UNA) · VerificationBadge (partnership RINA) · Ricerca base",
  "Recommendation engine · Seller dashboard analytics · Chat with basic translation · Mobile optimization":
    "Motore di raccomandazione · Analytics dashboard venditore · Chat con traduzione base · Ottimizzazione mobile",
  "Advanced AI prediction · API marketplace · White-label":
    "Predizioni AI avanzate · Marketplace API · White-label",
  "Design": "Design",
  "Finance": "Finance",
  "Communications": "Communications",
  "Strategy": "Strategy",
  "Which Tier 1 feature takes longest to design? What's the blocker?":
    "Quale feature Tier 1 richiede piu' tempo di design? Qual e' il blocker?",
  "What does Tier 1 cost in runway, and what must the seed round cover?":
    "Quanto runway costa il Tier 1 e cosa deve coprire il round seed?",
  "What story are we telling for the Tier 1 launch?":
    "Qual e' la storia che raccontiamo per il lancio Tier 1?",
  "Does Tier 1 differentiate us from Etsy, Amazon, competitors?":
    "Il Tier 1 ci differenzia da Etsy, Amazon e competitor?",
  "Usually: Design specs → Engineering build → Finance compliance → Launch. Blockers are typically payments, legal, or API integrations.":
    "Di solito: specifiche Design → build Engineering → compliance Finance → Lancio. I blocker tipici sono pagamenti, legale o integrazioni API.",
  "Payment processor contract": "Contratto payment processor",
  "RINA API access": "Accesso API RINA",
  "Seed round timing (runway gate)": "Tempistiche round seed (gate runway)",
  "Leadership / Legal": "Leadership / Legale",
  "Leadership / Finance": "Leadership / Finance",
  "Facilitator (Florentin)": "Facilitatore (Florentin)",
  "Note-taker": "Note-taker",
  "Timekeeper (optional)": "Timekeeper (opzionale)",
  "Everyone else": "Tutti gli altri",
  "Move conversation, watch time, ensure all voices heard, synthesize":
    "Guida la conversazione, gestisce il tempo, garantisce che tutti parlino, sintetizza",
  "Fill in answers as the group speaks (can rotate per segment)":
    "Compila le risposte mentre il gruppo parla (puo' ruotare per segmento)",
  "Announce when 3 minutes remain in each segment":
    "Avvisa quando mancano 3 minuti in ogni segmento",
  "Contribute your expertise, debate briefly, reach decisions":
    "Contribuisci con la tua competenza, confrontati brevemente, arriva a decisioni",
  "Whiteboard + markers (backup note-taking if WiFi dies)":
    "Lavagna bianca + pennarelli (backup se il WiFi non funziona)",
  "Printed agenda one-pager": "Agenda stampata (una pagina)",
  "Sticky notes (for the Segment 1 poll, if doing a physical version)":
    "Post-it (per il sondaggio del Segmento 1, se in presenza)",
  "Laptop with this board open": "Laptop con questa lavagna aperta",
  "One machine on the projector / screen share (canonical board)":
    "Una macchina sul proiettore / screen share (lavagna canonica)",
  "Headphones for anyone remote": "Cuffie per chi e' da remoto",
  "Charger — a 90-minute room kills laptops":
    "Caricabatterie — 90 minuti di riunione scaricano i laptop",
  "Coffee / water in the room": "Caffe' / acqua in sala",
  "Silence Slack and email": "Silenzia Slack ed email",
  "Tell your team: no interruptions for 60 minutes":
    "Comunica al team: nessuna interruzione per 60 minuti",
  "Timer ready (this page)": "Timer pronto (questa pagina)",
  "Password shared with the team — not the public internet":
    "Password condivisa con il team — non pubblica su internet",
  "Everyone has the URL open on their laptop":
    "Tutti hanno l'URL aperto sul proprio laptop",
  "Email template ready (send summary within 24 hours)":
    "Template email pronto (inviare il riepilogo entro 24 ore)",
  "“60 minutes — we lock product direction and timeline”":
    "\"60 minuti — chiudiamo direzione prodotto e timeline\"",
  "“Bring your department's constraints (budget, timeline, capability)”":
    "\"Porta i vincoli del tuo dipartimento (budget, timeline, capacita')\"",
  "“We'll leave with written decisions everyone agrees to”":
    "\"Usciremo con decisioni scritte condivise da tutti\"",
  "List from Segment 3": "Lista dal Segmento 3",
  "Realistic or too aggressive?": "Realistica o troppo aggressiva?",
  "Target or aspirational?": "Target reale o aspirazionale?",
  "Target amount + months of runway it buys":
    "Importo target + mesi di runway che copre",
  "Right bets or pivot?": "Scommesse giuste o serve pivot?",
  "Design + Strategy": "Design + Strategy",
  "Engineering + Finance": "Engineering + Finance",
  "Finance + CEO": "Finance + Leadership",
  "Strategy + Communications": "Strategy + Communications",
  "Wireframes by…": "Wireframe entro...",
  "Build ready by…": "Build pronta entro...",
  "Story locked by…": "Story definita entro...",
  "Roadmap validated: yes/no": "Roadmap validata: si/no",
  "Investor pipeline live by…": "Pipeline investitori attiva entro...",
  "Runway model + data room by…": "Modello runway + data room entro...",
  "Open": "Aperto",
  "in progress": "in corso",
  "Participant role": "Ruolo partecipante",
  "Participant name": "Nome partecipante",
}

export function tr(locale: Locale, text: string): string {
  if (locale === "en") return text
  return IT_TEXT[text] ?? text
}

export function trList(locale: Locale, items: string[]): string[] {
  if (locale === "en") return items
  return items.map((item) => tr(locale, item))
}

export function localeTag(locale: Locale): string {
  return locale === "it" ? "it-IT" : "en-US"
}
