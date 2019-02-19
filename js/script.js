window.addEventListener('DOMContentLoaded', () => {




    const cartWrapper = document.querySelector('.cart__wrapper'), 
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'),
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'),
        totalCost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods__title');
    
    function openCart () {
        calcTotal();                             //зачем считать каждый раз, когда добавляем,
        cart.style.display = 'block';            //если можно, когда открываем корзину?
        document.body.style.overflow = 'hidden';
    }

    function closeCart () {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    }

    open.addEventListener('click', openCart);
    close.addEventListener('click', closeCart);

    goodsBtn.forEach(function(btn, i) {
        btn.addEventListener('click', () => {
            let item = products[i].cloneNode(true),
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div'),
                empty = cartWrapper.querySelector('.empty');
            trigger.remove();
            showConfirm();
            
            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';
            item.appendChild(removeBtn);
            cartWrapper.appendChild(item);
            removeFromCart();
            calcGoods(); //считать элементы нужно после того, как был добавлен новый... 1+ к счётчику бесполезен
            if (empty) {
                empty.remove();
            }
            
        });
    });

    function sliceTitle() {
        titles.forEach(function (item) {
            if (item.textContent.length < 70) {
                return;
            }
            else {
                //const str = `${item.textContent.slice(0, 71)}...`;
                const str = item.textContent.slice(0, 71) + '...';
                item.textContent = str;
            }
        });
    }
    sliceTitle();

    function showConfirm(){
        confirm.style.display = 'block';
        let counter = 100;
        const id = setInterval(frame, 10);
        function frame() {
            if (counter == 10) {
                clearInterval(id);
            } else {
                counter--;
                confirm.style.opacity = '.' + counter;
                confirm.style.transform = `translateY(-${counter}px)`;
            }
        }

    }


    function calcGoods() {
        const items = cartWrapper.querySelectorAll('.goods__item');
        badge.textContent = items.length;
        if (items.length == 0) {
            //console.log(item);
            let empty = cartWrapper.querySelector('.empty');
            if (!empty) {
                empty = document.createElement('div');
                empty.textContent = 'Ваша корзина пока пуста';
                empty.classList.add('empty');
                cartWrapper.appendChild(empty);
            }
        }
    }


    function calcTotal() {
        const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
        let total = 0;
        prices.forEach(function(item){
            total += +item.textContent;
        });
        console.log(total);
        totalCost.textContent = total;
    }

function removeFromCart() {
    const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
    removeBtn.forEach(function(btn){
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            calcTotal();
            calcGoods();
        });
    });
}



});
