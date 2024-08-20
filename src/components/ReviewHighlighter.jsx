// src/components/ReviewHighlighter.jsx
import React from 'react';

const sentimentColors = {
  Positive: "#D9F2DD",
  Negative: "#F2DBD9",
  Mixed: "#e8bd6d3d",
  Neutral: "#eaf09b6b"
};

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<span key={i}>{i <= rating ? '★' : '☆'}</span>);
  }
  return stars;
};

const Tooltip = ({ children, topic }) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <span
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="tooltip-wrapper"
    >
      {children}
      {visible && (
        <span className="tooltip">
          {topic}
        </span>
      )}
    </span>
  );
};

const ReviewHighlighter = ({ review }) => {
  const renderHighlightedText = () => {
    const contentParts = [];
    let lastIndex = 0;

    review.analytics.forEach((analysis) => {
      analysis.highlight_indices.forEach(([start, end]) => {
        if (start > lastIndex) {
          contentParts.push(review.content.substring(lastIndex, start));
        }
        contentParts.push(
          <Tooltip key={start} topic={analysis.topic}>
            <span style={{
              backgroundColor: sentimentColors[analysis.sentiment],
              padding: "2px"
            }}>
              {review.content.substring(start, end)}
            </span>
          </Tooltip>
        );
        lastIndex = end;
      });
    });

    if (lastIndex < review.content.length) {
      contentParts.push(review.content.substring(lastIndex));
    }

    return contentParts;
  };

  return (
    <div className="review-container">
      <div className="review-header">
        <img src={review.source.image} alt={review.source.name} />
        <div>
          <h4>{review.reviewer_name} wrote a review at <strong>{review.source.name}</strong></h4>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="star-rating">{renderStars(review.rating_review_score)}</div>
            <p>{review.date}</p>
          </div>
        </div>
      </div>
      <p>{renderHighlightedText()}</p>
    </div>
  );
};

export default ReviewHighlighter;
