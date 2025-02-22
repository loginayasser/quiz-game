var questions = [
    {
      "question": "What is the capital of France?",
      "options": ["Berlin", "Madrid", "Paris", "Rome"],
      "answer": "Paris"
    },
    {
      "question": "Who painted the Mona Lisa?",
      "options": ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
      "answer": "Leonardo da Vinci"
    },
    {
      "question": "What is the largest planet in our solar system?",
      "options": ["Earth", "Jupiter", "Saturn", "Neptune"],
      "answer": "Jupiter"
    },
    {
      "question": "In which year did World War II end?",
      "options": ["1940", "1945", "1950", "1955"],
      "answer": "1945"
    },
    {
      "question": "What is the chemical symbol for gold?",
      "options": ["Ag", "Au", "Fe", "Hg"],
      "answer": "Au"
    },
    {
      "question": "Who wrote the play 'Hamlet'?",
      "options": ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      "answer": "William Shakespeare"
    },
    {
      "question": "What is the tallest mammal on Earth?",
      "options": ["Giraffe", "Elephant", "Lion", "Horse"],
      "answer": "Giraffe"
    },
    {
      "question": "Which ocean is the largest?",
      "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      "answer": "Pacific Ocean"
    },
    {
      "question": "What is the square root of 144?",
      "options": ["10", "12", "14", "16"],
      "answer": "12"
    },
    {
      "question": "How many bones are in the human body?",
      "options": ["206", "250", "300", "350"],
      "answer": "206"
    }
  ]
  
      var currentQuestion = 0;
      var score = 0;
      var intervalId;
      
      var questionElement = document.getElementById("question");
      var optionsElement = document.querySelectorAll("input[name='answer']");
      var labelsElement = document.querySelectorAll("label");
      var nextButton = document.getElementById("next");
      var resultCard = document.querySelector(".result-card");
      var resultElement = document.getElementById("result");
      var resultCard = document.querySelector(".result-card");
      var restartButton = document.getElementById("restart");
      var quizCard = document.querySelector(".quiz-card");
  // Function to show the current question in the page
      function showQuestion() { 
          document.getElementById("score").textContent = "Score : " + score;
  
          var question = questions[currentQuestion];
          questionElement.textContent = question.question;
  
          for (var i = 0; i < optionsElement.length; i++) {
              optionsElement[i].value = question.options[i];
              labelsElement[i].textContent = question.options[i];
          }
      }

      // Function to check the selected answer
      function checkAnswer() {
          var selectedOption = document.querySelector("input[name='answer']:checked");
          if (selectedOption.value === questions[currentQuestion].answer) {
              score++;
          }
          selectedOption.checked = false;
          currentQuestion++;
          // iterate over questions
          if (currentQuestion < questions.length) {
              showQuestion();
          } else {
            // Show the result 
              clearInterval(intervalId);
              quizCard.classList.add("hidden");
              resultCard.classList.remove("hidden");
              resultElement.textContent = "Your final score is " + score + "/" + questions.length;
          }
      }
  // Function to start the timer
      function startTimer(durationInMinutes, display) {
    var timer = durationInMinutes * 60, // Convert minutes to seconds
        minutes, seconds;
  
     intervalId = setInterval(function() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
  
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      display.textContent ="Time Left : " +minutes + ":" + seconds;
  
      if (--timer < 0) {
        clearInterval(intervalId); // Stop the timer
        display.textContent = "00:00"; 
        // Optionally, perform actions when timer reaches 0
          quizCard.classList.add("hidden");
          document.querySelector(".result-card").classList.remove("hidden");
              document.getElementById("result").textContent = "Your final score is " + score + "/" + questions.length;
      }
    }, 1000);
  }
  
  window.onload = function() {
    var minutes = 1; // Set the timer duration in minutes
    var display = document.querySelector('#timer');
    startTimer(minutes, display);
    showQuestion();
    nextButton.addEventListener("click", checkAnswer);
    restartButton.addEventListener("click", function() {
      currentQuestion = 0;
      score = 0;
      clearInterval(intervalId);
      startTimer(minutes, display);
      showQuestion();
      resultCard.classList.add("hidden");
      quizCard.classList.remove("hidden");
    });
  }