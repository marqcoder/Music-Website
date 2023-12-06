const music = new Audio("audio1/1.mp3");
// const mus = new Audio("audio1/n1.mp3");

// music.play();

const songs = [
  {
    id: "1",
    songName: ` HK Beats  <br />
  <div class="subtitle"></div>`,
    poster: "img/1.jpg",
  },
  {
    id: "2",
    songName: ` Romantic <br />
  <div class="subtitle"></div>`,
    poster: "img/2.jpg",
  },
  {
    id: "3",
    songName: `Drops Sound <br />
  <div class="subtitle"></div>`,
    poster: "img/3.jpg",
  },
  {
    id: "4",
    songName: `  Beats Beats Boom <br />
  <div class="subtitle"></div>`,
    poster: "img/4.jpg",
  },
  {
    id: "5",
    songName: ` GLitch ... <br />
  <div class="subtitle"></div>`,
    poster: "img/5.jpg",
  },
  {
    id: "6",
    songName: `  Africa Rhythm sport <br />
  <div class="subtitle"></div>`,
    poster: "img/6.jpg",
  },
  {
    id: "7",
    songName: ` Rhythm between Beats <br />
  <div class="subtitle"></div>`,
    poster: "img/7.jpg",
  },
  {
    id: "8",
    songName: `  Funky street  <br />
  <div class="subtitle"></div>`,
    poster: "img/8.jpg",
  },
  {
    id: "9",
    songName: ` Intense strong <br />
  <div class="subtitle"></div>`,
    poster: "img/9.jpg",
  },
  {
    id: "10",
    songName: ` Stick Drum Beats <br />
  <div class="subtitle"></div>`,
    poster: "img/10.jpg",
  },
  {
    id: "11",
    songName: ` Blaster Box  <br />
  <div class="subtitle"></div>`,
    poster: "img/11.jpg",
  },
];

// search data start

let search_results = document.getElementsByClassName("search_results")[0];
songs.forEach((element) => {
  const { id, songName, poster } = element;

  let card = document.createElement("a");
  card.classList.add("card");
  card.href = "#" + id;

  card.innerHTML = `
  <img src="${poster}" alt="">
  <div class="content">
    ${songName}
  </div>`;

  search_results.appendChild(card);
});

let input = document.getElementsByTagName("input")[0];
input.addEventListener("keyup", () => {
  let input_value = input.value.toUpperCase();
  let items = search_results.getElementsByTagName("a");

  for (let index = 0; index < items.length; index++) {
    let as = items[index].getElementsByClassName("content")[0];
    let text_value = as.textContent || as.innerHTML;

    if (text_value.toUpperCase().indexOf(input_value) > -1) {
      items[index].style.display = "flex";
    } else {
      items[index].style.display = "none";
    }
    if (input.value == 0) {
      search_results.style.display = "none";
    } else {
      search_results.style.display = "";
    }
  }
});
//  search data End

let masterPlay = document.getElementById("masterPlay");
let wave = document.getElementById("wave");

masterPlay.addEventListener("click", () => {
  if (music.paused || music.currentTime <= 0) {
    music.play();
    wave.classList.remove("active1");
    masterPlay.classList.remove("bi-play-circle");
    masterPlay.classList.add("bi-pause-circle");
  } else {
    music.pause();
    wave.classList.add("active1");
    masterPlay.classList.add("bi-play-circle");
    masterPlay.classList.remove("bi-pause-circle");
  }
});

const makeAllplays = () => {
  Array.from(document.getElementsByClassName("playListPlay ")).forEach((el) => {
    el.classList.add("bi-play-circle");
    el.classList.remove("bi-pause-circle");
  });
};

const makeAllBackground = () => {
  Array.from(document.getElementsByClassName("songItem")).forEach((el) => {
    el.style.background = "rgb(105, 105, 105, .0)";
  });
};

