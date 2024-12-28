import { useState, useEffect } from "react";
import Card from "./Card";
import "./Card.css";

const urlMediumPosts =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@vanessamarely";

type Post = {
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  pubDate: string;
};

export default function CardList() {
  const [postsMedium, setPostsMedium] = useState<Post[]>([]);

  const getMediumPost = async () => {
    const response = await fetch(urlMediumPosts);
    console.log(response);
    const data = await response.json();
    console.log(data.items);
    setPostsMedium(data.items);
  };

  const getImage = (content: string) => {
    const regex = /<img[^>]+src="([^">]+)"/g;
    const found = content.match(regex);
    return found ? found[0].replace(/<img[^>]+src="/g, "").replace(/"/g, "") : "";
  }


  useEffect(() => {
    getMediumPost();
  }, []);

  return (
    <div className="link-card-grid">
      {postsMedium.map((post, index) => (
        <Card
          key={index}
          title={post.title}
          description={post.description}
          thumbnail={getImage(post.description)}
          link={post.link}
          pubDate={post.pubDate}
        />
      ))}
    </div>
  );
}
