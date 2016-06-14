function delayedMessge(docDefinition,callback) {
  var fonts = {
    SourceSansPro: {
      normal: process.cwd().split('.meteor')[0] + 'public/fonts/SourceSansPro-Regular.ttf',
      bold: process.cwd().split('.meteor')[0] + 'public/fonts/SourceSansPro-Bold.ttf',
      italics: process.cwd().split('.meteor')[0] + 'public/fonts/SourceSansPro-It.ttf',
      bolditalics: process.cwd().split('.meteor')[0] + 'public/fonts/SourceSansPro-BoldIt.ttf'
    }
  };
  var PdfPrinter = require('pdfmake/src/printer');
  var printer = new PdfPrinter(fonts);

  // var meteor_root = Npm.require('fs').realpathSync( process.cwd() + '/../' );
  // var application_root = Npm.require('fs').realpathSync( meteor_root + '/../' );
  // var assets_folder = meteor_root + '/server/assets/' + Npm.require('path').basename( application_root );

  var doc = printer.createPdfKitDocument(docDefinition);
  var chunks = [];
  var result;

  doc.on('data', function(chunk) {
    chunks.push(chunk);
  });

  doc.on('end', function() {
    result = Buffer.concat(chunks);
      callback(null, result.toString('base64'));
  });

  doc.end();
}

//wrapping
var wrappedDelayedMessage = Async.wrap(delayedMessge);

//usage
Meteor.methods({
  'delayedEcho': function(docDefinition) {
    return wrappedDelayedMessage(docDefinition);;
  }
});
