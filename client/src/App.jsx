import React, { useState, useRef, useEffect } from "react";
import { CiPlay1 } from "react-icons/ci";
import { TbPlayerTrackNext } from "react-icons/tb";
import { FaFastBackward } from "react-icons/fa";
const songs = ["Contra", "HavestMoon", "Mario"];

function App() {
  const [index, setIndex] = useState(2);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    loadSong(songs[index]);
  }, [index]);

  const loadSong = (song) => {
    const audio = audioRef.current;
    audio.src = `music/${song}.mp3`;
    audio.load();
  };

  const playSong = () => {
    const audio = audioRef.current;
    audio.play();
    setIsPlaying(true);
  };

  const pauseSong = () => {
    const audio = audioRef.current;
    audio.pause();
    setIsPlaying(false);
  };

  const nextSong = () => {
    setIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const prevSong = () => {
    setIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-screen flex flex-col items-center justify-center">
      <h1 className="text-white mb-8 text-4xl">โปรแกรมเล่นเพลง (Music API)</h1>
      <div className="music-container bg-white rounded-lg p-6 flex items-center justify-between relative w-[350px]">
        <div className="img-container w-20 h-20 relative">
          <img
            src={`cover/${songs[index]}.jpg`}
            alt={`Cover for ${songs[index]}`}
            className="w-full h-full rounded-full object-cover animate-spin"
          />
        </div>
        <div className="music-info absolute top-0 left-20 opacity-0 transform -translate-y-full transition-transform ease-in duration-300 bg-white rounded-lg p-2">
          <h4 className="title">เพลง {songs[index]}.mp3</h4>
        </div>
        <audio ref={audioRef} src={`music/${songs[index]}.mp3`} hidden></audio>

        <div className="navigation flex items-center">
          <FaFastBackward
            onClick={prevSong}
            className="action-btn mr-[20px] ml-[20px]"
          >
            <i className="fas fa-backward text-2xl">back</i>
          </FaFastBackward>
          <button
            onClick={isPlaying ? pauseSong : playSong}
            className="action-btn "
          >
            <CiPlay1
              className={`fas ${isPlaying ? "fa-pause" : "fa-play"} text-2xl`}
            ></CiPlay1>
          </button>
          <button onClick={nextSong} className="action-btn ml-[20px]">
            <TbPlayerTrackNext className="fas fa-forward text-2xl"></TbPlayerTrackNext>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
