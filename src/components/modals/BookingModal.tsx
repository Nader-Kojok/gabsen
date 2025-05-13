import { useState, useEffect } from "react";
import { FaTimes, FaCheck, FaCheckCircle, FaDownload } from "react-icons/fa";
import Button from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationNumber, setReservationNumber] = useState("");
  const [formData, setFormData] = useState({
    serviceType: "",
    date: "",
    time: "",
    pickup: "",
    dropoff: "",
    passengers: "1",
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  // Calcul du prix en fonction du service
  const calculatePrice = () => {
    const basePrices = {
      "airport-pickup": 15000,
      "airport-dropoff": 15000,
      "hourly": 10000,
      "daily": 50000,
    };
    return basePrices[formData.serviceType as keyof typeof basePrices] || 0;
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.serviceType) newErrors.serviceType = "Veuillez sélectionner un service";
    if (!formData.date) newErrors.date = "Veuillez sélectionner une date";
    if (!formData.time) newErrors.time = "Veuillez sélectionner une heure";
    if (!formData.pickup) newErrors.pickup = "Veuillez indiquer le lieu de prise en charge";
    if (!formData.dropoff) newErrors.dropoff = "Veuillez indiquer la destination";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Veuillez indiquer votre nom";
    if (!formData.phone) {
      newErrors.phone = "Veuillez indiquer votre numéro de téléphone";
    } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = "Veuillez indiquer un numéro de téléphone valide";
    }
    if (!paymentMethod) newErrors.paymentMethod = "Veuillez sélectionner un moyen de paiement";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      setIsSuccess(true);
      setReservationNumber(Math.random().toString(36).substr(2, 9).toUpperCase());
    }
  };

  const handleClose = () => {
    onClose();
    // Réinitialiser l'état après la fermeture
    setTimeout(() => {
      setIsSuccess(false);
      setStep(1);
      setFormData({
        serviceType: "",
        date: "",
        time: "",
        pickup: "",
        dropoff: "",
        passengers: "1",
        name: "",
        phone: "",
      });
      setPaymentMethod("");
    }, 300);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // En-tête
    doc.setFontSize(20);
    doc.setTextColor(243, 120, 2); // Orange Gabsen
    doc.text("Gabsen - Confirmation de réservation", pageWidth / 2, 20, { align: "center" });
    
    // Numéro de réservation
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`Numéro de réservation: ${reservationNumber}`, pageWidth / 2, 35, { align: "center" });
    
    // Informations de réservation
    doc.setFontSize(12);
    doc.text("Détails de la réservation:", 20, 50);
    
    const details = [
      ["Service:", formData.serviceType === "airport-pickup" ? "Transfert Aéroport - Ville" :
                   formData.serviceType === "airport-dropoff" ? "Transfert Ville - Aéroport" :
                   formData.serviceType === "hourly" ? "Location à l'heure" :
                   "Location à la journée"],
      ["Date:", formData.date],
      ["Heure:", formData.time],
      ["Point de départ:", formData.pickup],
      ["Destination:", formData.dropoff],
      ["Passagers:", formData.passengers],
      ["Nom:", formData.name],
      ["Téléphone:", formData.phone],
      ["Moyen de paiement:", paymentMethod],
      ["Montant total:", `${calculatePrice().toLocaleString()} FCFA`]
    ];
    
    let y = 60;
    details.forEach(([label, value]) => {
      doc.text(`${label} ${value}`, 20, y);
      y += 10;
    });
    
    // Pied de page
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Merci de votre confiance !", pageWidth / 2, y + 20, { align: "center" });
    doc.text("Gabsen - Votre partenaire de transport de confiance", pageWidth / 2, y + 30, { align: "center" });
    
    // Téléchargement du PDF
    doc.save(`reservation-gabsen-${reservationNumber}.pdf`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              {!isSuccess ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 id="booking-modal-title" className="text-2xl font-bold font-poppins">
                      Réserver votre trajet
                    </h2>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Fermer"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Progress Steps */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 1 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"
                      }`}>
                        1
                      </div>
                      <div className={`w-16 h-1 ${
                        step >= 2 ? "bg-orange-500" : "bg-gray-200"
                      }`} />
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 2 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"
                      }`}>
                        2
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {step === 1 ? (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Type de service
                          </label>
                          <select
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                              errors.serviceType ? "border-red-500" : "border-gray-300"
                            }`}
                            required
                            aria-invalid={!!errors.serviceType}
                            aria-describedby={errors.serviceType ? "serviceType-error" : undefined}
                          >
                            <option value="">Sélectionnez un service</option>
                            <option value="airport-pickup">Transfert Aéroport - Ville</option>
                            <option value="airport-dropoff">Transfert Ville - Aéroport</option>
                            <option value="hourly">Location à l&apos;heure</option>
                            <option value="daily">Location à la journée</option>
                          </select>
                          {errors.serviceType && (
                            <p id="serviceType-error" className="mt-1 text-sm text-red-500">
                              {errors.serviceType}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Date
                            </label>
                            <input
                              type="date"
                              name="date"
                              value={formData.date}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                                errors.date ? "border-red-500" : "border-gray-300"
                              }`}
                              required
                              aria-invalid={!!errors.date}
                              aria-describedby={errors.date ? "date-error" : undefined}
                            />
                            {errors.date && (
                              <p id="date-error" className="mt-1 text-sm text-red-500">
                                {errors.date}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Heure
                            </label>
                            <input
                              type="time"
                              name="time"
                              value={formData.time}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                                errors.time ? "border-red-500" : "border-gray-300"
                              }`}
                              required
                              aria-invalid={!!errors.time}
                              aria-describedby={errors.time ? "time-error" : undefined}
                            />
                            {errors.time && (
                              <p id="time-error" className="mt-1 text-sm text-red-500">
                                {errors.time}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lieu de prise en charge
                          </label>
                          <input
                            type="text"
                            name="pickup"
                            value={formData.pickup}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                              errors.pickup ? "border-red-500" : "border-gray-300"
                            }`}
                            required
                            aria-invalid={!!errors.pickup}
                            aria-describedby={errors.pickup ? "pickup-error" : undefined}
                          />
                          {errors.pickup && (
                            <p id="pickup-error" className="mt-1 text-sm text-red-500">
                              {errors.pickup}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Destination
                          </label>
                          <input
                            type="text"
                            name="dropoff"
                            value={formData.dropoff}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                              errors.dropoff ? "border-red-500" : "border-gray-300"
                            }`}
                            required
                            aria-invalid={!!errors.dropoff}
                            aria-describedby={errors.dropoff ? "dropoff-error" : undefined}
                          />
                          {errors.dropoff && (
                            <p id="dropoff-error" className="mt-1 text-sm text-red-500">
                              {errors.dropoff}
                            </p>
                          )}
                        </div>

                        <Button
                          type="button"
                          onClick={handleNext}
                          variant="primary"
                          fullWidth
                        >
                          Suivant
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom complet <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                                errors.name ? "border-red-500" : "border-gray-300"
                              }`}
                              required
                              aria-invalid={!!errors.name}
                              aria-describedby={errors.name ? "name-error" : undefined}
                            />
                            {formData.name && !errors.name && (
                              <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                            )}
                          </div>
                          {errors.name && (
                            <p id="name-error" className="mt-1 text-sm text-red-500">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Téléphone <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                                errors.phone ? "border-red-500" : "border-gray-300"
                              }`}
                              required
                              aria-invalid={!!errors.phone}
                              aria-describedby={errors.phone ? "phone-error" : undefined}
                            />
                            {formData.phone && !errors.phone && (
                              <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
                            )}
                          </div>
                          {errors.phone && (
                            <p id="phone-error" className="mt-1 text-sm text-red-500">
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        {/* Récapitulatif et moyens de paiement */}
                        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                          <h3 className="font-semibold text-lg">Récapitulatif de la réservation</h3>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Service:</span>
                              <span className="font-medium">
                                {formData.serviceType === "airport-pickup" && "Transfert Aéroport - Ville"}
                                {formData.serviceType === "airport-dropoff" && "Transfert Ville - Aéroport"}
                                {formData.serviceType === "hourly" && "Location à l'heure"}
                                {formData.serviceType === "daily" && "Location à la journée"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Date:</span>
                              <span className="font-medium">{formData.date}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Heure:</span>
                              <span className="font-medium">{formData.time}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Trajet:</span>
                              <span className="font-medium">{formData.pickup} → {formData.dropoff}</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                              <div className="flex justify-between font-bold">
                                <span>Total:</span>
                                <span>{calculatePrice().toLocaleString()} FCFA</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Moyen de paiement <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              {["Wave", "Orange Money", "Moov Money", "Cash"].map((method) => (
                                <button
                                  key={method}
                                  type="button"
                                  onClick={() => setPaymentMethod(method)}
                                  className={`p-3 border rounded-lg text-center transition-colors ${
                                    paymentMethod === method
                                      ? "border-orange-500 bg-orange-50 text-orange-700"
                                      : "border-gray-300 hover:border-orange-500"
                                  }`}
                                >
                                  {method}
                                </button>
                              ))}
                            </div>
                            {errors.paymentMethod && (
                              <p className="mt-1 text-sm text-red-500">
                                {errors.paymentMethod}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Button
                            type="button"
                            onClick={() => setStep(1)}
                            variant="secondary"
                            fullWidth
                          >
                            Retour
                          </Button>
                          <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                          >
                            Confirmer la réservation
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="mb-6"
                  >
                    <FaCheckCircle className="w-16 h-16 text-green-500" />
                  </motion.div>
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-gray-900 mb-2"
                  >
                    Réservation confirmée !
                  </motion.h3>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 mb-6"
                  >
                    Nous vous contacterons dans les plus brefs délais pour confirmer votre trajet.
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm text-gray-500 mb-8"
                  >
                    <p>Numéro de réservation: {reservationNumber}</p>
                    <p className="mt-1">Conservez ce numéro pour toute référence future.</p>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex gap-4"
                  >
                    <Button
                      type="button"
                      onClick={generatePDF}
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      <FaDownload className="w-4 h-4" />
                      Télécharger PDF
                    </Button>
                    <Button
                      type="button"
                      onClick={handleClose}
                      variant="primary"
                    >
                      Fermer
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal; 