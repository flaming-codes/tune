import type { Payload } from 'payload'

type RichTextNode = Record<string, unknown>

type RichTextDocument = {
  root: {
    type: 'root'
    children: RichTextNode[]
    direction: 'ltr' | 'rtl' | null
    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
    indent: number
    version: number
  }
}

function textNode(text: string): RichTextNode {
  return {
    detail: 0,
    format: 0,
    mode: 'normal',
    style: '',
    text,
    type: 'text',
    version: 1,
  }
}

function paragraphNode(text: string): RichTextNode {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    children: [textNode(text)],
    direction: 'ltr',
  }
}

function headingNode(text: string): RichTextNode {
  return {
    type: 'heading',
    tag: 'h2',
    format: '',
    indent: 0,
    version: 1,
    children: [textNode(text)],
    direction: 'ltr',
  }
}

function bulletListNode(items: string[]): RichTextNode {
  return {
    type: 'list',
    listType: 'bullet',
    tag: 'ul',
    start: 1,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: items.map((item) => ({
      type: 'listitem',
      value: 1,
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [paragraphNode(item)],
    })),
  }
}

function richTextDocument(nodes: RichTextNode[]): RichTextDocument {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: nodes,
    },
  }
}

const defaultImprintPageData = {
  pageTitle: 'Impressum',
  content: richTextDocument([
    headingNode('Tierarztpraxis Dr. Tune Lazri'),
    paragraphNode('Inhaber: Dipl Tierarzt, Dr. Tune Lazri'),
    headingNode('Anschrift'),
    paragraphNode('Brünnerstraße 219-221, 1 Top 60 B7\n1210 Wien\nÖsterreich'),
    headingNode('Kontakt'),
    paragraphNode(
      'Tel.: 0699 19012012\nWebsite: https://tierarztpraxis-lazri.at/\nE-Mail: contact@tierarztpraxis-lazri.at',
    ),
    headingNode('Unternehmensdaten'),
    paragraphNode(
      'Unternehmensgegenstand: Veterinärmedizin / Tierarzt\nUmsatzsteuer-Identifikationsnummer (UID): ATU76160912\nKammerzugehörigkeit: Mitglied der österreichischen Tierärztekammer',
    ),
    headingNode('Datenschutzbestimmung und Haftungsausschluss'),
    paragraphNode(
      'Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Es wird keine Haftung für die Korrektheit aller Inhalte auf dieser Webseite übernommen, insbesondere für jene, die seitens Dritter bereitgestellt wurden.',
    ),
    paragraphNode(
      'Sollten rechtswidrige Inhalte auffallen, bitten wir Sie, uns umgehend zu kontaktieren. Sie finden die Kontaktdaten im Impressum.',
    ),
    headingNode('Urheberrechtshinweis'),
    paragraphNode(
      'Alle Inhalte dieser Webseite (Bilder, Fotos, Publikationen, Tondokumente, Videosequenzen und Texte) unterliegen dem Urheberrecht. Sollten Sie auf dieser Webseite Inhalte finden, die das Urheberrecht verletzen, bitten wir Sie uns zu kontaktieren.',
    ),
    headingNode('Bildernachweis'),
    paragraphNode(
      'Die Bilder, Fotos und Grafiken auf dieser Webseite sind urheberrechtlich geschützt. Die Bilderrechte liegen bei: Tierarztpraxis Dipl. Tierarzt, Dr. Tune Lazri.',
    ),
  ]),
}

