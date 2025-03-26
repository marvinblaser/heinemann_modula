// main.js - Gestion des traductions
function changeLanguage(lang) {
  currentLanguage = lang;
  
  // Parcours de tous les éléments qui ont l'attribut "data-translate"
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate"); // ex: "general.seeMore"
    const keys = key.split("."); // ex: ["general", "seeMore"]

    let translationEntry = translations;
    // Parcours de l'objet translations pour atteindre le niveau voulu
    keys.forEach((k) => {
      if (translationEntry) {
        translationEntry = translationEntry[k];
      }
    });
    // Si la traduction pour la langue demandée existe, on l'applique
    if (translationEntry && translationEntry[lang]) {
      element.textContent = translationEntry[lang];
    }
  });
}

// main.js - Gestion des traductions
const translations = {
  general: {
    seeMore: {
      fr: "Voir le catalogue",
      de: "Katalog ansehen",
      it: "Vedi il catalogo",
    },
    follow: {
      fr: "Suivez nous là-bas :",
      de: "Folgen Sie uns hier :",
      it: "Seguici qui :",
    },
    copyright: {
      fr: "© KBMedizintechnik GmbH",
      de: "© KBMedizinTechnik GmbH",
      it: "© KBMedizinTechnik GmbH",
    },
  },
  navigation: {
    machine1: {
      fr: "MODULA L",
      de: "MODULA L",
      it: "MODULA L",
    },
    machine2: {
      fr: "MODULA M",
      de: "MODULA M",
      it: "MODULA M",
    },
    catalogue: {
      fr: "CATALOGUE",
      de: "KATALOG",
      it: "CATALOGO",
    },
  },
  accordion: {
    colors: {
      fr: "Changer la couleur",
      de: "Farbe ändern",
      it: "Cambia colore",
    },
    details: {
      fr: "Détails techniques",
      de: "Technische Details",
      it: "Dettagli tecnici",
    },
    customize: {
      fr: "Personnaliser ma machine",
      de: "Meine Maschine anpassen",
      it: "Personalizza la mia macchina",
    },
  },
  technical: {
    dimensions: {
      fr: "Dimensions : 120 x 80 x 60 cm",
      de: "Abmessungen : 120 x 80 x 60 cm",
      it: "Dimensioni : 120 x 80 x 60 cm",
    },
    weight: {
      fr: "Poids : 85 kg",
      de: "Gewicht : 85 kg",
      it: "Peso : 85 kg",
    },
    power: {
      fr: "Puissance : 2000W",
      de: "Leistung : 2000W",
      it: "Potenza : 2000W",
    },
  },
  options: {
    option1: {
      fr: "Éclairage d'instruments LED RGB, avec changement de couleurs RGB (rouge, vert, bleu) incl. télécommande",
      de: "LED RGB Instrumentenbeleuchtung, mit wechselnden RGB-Farben (Rot, Grün, Blau) inkl. Fernbedienung",
      it: "Illuminazione strumentale LED RGB, con colori RGB variabili (rosso, verde, blu) incl. telecomando",
    },
    option2: {
      fr: "Plateau d'instruments chauffant, pour le plan des instruments",
      de: "Beheizbare Instrumentenablage, für die Instrumentenebene",
      it: "Ripiano per strumenti riscaldato, per il piano degli strumenti",
    },
    option3: {
      fr: "Tiroir UV, pour le rangement des instruments traités",
      de: "UV-Schublade, zur Aufbewahrung von aufbereiteten Instrumenten",
      it: "Cassetto UV, per la conservazione degli strumenti trattati",
    },
    option4: {
      fr: "Double galerie, au-dessus du plan des instruments avec plaque en aluminium pulsée",
      de: "Galerie 2-fach, oberhalb der Instrumentenebene mit gepulverter Aluplatte",
      it: "Galleria doppia, sopra il piano degli strumenti con piastra in alluminio pulsata",
    },
    option5: {
      fr: "Galerie, au-dessus du plan des instruments avec plaque en aluminium pulsée",
      de: "Galerie oberhalb der Instrumentenebene mit gepulverter Aluplatte",
      it: "Galleria sopra il piano degli strumenti con piastra in alluminio pulsata",
    },
    option6: {
      fr: "Multiprise pour l'option galerie",
      de: "Steckdosenleiste für die Galerie-Option",
      it: "Ciabatta elettrica per l'opzione galleria",
    },
    option7: {
      fr: "Extension de plateau L, plateau de 1152 mm en matériau minéral résistant HI-MACS®",
      de: "Tischplattenerweiterung L, Tischplatte 1152 mm aus widerstandsfähigem Mineralwertstoff HI-MACS®",
      it: "Estensione di piano L, piano da 1152 mm in materiale minerale resistente HI-MACS®",
    },
    option8: {
      fr: "Extension de plateau M, plateau de 985 mm en matériau minéral résistant HI-MACS®",
      de: "Tischplattenerweiterung M, Tischplatte 985 mm aus widerstandsfähigem Mineralwertstoff HI-MACS®",
      it: "Estensione di piano M, piano da 985 mm in materiale minerale resistente HI-MACS®",
    },
    option9: {
      fr: "Extension de plateau S, plateau de 500 mm en matériau minéral résistant HI-MACS®",
      de: "Tischplattenerweiterung S, Tischplatte 500 mm aus widerstandsfähigem Mineralwertstoff HI-MACS®",
      it: "Estensione di piano S, piano da 500 mm in materiale minerale resistente HI-MACS®",
    },
    option10: {
      fr: "Support de lampe frontale avec aimant, non commuté",
      de: "Stirnlampenhalter mit Magnet, nicht schaltend",
      it: "Supporto per lampada frontale con magnete, non commutabile",
    },
    option11: {
      fr: "Suspension pour lampe frontale à lumière froide, commutation automatique, réglable en hauteur et pivotante",
      de: "Stirnlampenaufhängung automatisch schaltend, höhenverstellbar und schwenkbar für Kaltlicht Stirnlampen",
      it: "Sospensione per lampada frontale a luce fredda, con commutazione automatica, regolabile in altezza e girevole",
    },
    option12: {
      fr: "Support de microscope pour microscopes Kaps SOM-22, côté gauche",
      de: "Mikroskophalter für Kaps SOM-22 Mikroskope, links",
      it: "Supporto per microscopio per microscopi Kaps SOM-22, sinistro",
    },
    option13: {
      fr: "Support de microscope pour microscopes Kaps SOM-22, côté droit",
      de: "Mikroskophalter für Kaps SOM-22 Mikroskope, rechts",
      it: "Supporto per microscopio per microscopi Kaps SOM-22, destro",
    },
    option14: {
      fr: "Bras pivotant pour écran TFT, montage sur l'unité ORL",
      de: "Schwenkarm für TFT-Monitor, Befestigung an der HNO-Einheit",
      it: "Braccio girevole per monitor TFT, fissaggio sull'unità otorinolaringologica",
    },
    option15: {
      fr: "Bras pivotant pour écran TFT, montage sur la perche du microscope",
      de: "Schwenkarm für TFT-Monitor, Befestigung an der Mikroskopstange",
      it: "Braccio girevole per monitor TFT, fissaggio al supporto del microscopio",
    },
    option16: {
      fr: "Bras pivotant avec plateau, dimensions 360 x 280 mm, montage sur l'unité ORL, environ 360 x 280 mm (L x P), max 10 kg",
      de: "Schwenkarm mit Ablage, Größe 360 x 280 mm,  Montage an der HNO-Einheit, ca. 360 x 280 mm (B x T), max. 10 kg",
      it: "Braccio girevole con ripiano, dimensioni 360 x 280 mm, montato sull'unità Otorinolaringologica, circa 360 x 280 mm (L x P), max 10 kg",
    },
    option17: {
      fr: "Système d'aspiration avec vidange manuelle du bac à sécrétions, pompe à vide sans huile (40 l/min à -0,85 bar), suspension sans vibrations, commutation automatique lors du retrait du tuyau d'aspiration, filtre à bactéries, bac à sécrétions de 2,0 L (connectable directement), tuyaux antibactériens avec raccords rapides (aucune connexion d'eau requise)",
      de: "Absaugsystem mit manueller Sekretglasentleerung, ölfreie Vakuumpumpe (Leistung 40 l/min bei -0,85 bar), vibrationsfreie Aufhängung, automatische Ein/Aus-Schaltung bei Entnahme des Saugschlauches, Bakterienfilter, 2.0 L Sekretglas (direkt steckbar), antibakterielle Anschlussschläuche mit Schnellkupplungen (kein Wasseranschluss erforderlich)",
      it: "Sistema di aspirazione con svuotamento manuale del contenitore delle secrezioni, pompa a vuoto senza olio (40 l/min a -0,85 bar), sospensione antivibrante, commutazione automatica on/off al ritiro del tubo di aspirazione, filtro batterico, contenitore per secrezioni da 2,0 L (direttamente collegabile), tubi di collegamento antibatterici con attacchi rapidi (nessun collegamento idrico richiesto)",
    },
    option18: {
      fr: "Système d'aspiration 'Sekretomatik', vidange automatique du bac à sécrétions avec rinçage, commutation automatique lors du retrait du tuyau d'aspiration, pompe à vide sans huile (40 l/min à -0,85 bar), suspension sans vibrations, filtre à bactéries, pompe de relevage, valve AquaStop, tuyaux de raccordement, tuyaux antibactériens avec raccords rapides (connexion d'eau requise)",
      de: "Absaugsystem „Sekretomatik“, automatische Sekretglasentleerung mit Spülung, automatische Ein/Aus-Schaltung bei Entnahme des Saugschlauches, ölfreie Vakuumpumpe (Leistung 40 l/min bei -0,85 bar), vibrationsfreie Aufhängung, Bakterienfilter, Hebepumpe, AquaStop-Ventil, Anschlussschläuche, antibakterielle Anschlussschläuche mit Schnellkupplungen (Wasseranschluss erforderlich)",
      it: "Sistema di aspirazione 'Sekretomatik', svuotamento automatico del contenitore delle secrezioni con lavaggio, commutazione automatica on/off al ritiro del tubo di aspirazione, pompa a vuoto senza olio (40 l/min a -0,85 bar), sospensione antivibrante, filtro batterico, pompa di sollevamento, valvola AquaStop, tubi di collegamento, tubi di collegamento antibatterici con attacchi rapidi (collegamento idrico richiesto)",
    },
    option19: {
      fr: "Aspiration avec vidange manuelle du bac à sécrétions, système d'aspiration monodirectionnel MEDELA (aucune connexion d'eau requise)",
      de: "Absaugung mit manueller Sekretglasentleerung, Einwegabsaugsystem MEDELA (kein Wasseranschluss erforderlich)",
      it: "Aspirazione con svuotamento manuale del contenitore delle secrezioni, sistema di aspirazione usa e getta MEDELA (nessun collegamento idrico richiesto)",
    },
    option20: {
      fr: "Aspiration avec vidange manuelle du bac à sécrétions, système d'aspiration monodirectionnel SERRES (aucune connexion d'eau requise)",
      de: "Absaugung mit manueller Sekretglasentleerung, Einwegabsaugsystem SERRES (kein Wasseranschluss erforderlich)",
      it: "Aspirazione con svuotamento manuale del contenitore delle secrezioni, sistema di aspirazione usa e getta SERRES (nessun collegamento idrico richiesto)",
    },
    option21: {
      fr: "Sac interne monodose MEDELA avec agent gélifiant, 1,5 L (30 pièces)",
      de: "MEDELA Einweginnenbeutel mit Geliermittel, 1.5 L (30 Stück)",
      it: "Sacco interno usa e getta MEDELA con agente gelificante, 1,5 L (30 pezzi)",
    },
    option22: {
      fr: "Sac interne monodose SERRES avec agent gélifiant, 1,5 L (32 pièces)",
      de: "SERRES Einweginnenbeutel mit Geliermittel, 1.5 L (32 Stück)",
      it: "Sacco interno usa e getta SERRES con agente gelificante, 1,5 L (32 pezzi)",
    },
    option23: {
      fr: "Régulateur de vide pour dosage précis, plage de réglage : 0 à 0,85 bar",
      de: "Vakuumregler für Feinstdosierung, Regelbereich: 0 bis 0,85 bar",
      it: "Regolatore di vuoto per dosaggio fine, intervallo di regolazione: 0 a 0,85 bar",
    },
    option24: {
      fr: "Tuyau d'aspiration séparé pour l'adaptation du bac à salive/tasse à rinçage auriculaire avec commutation automatique lors du retrait du tuyau d'aspiration",
      de: "Separater Absaugschlauch für die Adaption von Speischale/ Ohrspülbecher mit automatischer Ein-/Ausschaltung bei Entnahme des Saugschlauches",
      it: "Tubo di aspirazione separato per l'adattamento della coppa salivari/tazza per il risciacquo auricolare con commutazione automatica on/off al ritiro del tubo di aspirazione",
    },
    option25: {
      fr: "Système de rinçage du tuyau avec nettoyage automatique du tuyau d'aspiration à l'aide de la pression d'eau (connexion d'eau requise)",
      de: "Schlauchspüleinrichtung zum automatischen Reinigen des Saugschlauches mit Systemwasserdruck (Wasseranschluss erforderlich)",
      it: "Sistema di lavaggio del tubo per la pulizia automatica del tubo di aspirazione con pressione d'acqua di sistema (collegamento idrico richiesto)",
    },
    option26: {
      fr: "Système de lavage/rinçage de canule, via un réservoir fixé latéralement à l'unité, avec solution désinfectante",
      de: "Kanülenspül-/ Reinigungseinrichtung, über einen Behälter der seitlich an der Einheit angebracht ist, mit Desinfektionsmittellösung",
      it: "Sistema di lavaggio/risciacquo delle cannule, tramite un serbatoio laterale all'unità, con soluzione disinfettante",
    },
    option27: {
      fr: "+37° C Système de rinçage auriculaire avec chauffe-eau instantané : affichage digital de la température, poignée de rinçage autoclavable avec canule interchangeable et tuyau antibactérien avec raccord rapide incluant valve AquaStop et tuyaux de raccordement",
      de: "+37° C  Ohrspüleinrichtung mit Durchlauferhitzer: digitale Temperaturanzeige, autoklavierbarer Spülhandgriff mit austauschbarer Spülkanüle und antibakteriellen Schlauch mit Schnellkupplung inkl. Aquastop-Ventil und Anschlussschläuchen",
      it: "+37° C Sistema di risciacquo auricolare con scaldacqua istantaneo: display digitale della temperatura, maniglia per il risciacquo autoclavabile con canule intercambiabili e tubo antibatterico con attacco rapido, incluse valvola AquaStop e tubi di collegamento",
    },
    option28: {
      fr: "+37° C Système autonome de rinçage auriculaire : réservoir d'eau externe (2 litres), poignée de rinçage autoclavable avec canule interchangeable et tuyau antibactérien avec raccord rapide ; indépendant du réseau d'eau domestique",
      de: "+37° C autonome Ohrspüleinrichtung: externer Wassertank (2 Liter), autoklavierbarer Spülhandgriff mit austauschbarer Spülkanüle und antibakteriellen Schlauch mit Schnellkupplung; unabhängig vom Hauswassernetz",
      it: "+37° C Sistema autonomo di risciacquo auricolare: serbatoio d'acqua esterno (2 litri), maniglia per il risciacquo autoclavabile con canule intercambiabili e tubo antibatterico con attacco rapido; indipendente dal sistema idrico domestico",
    },
    option29: {
      fr: "Extension vestimentaire, température réglable de +22° à +44°C",
      de: "Vestithermerweiterung, einstellbare Temperatur von +22° bis +44°C",
      it: "Estensione per guardaroba, temperatura regolabile da +22° a +44°C",
    },
    option30: {
      fr: "Installation pneumatique : compresseur (sans huile, 12 L/min, max. 2,5 bar), réservoir avec filtre à air comprimé autoclavable, embout de soufflerie autoclavable avec tuyau antibactérien à raccord rapide incluant 3 nébuliseurs pour médicaments liquides et support pour flacons pulvérisateurs",
      de: "Druckluftanlage: Kompressor (ölfrei, 12 L/min, max. 2,5 bar) Druckbehälter mit autoklavierbaren Druckluftfilter, autoklavierbares Drucklufthandstück mit einem antibakteriellen Schlauch mit Schnellkupplung inkl. 3x Flüssigkeits-Medikamenten- zerstäuber und Halterung für Sprayflaschen",
      it: "Impianto ad aria compressa: compressore (senza olio, 12 L/min, max. 2,5 bar), serbatoio con filtro per aria compressa autoclavabile, erogatore per aria compressa autoclavabile con tubo antibatterico con attacco rapido, comprensivo di 3 nebulizzatori per farmaci liquidi e supporto per flaconi spray",
    },
    option31: {
      fr: "Vanne de régulation d'air pour dosage précis",
      de: "Druckluftregelventil zur Feindosierung",
      it: "Valvola di regolazione dell'aria per dosaggio fine",
    },
    option32: {
      fr: "1 source lumineuse à lumière froide, LED haute performance, régulation intégrée, sortie lumineuse remplaçable avec adaptateur STORZ incluant support pour guide de lumière sur le bras pivotant",
      de: "1 Stück Kaltlichtquelle, hochleistungs LED,  integrierte Lichtregelung,  auswechselbarer Lichtausgang mit STORZ-Adapter inkl. Lichtleiterhalter am Schwenkarm",
      it: "1 unità di fonte luminosa a luce fredda, LED ad alte prestazioni, regolazione integrata della luce, uscita luminosa intercambiabile con adattatore STORZ comprensivo di supporto per la guida della luce sul braccio girevole",
    },
    option33: {
      fr: "2 sources lumineuses à lumière froide, LED haute performance, régulation intégrée, sortie lumineuse remplaçable avec adaptateur STORZ incluant support pour guide de lumière sur le bras pivotant",
      de: "2 Stück Kaltlichtquellen, hochleistungs LED,  integrierte Lichtregelung,  auswechselbarer Lichtausgang mit STORZ-Adapter inkl. Lichtleiterhalter am Schwenkarm",
      it: "2 unità di fonti luminose a luce fredda, LED ad alte prestazioni, regolazione integrata della luce, uscita luminosa intercambiabile con adattatore STORZ con supporto per la guida della luce sul braccio girevole",
    },
    option34: {
      fr: "3 sources lumineuses à lumière froide, LED haute performance, régulation intégrée, sortie lumineuse remplaçable avec adaptateur STORZ incluant support pour guide de lumière sur le bras pivotant",
      de: "3 Stück Kaltlichtquellen, hochleistungs LED,  integrierte Lichtregelung,  auswechselbarer Lichtausgang mit STORZ-Adapter inkl. Lichtleiterhalter am Schwenkarm",
      it: "3 unità di fonti luminose a luce fredda, LED ad alte prestazioni, regolazione integrata della luce, uscita luminosa intercambiabile con adattatore STORZ con supporto per la guida della luce sul braccio girevole",
    },
    option35: {
      fr: "Contrôle par capteur pour sources lumineuses LED, allumage automatique lors du retrait du guide de lumière",
      de: "Sensorsteuerung für LED-Lichtquellen, automatische Lichteinschaltung bei Entnahme des Lichtleiters",
      it: "Controllo sensoriale per fonti luminose LED, accensione automatica al ritiro della guida della luce",
    },
    option36: {
      fr: "Source lumineuse LED portative, max 1 000 lm avec connecteur WOLF",
      de: "LED-Handlichtquelle, max 1.000 lm mit WOLF-Anschluss",
      it: "Fonte di luce LED portatile, max 1.000 lm con attacco WOLF",
    },
    option37: {
      fr: "Source lumineuse LED portative, max 1 000 lm avec connecteur STORZ",
      de: "LED-Handlichtquelle, max. 1.000 lm mit STORZ-Anschluss",
      it: "Fonte di luce LED portatile, max 1.000 lm con attacco STORZ",
    },
    option38: {
      fr: "Support pour endoscope pour sinusoscopes, non chauffant, pour le rangement des endoscopes (2,7 mm ou 4,0 mm), longueur max. 200 mm",
      de: "Endoskophalter für Sinuskope, unbeheizt, zur Aufbewahrung von Endoskopen (2,7 mm oder 4,0 mm), max. Endoskoplänge 200 mm",
      it: "Supporto per endoscopio per sinuscopi, non riscaldato, per la conservazione degli endoscopi (2,7 mm o 4,0 mm), lunghezza massima 200 mm",
    },
    option39: {
      fr: "Support pour endoscope préchauffé pour sinusoscopes, destiné au rangement et au préchauffage des endoscopes (2,7 mm ou 4,0 mm), longueur max. 200 mm",
      de: "Vorgewärmter Endoskophalter für Sinuskope, zur Aufbewahrung und Vorwärmung von Endoskopen (2,7 mm oder 4,0 mm), max. Endoskoplänge 200 mm",
      it: "Supporto per endoscopio preriscaldato per sinuscopi, per la conservazione e il preriscaldamento degli endoscopi (2,7 mm o 4,0 mm), lunghezza massima 200 mm",
    },
    option40: {
      fr: "Support pour endoscope pour laryngoscopes, non chauffant, pour le rangement des laryngoscopes (10 mm ou 11 mm), longueur max. 200 mm",
      de: "Endoskophalter für Laryngoskope, unbeheizt, zur Aufbewahrung von Laryngoskopen (10 mm oder 11 mm), max. Endoskoplänge 200 mm",
      it: "Supporto per endoscopio per laringoscopi, non riscaldato, per la conservazione dei laringoscopi (10 mm o 11 mm), lunghezza massima 200 mm",
    },
    option41: {
      fr: "Support pour endoscope préchauffé pour laryngoscopes, destiné au rangement et au préchauffage des laryngoscopes (10 mm ou 11 mm), longueur max. 200 mm",
      de: "Vorgewärmter Endoskophalter für Laryngoskope, zur Aufbewahrung und Vorwärmung von Laryngoskopen (10 mm oder 11 mm) , max. Endoskoplänge 200 mm",
      it: "Supporto per endoscopio preriscaldato per laringoscopi, per la conservazione e il preriscaldamento dei laringoscopi (10 mm o 11 mm), lunghezza massima 200 mm",
    },
    option42: {
      fr: "3 porte-endoscopes pour endoscopes flexibles avec support, version 4, (profondeur 490 mm, diamètre intérieur 28 mm), support magnétique",
      de: "3x Köcher für flexible Endoskope mit Halter, Ver. 4, (Köchertiefe 490 mm, Innendurchmesser 28 mm), magnetischer Halter",
      it: "3 custodie per endoscopi flessibili con supporto, versione 4, (profondità custodia 490 mm, diametro interno 28 mm), supporto magnetico",
    },
    option43: {
      fr: "1 porte-endoscopes pour endoscopes flexibles avec support, version 4, (profondeur 490 mm), porte-endoscopes en acier inoxydable, diamètre intérieur 28 mm, support magnétique",
      de: "1x Köcher für flexible Endoskope mit Halter, Ver. 4, (Köcher- tiefe 490 mm), Köcher aus Edelstahl, Innendurchmesser 28 mm,  magnetischer Halter",
      it: "1 custodia per endoscopi flessibili con supporto, versione 4, (profondità custodia 490 mm), custodia in acciaio inox, diametro interno 28 mm, supporto magnetico",
    },
    option44: {
      fr: "Adaptateur pour porte-endoscopes en acier inoxydable, pour endoscopes flexibles XION EN-F",
      de: "Adapter für Edelstahlköcher, für flexible XION EN-F Endoskope",
      it: "Adattatore per custodie in acciaio inox, per endoscopi flessibili XION EN-F",
    },
    saveConfig: {
      fr: "Aller au configurateur",
      de: "Zum Konfigurator gehen",
      it: "Vai al configuratore",
    },
  },
  form: {
    name: {
      fr: "Nom",
      de: "Name",
      it: "Nome",
    },
    firstname: {
      fr: "Prénom",
      de: "Vorname",
      it: "Cognome",
    },
    email: {
      fr: "Email",
      de: "E-Mail",
      it: "Email",
    },
    next: {
      fr: "Suivant",
      de: "Weiter",
      it: "Avanti",
    },
    back: {
      fr: "Retour",
      de: "Zurück",
      it: "Indietro",
    },
    confirm: {
      fr: "Confirmer",
      de: "Bestätigen",
      it: "Conferma",
    },
    close: {
      fr: "Fermer",
      de: "Schließen",
      it: "Chiudere",
    },
  },
  modal: {
    step1Title: {
      fr: "Vos coordonnées",
      de: "Ihre Kontaktdaten",
      it: "Le tue informazioni",
    },
    step2Title: {
      fr: "Récapitulatif",
      de: "Zusammenfassung",
      it: "Riepilogo",
    },
    step3Title: {
      fr: "Configuration enregistrée",
      de: "Konfiguration gespeichert",
      it: "Configurazione salvata",
    },
    colorChosen: {
      fr: "Couleur choisie:",
      de: "Gewählte Farbe:",
      it: "Colore scelto:",
    },
    optionsChosen: {
      fr: "Options choisies:",
      de: "Gewählte Optionen:",
      it: "Opzioni scelte:",
    },
    thankYou: {
      fr: "Merci! Votre configuration a été enregistrée.",
      de: "Danke! Ihre Konfiguration wurde gespeichert.",
      it: "Grazie! La tua configurazione è stata salvata.",
    },
    emailSent: {
      fr: "Un email récapitulatif vous a été envoyé.",
      de: "Eine Zusammenfassungs-E-Mail wurde Ihnen gesendet.",
      it: "Un'email riepilogativa ti è stata inviata.",
    },
  },
};

let currentLanguage = "fr"; // Langue par défaut

// Appliquer les traductions
function applyTranslations() {
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    const translation = key
      .split(".")
      .reduce((obj, keyPart) => obj && obj[keyPart], translations);
    const translatedText = translation ? translation[currentLanguage] : null; // Vérifie si la clé existe

    if (translatedText) {
      element.textContent = translatedText;
    } else {
      console.warn(`Translation not found for key: ${key}`); // Avertir si la traduction n'est pas trouvée
    }
  });
}

// Exemple d'utilisation
document.querySelectorAll(".language-selector img").forEach((img) => {
  img.addEventListener("click", function () {
    const lang = this.getAttribute("data-lang");
    changeLanguage(lang);
  });
});

// Appliquer les traductions au chargement de la page
document.addEventListener("DOMContentLoaded", applyTranslations);
