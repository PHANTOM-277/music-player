var playbtn = document.getElementById("play");
var playpng = document.getElementById("playpng");
var sound = new Howl({
    src:['chorded.mp3']
});
var time_indicator = document.getElementById("start");
var time_duration = document.getElementById("end");
var isplaying = false;
var volumeslider = document.getElementById("volume");
var volume_indicator = document.getElementById("volume-indicator");
var change = document.getElementById("change");
var playbar = document.getElementById("slider");
//get all options
var option1 = document.getElementById("opt1");
var option2 = document.getElementById("opt2");
var option3 = document.getElementById("opt3");
var option4 = document.getElementById("opt4");
var option5 = document.getElementById("opt5");
var option6 = document.getElementById("opt6");


var nameofsong = document.getElementById("nameofsong");

var updateinterval;
var time=0;

function initplaybar(min , max , steps){
    playbar.min = min;
    playbar.max = max;
    playbar.steps = steps;
    
}

function update_playbar(){
    if(time > sound.duration()){
        clearInterval(updateinterval);
        sound.stop();
        playpng.src =  "assets/play.png";
        isplaying = false;
    }
    else{
        playbar.value = time;
        time++;
        console.log(sound.seek());
        //something to make a string of mm:ss format of time variable
        m = Math.floor(time/60);
        s = time - m*60;
        ss = s;
        if(s<10){
            ss = `0${s}`;
        }
        time_indicator.innerHTML = `${m}:${ss}`;
    }
}

function playmusic(){
    
    if(isplaying){
        sound.pause();
        playpng.src = "assets/play.png"; 
        isplaying = false;
        clearInterval(updateinterval);
    }
    else{
        if(time<sound.duration()){
            sound.play();
            isplaying = true;
            playpng.src = "assets/pause.png";
            updateinterval = setInterval(update_playbar,1000);
        }
    }
    
}

volumeslider.max = 100;
volumeslider.min = 0;
volumeslider.steps = 1;
volumeslider.value = 100;
sound.volume(1);
initplaybar(0,170,1);// used for initialising the playbar according to the length of the song
//to play music
playbtn.addEventListener('click', function(){
    s = sound.duration() - Math.floor(sound.duration()/60)*60;
    if(s<10){
        s = `0${s}`;
    }
    time_duration.innerHTML = `${Math.floor(sound.duration()/60)}:${Math.ceil(s)}`;
    playmusic();
});
//to change position of song using playbar
playbar.addEventListener('input', function(){
    time = playbar.value;
    sound.seek(time);
    if(!isplaying){
        m = Math.floor(time/60);
        s = time - m*60;
        ss = s;
        if(s<10){
            ss = `0${s}`;
        }
        time_indicator.innerHTML = `${m}:${ss}`;
    }
});

function load(name){ // to mudularise the onload of new objects
    initplaybar(0,sound.duration(),1);
    console.log("duration "+sound.duration());
    playbar.value = 0;
    s = sound.duration() - Math.floor(sound.duration()/60)*60;
    console.log("duration2 :"+sound.duration());
    if(s<10){
        s = `0${s}`;
    }
    time_duration.innerHTML = `${Math.floor(sound.duration()/60)}:${Math.ceil(s)}`;
    time_indicator.innerHTML = "0:00";
    isplaying = false;
    time = 0;
    playpng.src = "assets/play.png";
    nameofsong.innerHTML = name;
}

//volume event listener
volumeslider.addEventListener('input', function(){
    sound.volume(volumeslider.value/100);
    volume_indicator.innerHTML = `${volumeslider.value}%`;
})
option1.addEventListener('click',function(){
    clearInterval(updateinterval);
    sound.stop();
    sound = new Howl({
        src:['chorded.mp3'],
        onload:()=> load("Chorded")
    });
})

option2.addEventListener('click',function(){
    clearInterval(updateinterval);
    sound.stop();
    sound = new Howl({
        src:['rainy-night.mp3'],
        onload: ()=>load("Rainy Night")
    });
})

option3.addEventListener('click',function(){
    clearInterval(updateinterval);
    sound.stop();
    sound = new Howl({
        src:['Heavenly bliss.mp3'],
        onload:()=> load("Heavenly Bliss")
    });
})

option4.addEventListener('click',function(){
    clearInterval(updateinterval);
    sound.stop();
    sound = new Howl({
        src:['memories.mp3'],
        onload:()=> load("Memories")
    });
})

option5.addEventListener('click',function(){
    clearInterval(updateinterval);
    sound.stop();
    sound = new Howl({
        src:['snowy-evening.mp3'],
        onload: ()=>load("Snowy Evening")
    });
})

option6.addEventListener('click',function(){
    clearInterval(updateinterval);
    sound.stop();
    sound = new Howl({
        src:['warm-blanket.mp3'],
        onload:()=> load("Warm Blanket")
    });
})
