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
    console.log("failed")
  }
}

export const addProductToCart = async (cartId, newCart) => {
  const res = await fetch(`/api/carts/${cartId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCart) // ✅ send array
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.log(errorText)
    return []
  }

  const updatedCart = await res.json();
  return updatedCart;
}