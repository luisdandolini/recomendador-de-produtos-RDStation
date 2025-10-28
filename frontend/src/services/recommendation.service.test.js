import recommendationService from "./recommendation.service";
import mockProducts from "../mocks/mockProducts";

describe("recommendationService", () => {
  test("Retorna recomendação correta para SingleProduct com base nas preferências selecionadas", () => {
    const formData = {
      selectedPreferences: ["Integração com chatbots"],
      selectedFeatures: ["Chat ao vivo e mensagens automatizadas"],
      selectedRecommendationType: "SingleProduct",
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe("RD Conversas");
  });

  test("Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas", () => {
    const formData = {
      selectedPreferences: [
        "Integração fácil com ferramentas de e-mail",
        "Personalização de funis de vendas",
        "Automação de marketing",
      ],
      selectedFeatures: [
        "Rastreamento de interações com clientes",
        "Rastreamento de comportamento do usuário",
      ],
      selectedRecommendationType: "MultipleProducts",
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      "RD Station CRM",
      "RD Station Marketing",
    ]);
  });

  test("Retorna apenas um produto para SingleProduct com mais de um produto de match", () => {
    const formData = {
      selectedPreferences: [
        "Integração fácil com ferramentas de e-mail",
        "Automação de marketing",
      ],
      selectedFeatures: [
        "Rastreamento de interações com clientes",
        "Rastreamento de comportamento do usuário",
      ],
      selectedRecommendationType: "SingleProduct",
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe("RD Station Marketing");
  });

  test("Retorna o último match em caso de empate para SingleProduct", () => {
    const formData = {
      selectedPreferences: [
        "Automação de marketing",
        "Integração com chatbots",
      ],
      selectedRecommendationType: "SingleProduct",
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe("RD Conversas");
  });

  test("Retorna array vazio quando nenhuma preferência ou funcionalidade é selecionada", () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: "MultipleProducts",
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toEqual([]);
  });

  test("Retorna array vazio quando produtos array está vazio", () => {
    const formData = {
      selectedPreferences: ["Automação de marketing"],
      selectedFeatures: ["Chat ao vivo"],
      selectedRecommendationType: "MultipleProducts",
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      []
    );

    expect(recommendations).toEqual([]);
  });

  test("Retorna array vazio quando nenhum produto faz match", () => {
    const formData = {
      selectedPreferences: ["Preferência inexistente"],
      selectedFeatures: ["Funcionalidade inexistente"],
      selectedRecommendationType: "MultipleProducts",
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toEqual([]);
  });

  test("Ordena produtos por pontuação decrescente em MultipleProducts", () => {
    const formData = {
      selectedPreferences: [
        "Integração fácil com ferramentas de e-mail",
        "Personalização de funis de vendas",
        "Automação de marketing",
      ],
      selectedFeatures: [
        "Gestão de leads e oportunidades",
        "Criação e gestão de campanhas de e-mail",
      ],
      selectedRecommendationType: "MultipleProducts",
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    for (let index = 0; index < recommendations.length - 1; index++) {
      expect(recommendations[index].score).toBeGreaterThanOrEqual(
        recommendations[index + 1].score
      );
    }
  });
});
