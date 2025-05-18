export const testBun = {
    _id: 'bun1',
    name: 'Булка 1',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };
  
  export const testIngredient = {
    _id: 'main1',
    name: 'Мясо 1',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };
  
  export const testSouce = {
    _id: 'sauce1',
    name: 'Соус 1',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };
  
  export const testOrder1 = {
    _id: 'feedId2',
    ingredients: ['bun1', 'sauce1', 'bun1'],
    status: 'done',
    name: 'Тестовый бургер 1',
    createdAt: '2025-05-17T14:32:54.807Z',
    updatedAt: '2025-05-17T14:32:55.674Z',
    number: 75777
  };
  
  export const testOrder2 = {
    _id: 'feedId1',
    ingredients: ['bun1', 'sauce1', 'bun1'],
    status: 'done',
    name: 'Тестовый бургер 2',
    createdAt: '2025-05-17T14:33:54.807Z',
    updatedAt: '2025-05-17T14:33:55.674Z',
    number: 75777
  };