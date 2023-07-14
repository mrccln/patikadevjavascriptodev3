
//  Selectors
const MENU_BTN_CONTAINER = document.querySelector(`.btn-container`);
const MENU_LIST_CONTAINER = document.querySelector(`.section-center`);

//  Variables
const menu = [
  {
    id: 1,
    title: "Tteokbokki",
    category: "Korea",
    price: 10.99,
    img: "https://twoplaidaprons.com/wp-content/uploads/2020/09/tteokbokki-top-down-view-of-tteokbokki-in-a-bowl-500x500.jpg",
    desc: `Spicy rice cakes, serving with fish cake.`,
  },
  {
    id: 2,
    title: "Chicken Ramen",
    category: "Japan",
    price: 7.99,
    img: "https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg",
    desc: `Chicken noodle soup, serving with vegetables such as soy bean, green onion. In an optional you can ask for egg. `,
  },
  {
    id: 3,
    title: "Bibimbap",
    category: "Korea",
    price: 8.99,
    img: "https://dwellbymichelle.com/wp-content/uploads/2020/05/DWELL-bibimbap.jpg",
    desc: `Boiling vegetables, serving with special hot sauce`,
  },
  {
    id: 4,
    title: "Dan Dan Mian",
    category: "China",
    price: 5.99,
    img: "https://khinskitchen.com/wp-content/uploads/2022/12/dan-dan-noodles-06.jpg",
    desc: `Dan dan noodle, serving with green onion `,
  },
  {
    id: 5,
    title: "Yangzhou Fried Rice",
    category: "China",
    price: 12.99,
    img: "https://salu-salo.com/wp-content/uploads/2013/02/Yangzhou-Fried-Rice1.jpg",
    desc: `Yangzhou style fried rice, serving with bean and pickles `,
  },
  {
    id: 6,
    title: "Onigiri",
    category: "Japan",
    price: 9.99,
    img: "https://www.sal-pimienta.com/wp-content/uploads/2020/05/Takoyaki-1-500x500.jpg",
    desc: `Rice Sandwich, serving with soy sauce`,
  },
  {
    id: 7,
    title: "Jajangmyeon",
    category: "Korea",
    price: 15.99,
    img: "https://www.curiouscuisiniere.com/wp-content/uploads/2020/04/Jajangmyeon-Korean-Noodles-in-Black-Bean-Sauce5.1200H-720x540.jpg",
    desc: `Black bean sauce noodle, serving with green onion `,
  },
  {
    id: 8,
    title: "Ma Yi Shang Shu",
    category: "China",
    price: 12.99,
    img: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/F688C2F6-86EC-46C4-B9C7-A6BA01DF7437/Derivates/32E3E72A-F786-406D-AF7F-B30980A9AC6C.jpg",
    desc: `Hot pepper sauce noodle, serving with soy bean and onion`,
  },
  {
    id: 9,
    title: "Doroyaki",
    category: "Japan",
    price: 3.99,
    img: "https://www.justonecookbook.com/wp-content/uploads/2011/10/Dorayaki-New-500x400.jpg",
    desc: `Red bean paste dessert, serving with honey.`,
  },
];

// Handlers
  // menu objesinin icindeki categorylerden olusan yeni bir array olusturmak icin reduce methodunu kullandik.
  const categoryArray = menu.reduce((reduceArray, item) => {
  
    if(!reduceArray.includes(item.category)) {
      reduceArray.push(item.category)
    }
    return reduceArray;

  }, ["All"]); // bu kisimda olusturugumuz yapi reduceArray den once calisacak ve yapiya eklenecektir.


  // Sayfa acildiginda tum menulerin ekrana gelmesine yarayan fonksiyonu olusturduk. 
  // Fonksiyona menuItems adinda parametre verdik bu parametreye gelen verileri html elementlerinde kullanacagiz.
  function loadMenus(menuItems){

    // Parametre ile gelen menuItems bilgisini map methodunu kullanarak html elementlerinden olusan bir yapiyla birlikte displayMenu adinda bir degiskene atadik.
    let displayMenu = menuItems.map((item) => {
      // 
      return `<div class="menu-items col-lg-6 col-sm-12">
              <img
                src=${item.img}
                alt=${item.title}
                class="photo"
              />
              <div class="menu-info">
                <div class="menu-title">
                  <h4>${item.title}</h4>
                  <h4 class="price">${item.price}</h4>
                </div>
                <div class="menu-text">
                  ${item.desc}
                </div>
              </div>
            </div>
      `;
    });
    displayMenu = displayMenu.join(""); // yine burada map medhodundan kalan , isaretlerini bosluk ile degistirdik.

    // son olarak olusturdugumuz html yapisini siteye ekledik.
    MENU_LIST_CONTAINER.innerHTML = displayMenu;
  }

  // Kategori butonlarini getirecek fonksiyon.
  function filterButtons() {
    // reduce ile olusturdugumuz array yi bu kez map methodu ile modifiye edip button olusturuyoruz. 
    const categoryBtns = categoryArray.map((mapCategory) => { return `<button class="btn btn-outline-dark btn-item" id=${mapCategory}>${mapCategory}</button>`;
      }).join(""); // olusturulan buttonlar innerHTML kismina eklendiginde sonlarinda , (virgul ) ile gelir. Buna engel olmak icin join methodu ile bosluk kullanarak birlestirme yaptik.

    //Olusturdugumuz buttonlari ekleyelim. 
    MENU_BTN_CONTAINER.innerHTML = categoryBtns;

    // Bu kisimda tum buttonlari btn-item classini kullanarak sectik ve bir degiskene atadik
    const filterBtns = document.querySelectorAll(".btn-item");


    //Secilen butonlarin her birine dongu ile click event ekleyelim
    filterBtns.forEach((btn) => {
      
      btn.addEventListener("click", (event) => {
      //mouse ile button uzerinde click yaptigimizda butonlarin id bilgisi event.target.id ile bize geri donuyor. Bu bilgiyi biz degiskene atadik.
        const category = event.target.id;
        // filter methodunu kullanarak menu array`inde yer olarak objeleri filtreleyen bir degisken olusturduk. Medhot icerisinde if statementlar ile sorgulama yaptik.
        const menuCategory = menu.filter((menuItem) => {
          // Eger (menuItem.category)diziden gelen category bilgisi ile mouse ile tikladigimizda gelen category (category) bilgisi esit ise 
          if (menuItem.category === category) {
            return menuItem;  // menuItem bilgisini menuCateGory degiskinine return et.
          }
        });
        // Eger category bilgisi `All` stringine esit ise :
        if (category === "All") {
          loadMenus(menu); // ustte olusturdugumuz loadMenus fonksiyonunun parametresine menu dizisini ekle ve calistir.
        } else {
          
          loadMenus(menuCategory); // Esit degil ise loadMenus fonksiyonunun parametresine menuCategory degiskininiekle ve calistir.
        }
      });
    });

  }


// Onload
  loadMenus(menu); // Sayfa acildiginda fonksiyona menu dizisini parametre olarak ver ve calistir.
  filterButtons(); // Sayfa acildiginda tum  category buttonlarini getir.