let index = 0;
let poster_master_play = document.getElementById("poster_master_play");
let title = document.getElementById("title");
Array.from(document.getElementsByClassName("playListPlay")).forEach((e) => {
  e.addEventListener("click", (el) => {
    index = el.target.id;
    // console.log(index);
    music.src = `audio1/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    masterPlay.classList.add("bi-play-circle");
    masterPlay.classList.remove("bi-pause-circle");

    let songTitles = songs.filter((els) => {
      return els.id == index;
    });
    songTitles.forEach((elss) => {
      let { songName } = elss;
      title.innerHTML = songName;
    });

    makeAllBackground();
    Array.from(document.getElementsByClassName("songItem"))[
      index - 1
    ].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove("bi-play-circle");
    el.target.classList.add("bi-pause-circle");
    wave.classList.add("active1");
  });
});

let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

music.addEventListener("timeupdate", () => {
  let music_curr = music.currentTime;
  let music_dur = music.duration;
  // console.log(music_dur);

  let min1 = Math.floor(music_dur / 60);
  let sec1 = Math.floor(music_dur % 60);
  // console.log(min1);

  if (sec1 < 10) {
    sec1 = `0${sec1}`;
  }

  currentEnd.innerText = `${min1}:${sec1}`;

  let min2 = Math.floor(music_curr / 60);
  let sec2 = Math.floor(music_curr % 60);

  if (sec2 < 10) {
    sec2 = `0${sec2}`;
  }

  currentStart.innerText = `${min2}:${sec2}`;

  let progressBar = parseInt((music_curr / music_dur) * 100);
  seek.value = progressBar;

  let seekbar = seek.value;
  bar2.style.width = `${seekbar}%`;
  dot.style.left = `${seekbar}%`;
});

seek.addEventListener("change", () => {
  music.currentTime = (seek.value * music.duration) / 100;
});

let vol_icon = document.getElementById("vol_icon");
let vol = document.getElementById("vol");
let vol_bar = document.getElementsByClassName("vol_bar")[0];
let vol_dot = document.getElementById("vol_dot");

vol.addEventListener("change", () => {
  if (vol.value == 0) {
    vol_icon.classList.remove("bi-volume-up-fill");
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.add("bi-volume-mute-fill");
  }

  if (vol.value > 0) {
    vol_icon.classList.remove("bi-volume-up-fill");
    vol_icon.classList.add("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-mute-fill");
  }
  if (vol.value > 50) {
    vol_icon.classList.add("bi-volume-up-fill");
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-mute-fill");
  }

  let vol_a = vol.value;
  vol_bar.style.width = `${vol_a}%`;
  vol_dot.style.left = `${vol_a}%`;
  music.volume = vol_a / 100;
});

let back = document.getElementById("back");
let next = document.getElementById("next");

back.addEventListener("click", () => {
  index -= 1;

  if (index < 1) {
    index = Array.from(document.getElementsByClassName("songItem")).length;
  }
  music.src = `audio1/${index}.mp3`;
  poster_master_play.src = `img/${index}.jpg`;
  music.play();
  masterPlay.classList.add("bi-play-circle");
  masterPlay.classList.remove("bi-pause-circle");

  let songTitles = songs.filter((els) => {
    return els.id == index;
  });
  songTitles.forEach((elss) => {
    let { songName } = elss;
    title.innerHTML = songName;
  });

  makeAllBackground();
  Array.from(document.getElementsByClassName("songItem"))[
    index - 1
  ].style.background = "rgb(105, 105, 105, .1)";
  makeAllplays();
  el.target.classList.remove("bi-play-circle");
  el.target.classList.add("bi-pause-circle");
  wave.classList.add("active1");
});

next.addEventListener("click", () => {
  index++;

  if (index > Array.from(document.getElementsByClassName("songItem")).length) {
    index = 1;
  }
  music.src = `audio1/${index}.mp3`;
  poster_master_play.src = `img/${index}.jpg`;
  music.play();
  masterPlay.classList.add("bi-play-circle");
  masterPlay.classList.remove("bi-pause-circle");

  let songTitles = songs.filter((els) => {
    return els.id == index;
  });
  songTitles.forEach((elss) => {
    let { songName } = elss;
    title.innerHTML = songName;
  });

  makeAllBackground();
  Array.from(document.getElementsByClassName("songItem"))[
    index - 1
  ].style.background = "rgb(105, 105, 105, .1)";
  makeAllplays();
  el.target.classList.remove("bi-play-circle");
  el.target.classList.add("bi-pause-circle");
  wave.classList.add("active1");
});

let song1_left = document.getElementById("song1_left");
let song1_right = document.getElementById("song1_right");
let song1 = document.getElementsByClassName("song1")[0];

song1_right.addEventListener("click", () => {
  song1.scrollLeft += 250;
});

song1_left.addEventListener("click", () => {
  song1.scrollLeft -= 250;
});

Array.from(document.getElementsByClassName("songItem")).forEach((e, i) => {
  e.getElementsByTagName("img")[0].src = songs[i].poster;
  e.getElementsByTagName("h5")[0].innerHTML = songs[i].songName;
});
