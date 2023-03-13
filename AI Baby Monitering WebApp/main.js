img = "";
status = "";
objects = [];

function preload(){
    audio = loudSound('audio.mp4');
  }

  function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("detecting").innerHTML = "Status: Detecting Objects ";
  }

  function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
  }


  function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects = results;
  }

  function draw() {
    image(video, 0, 0, 480, 380);
        if(status != "")
        {
            r=random(225);
            g=random(225);
            b=random(225);
          objectDetector.detect(video, gotResult);
          for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Person found : "+ objects.length;
   
            fill("r,g,b");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("r,g,b");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          }
        }
          else
          {
            document.getElementById("status").innerHTML = "Status : Objects Detecting";
            document.getElementById("number_of_objects").innerHTML = "Person not found : "+ objects.length;
            audio.play();
   
          }
        }
  
  
  