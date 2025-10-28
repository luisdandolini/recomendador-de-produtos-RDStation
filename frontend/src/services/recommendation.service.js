// getRecommendations.js

const calculateProductScore = (
  product,
  selectedPreferences,
  selectedFeatures
) => {
  let score = 0;

  selectedPreferences.forEach((userPreference) => {
    if (product.preferences.includes(userPreference)) {
      score += 1;
    }
  });

  selectedFeatures.forEach((userFeature) => {
    if (product.features.includes(userFeature)) {
      score += 1;
    }
  });

  return score;
};

const getRecommendations = (formData, products) => {
  /**
   * Crie aqui a lógica para retornar os produtos recomendados.
   */

  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType,
  } = formData;

  if (!products || products.length === 0) {
    return selectedRecommendationType === "SingleProduct" ? null : [];
  }

  const productsWithScore = products.map((product) => ({
    ...product,
    score: calculateProductScore(
      product,
      selectedPreferences,
      selectedFeatures
    ),
  }));

  const validProducts = productsWithScore.filter(
    (product) => product.score > 0
  );

  if (validProducts.length === 0) {
    return selectedRecommendationType === "SingleProduct" ? null : [];
  }

  const sortedProducts = validProducts.sort((a, b) => b.score - a.score);

  if (selectedRecommendationType === "SingleProduct") {
    const maxScore = sortedProducts[0].score;

    const topProducts = sortedProducts.filter(
      (product) => product.score === maxScore
    );

    return topProducts[topProducts.length - 1];
  }

  return sortedProducts;
};

const recommendationService = {
  getRecommendations,
};

export default recommendationService;
