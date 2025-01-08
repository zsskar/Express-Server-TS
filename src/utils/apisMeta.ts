export const rootPathMsg = {
  status: 'Hey there, I am up and running on PORT : 3000',
  api_available: [
    {
      name: 'users',
      baseUrl: '/api/users',
      extendToBaseUrl: [
        {
          name: 'Signup',
          url: '/signup',
          method: 'POST',
        },
        {
          name: 'Signin',
          url: '/signin',
          method: 'POST',
        },
        {
          name: 'getAllUsers',
          url: '',
          method: 'GET',
        },
        {
          name: 'getUserById',
          url: '/:id',
          method: 'GET',
        },
        {
          name: 'updateUser',
          url: '/:id',
          method: 'PUT',
        },
        {
          name: 'deleteUserById',
          url: '/:id',
          method: 'DELETE',
        },
        {
          name: 'deleteAllUsers',
          url: '',
          method: 'DELETE',
        },
      ],
    },
    {
      name: 'products',
      baseUrl: '/api/products',
      extendToBaseUrl: [
        {
          name: 'createProduct',
          url: '',
          method: 'POST',
        },
        {
          name: 'getAllProducts',
          url: '',
          method: 'GET',
        },
        {
          name: 'getProductById',
          url: '/:id',
          method: 'GET',
        },
        {
          name: 'updateProduct',
          url: '/:id',
          method: 'PUT',
        },
        {
          name: 'deleteProductById',
          url: '/:id',
          method: 'DELETE',
        },
        {
          name: 'deleteAllProducts',
          url: '',
          method: 'DELETE',
        },
      ],
    },
    {
      name: 'purchases',
      baseUrl: '/api/purchases',
      extendToBaseUrl: [
        {
          name: 'createPurchase',
          url: '',
          method: 'POST',
        },
        {
          name: 'getAllPurchasesByUser',
          url: '/:userId',
          method: 'GET',
        },
        {
          name: 'getPurchaseByIdAndUser',
          url: '/:id/:userId',
          method: 'GET',
        },
      ],
    },
    {
      name: 'cart',
      baseUrl: '/api/cart',
      extendToBaseUrl: [
        {
          name: 'addProductToCart',
          url: '/:userId',
          method: 'POST',
        },
        {
          name: 'getCartProductByIdAndUser',
          url: '/:id/user/:userId',
          method: 'GET',
        },
        {
          name: 'getCartProductsByUser',
          url: '/:userId',
          method: 'GET',
        },
        {
          name: 'deleteCartProductByIdAndUser',
          url: '/:userId',
          method: 'DELETE',
        },
        {
          name: 'deleteAllCartProductsByUser',
          url: '/:userId',
          method: 'DELETE',
        },
      ],
    },
  ],
};
