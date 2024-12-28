import "./Card.css";

export default function Card({
  description,
  link,
  thumbnail,
  title,
  pubDate,
}: {
  description: string;
  link: string;
  thumbnail: string;
  title: string;
  pubDate: string;
}) {
  return (
    <div className="card">
      <div className="card__image">
        <img width="226" height="127" src={thumbnail} alt={title} />
      </div>
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
      </div>
    </div>
  );
}
