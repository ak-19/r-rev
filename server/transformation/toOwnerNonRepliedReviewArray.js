const toOwnerNonRepliedReviewArray = (restaurants) => {
  const pendingReviews = [];

  restaurants.forEach((restaurant) => {
    restaurant.reviews.forEach((review) => {
      if (review.comment && !review.reply) {
        const { comment, reviewerId, name: reviewerName, visitDate } = review;
        const restaurantId = restaurant.id;
        const restaurantName = restaurant.name;
        pendingReviews.push({
          comment,
          restaurantId,
          restaurantName,
          reviewerId,
          reviewerName,
          visitDate,
        });
      }
    });
  });

  return pendingReviews;
};

export { toOwnerNonRepliedReviewArray };
