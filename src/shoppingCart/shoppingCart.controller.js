let shoppingCart = [];

export const shoppingCartPost = (productoId, amount = 1) => {
    const productInCart = shoppingCart.find(item => item.productoId === productoId);

    if (productInCart) {
        productInCart.amount += amount;
    } else {
        shoppingCart.push({ productoId, amount });
    }

    return shoppingCart;
};

export const obtain = () => {
    return shoppingCart;
};