const defaultPrivacyPolicyPageData = {
  pageTitle: 'Datenschutzerklärung',
  content: richTextDocument([
    paragraphNode(
      'In folgender Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Webseite. Wir erheben und verarbeiten personenbezogene Daten nur auf Grundlage der gesetzlichen Bestimmungen (Datenschutzgrundverordnung, Telekommunikationsgesetz 2003).',
    ),
    paragraphNode(
      'Sobald Sie als Benutzer auf unsere Webseite zugreifen oder diese besuchen wird Ihre IP-Adresse, Beginn sowie Beginn und Ende der Sitzung erfasst. Dies ist technisch bedingt und stellt somit ein berechtigtes Interesse iSv Art 6 Abs 1 lit f DSGVO dar.',
    ),
    headingNode('Kontakt mit uns'),
    paragraphNode(
      'Wenn Sie uns über das Kontaktformular auf unserer Webseite oder per E-Mail kontaktieren, werden die von Ihnen übermittelten Daten zwecks Bearbeitung Ihrer Anfrage oder für den Fall von weiteren Anschlussfragen für sechs Monate bei uns gespeichert. Es erfolgt ohne Ihre Einwilligung keine Weitergabe Ihrer übermittelten Daten.',
    ),
    headingNode('Cookies'),
    paragraphNode(
      'Unsere Website verwendet sogenannte Cookies. Dabei handelt es sich um kleine Textdateien, die mit Hilfe des Browsers auf Ihrem Endgerät abgelegt werden. Sie richten keinen Schaden an. Wir nutzen Cookies dazu, unser Angebot nutzerfreundlich zu gestalten. Einige Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Sie ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.',
    ),
    paragraphNode(
      'Wenn Sie dies nicht wünschen, können Sie Ihren Browser so einrichten, dass er Sie über das Setzen von Cookies informiert und Sie dies nur im Einzelfall erlauben. Bei der Deaktivierung von Cookies kann die Funktionalität unserer Website eingeschränkt sein.',
    ),
    headingNode('Google Maps'),
    paragraphNode(
      'Unsere Website verwendet Funktionen des Webkartendienstes „Google Maps“. Der Dienstanbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland, Tel: +353 1 543 1000.',
    ),
    paragraphNode(
      'Im Zuge der Nutzung von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern und zu verarbeiten. Google überträgt in der Regel an Server in den USA und speichert die Daten dort. Die Verarbeitung geschieht durch den Diensteanbieter. Der Betreiber dieser Homepage hat keinen Einfluss auf die Übertragung der Daten.',
    ),
    paragraphNode(
      'Die Datenverarbeitung erfolgt auf Basis der gesetzlichen Bestimmungen des § 96 Abs 3 TKG sowie des Art 6 Abs 1 lit f (berechtigtes Interesse) der DSGVO. Die Nutzung von Google Maps erhöht die Auffindbarkeit der Orte, welche auf unserer Webseite bereitgestellt werden.',
    ),
    bulletListNode([
      'https://policies.google.com/privacy?hl=de',
      'https://www.privacyshield.gov/EU-US-Framework',
    ]),
    headingNode('Google Fonts'),
    paragraphNode(
      'Unsere Website verwendet Schriftarten von „Google Fonts“. Der Dienstanbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland, Tel: +353 1 543 1000.',
    ),
    paragraphNode(
      'Beim Aufrufen dieser Webseite lädt Ihr Browser Schriftarten und speichert diese in den Cache. Da Sie als Besucher der Webseite Daten des Dienstanbieters empfangen, kann Google unter Umständen Cookies auf Ihrem Rechner setzen oder analysieren.',
    ),
    paragraphNode(
      'Die Nutzung von Google Fonts dient der Optimierung unserer Dienstleistung und der einheitlichen Darstellung von Inhalten. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.',
    ),
    bulletListNode([
      'https://developers.google.com/fonts/faq',
      'https://policies.google.com/privacy?hl=de',
      'https://www.privacyshield.gov/EU-US-Framework',
    ]),
    headingNode('Server-Log Files'),
    paragraphNode(
      'Diese Webseite und der damit verbundene Provider erheben im Zuge der Webseitennutzung automatisch Informationen im Rahmen sogenannter „Server-Log Files“. Diese Informationen werden nicht personenbezogen verarbeitet oder mit personenbezogenen Daten in Verbindung gebracht.',
    ),
    bulletListNode([
      'IP-Adresse oder Hostname',
      'verwendeter Browser',
      'Aufenthaltsdauer sowie Datum und Uhrzeit',
      'aufgerufene Seiten der Webseite',
      'Spracheinstellungen und Betriebssystem',
      'Leaving-Page (über welche URL die Seite verlassen wurde)',
      'ISP (Internet Service Provider)',
    ]),
    paragraphNode(
      'Der Webseitenbetreiber behält es sich vor, im Falle von Bekanntwerden rechtswidriger Tätigkeiten, diese Daten auszuwerten oder zu überprüfen.',
    ),
    headingNode('Ihre Rechte als Betroffener'),
    paragraphNode(
      'Sie haben bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich ein Recht auf Auskunft, Löschung, Berichtigung, Übertragbarkeit, Widerruf und Widerspruch zur Datenverarbeitung sowie Einschränkung.',
    ),
    paragraphNode(
      'Wenn Sie vermuten, dass im Zuge der Verarbeitung Ihrer Daten Verstöße gegen das Datenschutzrecht passiert sind, können Sie sich bei uns oder der Datenschutzbehörde beschweren.',
    ),
    headingNode('Sie erreichen uns unter folgenden Kontaktdaten'),
    paragraphNode(
      'Webseitenbetreiber: Dipl. Tierarzt, Dr. Tune Lazri\nTelefonnummer: 0699 190 12 012\nE-Mail: contact@tierarztpraxis-lazri.at',
    ),
    paragraphNode('Quelle: Datenschutzgenerator Österreich DSGVO (fairesrecht.at)'),
  ]),
}

export async function seedLegalPages(payload: Payload, overwrite = false): Promise<void> {
  const existingImprintPage = await payload.findGlobal({ slug: 'imprint-page' })
  const existingPrivacyPolicyPage = await payload.findGlobal({ slug: 'privacy-policy-page' })

  const imprintHasContent =
    typeof existingImprintPage.content === 'object' && existingImprintPage.content !== null
  const privacyHasContent =
    typeof existingPrivacyPolicyPage.content === 'object' &&
    existingPrivacyPolicyPage.content !== null

  if (!imprintHasContent || overwrite) {
    await payload.updateGlobal({
      slug: 'imprint-page',
      data: defaultImprintPageData,
    })
  }

  if (!privacyHasContent || overwrite) {
    await payload.updateGlobal({
      slug: 'privacy-policy-page',
      data: defaultPrivacyPolicyPageData,
    })
  }
}
