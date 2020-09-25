function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Correspondencia")
    .addItem("Enviar correo", "sendMail")
    .addItem("Compartir PDF", "sharePDF")
    .addToUi();
}

function sendMail() {
  let list = getList();
  let template = getTemplate();
  for (let person of list) {
    let message = template
      .replace("$nombre", person.nombres)
      .replace("$codigo", person.codigo)
      .replace("$calificacion", person.calificacion)
      .replace("$observaciones", person.observacion)
      .replace("$puesto", person.numero);
    MailApp.sendEmail(
      person.email,
      "calificaciones de computacion en la nube",
      message
    );
  }
}

function getTemplate() {
  let doc = DocumentApp.openByUrl(
    "https://docs.google.com/document/d/1PphEM_Snzsd73aPL2weVa8On8Hu1NC5LMoFyCxhN6XA/edit?usp=sharing"
  )
    .getBody()
    .getText();
  return doc;
}

function getList(option) {
  let sheet = SpreadsheetApp.getActiveSheet();
  let lastRow = Number(sheet.getLastRow());
  let lastColumn = Number(sheet.getLastColumn());
  let data = sheet.getRange(2, 1, lastRow, lastColumn).getValues();
  list = [];
  for (let i = 0; i < lastRow - 1; i++) {
    list.push({
      numero: data[i][0],
      codigo: data[i][1],
      nombres: data[i][2],
      apellidos: data[i][3],
      calificacion: data[i][4],
      observacion: data[i][5],
      email: data[i][6],
    });
  }
  return list;
}
