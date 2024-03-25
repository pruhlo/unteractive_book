    // Функция для загрузки содержимого из внешних файлов
    function loadHTML(url, elementId) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
            })
            .catch(error => console.error('Ошибка при загрузке ' + url, error));
    }

    // Подтягиваем header.html, body.html и footer.html
    window.onload = function() {
        loadHTML('menu.html', 'menu');
        loadHTML('footer.html', 'footer');
    };
    document.addEventListener("DOMContentLoaded", function() {
    // Получаем элементы DOM
    var tabsContainer = document.getElementById("tabs");
    var tabContentContainer = document.getElementById("tabContent");
  
    // Загружаем JSON с путями к контенту
    fetch('contentPaths.json')
      .then(response => response.json())
      .then(data => {
        // Создаем кнопки вкладок и добавляем обработчики событий
        data.forEach(function(path, index) {
          var tabButton = document.createElement("button");
          tabButton.textContent = "Tab " + (index + 1);
          tabButton.addEventListener("click", function() {
            // Очищаем контент перед загрузкой нового
            tabContentContainer.innerHTML = "";
            // Загружаем контент по пути из JSON
            fetch(path)
              .then(response => response.text())
              .then(data => {
                tabContentContainer.innerHTML = data;
              })
              .catch(error => {
                console.error("Error loading content:", error);
                tabContentContainer.textContent = "Ошибка загрузки контента";
              });
          });
          tabsContainer.appendChild(tabButton);
        });
      })
      .catch(error => console.error("Error loading JSON:", error));
  });

  // Функция для загрузки содержимого из внешних файлов
  function loadHTML(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Ошибка при загрузке ' + url, error));
}

// Подтягиваем header.html, body.html и footer.html
window.onload = function() {
    loadHTML('menu.html', 'menu');
    loadHTML('footer.html', 'footer');
};
document.addEventListener("DOMContentLoaded", function() {
// Получаем элементы DOM
var tabsContainer = document.getElementById("tabs");
var tabContentContainer = document.getElementById("tabContent");

// Загружаем JSON с путями к контенту
fetch('contentPaths.json')
  .then(response => response.json())
  .then(data => {
    // Создаем кнопки вкладок и добавляем обработчики событий
    data.forEach(function(path, index) {
      var tabButton = document.createElement("button");
      tabButton.textContent = "Tab " + (index + 1);
      tabButton.addEventListener("click", function() {
        // Очищаем контент перед загрузкой нового
        tabContentContainer.innerHTML = "";
        // Загружаем контент по пути из JSON
        fetch(path)
          .then(response => response.text())
          .then(data => {
            tabContentContainer.innerHTML = data;
          })
          .catch(error => {
            console.error("Error loading content:", error);
            tabContentContainer.textContent = "Ошибка загрузки контента";
          });
      });
      tabsContainer.appendChild(tabButton);
    });
  })
  .catch(error => console.error("Error loading JSON:", error));
});