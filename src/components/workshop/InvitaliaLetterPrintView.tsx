"use client"

export function InvitaliaLetterPrintView() {
  const today = new Date().toLocaleDateString("it-IT")

  return (
    <main className="print-page bg-white text-black min-h-screen p-8">
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          html,
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .print-page {
            padding: 0 !important;
          }
        }
      `}</style>

      <div className="max-w-[980px] mx-auto">
        <div className="no-print flex justify-end mb-4 gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-2 rounded border border-black text-sm"
          >
            Print
          </button>
        </div>

        <header className="mb-6">
          <h1 className="text-2xl font-semibold">
            Osservazioni Integrative Invitalia
          </h1>
          <p className="text-sm mt-2">
            Chiarimenti rafforzati su Go-To-Market, difendibilita (B2),
            crescita e coerenza proiezioni (C1), con dati operativi,
            milestones, KPI e piano organizzativo.
          </p>
        </header>

        <section className="mb-8 text-sm leading-6">
          <p>Spett.le Invitalia,</p>
          <p className="mt-3">
            con la presente si trasmettono osservazioni integrative a seguito dei
            rilievi emersi in sede di Comitato, con specifico riferimento a:
            acquisizione primi clienti, strategia di penetrazione commerciale,
            vantaggio competitivo/difendibilita, coerenza con le proiezioni di crescita
            e avvio tutela IP.
          </p>
          <p className="mt-3">
            Obiettivo del progetto IDA: <strong>"creare uno shop internazionale in un click senza usare multiple tools"</strong>,
            riducendo la frammentazione operativa export lato Seller e accelerando l&apos;attivazione lato Buyer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">
            1) Risposta puntuale ai rilievi del Comitato
          </h2>
          <div className="overflow-hidden border border-black/20">
            <table className="w-full text-sm">
              <thead className="bg-black/[0.04]">
                <tr>
                  <th className="text-left p-2 border-b border-black/20">Rilievo Comitato</th>
                  <th className="text-left p-2 border-b border-black/20">Integrazione fornita</th>
                </tr>
              </thead>
              <tbody>
                <tr className="align-top">
                  <td className="p-2 border-b border-black/10">Acquisizione primi clienti con elementi oggettivi</td>
                  <td className="p-2 border-b border-black/10">
                    Funnel GTM per cluster, sequenza operativa Seller/Buyer,
                    KPI target su claim rate, activation e buyer intent.
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="p-2 border-b border-black/10">Penetrazione commerciale collegata a CAGR/proiezioni</td>
                  <td className="p-2 border-b border-black/10">
                    Modello bottom-up con driver espliciti (bacino attivabile,
                    conversione, ARPA, espansione cluster, monetizzazione progressiva).
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="p-2 border-b border-black/10">Innovazione servizio/processo lato Seller/Buyer</td>
                  <td className="p-2 border-b border-black/10">
                    Orchestrazione end-to-end export, supporto compliance/HITL,
                    buyer early access con interazioni reali su claim/non-claim shops.
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="p-2">Avvio deposito brevetto / tutela IP</td>
                  <td className="p-2">
                    Confermato avvio percorso IP (nei limiti di brevettabilita),
                    integrato con segreto industriale e know-how di processo.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">
            2) Strategia Go-To-Market e acquisizione primi clienti (dettaglio operativo)
          </h2>
          <p className="text-sm leading-6">
            L&apos;ingresso al mercato e&apos; verticale, selettivo e progressivo,
            con focus iniziale su 1-3 cluster merceologici ad alta frizione export.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="border border-black/20 p-3">
              <p className="font-semibold text-sm mb-2">Lato Seller (supply)</p>
              <ol className="list-decimal pl-5 text-sm leading-6">
                <li>Selezione target da aziende con partita IVA</li>
                <li>Category scoring (friction/readiness/monetization)</li>
                <li>Campagne claim/non-claim su cluster prioritari</li>
                <li>Onboarding rapido con shop auto-generato</li>
                <li>Conversione a piani ricorrenti + servizi operativi</li>
              </ol>
            </div>
            <div className="border border-black/20 p-3">
              <p className="font-semibold text-sm mb-2">Lato Buyer (demand)</p>
              <ol className="list-decimal pl-5 text-sm leading-6">
                <li>Early access su categorie target</li>
                <li>Visibilita su shop claimed/non-claimed</li>
                <li>Interazione buyer-seller tracciata</li>
                <li>Raccolta intenti reali e segnali di domanda</li>
                <li>Feedback loop su ranking categorie e roadmap</li>
              </ol>
            </div>
          </div>
          <p className="text-sm leading-6 mt-3">
            Frizioni prioritarie emerse in workshop: processi doganali,
            classificazione HS, requisiti certificativi per mercato di destinazione,
            pagamenti/fatturazione multi-tool, e gap di knowledge operativo export.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">
            3) Penetrazione commerciale, crescita e coerenza proiezioni (C1)
          </h2>
          <p className="text-sm leading-6">
            Le proiezioni sono impostate con approccio bottom-up:
            bacino attivabile x conversione x monetizzazione.
          </p>
          <ul className="list-disc pl-5 text-sm leading-6 mt-2">
            <li><strong>Bacino:</strong> aziende target su cluster prioritari</li>
            <li><strong>Conversione:</strong> risposta, claim, activation, retention</li>
            <li><strong>Monetizzazione:</strong> abbonamento + servizi operativi progressivi</li>
          </ul>
          <p className="text-sm leading-6 mt-3">
            Driver principali di crescita: espansione cluster, aumento ARPA,
            miglioramento conversioni tramite loop dati Seller-Buyer e progressiva
            automazione dei passaggi a maggiore attrito.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">
            4) Innovazione di servizio e di processo
          </h2>
          <ul className="list-disc pl-5 text-sm leading-6 space-y-1">
            <li>
              <strong>Lato Seller:</strong> shop internazionale rapido, guida export,
              compliance assistita (HITL), orchestrazione processi frammentati.
            </li>
            <li>
              <strong>Lato Buyer:</strong> discovery su shop claim/non-claim,
              ingaggio qualificato e riduzione tempi di scouting.
            </li>
            <li>
              <strong>Driver di valore:</strong> riduzione time-to-export,
              riduzione errori operativi, maggiore affidabilita nelle
              prime transazioni cross-border.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">
            5) Vantaggio competitivo e difendibilita (B2)
          </h2>
          <ul className="list-disc pl-5 text-sm leading-6 space-y-1">
            <li><strong>Data moat:</strong> dataset operativo su frizioni/categorie/mercati/esiti.</li>
            <li><strong>Workflow moat:</strong> orchestrazione integrata passaggi export critici.</li>
            <li><strong>Execution moat:</strong> velocita di rilascio e iterazione verticale.</li>
            <li><strong>Trust moat:</strong> affidabilita operativa e qualita del servizio.</li>
            <li>
              <strong>IP strategy:</strong> avvio tutela su componenti distintive tecnico-metodologiche.
            </li>
          </ul>
          <p className="text-sm leading-6 mt-3">
            La copiabilita di singole feature non replica automaticamente il modello
            integrato dati + processo + execution + trust costruito in produzione.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">6) Roadmap operativa e dipendenze (0-180 giorni)</h2>
          <ul className="list-disc pl-5 text-sm leading-6 space-y-1">
            <li><strong>0-30 giorni:</strong> VAT ingest + category scoring + MVP claim/non-claim</li>
            <li><strong>31-60 giorni:</strong> buyer early access + KPI conversione iniziale</li>
            <li><strong>61-90 giorni:</strong> compliance/HITL + wave 1 integrazioni</li>
            <li><strong>90-180 giorni:</strong> scaling cluster, SLA operativi, standard pod execution</li>
          </ul>
          <p className="text-sm leading-6 mt-3">
            Piano hiring sovrapposto all&apos;execution: Wave 1 (M0-M1),
            Wave 2 (M2-M3), Wave 3 (M4-M6) con dipendenze esplicite
            tra milestones prodotto e rafforzamento team.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">7) KPI target e sostenibilita economica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-black/20 p-3">
              <p className="font-semibold text-sm mb-2">KPI operativi target</p>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li>Shop claim rate (30g): &gt;= 18%</li>
                <li>Seller activation rate: &gt;= 35%</li>
                <li>Buyer active accounts: &gt;= 100 (early access)</li>
                <li>Qualified buyer intents / mese: &gt;= 80</li>
                <li>Time to export-ready shop: &lt; 24h</li>
                <li>MRR milestone: EUR 20k-30k entro mese 6</li>
              </ul>
            </div>
            <div className="border border-black/20 p-3">
              <p className="font-semibold text-sm mb-2">Scenari budget (inferred)</p>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li>Base case: burn EUR 120k-150k/mese, runway 18-22 mesi</li>
                <li>Upside: burn EUR 170k-220k/mese, runway 12-16 mesi</li>
                <li>Downside: burn EUR 85k-110k/mese, runway 24-30 mesi</li>
              </ul>
              <p className="text-xs mt-2">
                Mix costi indicativo: People, Infra+AI, GTM, Compliance/Legal.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">8) Avvio attivita IP</h2>
          <p className="text-sm leading-6">
            Si conferma l&apos;avvio delle attivita propedeutiche al deposito
            di tutela IP, nei limiti di brevettabilita applicabile, con supporto
            specialistico esterno.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">9) Conclusioni</h2>
          <p className="text-sm leading-6">
            Alla luce delle integrazioni sopra esposte, la Societa ritiene che il
            piano presenti coerenza tra: (i) acquisizione clienti iniziale,
            (ii) crescita sostenibile e proiezioni, (iii) difendibilita del modello,
            (iv) innovazione di servizio/processo e (v) percorso di tutela IP.
            Restiamo a disposizione per ulteriori evidenze documentali.
          </p>
        </section>

        <footer className="mt-10 text-sm">
          <p>Cordiali saluti,</p>
          <p className="mt-3 font-semibold">Florentin Hortopan</p>
          <p>Associate Director Of User Experience</p>
          <p>florentin.hortopan@omc.com</p>
          <p>+1 (415) 430-7032</p>
          <p>{today}</p>
        </footer>
      </div>
    </main>
  )
}
