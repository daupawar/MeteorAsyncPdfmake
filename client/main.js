Template.hello.helpers = function() {
  return "Welcome to Meteor Async Text.";
};

Template.hello.events = {
  'click input': function() {
    Meteor.call('delayedEcho', function(err, result) {

      if (result) {
        window.open('data:application/pdf;base64,' + escape(result));
        //b64toBlob(result, 'application/pdf');
      } else if (err) {
        console.log(err);
      }
    });
  }
};

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {
    type: contentType
  });
  if (blob) {
    saveAs(blob, 'sw.pdf');
  } else {
    throw 'Could not generate blob';
  }
}
