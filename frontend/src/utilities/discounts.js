export const calculateTotal = (cart, coupon = {}) => {
  if (!cart || cart.length === 0) return 0;
  const total = cart.reduce((acc, c) => acc += c.price * c.quantity, 0);

  if (!coupon) return total;

  switch (coupon.type) {
    case "FLAT": {
      if (total - coupon.amount < 0) return 0;
      return total - coupon.amount;
    }
    case "PERCENTAGE": {
      return  Math.ceil(total * ((100 - coupon.amount)/100))
    }
    case "BOGO":
      return cart.reduce((acc, c) => {
        if (c.quantity % 2 === 0)
          return acc += c.price * Math.floor(c.quantity / 2)
        return acc += c.price * (Math.floor(c.quantity / 2) + 1)
      }, 0)
    default:
     return total;
  }
}