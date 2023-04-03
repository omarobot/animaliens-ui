import React from "react";
import Content from "../components/Coursecontent/content";
import KnowledgeTrending from "../components/KnowledgeCards/trending";
import Video from "../components/Video/video";
import { Box } from "@chakra-ui/react";
const Knowledge = () => {
  return (
    <main>
      <Box p={2} m={20}>
        <Video />
        <Content />
        <KnowledgeTrending />
      </Box>{" "}
    </main>
  );
};

export default Knowledge;
