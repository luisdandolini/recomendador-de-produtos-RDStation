import { useState } from "react";
import {
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineAdjustments,
  HiOutlineXCircle,
} from "react-icons/hi";
import { Preferences, Features, RecommendationType } from "./Fields";
import { SubmitButton } from "./SubmitButton";
import useProducts from "../../hooks/useProducts";
import useForm from "../../hooks/useForm";
import useRecommendations from "../../hooks/useRecommendations";

function Form({ onRecommendationsUpdate, onResetSearch }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange, resetForm } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: "",
  });

  const { getRecommendations } = useRecommendations(products);
  const [isLoading, setIsLoading] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const hasSelections =
    formData.selectedPreferences.length > 0 ||
    formData.selectedFeatures.length > 0;

  const hasRecommendationType = formData.selectedRecommendationType !== "";
  const isFormValid = hasSelections && hasRecommendationType;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setShowValidation(true);
      return;
    }

    setIsLoading(true);
    setShowValidation(false);

    setTimeout(() => {
      const dataRecommendations = getRecommendations(formData);

      if (onRecommendationsUpdate) {
        onRecommendationsUpdate(dataRecommendations || []);
      }

      setIsLoading(false);
    }, 400);
  };

  const handleResetForm = () => {
    resetForm();
    setShowValidation(false);

    if (onResetSearch) {
      onResetSearch();
    }
  };

  return (
    <form
      className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-sm font-medium text-gray-600">
            Suas seleções
          </span>
        </div>
        <div className="flex gap-2">
          {formData.selectedPreferences.length > 0 && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              {formData.selectedPreferences.length} preferência
              {formData.selectedPreferences.length > 1 ? "s" : ""}
            </span>
          )}
          {formData.selectedFeatures.length > 0 && (
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
              {formData.selectedFeatures.length} funcionalidade
              {formData.selectedFeatures.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <HiOutlineHeart className="w-5 h-5 text-blue-600" />
          <label className="text-sm font-semibold text-gray-700">
            Preferências
          </label>
        </div>
        <Preferences
          preferences={preferences}
          selectedPreferences={formData.selectedPreferences}
          onPreferenceChange={(selected) => {
            handleChange("selectedPreferences", selected);
            setShowValidation(false);
          }}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <HiOutlineShieldCheck className="w-5 h-5 text-indigo-600" />
          <label className="text-sm font-semibold text-gray-700">
            Funcionalidades
          </label>
        </div>
        <Features
          features={features}
          selectedFeatures={formData.selectedFeatures}
          onFeatureChange={(selected) => {
            handleChange("selectedFeatures", selected);
            setShowValidation(false);
          }}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <HiOutlineAdjustments className="w-5 h-5 text-purple-600" />
          <label className="text-sm font-semibold text-gray-700">
            Tipo de Recomendação
          </label>
        </div>
        <RecommendationType
          selectedType={formData.selectedRecommendationType}
          onRecommendationTypeChange={(selected) => {
            handleChange("selectedRecommendationType", selected);
            setShowValidation(false);
          }}
        />
      </div>

      {showValidation && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg animate-fadeIn">
          <div className="flex items-start gap-3">
            <HiOutlineXCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800 mb-1">
                Ops! Algo está faltando:
              </p>
              <ul className="text-sm text-red-700 space-y-1">
                {!hasSelections && (
                  <li>
                    Selecione pelo menos uma preferência ou funcionalidade
                  </li>
                )}
                {!hasRecommendationType && (
                  <li>Escolha o tipo de recomendação desejado</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-2">
        <button
          type="button"
          onClick={handleResetForm}
          className="text-sm text-gray-500 underline hover:text-gray-700"
        >
          Limpar seleções
        </button>

        <SubmitButton
          text={isLoading ? "Processando..." : "Obter Recomendação"}
          disabled={isLoading}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
}

export default Form;
