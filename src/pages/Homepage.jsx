import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";

// Mock data for game packages with translation keys
const mockPackages = [
  {
    id: 1,
    type: "basic",
    price: 5,
    features: ["credits", "support", "validity"],
  },
  {
    id: 2,
    type: "standard",
    price: 10,
    features: ["credits", "support", "validity"],
  },
  {
    id: 3,
    type: "premium",
    price: 20,
    features: ["credits", "support", "validity"],
  },
];

const Homepage = () => {
  const { currentUser, userData } = useAuth();
  const { t } = useTranslation();
  const [packages, setPackages] = useState(mockPackages);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Replace with actual WooCommerce API integration
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        // const response = await fetch('/wp-json/wc/v3/products');
        // const data = await response.json();
        // setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{t("home.welcome")}</h1>
            <p className="text-xl mb-8">{t("home.featured")}</p>
            {currentUser && (
              <p className="text-lg">
                {t("home.welcome")}, {userData?.username || "Gamer"}!{" "}
                {t("home.browseAll")}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {t("home.categories")}
          </h2>

          {isLoading ? (
            <div className="text-center">{t("common.loading")}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t(`packages.${pkg.type}.name`)}
                    </h3>
                    <p className="text-3xl font-bold text-blue-600 mb-4">
                      ${pkg.price}
                    </p>
                    <p className="text-gray-600 mb-6">
                      {t(`packages.${pkg.type}.description`)}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center justify-center text-gray-700"
                      >
                        <div className="flex items-center justify-center w-full">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-center">{t(`packages.${pkg.type}.features.${feature}`)}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => {
                      // TODO: Implement add to cart functionality
                      console.log(
                        `Added ${t(`packages.${pkg.type}.name`)} to cart`
                      );
                    }}
                  >
                    {t("game.addToCart")}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {t("home.trending")}
              </h3>
              <p className="text-gray-600">{t("home.specialOffers")}</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {t("home.popular")}
              </h3>
              <p className="text-gray-600">{t("home.new")}</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {t("home.viewAll")}
              </h3>
              <p className="text-gray-600">{t("home.categories")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
