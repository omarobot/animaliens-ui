import React from "react";
import Content from "../../../../components/Coursecontent/content";
import KnowledgeTrending from "../../../../components/KnowledgeCards/trending";
import Video from "../../../../components/Video/video";

const Knowledge = () => {
  return (
    <div className="css-n1ozge">
      <Video />
      <Content />
      <KnowledgeTrending />
    </div>
  );
};

export default Knowledge;
