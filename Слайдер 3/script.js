document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const slides = document.querySelector('.slider');
    const rangeInput = document.querySelector('.scrollbar');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            // Убираем активный класс у всех табов
            tabs.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс к текущему табу
            tab.classList.add('active');

            // Прокручиваем слайды
            const offset = index * -100; // Вычисляем смещение
            slides.style.transform = `translateX(${offset}%)`; // Прокручиваем слайды

            // Устанавливаем значение ползунка
            rangeInput.value = index;
        });
    });

    // Обработчик события для ползунка
    rangeInput.addEventListener('input', function() {
        const index = parseInt(this.value);
        tabs[index].click(); // Вызываем клик на соответствующем табе
    });

    // Прокрутка слайдов с помощью колесика мыши
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('wheel', function(event) {
        // Проверяем ширину окна
        if (window.innerWidth >= 990) {
            event.preventDefault(); // Предотвращаем стандартное поведение прокрутки
            if (event.deltaY > 0) {
                // Прокрутка вниз
                const nextIndex = Math.min(tabs.length - 1, rangeInput.valueAsNumber + 1);
                tabs[nextIndex].click(); // Кликаем на следующий таб
            } else {
                // Прокрутка вверх
                const prevIndex = Math.max(0, rangeInput.valueAsNumber - 1);
                tabs[prevIndex].click(); // Кликаем на предыдущий таб
            }
        }
    });
});

window.addEventListener('resize', function(){
    const slider = document.querySelector('.slider');
    slider.style.transform = 'translateX(0)';
})

let tS = document.querySelector('.tabs-select')
const links = document.querySelectorAll('.tab-link');

links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Отменяем переход по ссылке

        // Получаем идентификатор слайда из href ссылки
        const targetId = this.getAttribute('href');
        const targetSlide = document.querySelector(targetId); // Находим соответствующий слайд

        // Получаем блок slider
        const slider = document.querySelector('.slider');

        // Рассчитываем позицию слайда относительно блока slider
        const targetSlidePosition = targetSlide.offsetTop-50;

        // Прокручиваем блок slider к нужной позиции
        slider.scrollTo({
            top: targetSlidePosition,
            behavior: 'smooth' // Плавная прокрутка
        });
    });
});


links.forEach(link => {
    link.addEventListener('click', function(evt){
        evt.stopPropagation();
        tS.classList.remove('full');
        links.forEach(link => {
            link.classList.remove('link-visible');
            link.classList.remove('active');
        })
        link.classList.add('active');
    })
})

tS.addEventListener('click', function() {
    console.log(links);
    tS.classList.add('full');
    for (let i=0;i<links.length;i++) {
        links[i].classList.add('link-visible');
    }
})

