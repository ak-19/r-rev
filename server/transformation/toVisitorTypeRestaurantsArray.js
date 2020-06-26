const toVisitorTypeRestaurantsArray = (restaurants) => {
  return restaurants.map((restaurant) => {
    const { id, name, reviews } = restaurant;
    return {
      id,
      name,
      avg: calculateAverageRating(reviews),
    };
  });
};

const calculateAverageRating = (reviews) => {
  if (reviews) {
    let count = 0;
    let totalSum = 0;

    reviews.forEach((review) => {
      const { rating } = review;
      if (rating) {
        totalSum += parseInt(rating);
        count += 1;
      }
    });

    return count == 0 ? undefined : totalSum / count;
  }

  return undefined;
};

export { toVisitorTypeRestaurantsArray };
