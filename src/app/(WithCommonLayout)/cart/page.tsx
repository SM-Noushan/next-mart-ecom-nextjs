import Coupon from "@/components/modules/cart/Coupon";
import NMContainer from "@/components/ui/core/NMContainer";
import ProductBanner from "@/components/modules/products/banner";
import CartProducts from "@/components/modules/cart/CartProducts";

const CartPage = () => {
  return (
    <NMContainer>
      <ProductBanner title="Cart Page" path="Home - Cart" />
      <div className="grid grid-cols-12 gap-8 my-5">
        <CartProducts />
        <Coupon />
      </div>
    </NMContainer>
  );
};

export default CartPage;
