import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { songdata } from "../components/songdata";
import {
  Play,
  Pause,
  Repeat,
  SkipForward,
  SkipBack,
  Shuffle,
} from "react-feather";

// Goals:
// - Style the player
// - Add viewable playlist
// - Add animations
// - Add way more songs
// - Link background color to color of image
// - Music API?

// Bugs:
// - When you click next song, it skips ahead by 2 songs instead of 1
// - Will it work on deployment?

export default function Home() {
  // Getting last song listented to by User
  let getUserMusic = JSON.parse(localStorage.getItem("song"));
  // Setting up Looping usestate
  const [isLooping, setIsLooping] = useState(false);
  // Setting up Shuffling usestate
  const [isShuffle, setIsShuffle] = useState(false);
  // Finding duration of current song
  const [duration, setDuration] = useState(0);
  // Timestamp of current song
  const [currentTime, setCurrentTime] = useState(0);
  // Using mounted to give useEffect a way to know if it is mounted
  const [mounted, setMounted] = useState(false);
  // Getting element audio
  const music = document.getElementById("audio");
  // Getting current song
  let [currentlyPlaying, setCurrentlyPlaying] = useState(getUserMusic);
  // Checking if song is playing
  const [isPlaying, setIsPlaying] = useState(false);
  const nextSong = () => {
    // Going to next song given shuffling is false
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
      while (randomSong === currentlyPlaying) {
        randomSong = Math.floor(Math.random() * songdata.length);
      }
      setCurrentlyPlaying(randomSong);
      localStorage.setItem("song", randomSong);
    }
  };
  const prevSong = () => {
    if (currentTime <= duration * 0.1) {
      setCurrentlyPlaying(
        currentlyPlaying === 0 ? songdata.length - 1 : currentlyPlaying - 1
      );
      localStorage.setItem(
        "song",
        currentlyPlaying === 0 ? songdata.length - 1 : currentlyPlaying - 1
      );
    } else {
      music.currentTime = 0;
    }
  };
  useEffect(() => setMounted(true), []);
  return (
    <Container top="flex-1">
      <div className="flex flex-col items-center text-xl justify-center font-semibold font-sans w-[350px] mx-auto h-[400px] border-4 rounded-xl">
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
          <div className="flex flex-col items-center min-w-[300px]">
            <div className="flex flex-col items-center">
              <p>
                Playing {parseInt(songdata[currentlyPlaying].id) + 1} of{" "}
                {songdata.length}
              </p>
              <p>{songdata[currentlyPlaying].name} </p>
            </div>
            <div className="flex flex-row items-center justify-center w-full my-2">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                className="mx-5 w-[200px] h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700"
                onChange={(e) => {
                  music.currentTime = e.target.value / 100;
                }}
              />
              <span id="full-time"></span>
            </div>
            <div className="flex flex-row justify-between min-w-[200px] mb-4">
              <span id="current-time" className="">
                {/* Minutes for currentTime */}
                {(currentTime / 100 / 60 < 1
                  ? "00"
                  : `0${Math.floor(currentTime / 6000)}`) || "00"}{" "}
                : {/* Seconds for currentTime */}
                {((currentTime / 100) % 60 < 10
                  ? `0${Math.floor(currentTime / 100) % 60}`
                  : Math.floor(currentTime / 100) % 60) || "00"}
              </span>
              <p>
                {/* Minutes for duration */}
                {(duration / 100 / 60 < 1
                  ? "00"
                  : `0${Math.floor(duration / 6000)}`) || "00"}{" "}
                : {/* Seconds for duration */}
                {((duration / 100) % 60 < 10
                  ? `0${Math.floor(duration / 100) % 60}`
                  : Math.floor(duration / 100) % 60) || "00"}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center w-full">
              <button
                onClick={() => {
                  setIsLooping(!isLooping);
                }}
                className=""
              >
                {isLooping ? <Repeat className="text-blue-500" /> : <Repeat />}
              </button>
              <button onClick={prevSong} className="ml-4">
                <SkipBack />
              </button>
              <button
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  if (isPlaying) {
                    music.pause();
                  } else {
                    music.play();
                  }
                }}
                className="mx-4"
              >
                {isPlaying ? <Pause /> : <Play />}
              </button>
              <button onClick={nextSong} className="mr-4">
                <SkipForward />
              </button>
              <button
                onClick={() => {
                  setIsShuffle(!isShuffle);
                }}
                className=""
              >
                {isShuffle ? (
                  <Shuffle className="text-blue-500" />
                ) : (
                  <Shuffle />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
