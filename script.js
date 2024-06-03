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

var repeatbtn = document.getElementById("repeat");
var isrepeat = false;
//these help to repeat the same song again.

var songsrc = ['chorded.mp3', 'rainy-night.mp3', 'Heavenly bliss.mp3' , 
    'memories.mp3', 'snowy-evening.mp3', 'warm-blanket.mp3'];  
    //this list is used while loading songs and changing songs.
var songs = ["Chorded", "Rainy Night", "Heavenly Bliss", "Memories" , "Snowy Evening", "Warm Blanket"];
    //this list is used for the Now Playing feature

var currentplaying = 0;//to keep track of which song in terms of index

var nameofsong = document.getElementById("nameofsong");

var repeatshow = document.getElementById("repeatshow");
var autoplayshow = document.getElementById("autoplayshow");
//displays if repeat or autoplay is switched on

var autoplaybtn = document.getElementById("autoplaybtn");
var isautoplay = false;

var updateinterval;
var time=0;

function initplaybar(min , max , steps){
    playbar.min = min;
    playbar.max = max;
    playbar.step = steps;
    
}

function helpforautoplay(){
    isplaying = false;
    playmusic();
    console.log(`here-autoplay and isplay : ${isplaying}`);
}

function update_playbar(){
    if(time > sound.duration() && !isrepeat && !isautoplay){
        clearInterval(updateinterval);
        sound.stop();
        playpng.src =  "assets/play.png";
        isplaying = false;
    }
    else if(time>=sound.duration() && isrepeat && !isautoplay){
        console.log('came here');
        time = 0;
        sound.seek(0);
        playbar.value = 0;
        time_indicator.innerHTML = "0:00";
        sound.play();
        isplaying = true;
    }
    else if(time>=sound.duration() && isautoplay && !isrepeat){
        if(currentplaying < 5){
            currentplaying++;
        }
        else{
            currentplaying = 0;
        }
        load(currentplaying, helpforautoplay);
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
volumeslider.step = 1;
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

function load(i, x=null){ // to mudularise the onload of new objects
    currentplaying = i;
    clearInterval(updateinterval);
    sound.stop();
    sound = new Howl({
        src:[`${songsrc[i]}`],
        onload:()=>{
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
            nameofsong.innerHTML = songs[i];
            x();
        }
    });
}

//volume event listener
volumeslider.addEventListener('input', function(){
    sound.volume(volumeslider.value/100);
    volume_indicator.innerHTML = `${volumeslider.value}%`;
})



option1.addEventListener('click',function(){
    load(0);
})

option2.addEventListener('click',function(){
    load(1);
})

option3.addEventListener('click',function(){
    load(2);
})

option4.addEventListener('click',function(){
    load(3);
})

option5.addEventListener('click',function(){
    load(4);
})

option6.addEventListener('click',function(){
    load(5);
})

repeatbtn.addEventListener('click', ()=> {
    if(isrepeat){
        isrepeat = false;
        repeatbtn.style.border = "";
        repeatshow.innerHTML = "No repeat"
    } 
    else{
        isrepeat = true;
        repeatbtn.style.border = "2px solid #152837";
        repeatshow.innerHTML = "Repeating";
    }
});

autoplaybtn.addEventListener('click', ()=> {
    if(isautoplay){
        isautoplay = false;
        autoplayshow.innerHTML = "No Autoplay";
    }
    else{
        isautoplay = true;
        autoplayshow.innerHTML = "Autoplay On";
    }
})
