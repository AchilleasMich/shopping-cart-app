export const submitOrder = async (cartId, coupon) => {
  const order = coupon ? {
    cart_id: cartId,
    discount_code: coupon,
  }: { cart_id: cartId };

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order), 
    });

    if (!res.ok) throw new Error('Failed to process order');
    const location = res.headers.get('Location');
    return location.split("/")[2]
  } catch {
    console.log("failed")
  }
}