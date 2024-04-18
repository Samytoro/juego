document.addEventListener("DOMContentLoaded", function() {
    const words = [
      { word: "papa", image: "papa.jpg", audio: "papa.mp3" },
      { word: "pepe", image: "pepe.jpg", audio: "pepe.mp3" },
      { word: "pipa", image: "pipa.jpg", audio: "pipa.mp3" },
      { word: "pua", image: "pua.jpg", audio: "pua.mp3" },
      { word: "papas", image: "papas.jpg", audio: "papas.mp3" },
      { word: "pie", image: "pie.jpg", audio: "pie.mp3" },
      { word: "apio", image: "apio.jpg", audio: "apio.mp3" },
      
      
    ];
    let currentWordIndex = 0;
    let points = 0;
    let lettersPlaced = 0;
  
    const letterBox = document.querySelector(".letter-box");
    const answerBox = document.querySelector(".answer-box");
    const message = document.querySelector(".message");
    const pointsDisplay = document.getElementById("points");
    const restartButton = document.querySelector(".restart-button");
    const playAgainButton = document.querySelector(".play-again-button");
  
    function shuffleWord(word) {
      return word.split('').sort(function() { return 0.5 - Math.random() }).join('');
    }
  
    function displayLetters(word) {
      word.split('').forEach(letter => {
        const letterButton = document.createElement("div");
        letterButton.textContent = letter;
        letterButton.classList.add("letter");
        letterBox.appendChild(letterButton);
        letterButton.addEventListener("click", function() {
          const targetSlot = answerBox.querySelector(`[data-letter=""]`);
          if (targetSlot && lettersPlaced < words[currentWordIndex].word.length) {
            targetSlot.textContent = letter;
            targetSlot.setAttribute("data-letter", letter);
            lettersPlaced++;
            if (lettersPlaced === words[currentWordIndex].word.length) {
              checkAnswer();
            }
          }
        });
      });
    }
  
    function displayAnswerBoxes(word) {
      word.split('').forEach(() => {
        const answerSlot = document.createElement("div");
        answerSlot.classList.add("letter-slot");
        answerSlot.setAttribute("data-letter", "");
        answerBox.appendChild(answerSlot);
      });
    }
  
    function checkAnswer() {
      const answerSlots = Array.from(document.querySelectorAll(".answer-box .letter-slot"));
      const userWord = answerSlots.map(slot => slot.textContent).join('').toLowerCase();
      const normalizedCorrectWord = normalizeWord(words[currentWordIndex].word).toLowerCase();
      if (userWord === normalizedCorrectWord) {
        message.textContent = "¡Lo has logrado!";
        points++;
        pointsDisplay.textContent = points;
        currentWordIndex++;
        if (currentWordIndex < words.length) {
          startNextWord();
        } else {
          message.textContent = `¡Felicidades! Has completado todas las palabras. Total de palabras buenas: ${points}`;
          playAgainButton.style.display = "inline-block";
        }
      } else {
        message.textContent = "Inténtalo nuevamente. ¡No te rindas!";
      }
      lettersPlaced = 0;
      answerSlots.forEach(slot => {
        slot.textContent = "";
        slot.setAttribute("data-letter", "");
      });
    }
  
    function startNextWord() {
      letterBox.innerHTML = "";
      answerBox.innerHTML = "";
      displayLetters(shuffleWord(words[currentWordIndex].word));
      displayAnswerBoxes(words[currentWordIndex].word);
      displayImage(words[currentWordIndex]);
      displayAudioButton(words[currentWordIndex].audio);
    }
  
    function normalizeWord(word) {
      return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
  
    function displayImage(wordInfo) {
      const imageBox = document.querySelector(".image-box");
      imageBox.innerHTML = "";
      const image = document.createElement("img");
      image.src = "images/" + wordInfo.image;
      image.alt = wordInfo.word;
      imageBox.appendChild(image);
    }
  
    function displayAudioButton(audioSrc) {
      const imageBox = document.querySelector(".image-box");
      const audioButton = document.createElement("button");
      audioButton.classList.add("audio-button");
      audioButton.onclick = function() { playAudio("audio/" + audioSrc); };
      const audioIcon = document.createElement("img");
      audioIcon.src = "audio-icon.png";
      audioIcon.alt = "Reproducir audio";
      audioButton.appendChild(audioIcon);
      imageBox.appendChild(audioButton);
    }
  
    function playAudio(audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play();
    }
  
    restartButton.addEventListener("click", function() {
      currentWordIndex = 0;
      points = 0;
      lettersPlaced = 0;
      pointsDisplay.textContent = points;
      restartButton.style.display = "none";
      playAgainButton.style.display = "none";
      startNextWord();
    });
  
    playAgainButton.addEventListener("click", function() {
      currentWordIndex = 0;
      points = 0;
      lettersPlaced = 0;
      pointsDisplay.textContent = points;
      restartButton.style.display = "none";
      playAgainButton.style.display = "none";
      startNextWord();
    });
  
    displayLetters(shuffleWord(words[currentWordIndex].word));
    displayAnswerBoxes(words[currentWordIndex].word);
    displayImage(words[currentWordIndex]);
    displayAudioButton(words[currentWordIndex].audio);
  });

 



  