import { useState } from "react";
import {
  HiOutlineViewGrid,
  HiOutlineLightningBolt,
  HiOutlineSearch,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import Form from "./components/Form/Form";
import RecommendationList from "./components/RecommendationList/RecommendationList";

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleRecommendationsUpdate = (
    newRecommendations,
    shouldSetSearched = true
  ) => {
    setRecommendations(newRecommendations);
    if (shouldSetSearched) {
      setHasSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-8 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <HiOutlineViewGrid className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white">
              Recomendador de Produtos
            </h1>
          </div>
          <p className="text-center text-blue-100 text-lg">
            RD Station - Encontre a solução perfeita para o seu negócio
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <HiOutlineLightningBolt className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Como funciona?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Selecione suas{" "}
                <span className="font-semibold text-blue-600">
                  preferências
                </span>{" "}
                e{" "}
                <span className="font-semibold text-indigo-600">
                  funcionalidades
                </span>{" "}
                desejadas no formulário ao lado. Nosso algoritmo inteligente irá
                analisar e recomendar os produtos da RD Station que melhor se
                adequam às necessidades do seu negócio.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Configure suas preferências
              </h3>
            </div>
            <Form
              onRecommendationsUpdate={(recs, shouldSetSearched = true) =>
                handleRecommendationsUpdate(recs, shouldSetSearched)
              }
              onResetSearch={() => {
                setHasSearched(false);
                setRecommendations([]);
              }}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Suas recomendações
              </h3>
            </div>

            {!hasSearched && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-gray-200 min-h-[400px] flex items-center justify-center">
                <div>
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiOutlineSearch className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg mb-2">
                    Aguardando suas seleções...
                  </p>
                  <p className="text-gray-400 text-sm">
                    Preencha o formulário e clique em "Obter recomendação"
                  </p>
                </div>
              </div>
            )}

            {hasSearched && recommendations.length > 0 && (
              <div className="animate-fadeIn">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2">
                    <HiOutlineCheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 font-medium">
                      {recommendations.length === 1
                        ? "Encontramos o produto ideal para você!"
                        : `Encontramos ${recommendations.length} produtos recomendados!`}
                    </p>
                  </div>
                </div>
                <RecommendationList recommendations={recommendations} />
              </div>
            )}

            {hasSearched && recommendations.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-amber-200 min-h-[400px] flex items-center justify-center animate-fadeIn">
                <div>
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiOutlineExclamationCircle className="w-10 h-10 text-amber-600" />
                  </div>
                  <p className="text-gray-800 font-semibold text-lg mb-2">
                    Nenhum produto encontrado
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Tente ajustar suas preferências ou funcionalidades
                  </p>
                  <button
                    onClick={() => setHasSearched(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm underline"
                  >
                    Limpar busca
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            Processo seletivo RD Station - Desenvolvido por Luís Fernando
            Dandolini Duarte
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
