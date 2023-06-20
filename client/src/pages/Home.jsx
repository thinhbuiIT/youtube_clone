import axios from "axios";
import styled from "styled-components";
import Card from "../components/Card";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/${type}`);
      setVideos(res.data)
    }
    fetchVideos()
  }, [type])
  return (
    <Container>
      {videos.map((video) => (
        <Card key={videos._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
