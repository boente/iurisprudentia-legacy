/* eslint-disable max-len */
const duplicates = [
  {
    title: 'Schmitt, Gottfried, Recht der Erbfolge, Aenderungsvorschläge des Referenten zu dem Entwurfe von 1879, Berlin 1886',
    docId: 338066,
    metadata: {
      Entstehungsjahr: '1886',
      Institution: 'Staatsbibliothek zu Berlin - Preußischer Kulturbesitz',
      Signatur: "4'' Gl 22128-5,2",
      Link: 'http://resolver.staatsbibliothek-berlin.de/SBB00019435001A0000',
    },
  },
  {
    title: 'Jhering, Rudolf von, [Rechtsgefühl, Einleitung und erste Abschnitte sowie Notizen zu Natur und Vernunft]',
    docId: 417890,
    metadata: {
      Entstehungsjahr: '',
      Institution: 'Niedersächsische Staats- und Universitätsbibliothek Göttingen',
      Signatur: 'Cod. Ms. Jhering 16 : 12',
      Link: 'http://resolver.sub.uni-goettingen.de/purl?DE-611-HS-3230212',
    },
  },
  {
    title: "Windscheid, Bernhard, Die Savigny'sche Rechtsschule im 19. Jahrhundert",
    docId: 417890,
    metadata: {
      Entstehungsjahr: '1891',
      Institution: 'Privatbesitz',
      Signatur: '',
      Link: '',
    },
  },
  {
    title: 'Jhering, Rudolph, Geist des römischen Rechts auf den verschiedenen Stufen seiner Entwicklung, Dritter Theil, Erste Abtheilung, 2. Aufl., Leipzig 1871',
    docId: 371132,
    metadata: {
      Entstehungsjahr: '1871',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: 'J.rom.c. 405 k-3,1',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb11009142-3',
    },
  },
  {
    title: 'Jhering, Rudolph von, Civilrechtsfälle ohne Entscheidungen, Zum akademischen Gebrauch, 5. Auflage, Jena 1888',
    docId: 471649,
    metadata: {
      Entstehungsjahr: '1888',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: '38.3895',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb00108841-7',
    },
  },
  {
    title: 'Jhering, Rudolf von, Brief von Rudolf von Jhering an Carl Friedrich Wilhelm von Gerber, Gießen, 1.8.1852',
    docId: 442068,
    metadata: {
      Entstehungsjahr: '1.8.1852',
      Institution: 'Niedersächsische Staats- und Universitätsbibliothek Göttingen',
      Signatur: 'Cod Ms. Jhering 20 : Nr. 1',
      Link: 'http://resolver.sub.uni-goettingen.de/purl?DE-611-HS-3615007',
    },
  },
  {
    title: 'Windscheid, Bernhard, Zur Lehre des Code Napoleon von der Ungültigkeit der Rechtsgeschäfte, Düsseldorf 1847',
    docId: 371245,
    metadata: {
      Entstehungsjahr: '1847',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: 'J.gall. 110 w',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10549980-1',
    },
  },
  {
    title: 'Savigny, Friedrich Carl von, Votum des Justiz-Ministers von Savigny die Einführung des Strafgesetzbuchs in die Rheinprovinz, Berlin 1846',
    docId: 368678,
    metadata: {
      Entstehungsjahr: '1847',
      Institution: 'Staatsbibliothek zu Berlin - Preußischer Kulturbesitz',
      Signatur: '4 in: Fz 787',
      Link: 'http://resolver.staatsbibliothek-berlin.de/SBB0001657000000000',
    },
  },
  {
    title: 'Windscheid, Bernhard, [Institutionen]',
    docId: 417887,
    metadata: {
      Entstehungszeitraum: '',
      Institution: 'Privatbesitz',
      Signatur: '',
      Link: '',
    },
  },
  {
    title: 'Windscheid, Bernhard, Zur Lehre des Code Napoleon von der Ungültigkeit der Rechtsgeschäfte, Düsseldorf 1847',
    docId: 371245,
    metadata: {
      Entstehungsjahr: '1847',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: 'J.gall. 110 w',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10549980-1',
    },
  },
  {
    title: 'Windscheid, Bernhard, Lehrbuch des Pandektenrechts, Dritter Band, Düsseldorf 1870',
    docId: 371172,
    metadata: {
      Entstehungsjahr: '1870',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: 'J.rom.c. 343 mc-3',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10566100-8',
    },
  },
  {
    title: 'Windscheid, Bernhard, Lehrbuch des Pandektenrechts, Erster Band, 2. Auflage, Düsseldorf 1867',
    docId: 371126,
    metadata: {
      Entstehungsjahr: '1867',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: 'J.rom.c. 343 mb-1',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10566096-8',
    },
  },
  {
    title: 'Windscheid, Bernhard, Lehrbuch des Pandektenrechts, Zweiter Band, 3. Auflage, Düsseldorf 1870',
    docId: 371125,
    metadata: {
      Entstehungsjahr: '1870',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: 'J.rom.c. 343 mc-2',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10566099-8',
    },
  },
  {
    title: '[fehlt] Zusammenstellungen der Anträge und Anregungen zum Vorentwurf vom 15.11.1900. Bern 1901 und 1902 (Drucksachen) (Dossier)',
    docId: 366105,
    metadata: {
      Entstehungszeitraum: '1901-1902',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2005*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000745',
    },
  },
  {
    title: 'Genehmigung der Botschaft durch BRB vom 28.5.1904; Druck und Herausgabe der Botschaft',
    docId: 370886,
    metadata: {
      Entstehungsjahr: '1904',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2015*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000751',
    },
  },
  {
    title: 'Gratifikationen an Professor Huber und Professor Reichel',
    docId: 370886,
    metadata: {
      Entstehungsjahr: '1904',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2016*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000752',
    },
  },
  {
    title: 'Genehmigung der Botschaft durch BRB vom 28.5.1904; Druck und Herausgabe der Botschaft',
    docId: 370886,
    metadata: {
      Entstehungsjahr: '1904',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2015*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000751',
    },
  },
  {
    title: 'Expertenkommission zur Prüfung des Vorentwurfes zu einem schweizerischen Zivilgesetzbuch',
    docId: 365510,
    metadata: {
      Entstehungszeitraum: '1900-1903',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2008*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000747',
    },
  },
  {
    title: 'Expertenkommission zur Prüfung des Vorentwurfes zu einem schweizerischen Zivilgesetzbuch, Teil 1',
    docId: 365511,
    metadata: {
      Entstehungsjahr: '1901',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2009*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/29166645',
    },
  },
  {
    title: 'Expertenkommission zur Prüfung des Vorentwurfes zu einem schweizerischen Zivilgesetzbuch, Teil 2',
    docId: 365620,
    metadata: {
      Entstehungsjahr: '1902',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2010*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/29166646',
    },
  },
  {
    title: 'Expertenkommission zur Prüfung des Vorentwurfes zu einem schweizerischen Zivilgesetzbuch, Teil 3',
    docId: 365997,
    metadata: {
      Entstehungsjahr: '1903',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2011*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/29166647',
    },
  },
  {
    title: 'Expertenkommission zur Prüfung des Vorentwurfes zu einem schweizerischen Zivilgesetzbuch, Teil 4',
    docId: 370977,
    metadata: {
      Entstehungsjahr: '1904',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2012*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/29166648',
    },
  },
  {
    title: 'Redaktionskommission',
    docId: 370976,
    metadata: {
      Entstehungszeitraum: '1902-1907',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2013*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000747',
    },
  },
  {
    title: 'BRB vom 26.1.1904 betr. Vertrag mit Professor Huber über die Ausarbeitung der Botschaft',
    docId: 370884,
    metadata: {
      Entstehungsjahr: '1904',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2014*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000750',
    },
  },
  {
    title: 'Akten der Kommission des NR (Korrespondenzen, Protokolle), Bd 1-3',
    docId: 365619,
    metadata: {
      Entstehungszeitraum: '1904-1907',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2017*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000753',
    },
  },
  {
    title: 'Akten der Kommission des StR (Korrespondenzen, Protokolle), Bd 1-3',
    docId: 365618,
    metadata: {
      Entstehungszeitraum: '1904-1907',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2018*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000754',
    },
  },
  {
    title: 'Akten der Bundesversammlung vom 27.3.1905-10.12.1907, Teil 1',
    docId: 365663,
    metadata: {
      Entstehungszeitraum: '1905-1907',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2019*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/29166649',
    },
  },
  {
    title: 'Akten der Bundesversammlung vom 27.3.1905-10.12.1907, Teil 2',
    docId: 346667,
    metadata: {
      Entstehungszeitraum: '1905-1907',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2020*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/29166650',
    },
  },
  {
    title: 'Akten der Bundesversammlung vom 27.3.1905-10.12.1907, Teil 3',
    docId: 346385,
    metadata: {
      Entstehungszeitraum: '1905-1907',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2021*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/29166651',
    },
  },
  {
    title: 'Akten der Redaktionskommission, Bd 1-3',
    docId: 365697,
    metadata: {
      Entstehungsjahr: '1907',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2022*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000756',
    },
  },
  {
    title: '[fehlt] Übersetzungen in die italienische und rätoromanische Sprache; Abweichungen in den authentischen Texten, Teil 1',
    docId: 365850,
    metadata: {
      Entstehungszeitraum: '1904-1911',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2027*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/29166652',
    },
  },
  {
    title: '[fehlt] KS an die Kantone betr. das Sparkassenwesen',
    docId: 365850,
    metadata: {
      Entstehungszeitraum: '1907',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2030*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/29166652',
    },
  },
  {
    title: '[fehlt] BRB vom 7.6.1920 betr. die Abänderung des ZGB vom 10.12.1907 in bezug auf den Umfag der Sicherung im Grundpfandrecht (Art. 818); Interpretation; Eingaben betr. Aufhebung',
    docId: 365850,
    metadata: {
      Entstehungszeitraum: '1915-1930',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2043*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/29166673',
    },
  },
  {
    title: '[fehlt] Übersetzungen in die italienische und rätoromanische Sprache; Abweichungen in den authentischen Texten, Teil 2',
    docId: 365849,
    metadata: {
      Entstehungszeitraum: '1904-1911',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2028*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/29166653',
    },
  },
  {
    title: '[fehlt] B des StR vom 9.4.1907 betr. Vorlage des Entwurfes zu einem Gesetz über die Anwendung schweizerischen und fremden Rechts (internationales Privatrecht)',
    docId: 365849,
    metadata: {
      Entstehungszeitraum: '1907',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2031*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/29166653',
    },
  },
  {
    title: 'Memorial des JPD an die Kantone vom 24.7.1908 betr. Einführung des ZGB (nur Drucksachen)',
    docId: 451277,
    metadata: {
      Entstehungszeitraum: '1908',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2033*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000763',
    },
  },
  {
    title: '[fehlt] Abgabe des ZGB, u.a. an Schweizer Bürgerinnen; Druck einer Volksausgabe',
    docId: 451277,
    metadata: {
      Entstehungszeitraum: '1908-1909',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2034*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000764',
    },
  },
  {
    title: ' [fehlt]Korrespondenzen mit Minister Lardy, Charles, Paris, betr. Inkraftsetzung des ZGB',
    docId: 451277,
    metadata: {
      Entstehungszeitraum: '1908-1911',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2035*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000765',
    },
  },
  {
    title: '[fehlt] BRB vom 9.11.1909 betr. Wahrung der Interessen des Bundes bei der Bereinigung der Grundbücher nach Inkrafttreten des ZGB',
    docId: 451277,
    metadata: {
      Entstehungszeitraum: '1909',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2036*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000766',
    },
  },
  {
    title: '[fehlt] Beschaffung der Formulare zur Ausführung der ZGB',
    docId: 451277,
    metadata: {
      Entstehungszeitraum: '1911',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2037*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000767',
    },
  },
  {
    title: '[fehlt]Rossel, V.: Code civil y compris le code obligations; Lausanne 1911',
    docId: 451277,
    metadata: {
      Entstehungszeitraum: '1908-1909',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2040*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000770',
    },
  },
  {
    title: '[fehlt] Übersicht zu den Vorlesungen über das schweizerische Privatrecht, von Huber, Eugen. Um 1918 (Maschienenschrift)',
    docId: 451277,
    metadata: {
      Entstehungszeitraum: '1918',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2041*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/6000771',
    },
  },
  {
    title: 'Eingaben und Vernehmlassungen zu den Gesetzesentwürfen, A-F',
    docId: 365850,
    metadata: {
      Entstehungszeitraum: '1894-1907',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'E22#1000/134#2023*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/29166652',
    },
  },
  {
    title: 'Glück, Christian Friedrich, Verbesserungen und Zusätze zum ersten Bande des Glückischen Commentars über die Pandecten für die Besitzer der ersten Auflage, Erlangen 1798',
    docId: 405733,
    metadata: {
      Entstehungsjahr: '1798',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: ' J.rom.c. 137-5,1#Beibd.1',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb11048557-3',
    },
  },
  {
    title: 'Glück, Christian Friedrich, Verbesserungen und Zusätze zum ersten Bande des Glückischen Commentars über die Pandecten für die Besitzer der ersten Auflage, Erlangen 1798',
    docId: 405733,
    metadata: {
      Entstehungsjahr: '1798',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: ' J.rom.c. 137-5,1#Beibd.1',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb11048557-3',
    },
  },
  {
    title: 'Glück, Christian Friedrich, Verbesserungen und Zusätze zum ersten Bande des Glückischen Commentars über die Pandecten für die Besitzer der ersten Auflage, Erlangen 1798',
    docId: 405733,
    metadata: {
      Entstehungsjahr: '1798',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: ' J.rom.c. 137-5,1#Beibd.1',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb11048557-3',
    },
  },
  {
    title: 'Glück, Christian Friedrich, Versuch einer ausführlichen Erläuterung der Pandecten nach Hellfeld : ein Commentar für meine Zuhörer, Eilften Theils zweyte Abtheilung, Erlangen 1809',
    docId: 417613,
    metadata: {
      Entstehungsjahr: '1809',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: 'J.rom.c. 407 b-11,1/2',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb11129700-7',
    },
  },
  {
    title: 'Glück, Christian Friedrich, Versuch einer ausführlichen Erläuterung der Pandecten nach Hellfeld : ein Commentar für meine Zuhörer, Eilften Theils zweyte Abtheilung, Erlangen 1809',
    docId: 417613,
    metadata: {
      Entstehungsjahr: '1809',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: 'J.rom.c. 137-11,1/2',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10565394-7',
    },
  },
  {
    title: 'Glück, Christian Friedrich, Versuch einer ausführlichen Erläuterung der Pandecten nach Hellfeld : ein Commentar für meine Zuhörer, Eilften Theils zweyte Abtheilung, Erlangen 1809',
    docId: 417613,
    metadata: {
      Entstehungsjahr: '1809',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: 'J.rom.c. 407 b-11,1/2',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb11129700-7',
    },
  },
  {
    title: 'Glück, Christian Friedrich/Mühlenbruch, Christian Friedrich/Fein, Eduard/Arndts von Arnesberg, Karl Ludwig/Leist, Burkard Wilhelm/Burckhard, Hugo/Czyhlarz, Karl Ritter von, Ausführliche Erläuterung der Pandecten nach Hellfeld : ein Commentar, Serie der Bücher 41 und 42. Erster Theil, Erlangen 1887',
    docId: 417623,
    metadata: {
      Entstehungsjahr: '1887',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: 'J.rom.c. 137-52,1',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb11048608-7',
    },
  },
  {
    title: 'Glück, Christian Friedrich, Versuch einer ausführlichen Erläuterung der Pandecten nach Hellfeld : ein Commentar für meine Zuhörer, Sechster Theil zweyte Abtheilung, Erlangen 1801',
    docId: 417623,
    metadata: {
      Entstehungsjahr: '1801',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: 'J.rom.c. 137-6,1/2',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10565384-6',
    },
  },
  {
    title: 'Glück, Christian Friedrich/Mühlenbruch, Christian Friedrich/Fein, Eduard/Arndts von Arnesberg, Karl Ludwig/Leist, Burkard Wilhelm/Burckhard, Hugo/Czyhlarz, Karl Ritter von, Ausführliche Erläuterung der Pandecten nach Hellfeld : ein Commentar, Serie der Bücher 41 und 42. Erster Theil, Erlangen 1887',
    docId: 417623,
    metadata: {
      Entstehungsjahr: '1887',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: 'J.rom.c. 137-52,1',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb11048608-7',
    },
  },
  {
    title: 'Glück, Christian Friedrich, Ausführliche Erläuterung der Pandecten nach Hellfeld : ein Commentar, Dreizehnten Theils zweyte Abtheilung, Zweite, unveränderte Auflage, Erlangen 1843',
    docId: 405782,
    metadata: {
      Entstehungsjahr: '1843',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: ' J.rom.c. 137 b-13,1/2',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10565484-1',
    },
  },
  {
    title: 'Glück, Christian Friedrich, Ausführliche Erläuterung der Pandecten nach Hellfeld : ein Commentar, Zwölften Theils zweite Abtheilung, Zweite, unveränderte Auflage, Erlangen 1841',
    docId: 405782,
    metadata: {
      Entstehungsjahr: '1841',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: ' J.rom.c. 137 b-12,1/2',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10565482-1',
    },
  },
  {
    title: 'Glück, Christian Friedrich, Ausführliche Erläuterung der Pandecten nach Hellfeld : ein Commentar, Dreizehnten Theils zweyte Abtheilung, Zweite, unveränderte Auflage, Erlangen 1843',
    docId: 405782,
    metadata: {
      Entstehungsjahr: '1843',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: ' J.rom.c. 137 b-13,1/2',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10565484-1',
    },
  },
  {
    title: 'Die Behandlung des Entwurfes von 1904 in den eidg. Räten, Akten der Bundesversammlung und der Redaktionskommission, Kritische Bemerkungen, Juli-September 1907',
    docId: 576062,
    metadata: {
      Entstehungszeitraum: '1907',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'J1.109-01#1000/1276#470*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/5758015',
    },
  },
  {
    title: 'Die Verhandlungen der Expertenkommission, 5. Vierte Sitzung vom 15.4.-2.5.1903 in Genf (2. Teil des Sachenrechts): b) Verschiedenes: Von Huber gesammelte Materialien und Aufzeichnungen aus den Beratungen',
    docId: 576062,
    metadata: {
      Entstehungszeitraum: '1903',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'J1.109-01#1000/1276#454*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/5758000',
    },
  },
  {
    title: 'Die Behandlung des Entwurfes von 1904 in den eidg. Räten, Akten der Bundesversammlung und der Redaktionskommission, Kritische Bemerkungen, Juli-September 1907',
    docId: 576062,
    metadata: {
      Entstehungszeitraum: '1907',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'J1.109-01#1000/1276#470*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/5758015',
    },
  },
  {
    title: 'Protocolle der Commission zur Berathung einer allgemeinen Civilproceßordnung für die deutschen Bundesstaaten, CCLXXV. - CCXCIV., Hannover 1865',
    docId: 456600,
    metadata: {
      Entstehungsjahr: '1865',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: '2 J.pract. 138 h-14',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10491180-3',
    },
  },
  {
    title: 'Protocolle der Commission zur Berathung einer allgemeinen Civilproceßordnung für die deutschen Bundesstaaten, CCXVI. - CCXXXIII., Hannover 1864',
    docId: 456600,
    metadata: {
      Entstehungsjahr: '1864',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: '2 J.pract. 138 h-11',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10491177-6',
    },
  },
  {
    title: 'Protocolle der Commission zur Berathung einer allgemeinen Civilproceßordnung für die deutschen Bundesstaaten, CCLXXV. - CCXCIV., Hannover 1865',
    docId: 456600,
    metadata: {
      Entstehungsjahr: '1865',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: '2 J.pract. 138 h-14',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10491180-3',
    },
  },
  {
    title: 'Protocolle der Commission zur Berathung einer allgemeinen Civilproceßordnung für die deutschen Bundesstaaten, CCXCV. - CCCXVIII., Hannover 1865',
    docId: 456599,
    metadata: {
      Entstehungsjahr: '1865',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: '2 J.pract. 138 h-15',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10491181-8',
    },
  },
  {
    title: 'Protocolle der Commission zur Berathung einer allgemeinen Civilproceßordnung für die deutschen Bundesstaaten, CCXXXIV. - CCXLVIII., Hannover 1864',
    docId: 456599,
    metadata: {
      Entstehungsjahr: '1864',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: '2 J.pract. 138 h-12',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10491178-1',
    },
  },
  {
    title: 'Protocolle der Commission zur Berathung einer allgemeinen Civilproceßordnung für die deutschen Bundesstaaten, CCXCV. - CCCXVIII., Hannover 1865',
    docId: 456599,
    metadata: {
      Entstehungsjahr: '1865',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: '2 J.pract. 138 h-15',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10491181-8',
    },
  },
  {
    title: 'Glück, Christian Friedrich, Versuch einer ausführlichen Erläuterung der Pandecten nach Hellfeld : ein Commentar für meine Zuhörer, 1. Theil, Erlangen 1790',
    docId: 417638,
    metadata: {
      Entstehungsjahr: '1790',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: 'J.rom.c. 137-1',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10565375-6',
    },
  },
  {
    title: 'Engelhardt, Johann Georg Veit, Gedächtnißpredigt auf den weiland Hochwohlgebornen und Hochgelehrten Herrn Dr. Friedrich Christian von Glück, Ritter des bayerischen Civilverdienstordens, Kön. Bayer. Geheimen Hofrath und ordentlichen Professor der Rechtsgelehrsamkeit, über 1. Kor. XII. 4-7. auf Verordnung des akademischen SEnates am 6. Februar 1831 zu Erlangen gehalten, Erlangen 1831',
    docId: 417638,
    metadata: {
      Entstehungsjahr: '1831',
      Institution: 'Bayerische Staatsbibliothek München',
      Signatur: ' Bavar. 4007,I,21',
      Link: 'http://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10381817-1',
    },
  },
  {
    title: 'Die Verhandlungen der Expertenkommission, 3. Zweite Sitzung vom 3.-22.3.1902 in Neuenburg (Vormundschafts- und Erbrecht): a) Verschiedenes: Von Huber gesammelte Materialien und Aufzeichnungen aus den Beratungen',
    docId: 568806,
    metadata: {
      Entstehungszeitraum: '1902',
      Institution: 'Schweizerisches Bundesarchiv',
      Signatur: 'J1.109-01#1000/1276#447*',
      Link: 'https://www.recherche.bar.admin.ch/recherche/#/de/archiv/einheit/5757993',
    },
  },
];
