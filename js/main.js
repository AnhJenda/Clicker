// Model
const model = {
    currentShoe : null,
    shoes: [
        {
            clickCount: 0,
            name: 'Adidas Ultra Boost 21',
            cost: 69,
            currentPay: 0,
            imgSrc: ('img/adidas-ultra-boost21.jpg'),
        },
        {
            clickCount: 0,
            name: 'Nike',
            cost: 69,
            currentPay: 0,
            imgSrc: 'img/Nike.jpg',
        },
        {
            clickCount: 0,
            name: 'Nike Air Max 270',
            cost: 99,
            currentPay: 0,
            imgSrc: 'img/nike-air-max-270.jpg',
        },
        {
            clickCount: 0,
            name: 'Nike Revolution 5',
            cost: 199,
            currentPay: 0,
            imgSrc: 'img/nike-revolution-5.jpg',
        },
        {
            clickCount: 0,
            name: 'Nike Quest 3',
            cost: 99,
            currentPay: 0,
            imgSrc: 'img/nike-quest-3.jpg',
        },
    ],
};
// Controller
const controller = {
    init() {
        model.currentShoe = model.shoes[0];
        shoeListView.init();
        shoeView.init();
    },

    getCurrentShoe() {
        return model.currentShoe;
    },

    getShoes() {
        return model.shoes;
    },

    setCurrentShoe(shoe) {
        model.currentShoe = shoe;
    },

    incrementCounter() {
        model.currentShoe.clickCount++;
        model.currentShoe.currentPay = (this.getCurrentShoe().clickCount * this.getCurrentShoe().cost);
        shoeView.render();
    },

};
// View
const shoeView = {
    init() {
        this.shoeElem = document.getElementById('shoe');
        this.shoeNameElem = document.getElementById('shoe-name');
        this.shoeCostElem = document.getElementById('shoe-cost');
        this.shoePayElem = document.getElementById('shoe-pay');
        this.shoeImageElem = document.getElementById('shoe-img');
        this.countElem = document.getElementById('shoe-count');
        this.shoeImageElem.addEventListener('click', this.clickHandler);
        this.render();
    },

    clickHandler() {
        return controller.incrementCounter();
    },

    render() {
        const currentShoe = controller.getCurrentShoe();
        this.countElem.textContent = currentShoe.clickCount;
        this.shoeNameElem.textContent = currentShoe.name;
        this.shoeCostElem.textContent = 'Cost: ' + '$' + currentShoe.cost;
        this.shoePayElem.textContent = '$' + currentShoe.currentPay;
        this.shoeImageElem.src = currentShoe.imgSrc;
        this.shoeImageElem.style.cursor = 'pointer';
    },
};
const shoeListView = {
    init() {
        this.shoeListElem = document.getElementById('shoe-list');
        this.render();
    },

    render() {
        let shoe;
        let elem;
        let i;
        const shoes = controller.getShoes();

        this.shoeListElem.innerHTML = '';

        for(let i = 0; i < shoes.length; i++) {
            shoe = shoes[i];
            elem = document.createElement('li');
            elem.className = 'list-group-item d-flex justify-content-between lh-condensed';
            elem.style.cursor = 'pointer';
            elem.textContent = shoe.name;
            elem.addEventListener(
                'click',
                (function(shoeCopy) {
                    return function() {
                        controller.setCurrentShoe(shoeCopy);
                        shoeView.render();
                    };
                })(shoe)
            );
            this.shoeListElem.appendChild(elem);
        }
    },
};
controller.init();
