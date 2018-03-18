
var songs = [
{   
  'name': 'The Mantra',
  'artist': 'Miss A.',
  'album': 'You & Me',
  'duration': '2:56',
 'fileName': 'song1.mp3',
    'image':'song1.jpg'
},
{
  'name': 'Playing a Paino',
  'artist': 'Mr. B',
  'album': 'Soothing',
  'duration': '3:15',
  'fileName': 'song2.mp3',
    'image':'song2.jpg'
},
{
  'name': 'KeyBoard',
  'artist': 'Miss C',
  'album': 'Fun',
  'duration': '2:34',
  'fileName': 'song3.mp3',
    'image':'song3.jpg'
},
{
  'name': 'Instrumental',
  'artist': 'Miss D',
  'album': 'Rocking',
  'duration': '2:29',
  'fileName': 'song4.mp3',
    'image':'song4.jpg'
}];

var currentSongPosition = null ;
addSongNameClickEvent(0);
var totalsongs = songs.length;

function addSongNameClickEvent(songPosition) {
  var songObj = songs[songPosition] ;
  $('.current-song-image').attr('src','img/' + songObj.image) ;
  $('.current-song-name').text(songObj.name) ;
  $('.current-song-album').text(songObj.album) ;
}


//This function is setting up the Playlist and adding songs to the Audio Element.       
function setUpPlaylist()
{
var songDetailsHTML = '<span class="song-name"> </span>'+
                      '<span class="song-artist"> </span>'+ 
                      '<span class="song-album"> </span>'+
                      '<span class="song-length"> </span>' ;
    
    $('.totalsongs').text('Total no of Songs in the Playlist: ' + totalsongs);

for (var i=0; i < songs.length ; i++) {
                                         var song = songs[i];  
                                        $('.song-list').append('<div id="song'+ i + '" class="song">'+ songDetailsHTML +'</div>');
                                                                                                                     
                                            $('#song'+ i + ' .song-name').text(song.name);
                                            $('#song'+ i + ' .song-artist').text(song.artist);
                                            $('#song'+ i + ' .song-album').text(song.album);
                                            $('#song'+ i + ' .song-length').text(song.duration);

                                            $('#song'+ i).attr('data-song-position', i) ;
                                          
                                         //Setting the Click event for songs
                                          $('#song' + i).click(function(){
                                                                                                                                    
                                                                            //Selecting audio element and storing it in a variable
                                                                            var audio = document.querySelector('audio');
                                                                           // Condition to check if song is not current one
            if($(this).attr('data-song-position') != currentSongPosition){
                                                                            
                                                                            // Getting the value when clicked
                                                                            var songPosition = $(this).attr('data-song-position');
                                                                        
                                                                            songPosition = parseInt(songPosition) ;
                                                                            audio.src = songs[songPosition].fileName ;
                                                                        
                                                                        //Make sure you update the variable to mark the current song
                                                                            currentSongPosition = songPosition ;
                                                                             addSongNameClickEvent(songPosition);
                   
                                                                          }
                                                                            togglesong();
                                                                          });
                                          
                                             
                                         }
}

        
        
// This function converts seconds into minutes.
function fancyTimeFormat(time)
{   
                            // Hours, minutes and seconds
                            var hrs =Math.floor(time / 3600);
                            var mins = Math.floor((time % 3600) / 60);
                            var secs = time % 60;

                            // Output like "1:01" or "4:03:59" or "123:03:59"
                            var ret = "";

                            if (hrs > 0) {
                                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
                            }

                            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
                            ret += "" + secs;
                            return ret;
}
       
     
// This function shows the amount of time elapsed and the song duration
function updateCurrentTime()
{
                                          var song = document.querySelector('audio');
                                            var currentTime = Math.floor(song.currentTime);
                                            currentTime = fancyTimeFormat(currentTime);
                                            
                                            var duration = Math.floor(song.duration);
                                            duration = fancyTimeFormat(duration);
                                            
                                            $('.time-elapsed').text(currentTime);
                                            $('.song-duration').text(duration);
}

       
//Created a Function to play and pause the song, and the play/pause icon changes accordingly.
function togglesong()
{
             
            var song = document.querySelector('audio');
            console.log(song.paused);                                              
                                    if(song.paused == true){
                                                            
                                                            $('.play-icon').removeClass('fa-play');
                                                            $('.play-icon').addClass('fa-pause');
                                                            song.play();
                                                            console.log('Playing Song');
                                                            }
                                                        
                                                        else{
                                                            
                                                            $('.play-icon').removeClass('fa-pause');
                                                            $('.play-icon').addClass('fa-play');
                                                            song.pause();
                                                            console.log('Song Paused');
                                                            }
            updateCurrentTime();
            setInterval(function(){
                                updateCurrentTime();
                                },1000);
            
}
            
//jQuery Code for validating user-name & Password and displaying welcome message
        
            $('.welcome-screen button').on('click', function(){
            
                var name = $('#name-input').val();
                var pass = $('#password-input').val();
            
                if(name.length > 2) {
                                       if(pass.length > 8)
                                       {
                                        var message = "Welcome, " +  name;
                                        
                                        //Displaying welcome message in the main class
                                        
                                        $('.main .user-name').text(message);
                                        $('.welcome-screen').addClass('hidden');
                                        $('.main').removeClass('hidden');
                                        setUpPlaylist();
                                       } 
                                   else{
                                            $('#password-input').addClass('error');
                                           alert('Enter Password with more than 8 Characters');
                                        }
                                  }
                 else{
                                            $('#name-input').addClass('error');
                                           alert('Enter Name with more than 2 Characters');
                    }
           });
        
        
//jQuery code to allow the user to log-out and go-back to the Welcome Screen
            
$('#logout').on('click',function(){

                $('.welcome-screen').removeClass('hidden');
                $('.main').addClass('hidden');


            });
                
//jQuery code to play and pause the song, when the user clicks on the Play button.
        
               $('.play-icon').on('click',function(){
                                                        togglesong();
                }); 
        
                
//Function to play or pause the song using spacebar and the P key.
function playsong(e)
{
      if((e.keyCode == 32)||(e.keyCode == 80))
      {
          togglesong();
      }
}
    