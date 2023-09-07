import withAuth from "@/components/hoc/withAuth";
import Media from "@/components/media/Media";
import React from "react";

const MediaGallery = () => {
  return <Media />;
};

export default withAuth(MediaGallery);
