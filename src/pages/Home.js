import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { songdata } from "../components/songdata";

export default function Home() {
  let getUserMusic = JSON.parse(localStorage.getItem("song"));
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [mounted, setMounted] = useState(false);
  const music = document.getElementById("audio");
  let [currentlyPlaying, setCurrentlyPlaying] = useState(getUserMusic);
  const [isPlaying, setIsPlaying] = useState(false);
  const nextSong = () => {
    if (!isShuffle) {
      setCurrentlyPlaying(
        currentlyPlaying >= songdata.length - 1 ? 0 : currentlyPlaying + 1
      );
      localStorage.setItem(
        "song",
        currentlyPlaying >= songdata.length - 1 ? 0 : currentlyPlaying + 1
      );
    } else {
      let randomSong = Math.floor(Math.random() * songdata.length);
      if (randomSong === currentlyPlaying) {
        randomSong = Math.floor(Math.random() * songdata.length);
      }
      setCurrentlyPlaying(randomSong);
      localStorage.setItem("song", randomSong);
    }
  };
  const prevSong = () => {
    setCurrentlyPlaying(
      currentlyPlaying === 0 ? songdata.length - 1 : currentlyPlaying - 1
    );
    localStorage.setItem(
      "song",
      currentlyPlaying === 0 ? songdata.length - 1 : currentlyPlaying - 1
    );
  };
  useEffect(() => setMounted(true), []);
  return (
    <Container top="flex-1">
      <div className="flex flex-col items-center mx-auto">
        <audio
          src={songdata[currentlyPlaying].source}
          id="audio"
          onEnded={() => {
            if (isLooping) {
              music.currentTime = 0;
              music.play();
            }
          }}
          onTimeUpdate={() => {
            setCurrentTime(Math.floor(music.currentTime * 100));
            if (currentTime >= duration - 200 && !isLooping) {
              nextSong();
            }
          }}
          onLoadedData={() => {
            setDuration(Math.floor(music.duration * 100));
            if (!isPlaying) {
              music.pause();
            } else {
              music.play();
            }
          }}
        ></audio>
        {mounted && (
          <div className="border-4 flex flex-col items-center">
            <p>{songdata[currentlyPlaying].id} current id</p>
            <p>{songdata[currentlyPlaying].name} current id name</p>
            <div className="flex flex-row items-center justify-center">
              <span id="current-time">
                {Math.floor(currentTime / 60) || "-"}
              </span>
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                className="mx-5 w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700"
                onChange={(e) => {
                  music.currentTime = e.target.value / 100;
                }}
              />
              <span id="full-time"></span>
              <p>{Math.floor(duration / 60) || "-"}</p>
            </div>
            <div className="flex flex-row items-center justify-center">
              <button onClick={prevSong}>Previous Song</button>
              <button
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  if (isPlaying) {
                    music.pause();
                  } else {
                    music.play();
                  }
                }}
                className="mx-5"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button onClick={nextSong}>Next Song</button>
            </div>
            <div>
              <button
                onClick={() => {
                  setIsLooping(!isLooping);
                }}
                className="ml-10"
              >
                {isLooping ? "LoopTrue" : "LoopFalse"}
              </button>
              <button
                onClick={() => {
                  setIsShuffle(!isShuffle);
                }}
                className="ml-10"
              >
                {isShuffle ? "ShuffleTrue" : "ShuffleFalse"}
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
