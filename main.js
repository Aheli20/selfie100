var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textarea").innerHTML = "";
    recognition.start();
}
recognition.onresult = function (event) {
    console.log(event);

    var content = event.results[0][0].transcript;
    console.log(content);

    document.getElementById("textarea").innerHTML = content;
    if (content == "take my selfie") {
        console.log("taking selfie...");
        speak();
    }

}
function speak() {
    var synthesis = window.speechSynthesis;
    var speak_data = "taking your selfie in 5 seconds";
    var say = new SpeechSynthesisUtterance(speak_data);
    synthesis.speak(say);
    Webcam.attach(camera);

    setTimeout(function () {
        take_snapshot();
        save();
    }, 5000);
}

Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
});
camera = document.getElementById('camera');

function take_snapshot() {
    webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="selfie" src ="' + data_uri + '"/>';
    });
}

function save() {
    link = document.getElementById("link");
    image = document.getElementById('selfie').src;

    link.href = image;
    link.click();

}