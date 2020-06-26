const toOwnerTypeReviewArray = (restaurants) => {
  const reviews = [];

  restaurants.forEach((restaurant) => {
    const { name: restaurantName, ownerId, id: restaurantId } = restaurant;
    restaurant.reviews.forEach((review) => {
      reviews.push({ ...review, restaurantName, ownerId, restaurantId });
    });
  });

  return reviews;
};

export { toOwnerTypeReviewArray };
