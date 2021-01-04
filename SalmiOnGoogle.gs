function SalmiOnGoogle() {
  //set up tab
  this.tabData = SpreadsheetApp.openById(SalmiDBSpreadsheet).getSheetByName(SalmiDBTab);
}

//Draws a tray
SalmiOnGoogle.prototype.selectVerse = function() {
  //gets the seed
  let seedT = parseInt( Math.random() * ( parseInt(this.tabData.getRange("A1").getValue() ) )) +2;
  //gets the verse
  let verseRaw = this.tabData.getRange("A"+seedT.toString()+":D"+seedT.toString()).getValues();
  let verse = this.createNiceVerse(verseRaw, seedT);
  return verse;
}

SalmiOnGoogle.prototype.createNiceVerse = function(verseRaw, seedT) {
  while (verseRaw[0][1]!="") {
    seedT++;
    verseRaw = this.tabData.getRange("A"+(parseInt(seedT)+1).toString()+":D"+(parseInt(seedT)+1).toString()).getValues();
  }
  return verseRaw[0][0]+","+verseRaw[0][2] +"\r\n"+ verseRaw[0][3].toString().replace(/###/g,"\r\n");
}


//Testing function. Use locally
function test(){
  var f = new SalmiOnGoogle();
  var r = f.selectVerse();
  Logger.log(r);
}
    