const userSurname = document.querySelector('[name="surname"]');
const userName =  document.querySelector('[name="name"]');

const goodsElements = document.querySelectorAll('[name="goods"]');
const countElements =  document.querySelectorAll('[type="number"]');

const btn = document.querySelector(".btn");
const resultElem = document.querySelector(".sum");

let totalSum = 0;

// объект для хранения количества каждого товара
const countGoods = { 
    "expresso": 0,
    "americano": 0,
    "latte": 0,
    "capuchino": 0,
    "chocolate_muffin": 0,
    "blueberry_muffin": 0,
    "apple_tart": 0
}

//объект для хранения цены каждого товара
const choicePriceGoods = { 
    "expresso": 0,
    "americano": 0,
    "latte": 0,
    "capuchino": 0,
    "chocolate_muffin": 0,
    "blueberry_muffin": 0,
    "apple_tart": 0
}

//функция, которая будет считать итоговую сумму
function countTotalSum () {
    totalSum = 0;
    for (let price in choicePriceGoods) {
                totalSum += choicePriceGoods[price] * countGoods[price];
                resultElem.textContent = `${totalSum} р.`;
    }
}

//функция для элементов input с кол-вом, запрещен ввод отрицательных чисел
countElements.forEach(elem => {
    elem.addEventListener("change", function(){
        if (elem.value<0){
            elem.value = 0;
            countGoods[elem.id]=0;
        } else {
            countGoods[elem.id] = elem.value;
        }
        countTotalSum ();
    })
})

//функция для снятия чекбокса, если кол-во товара = 0 
countElements.forEach(elem => {
    elem.addEventListener("change", function(){
        goodsElements.forEach(product => {
            if (elem.id==product.dataset.goods) {
                if(elem.value == 0){
                    product.checked = false;
            }
        }
        })
    })
});

//функция для элементов input с ценами
goodsElements.forEach(product => {
    product.addEventListener("change", function(){
        if (product.checked) {
            choicePriceGoods[product.dataset.goods] = product.value;
        } else {
            choicePriceGoods[product.dataset.goods] = 0;
        }
        countTotalSum ();
    })
});

//функция для изменения input number на 1/0, если товар выбран/не выбран
goodsElements.forEach(product => {
    product.addEventListener("change", function(){
        countElements.forEach(count => {
            if (count.id==product.dataset.goods) {
                if(product.checked){
                count.value = 1;
                countGoods[`${product.dataset.goods}`] = 1;//изменяет сам объект
                countTotalSum ();
            } else {
                count.value = 0;
                countGoods[`${product.dataset.goods}`] = 0;//изменяет сам объект
                countTotalSum ();
            }
        }
        })
    })
});

//функция для кнопки с alert
btn.addEventListener("click", function(){
    alert(`Заказчик: ${userSurname.value} ${userName.value}\nИтого: ${totalSum} р.`);
})

//вывод более подробной информации
btn.addEventListener("click", function(){
    if (confirm("Вывести более подробную информацию?")) {
    let message = `Заказчик: ${userSurname.value} ${userName.value}\n`;
    goodsElements.forEach(product => {
            countElements.forEach(count => {

                if (count.id==product.dataset.goods&&count.value!=0) {
                    message += `Товар: ${product.dataset.goods} Цена: ${product.value}р. Кол-во: ${count.value}шт. Всего: ${count.value * product.value}р.\n`;
                };
            })
    })
    message += `Итого: ${totalSum} р.`
    alert (message);
}
})


