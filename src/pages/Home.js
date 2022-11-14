import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { songdata } from "../components/songdata";
import uselocalstorage from "use-local-storage";
import {
  Play,
  Pause,
  Repeat,
  SkipForward,
  SkipBack,
  Shuffle,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
} from "react-feather";

function Vol({ volume }) {
  if (volume > 0 && volume < 0.33) {
    return <Volume />;
  } else if (volume >= 0.33 && volume < 0.66) {
    return <Volume1 />;
  } else if (volume >= 0.66) {
    return <Volume2 />;
  } else {
    return <VolumeX />;
  }
}

export default function Home() {
  const [currentlyPlaying, setCurrentlyPlaying] = uselocalstorage("song", 0);
  const [volume, setVolume] = uselocalstorage("volume", 1);
  const [muted, setMuted] = uselocalstorage("muted", 0);

  const [isPlaying, setPlaying] = useState(false);
  const [isLooping, setLooping] = useState(false);
  const [isShuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [isMounted, setMounted] = useState(false);

  const music = document.getElementById("audio");

  const nextSong = () => {
    if (!isShuffle) {
      setCurrentlyPlaying(
        currentlyPlaying >= songdata.length - 1 ? 0 : currentlyPlaying + 1
      );
    } else {
      let randomSong = Math.floor(Math.random() * songdata.length);
      while (randomSong === currentlyPlaying) {
        randomSong = Math.floor(Math.random() * songdata.length);
      }
      setCurrentlyPlaying(randomSong);
    }
  };

  const prevSong = () => {
    if (currentTime <= duration * 0.1) {
      setCurrentlyPlaying(
        currentlyPlaying === 0 ? songdata.length - 1 : currentlyPlaying - 1
      );
    } else {
      music.currentTime = 0;
    }
  };

  useEffect(() => setMounted(true), []);

  return (
    <Container top="flex-1">
      <div className="mx-auto my-auto flex flex-col items-center">
        <audio
          src={songdata[currentlyPlaying].source}
          id="audio"
          muted={muted}
          onEnded={() => {
            if (isLooping) {
              music.currentTime = 0;
              music.play();
            } else {
              nextSong();
            }
          }}
          onTimeUpdate={() => {
            setCurrentTime(Math.floor(music.currentTime * 100));
          }}
          onLoadedData={() => {
            setDuration(Math.floor(music.duration * 100));
            if (!isPlaying) {
              music.pause();
            } else {
              music.play();
            }
          }}
          onVolumeChange={() => {
            if (muted) {
              setVolume(0);
            } else {
              setVolume(music.volume);
            }

            console.log(music.volume);
          }}
          onPlay={() => {
            music.volume = volume;
          }}
        />

        {(isMounted && (
          <div className="flex w-full flex-col items-center space-y-4 rounded-md border-4 border-slate-700 p-8 ">
            <p>
              Playing {parseInt(songdata[currentlyPlaying].id) + 1} of{" "}
              {songdata.length}
            </p>

            <p>{songdata[currentlyPlaying].name}</p>

            <div className="flex flex-col justify-center w-full">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                className="range-lg h-4 w-full cursor-pointer appearance-none rounded-xl bg-gray-700"
                onChange={(e) => {
                  music.currentTime = e.target.value / 100;
                }}
              />

              <div className="flex flex-row items-center justify-between mt-2">
                <span id="current-time" className="whitespace-nowrap">
                  {/* Current Time Minutes */}
                  {currentTime / 6000 < 1
                    ? "00"
                    : `0${Math.floor(currentTime / 6000)}`}
                  :{/* Current Time Seconds */}
                  {(currentTime / 100) % 60 < 10
                    ? `0${Math.floor((currentTime / 100) % 60)}`
                    : Math.floor((currentTime / 100) % 60) || "00"}
                </span>
                <span id="full-time" className="whitespace-nowrap">
                  {/* Duration Time Minutes */}
                  {duration / 6000 < 1
                    ? "00"
                    : `0${Math.floor(duration / 6000)}`}
                  :{/* Duration Time Seconds */}
                  {(duration / 100) % 60 < 10
                    ? `0${Math.floor((duration / 100) % 60)}`
                    : Math.floor((duration / 100) % 60) || "00"}
                </span>
              </div>
            </div>

            <div className="flex flex-row items-center justify-center">
              <button
                onClick={() => {
                  setLooping(!isLooping);
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
                  setPlaying(!isPlaying);
                  if (isPlaying) {
                    music.pause();
                  } else {
                    music.play();
                  }
                }}
                className="mx-4 rounded-full bg-emerald-600 p-4"
              >
                {isPlaying ? <Pause /> : <Play className="m" />}
              </button>

              <button onClick={nextSong} className="mr-4">
                <SkipForward />
              </button>

              <button
                onClick={() => {
                  setShuffle(!isShuffle);
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

            <div className="flex flex-row items-center space-x-2">
              <button
                onClick={() => {
                  if (muted) {
                    setVolume(muted);
                    setMuted(0);
                  } else {
                    setMuted(volume);
                    setVolume(0);
                  }
                }}
              >
                {Vol({ volume })}
              </button>
              <input
                type="range"
                min={0}
                max={1000}
                value={volume * 1000}
                className="range-lg h-4 w-full cursor-pointer appearance-none rounded-xl bg-gray-700"
                onChange={(e) => {
                  music.volume = e.target.value / 1000;
                }}
              />
            </div>
          </div>
        )) || <p>Loading...</p>}
      </div>
    </Container>
  );
}
