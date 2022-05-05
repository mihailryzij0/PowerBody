import React from "react";

type props = { linkYouTubeVideo: string | null };

export default function YoutubeEmbed({
  linkYouTubeVideo: linkYouTubeVideo,
}: props) {
  const embedId = linkYouTubeVideo?.split("=").pop();
  return (
    <>
      {embedId != "" && embedId && (
        <div className="video-responsive">
          <iframe
            data-testid={"youtubeEmbed"}
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
