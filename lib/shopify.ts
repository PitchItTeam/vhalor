const SHOPIFY_DOMAIN = "xmf716-mp.myshopify.com";
const STOREFRONT_ACCESS_TOKEN = "0797b07b726af1cc9eade808a72bd238";

async function shopifyFetch(query: string, variables: any = {}) {
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2023-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();

  if (result.errors) {
    console.error("Shopify errors:", result.errors);
    throw new Error("Failed to fetch from Shopify");
  }

  return result.data;
}

export async function getCart(cartId: string) {
  const query = `
    query GetCart($id: ID!) {
      cart(id: $id) {
        id
        lines(first: 20) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  image {
                    url
                  }
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `;
  const data = await shopifyFetch(query, { id: cartId });
  return data.cart;
}

export async function addToCart(variantId: string, quantity: number) {
  const query = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          ...CartFields
        }
      }
    }

    fragment CartFields on Cart {
      id
      lines(first: 20) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                image {
                  url
                }
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                }
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  `;
  const variables = {
    input: {
      lines: [{ quantity, merchandiseId: variantId }],
    },
  };
  const data = await shopifyFetch(query, variables);
  return data.cartCreate.cart;
}

export async function updateCart(cartId: string, lineId: string, quantity: number) {
  const query = `
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          ...CartFields
        }
      }
    }

    fragment CartFields on Cart {
      id
      lines(first: 20) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                image {
                  url
                }
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                }
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  `;
  const variables = {
    cartId,
    lines: [{ id: lineId, quantity }],
  };
  const data = await shopifyFetch(query, variables);
  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineId: string) {
  const query = `
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          ...CartFields
        }
      }
    }

    fragment CartFields on Cart {
      id
      lines(first: 20) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                image {
                  url
                }
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                }
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  `;
  const variables = {
    cartId,
    lineIds: [lineId],
  };
  const data = await shopifyFetch(query, variables);
  return data.cartLinesRemove.cart;
}
export { shopifyFetch };
