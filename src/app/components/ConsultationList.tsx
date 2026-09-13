import { consultations } from "../data/site";

export default function ConsultationList() {
  return (
    <div className="consultation-list">
      {consultations.map((item) => (
        <article className="consultation-row" key={item.number}>
          <span className="row-number">/{item.number}</span>
          <h3>{item.title}</h3>
          <div>
            <p>{item.description}</p>
            <span className="topic-list">{item.topics}</span>
          </div>
          <span className="row-arrow" aria-hidden="true">
            ↗
          </span>
        </article>
      ))}
    </div>
  );
}
