const womenClothes = [
  {
    id: 1,
    imgUrl: "dress.png",
    content: "spring blue dress",
    store: "women store",
    price: 169
  },
  {
    id: 2,
    imgUrl: "lady-pants.jpeg",
    content: "denim pants",
    store: "women store",
    price: 250
  },
  {
    id: 7,
    imgUrl: "bag.jpg",
    content: "bag",
    store: "Muji",
    price: 299
  }
];

const menClothes = [{
    id: "m1",
    imgUrl: "menT.jpg",
    content: "men T-shirt",
    store: "men store",
    price: 269
}]

const cart = [
  {
    id: 1,
    imgUrl: "xxxxx",
    content: "spring blue dress",
    store: "women store",
    count: 1,
    price: 169
  },
  {
    id: 2,
    imgUrl: "xxxxx",
    content: "denim pants",
    store: "women store",
    count: 2,
    price: 500
  },
  {
    id: 3,
    imgUrl: "xxxxx",
    content: "black slim pants",
    store: "Urban Outfitter",
    count: 1,
    price: 399
  },
  {
    id: 4,
    imgUrl: "xxxxx",
    content: "graphical T-shirt",
    store: "Uniqle",
    count: 1,
    price: 199
  },
  {
    id: 5,
    imgUrl: "xxxxx",
    content: "graphical T-shirt",
    store: "Uniqle",
    count: 1,
    price: 199
  },
  {
    id: 6,
    imgUrl: "xxxxx",
    content: "graphical T-shirt",
    store: "Muji",
    count: 1,
    price: 199
  },
  {
    id: 7,
    imgUrl: "xxxxx",
    content: "bag",
    store: "Muji",
    count: 1,
    price: 299
  }
]

export default {
  "women": womenClothes,
  "men" : menClothes,
  "cart": cart
}