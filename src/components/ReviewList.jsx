// src/components/ReviewList.jsx
import React from 'react';
import ReviewHighlighter from './ReviewHighlighter';

const ReviewList = () => {
  const [reviewsData, setReviewsData] = React.useState([]);

  React.useEffect(() => {
    const jsonUrl = 'https://gist.githubusercontent.com/noobtdbs/8df652dc6966482ac6277cd6b4ee762f/raw/ae68e5a0b9a4077eb1e6db292620422620a74be6/test.json';

    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => setReviewsData(data))
      .catch(error => console.error('Error fetching the data:', error));
  }, []);

  return (
    <div>
      {reviewsData.map((review, index) => (
        <ReviewHighlighter key={index} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
