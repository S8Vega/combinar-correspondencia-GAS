function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Correspondencia")
    .addItem("Combinar", "combinar")
    .addToUi();
}

function combinar() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let range = sheet.getActiveRange();
}
