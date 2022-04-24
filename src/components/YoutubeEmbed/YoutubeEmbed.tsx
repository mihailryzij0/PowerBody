import React from "react";

type props = { embedId: string };

export default function YoutubeEmbed({ embedId }: props) {
  return (
    <>
      {embedId != "" && embedId && (
        <div className="video-responsive">
          <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      )}
    </>
  );
}
