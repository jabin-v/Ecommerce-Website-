import React from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/footer";
import Header from "../../components/header";
import ReviewCard from "../../components/review/ReviewCard";
import { selectAllReviews } from "../../features/review/reviewSlice";
import "./style.css";

const ReviewsAll = () => {
  const reviews = useSelector(selectAllReviews);


  return (
    <div>
      <Header />
      <div className="container reviewContainer">
        {reviews.reverse().map((review) => (
          <ReviewCard
            key={review.id}
            review={review.review}
            user={review.user?.username}
            rating={review.rating}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ReviewsAll;
