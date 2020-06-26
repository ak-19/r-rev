const toVisitorTypeRestaurant = (restaurant) => {
  const { _id, name, reviews } = restaurant;
  return {
    id: _id.toString(),
    name,
    ...calculateAverageRating(reviews),
    reviews,
  };
};

const calculateAverageRating = (reviews) => {
  let min = undefined;
  let max = undefined;
  let avg = undefined;

  if (reviews) {
    let count = 0;
    let totalSum = 0;
    reviews.forEach((review) => {
      const { rating } = review;
      if (rating) {
        min = min ? Math.min(min, rating) : rating;
        max = max ? Math.max(max, rating) : rating;
        totalSum += parseInt(rating || 0);
        count += 1;
      }
    });
    avg = count == 0 ? undefined : totalSum / count;
  }

  return { avg, min, max };
};

export { toVisitorTypeRestaurant };
