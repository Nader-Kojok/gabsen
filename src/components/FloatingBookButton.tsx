import { FaCalendarAlt } from "react-icons/fa";
import Button from "./ui/Button";

interface FloatingBookButtonProps {
  onClick: () => void;
}

const FloatingBookButton = ({ onClick }: FloatingBookButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="secondary"
      size="lg"
      className="fixed bottom-6 right-6 shadow-lg z-40"
      aria-label="Réserver maintenant"
    >
      <FaCalendarAlt className="w-5 h-5 mr-2" />
      <span>Réserver</span>
    </Button>
  );
};

export default FloatingBookButton; 