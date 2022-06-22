import twilio from './node_module/twilio';

const accountSid = "AC8e39f82b93e604ec79ebf55d820675ac";
const authToken = "4a47f952ea2cffc85844f59e150f45c4"
const client = twilio(accountSid, authToken);


function sendTextMessage (){
    client.messages.create({
        body: 'Hello from Ahmon',
        to: '+16692406800',
        from: '+15103300744'
    })
    .then(message => {
        console.log(message.sid);
        console.log(message.error_code || 'no error');
    });
  }

document.querySelector("#files").addEventListener("change", (e) => { //CHANGE EVENT FOR UPLOADING PHOTOS
    if (window.File && window.FileReader && window.FileList && window.Blob) { //CHECK IF FILE API IS SUPPORTED
      const files = e.target.files; //FILE LIST OBJECT CONTAINING UPLOADED FILES
      const output = document.querySelector("#result");
      output.innerHTML = "";
      for (let i = 0; i < files.length; i++) { // LOOP THROUGH THE FILE LIST OBJECT
          if (!files[i].type.match("image")) continue; // ONLY PHOTOS (SKIP CURRENT ITERATION IF NOT A PHOTO)
          const picReader = new FileReader(); // RETRIEVE DATA URL
          picReader.addEventListener("load", (e) => { // LOAD EVENT FOR DISPLAYING PHOTOS
            const picFile = event.target;
            const div = document.createElement("div");
            div.innerHTML = `<img class="thumbnail" src="${picFile.result}" title="${picFile.name}"/>`;
            output.appendChild(div);
            sendTextMessage();
          });
          picReader.readAsDataURL(files[i]); //READ THE IMAGE
      }
    } else {
      alert("Your browser does not support File API");
    }
});

