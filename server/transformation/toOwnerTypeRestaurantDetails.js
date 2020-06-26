const toOwnerTypeRestaurantDetails = (restaurant) => {
  const { id, name, reviews } = restaurant;
  const { avg, min, max } = calculateRatings(reviews);
  return { id, name, avg, min, max, reviews };
};

const calculateRatings = (reviews) => {
  let count = 0;
  let totalSum = 0;
  let min = undefined;
  let max = 0;
  reviews.forEach((review) => {
    const { rating } = review;
    if (rating) {
      min = Math.min(min || rating, rating);
      max = Math.max(max, rating);
      totalSum += parseInt(rating);
      count += 1;
    }
  });
  const avg = count == 0 ? undefined : totalSum / count;
  return { avg, min, max };
};

export { toOwnerTypeRestaurantDetails };
