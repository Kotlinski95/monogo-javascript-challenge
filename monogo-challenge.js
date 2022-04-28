import fetch from 'node-fetch';
const MonogoJsChallengeUrl = 'https://www.monogo.pl/competition/input.txt';
const companyName = "Monogo";
const companyBuildingNumber = 14;

async function getProducts() {
    try {
        const response = await fetch(MonogoJsChallengeUrl);

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

function segregateProducts(data = {}) {
    const segregateProducts = [];
    data.products.forEach(product => {
        const color = data.colors?.find(colorProduct => colorProduct.id === product.id).value;
        const size = data.sizes?.find(colorProduct => parseInt(colorProduct.id, 10) === product.id).value;
        if (data.selectedFilters?.colors?.includes(color) && data.selectedFilters?.sizes?.includes(size)) {
            segregateProducts.push({ id: product.id, price: product.price, color: color, size: size });
        }
    })
    return segregateProducts;
}

function filterProductsByPrice(products) {
    function hasEnoughPrice(element) {
        return (element.price > 200);
    }
    return products.filter(hasEnoughPrice);
}
function calculacteMinMaxMultiplication(array) {
    const maxProductPrice = Math.max.apply(Math, array.map(function (product) { return product.price; }));
    const minProductPrice = Math.min.apply(Math, array.map(function (product) { return product.price; }));
    return Math.round(maxProductPrice * minProductPrice);
}

function createEverySecondArray(value) {
    function everySecondFilter(element, index, array) {
        if (index % 2 === 1) return parseInt(element, 10) + parseInt(array[index - 1], 10);
    }
    return [...`${value}`].map(everySecondFilter).filter(Number);
}

function displayFinalResult(array = [], buildingNumber = 0, value = 0, name = "") {
    return array.indexOf(buildingNumber) * value * name.length;
}

/* #1 Po pierwsze, musisz wczytać dane z pliku input.txt 
(plik ten znajdziesz pod linkiem https://www.monogo.pl/competition/input.txt) 
za pomocą JS (nie kopiuj zawartości tego pliku!). */
const dateFromMonogo = await getProducts();

/* #2 Musisz pogrupować produkty według ich opcji kolorów i rozmiarów za pomocą pola ID
 (zwróć uwagę na typy danych!). Jeden produkt może mieć tylko jedną opcję
 rozmiaru i koloru (nie ma duplikatów produktów i ich opcji).*/
const newsegregateProducts = segregateProducts(dateFromMonogo);

/* #3 Następnie należy odfiltrować zgrupowane produkty, aby dopasować je do wybranych
filtrów i uzyskać tylko te produkty, których cena jest wyższa niż 200 (x > 200). */
const filteredProduct = filterProductsByPrice(newsegregateProducts);

/* #4 Następnie należy uzyskać wartość poprzez pomnożenie najniższej i najwyższej
ceny z przefiltrowanej listy produktów. Wynik należy sformatować tak, aby był
liczbą całkowitą (zaokrągloną, bez części ułamkowej). */
const calculateMinMaxValue = calculacteMinMaxMultiplication(filteredProduct);

/* #5 Następnie musisz utworzyć tablicę z liczby, którą wcześniej
    otrzymałeś, dodając co drugą cyfrę tej liczby do poprzedniej
 (np. 123456 -> [1 + 2, 3 + 4, 5 + 6] -> [3, 7, 11].*/
const calculatedArray = createEverySecondArray(calculateMinMaxValue);

/* #6 Wynik będzie rezultatem mnożenia indeksu numeru lubelskiego biurowca Monogo 
w tablicy z punktu 5, wartości, którą otrzymałeś w punkcie 4, oraz długości nazwy 
firmy "Monogo". 
Biurowiec: ul. Nałęczowska 14, 20-701 Lublin wiec budynek nr: 14 */

console.log(displayFinalResult(calculatedArray, companyBuildingNumber, calculateMinMaxValue, companyName));