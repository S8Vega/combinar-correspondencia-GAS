function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Correspondencia")
    .addItem("Combinar", "combinar")
    .addToUi();
}

function combinar() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let doc = DocumentApp.openByUrl(
    "https://docs.google.com/document/d/1PphEM_Snzsd73aPL2weVa8On8Hu1NC5LMoFyCxhN6XA/edit?usp=sharing"
  )
    .getBody()
    .getText();
  let lastRow = Number(sheet.getLastRow());
  let lastColumn = Number(sheet.getLastColumn());
  let data = sheet.getRange(2, 1, lastRow, lastColumn).getValues();
  for (let i = 0; i < lastRow - 1; i++) {
    let message = doc
      .replace("$nombre", data[i][2])
      .replace("$codigo", data[i][1])
      .replace("$calificacion", data[i][4])
      .replace("$observaciones", data[i][5])
      .replace("$puesto", data[i][0]);
    let mail = data[i][6];
    MailApp.sendEmail(
      mail,
      "calificaciones de computacion en la nube",
      message
    );
  }
}
