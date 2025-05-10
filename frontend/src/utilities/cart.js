export const createCart = async () => {
  try {
    const res = await fetch('/api/carts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) throw new Error('Failed to create cart');
    const location = res.headers.get('Location');
    return location.split("/")[2]
  } catch {
    console.error("failed")
  }
}

export const updateCart = async (cartId, newCart) => {
  const res = await fetch(`/api/carts/${cartId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCart) // ✅ send array
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(errorText)
    return []
  }

  const updatedCart = await res.json();
  return updatedCart;
}

export const addItemToCart = (existingCart, productToAdd) => {
  const itemInCart = existingCart.find(c => c.id === productToAdd.id)
  const newCart = itemInCart
    ? existingCart.map((c) =>
        c.id === productToAdd.id ? { ...c, quantity: c.quantity + 1 } : c
      )
    : [...existingCart, { product_id: productToAdd.id, quantity: 1 }];
  
  return newCart;
}

export const removeItemFromCart = (existingCart, product) => {
  const itemInCart = existingCart.find(c => c.id === product.id);

  if (!itemInCart) {
    return existingCart; // If the item is not in the cart, return the cart as is
  }

  const newCart = itemInCart.quantity > 1
    ? existingCart.map((c) =>
        c.id === product.id ? { ...c, quantity: c.quantity - 1 } : c
      )
    : existingCart.filter(c => c.id !== product.id);

  return newCart;
};