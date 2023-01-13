import React from "react";
import { Helmet } from "react-helmet";

export const Songcredit = ({ track, watchlink, download }) => {
  return (
    <div className="w-full flex justify-center flex-col items-center">
      <h1 className="border-t-2 pt-2">Track: {track}</h1>
      <p>Music provided by NoCopyrightSounds.</p>
      <p>
        Watch:{" "}
        <a
          href={watchlink}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline"
        >
          {watchlink}
        </a>
      </p>
      <p className="border-b-2 pb-2 mb-4">
        Free Download / Stream:{" "}
        <a
          href={download}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline"
        >
          {download}
        </a>
      </p>
    </div>
  );
};

function Credits() {
  return (
    <div className="flex justify-center items-center flex-col w-[54rem]">
      <Helmet>
        <title>Credits</title>
      </Helmet>
      <h1>Credits</h1>
      <Songcredit
        track="Aeden & Sketchez - Take It or Leave It [NCS Release]"
        watchlink="https://youtu.be/mkHOFbc0PKA"
        download="http://ncs.io/TakeItOrLeaveIt"
      ></Songcredit>
      <Songcredit
        track="Diviners X Riell - Slow [NCS Release]"
        watchlink="https://youtu.be/kPMLbSXM97U"
        download="http://ncs.io/Slow"
      ></Songcredit>
      <Songcredit
        track="Culture Code - Not Giving In [NCS Release]"
        watchlink="https://youtu.be/R_NsDmpu-Wc"
        download="http://ncs.io/NotGivingIn"
      ></Songcredit>
      <Songcredit
        track="ReauBeau - Wizkid feat. AVA NOVA [NCS Release]"
        watchlink="https://youtu.be/q6kzYPfhilg"
        download="http://ncs.io/WizKid"
      ></Songcredit>
      <Songcredit
        track="Unknown Brain - Superhero (feat. Chris Linton) [NCS Release]"
        watchlink="https://www.youtube.com/watch?v=LHvYrn3FAgI"
        download="http://ncs.io/superhero"
      ></Songcredit>
    </div>
  );
}

export default Credits;
