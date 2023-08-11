import { motion } from "framer-motion";
import { useProductContext } from "../../context/ProductContext";
import { buyProductBtn } from "../../types";
import { useCartContext } from "../../context/CartContext";

function BuyProductBtn({ _id, cssClass }: buyProductBtn) {
  const { updateInStockStateOnly } = useProductContext();
  const { addToCart } = useCartContext();

  function handleDecreaseInStock() {
    updateInStockStateOnly(_id, -1);
    addToCart(_id, 1);
  }

  const buttonVariants = {
    initial: { scale: 1 },
    tap: {
      scale: 0.5,
      background: [
        "linear-gradient(45deg, #ff00ff, #4c00ff)",
        "linear-gradient(45deg, #00ff00, #4c00ff)"
      ],
      transition: { duration: 0.5, times: [0, 0.5, 1] },
    },
    exit: {
      scale: 0,
      rotate: 720,
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  const textVariants = {
    initial: { color: "#fff" },
    tap: { color: "#fff" },
    exit: { opacity: 1 },
  };

  return (
    <motion.div
      className={cssClass}
      onClick={handleDecreaseInStock}
      variants={buttonVariants}
      initial="initial"
      whileTap="tap"
      exit="exit"
    >
      <motion.span
        className="button-text"
        variants={textVariants}
        initial="initial"
        animate="tap"
        exit="exit"
      >
        Köp
      </motion.span>
    </motion.div>
  );
}

export default BuyProductBtn;
