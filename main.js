var previsionResult = ""

function preload(){

}

function setup(){
    canvas = createCanvas(500, 500)
    canvas.center()
    cam = createCapture(VIDEO)
    cam.hide()
    classifier = ml5.imageClassifier("MobileNet", ModelLoaded)
}

function draw(){
    image(cam, 0, 0, 500, 500)
    classifier.classify(cam, gotResult)
}

function ModelLoaded(){
    console.log("modelo carregado")
}

function gotResult(error, results){
    if(error){
        console.log(error)
    }else{
        if((results[0].confidence>0.5) && (previsionResult != results[0].label)){
            console.log(results)
            previsionResult = results[0].label

            var synth = window.speechSynthesis
            var speakData = "o objeto detectado é -"+results[0].label
            var utterThis = new SpeechSynthesisUtterance(speakData)
            synth.speak(utterThis)

            document.getElementById("Nome_objeto").innerHTML = results[0].label
            document.getElementById("confidence").innerHTML = results[0].confidence.toFixed(3)
        }
    }
}