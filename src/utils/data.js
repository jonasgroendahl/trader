const data = [
  {
    id: 1,
    name: "Translator",
    type: "skill",
    date: "2019-04-04",
    location: "Vejle",
    img: "https://picsum.photos/200/300",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iusto maiores atque ea ut quia sed labore explicabo quos eveniet.",
    userName: "Jonas"
  },
  {
    id: 2,
    name: "Computer guy",
    type: "skill",
    date: "2019-04-04",
    location: "Vejle",
    img: "https://picsum.photos/200/300",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iusto maiores atque ea ut quia sed labore explicabo quos eveniet.",
    userName: "Jonas"
  },
  {
    id: 3,
    name: "Window cleaner",
    type: "skill",
    date: "2019-04-04",
    location: "Vejle",
    img: "https://picsum.photos/200/300",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iusto maiores atque ea ut quia sed labore explicabo quos eveniet.",
    userName: "Jonas"
  },
  {
    id: 4,
    name: "Barber",
    type: "skill",
    date: "2019-04-04",
    location: "Vejle",
    img: "https://picsum.photos/200/300"
  },
  {
    id: 5,
    name: "Barber skillz",
    type: "skill",
    date: "2019-04-04",
    location: "Vejle",
    img: "https://picsum.photos/200/300"
  }
];

const usersHashmap = {
  1: {
    id: 1,
    name: "Jonas",
    location: "Vejle, Denmark",
    listings: [
      {
        name: "Barber",
        location: "Copenhagen",
        need: 1,
        img:
          "https://image.shutterstock.com/image-vector/cartoon-barber-comb-scissors-vector-260nw-745746409.jpg",
        type: "skill",
        id: 7
      },
      {
        name: "Keyboard",
        location: null,
        need: 1,
        img:
          "https://ae01.alicdn.com/kf/HTB12f7SQXXXXXXyaFXXq6xXFXXXB/Children-s-Cartoon-keyboard-with-Big-and-colorful-design-keycap-USB-cable-keyboard.jpg_640x640.jpg",
        type: "item",
        id: 6
      },
      {
        name: "Window cleaner",
        img: "https://i.pinimg.com/originals/e0/e1/6c/e0e16cfd9886401603031b76eebf78b2.jpg",
        need: 0,
        location: "Copenhagen",
        type: "skill",
        id: 5
      }
    ],
    img:
      "https://yt3.ggpht.com/a-/AAuE7mAQ_NPEtp0pog-8DAEPArSwyW7YsOwVXMsyuw=s88-c-k-c0x00ffffff-no-rj-mo",
    conversations: []
  },
  2: {
    id: 2,
    name: "Meiying",
    location: "Denmark, Skærbæk",
    listings: [
      {
        name: "Camera",
        location: "Jylland",
        need: 1,
        id: 4,
        type: "item",
        img: "https://cdn4.iconfinder.com/data/icons/photo-cartoon/512/g14071-512.png"
      },
      {
        name: "Chair",
        location: "Vejle",
        type: "item",
        img:
          "https://www.italiacollezione.com/media/catalog/product/cache/1/image/320x265/9df78eab33525d08d6e5fb8d27136e95/i/k/ike_002.jpg",
        need: 0,
        id: 3
      },
      {
        id: 1,
        name: "Window cleaner",
        img: "https://i.pinimg.com/originals/e0/e1/6c/e0e16cfd9886401603031b76eebf78b2.jpg",
        need: 1,
        location: "Copenhagen",
        type: "skill"
      }
    ],
    img: "https://i.pinimg.com/originals/57/95/a8/5795a83c85a2a09a872f44e64fa12cf0.jpg",
    conversations: []
  },
  3: {
    id: 3,
    name: "John",
    location: "Denmark, Vejle",
    listings: [
      {
        id: 2,
        name: "Steelseries Keyboard",
        location: "Jylland",
        need: 0,
        type: "item",
        img:
          "https://www.bluecity.dk/media/catalog/product/cache/bff0198dce1124e17a8d5767896a86cf/2/9/29938.png",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque eveniet quidem tenetur sint optio repellendus consequuntur minus eius autem, veritatis architecto iusto maiores pariatur ducimus voluptates. Illum asperiores ullam laborum?"
      }
    ],
    img:
      "https://vignette.wikia.nocookie.net/villains/images/c/c9/Jon_the_Don.jpg/revision/latest?cb=20170908214140"
  }
};

const users = Object.keys(usersHashmap).map(user => usersHashmap[user]);

export { users };
