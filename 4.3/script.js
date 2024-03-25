document.addEventListener("DOMContentLoaded", function() {
    // Получаем элементы DOM
    var tabsContainer = document.getElementById("tabs");
    var tabContentContainer = document.getElementById("tabContent");
  
    // Загружаем JSON с путями к контенту
    fetch('4.3/contentPaths.json')
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
  
  const blocks = document.querySelectorAll('.block');
  let currentOrder = 0;

  blocks.forEach(block => {
    block.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', block.getAttribute('data-order'));
      block.classList.add('dragging');
    });

    block.addEventListener('dragend', () => {
      block.classList.remove('dragging');
    });
  });

  const container = document.querySelector('.container');

  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggingElement = document.querySelector('.dragging');
    if (afterElement == null) {
      container.appendChild(draggingElement);
    } else {
      container.insertBefore(draggingElement, afterElement);
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.block:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  document.querySelector('.check-btn').addEventListener('click', () => {
    const correctBlocks = Array.from(document.querySelectorAll('.block')).every((block, index) => {
      return parseInt(block.getAttribute('data-order')) === index + 1;
    });

    if (correctBlocks) {
      alert('Правильно!');
    } else {
      alert('Неправильно! Спробуйте ще раз.');
    }
  });

  // Перемешиваем блоки
  function shuffleBlocks() {
    const container = document.querySelector('.container');
    const blocks = Array.from(container.querySelectorAll('.block'));
    blocks.forEach(block => container.removeChild(block));
    shuffleArray(blocks);
    blocks.forEach(block => container.appendChild(block));
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Перемешиваем блоки при загрузке страницы
  window.onload = shuffleBlocks;
