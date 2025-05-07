import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase/config";

const Profile = () => {
  const { userData, currentUser } = useAuth();
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [referralInput, setReferralInput] = useState("");

  const handleRedeemReferral = async () => {
    try {
      setIsRedeeming(true);
      setError("");
      setSuccess("");

      if (!referralInput.trim()) {
        setError("Please enter a referral code");
        return;
      }

      // Get the referrer's document
      const referrerQuery = await db.collection("users")
        .where("referralCode", "==", referralInput.trim())
        .get();

      if (referrerQuery.empty) {
        setError("Invalid referral code");
        return;
      }

      const referrerDoc = referrerQuery.docs[0];

      // Check if user is trying to use their own referral code
      if (referrerDoc.id === currentUser.uid) {
        setError("You cannot use your own referral code");
        return;
      }

      // Update referrer's wallet balance
      await updateDoc(doc(db, "users", referrerDoc.id), {
        walletBalance: increment(5.00) // $5 bonus for referrer
      });

      // Update current user's wallet balance
      await updateDoc(doc(db, "users", currentUser.uid), {
        walletBalance: increment(5.00) // $5 bonus for new user
      });

      setSuccess("Referral code redeemed successfully! $5 has been added to your wallet.");
      setReferralInput("");
    } catch (error) {
      setError("Failed to redeem referral code. Please try again.");
      console.error("Referral redemption error:", error);
    } finally {
      setIsRedeeming(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Please log in to view your profile
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-700">
            <h3 className="text-lg leading-6 font-medium text-white">
              Profile Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-blue-100">
              Your personal account details and wallet information
            </p>
          </div>

          {/* Profile Content */}
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {/* Email */}
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{currentUser.email}</dd>
              </div>

              {/* Username */}
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Username</dt>
                <dd className="mt-1 text-sm text-gray-900">{userData?.username || "Not set"}</dd>
              </div>

              {/* Wallet Balance */}
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Wallet Balance</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <span className="font-semibold text-green-600">
                    ${userData?.walletBalance?.toFixed(2) || "0.00"}
                  </span>
                </dd>
              </div>

              {/* Referral Code */}
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Your Referral Code</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                      {userData?.referralCode || "Not available"}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(userData?.referralCode);
                        setSuccess("Referral code copied to clipboard!");
                      }}
                      className="text-blue-600 hover:text-blue-500 text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Referral Redemption Card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-green-600 to-green-700">
            <h3 className="text-lg leading-6 font-medium text-white">
              Redeem Referral Code
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-green-100">
              Enter a friend's referral code to get $5 bonus
            </p>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="flex space-x-4">
              <input
                type="text"
                value={referralInput}
                onChange={(e) => setReferralInput(e.target.value)}
                placeholder="Enter referral code"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <Button
                variant="primary"
                onClick={handleRedeemReferral}
                disabled={isRedeeming || !referralInput.trim()}
              >
                {isRedeeming ? "Redeeming..." : "Redeem"}
              </Button>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mt-4 p-4 bg-green-50 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
