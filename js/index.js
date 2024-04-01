const player = document.querySelector('.player')
const playBtn = document.querySelector('.play')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')

const audio = document.querySelector('.audio')
const progressContainer = document.querySelector('.progress__container')
const progressBar = document.querySelector('.progress')

const title = document.querySelector('.song')
const cover = document.querySelector('.cover__img')

//нАЗВАНИЕ ПЕСЕН
const songs = ['GALAXY Parasyte_The Maxim','NEXT TO YOU -by KEN ARAI','Parasyte OST - Next To You']

//песня по умолчанию
let songIndex = 0


//Init
function loadSong(song){
  title.innerText = song
  audio.src = `/audio/${song}.mp3`
  cover.src = `/img/music-${songIndex + 1}.jpg`
}

loadSong(songs[songIndex])

//play
function playSong (){
  audio.play()
  player.classList.add('play')
  cover.classList.add('play')
  playBtn.innerText = 'Stop'
}

//pause
function pauseSong (){
  player.classList.remove('play')
  audio.pause()
  cover.classList.remove('play')
  playBtn.innerText = 'Play'
}

playBtn.addEventListener('click',()=>{
  const isPlaying = player.classList.contains('play')
  isPlaying ? pauseSong() : playSong()
}
)

//next
nextBtn.addEventListener('click',nextSong)
function nextSong(){
  songIndex++
  if(songIndex > songs.length - 1){
    songIndex = 0
  }
  loadSong(songs[songIndex])
  playSong()
}

//prev
prevBtn.addEventListener('click',prewSong)
function prewSong(){
  songIndex--
  if(songIndex < 0){
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  playSong()
}

//prgress bar
function updateProgress(e){
 const {duration,currentTime} = e.srcElement
 const progressPercent = (currentTime / duration )* 100
 progressBar.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate',updateProgress)

//set progress
function setProgress(e){
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click',setProgress)


//autoplay
audio.addEventListener('ended',nextSong)
