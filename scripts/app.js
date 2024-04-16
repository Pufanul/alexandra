const correctAnswers = ["666", "13", "37", "2000", "23", "2024", "100", "31"];
const questions = [
  "What is the number of the beast?",
  "Care este al 6-lea numar prim, cunoscut ca si numarul care aduce ghinion?",
  "Maria are 12 mere si Andrei ii mai da 25 mere. Cate mere are acum Maria?",
  "La ce an se refera celebra melodie BUG Mafia - Un 2 si trei de 0?",
  "Daca eu fac 11 analize QRQC si tu faci 12 analize QRQC, cate analize QRQC avem impreuna?",
  "In ce an ne-am cunoscut?",
  "Cati ani inseamna un secol?",
  "Cate zile are luna Martie?"
];
const crosswordContainer = document.getElementById('crossword');
const congrats = document.getElementById('message');

function checkAllAnswers() {
  const allRows = document.querySelectorAll('.row');
  const allCorrect = Array.from(allRows).every(row => row.classList.contains('correct'));

    if (allCorrect) {
      // Set focus to the first input of the first row
      const firstRowInput = allRows[0].querySelector('.answer');
      if (firstRowInput) {
          firstRowInput.focus();
      }
      
      // Apply transition for paragraph tag removal
        const paragraphs = document.querySelectorAll('#crossword p');
        paragraphs.forEach(paragraph => {
            paragraph.style.transition = 'opacity 0.5s';
            paragraph.style.opacity = '0';
        });

        // Remove paragraph tags after the transition
        setTimeout(() => {
            paragraphs.forEach(paragraph => {
                paragraph.remove();
            });

            // Calculate total height of removed paragraphs
            const totalParagraphHeight = Array.from(paragraphs).reduce((total, paragraph) => total + paragraph.offsetHeight, 0);

            // Apply transition for adjusting margins of rows after paragraph removal
            allRows.forEach(row => {
                row.style.marginTop = `-${totalParagraphHeight}px`;
                row.style.transition = 'margin-top 0.5s'; // Add transition for margin-top
            });

            /// Apply transition for margin-bottom after paragraph deletion
            allRows.forEach(row => {
              row.style.marginBottom = '3px';
              row.style.transition = 'margin-bottom 0.5s'; // Adjust transition duration to 0.5s
            });

            // Calculate shifting distances for aligning letters vertically
            const shiftingDistances = [0, 31, 62, 31, 31, 31, 0, 62]; // Shifting distances for each row

            // Apply transition for shifting rows after a delay
            setTimeout(() => {
                for (let i = 0; i < allRows.length; i++) {
                    allRows[i].style.marginLeft = `${shiftingDistances[i]}px`; // Set margin-left for shifted rows
                    allRows[i].style.transition = 'margin-left 0.5s'; // Adjust transition duration to 1s
                }

                setTimeout(() => {
                  // Set 18px margin-bottom between 4th and 5th row after shifting rows
                  allRows[3].style.marginBottom = '18px';
                  allRows[3].style.transition = 'margin-bottom 0.5s'; // Adjust transition duration to 0.5s

                  // Modify background color of specified inputs with transition
                  setTimeout(() => {
                    const inputsToColor = [
                        allRows[0].querySelectorAll('.answer')[2], // 4th input of 1st row
                        allRows[1].querySelectorAll('.answer')[1], // 1st input of 2nd row
                        allRows[2].querySelectorAll('.answer')[0], // 5th input of 3rd row
                        allRows[3].querySelectorAll('.answer')[1], // 1st input of 4th row
                        allRows[4].querySelectorAll('.answer')[1],  // 4th input of 5th row
                        allRows[5].querySelectorAll('.answer')[1],  // 3nd input of 5th row
                        allRows[6].querySelectorAll('.answer')[2], // 5th input of 5th row
                        allRows[7].querySelectorAll('.answer')[0],  // 3rd input of 5th row
                    ];

                    inputsToColor.forEach(input => {
                        input.style.transition = 'background-color 0.5s'; // Add transition for background-color
                        input.style.backgroundColor = '#E1C7FA';
                    });

                    setTimeout(() => {
                      const showImage = () => {
                        const image = document.getElementById("image");
                        image.style.display = "block";
                      };
                      
                      congrats.innerHTML = `
                        <h3>Insa eu l-am reparat si-n locker ti l-am lasat!</h3>
                        <p><strong>Locker</strong> (vis-a-vis de usa de la baie): <code>6.330</code>
                        <strong>Cod:</strong> <code>3003</code></p>
                        <button id="showButton">Lasa vrajeala si arata-mi exact</button>
                        <img id="image" src="https://i.postimg.cc/d0TygGZv/locker.jpg" alt="Image">
                      `;
                      congrats.style.display = 'block';

                      document.getElementById("showButton").addEventListener("click", showImage);
                    }, 500);

                  }, 500);
                }, 500); // Adjust timeout to match the shifting rows transition duration
            }, 500); // Adjust timeout to match the paragraph removal transition duration
        }, 500); // Adjust timeout to match the paragraph removal transition duration
    } else {
        congrats.textContent = '';
        congrats.style.display = 'none';
    }

}

correctAnswers.forEach((answer, index) => {
  // Add question above each row
  const questionPara = document.createElement('p');
  questionPara.textContent = `${index + 1}. ${questions[index]}`;
  crosswordContainer.appendChild(questionPara);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  const answerLength = answer.length;

  answer.split('').forEach(() => {
    const letterBlock = document.createElement('div');
    letterBlock.classList.add('letter-block');

    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.classList.add('answer');

    input.addEventListener('input', function() {
      this.value = this.value.toUpperCase(); // Convert input to uppercase

      const userAnswer = Array.from(rowDiv.querySelectorAll('.answer')).map(input => input.value.toUpperCase()).join('');
      const correctAnswer = correctAnswers[index].toUpperCase();

      // Check if the user has completed typing the last letter of the answer
      if (userAnswer.length === answerLength) {
        // If yes, check the correctness of the entire row
        if (userAnswer === correctAnswer) {
            rowDiv.classList.remove('wrong');
            rowDiv.classList.add('correct');
            rowDiv.querySelectorAll('.answer').forEach(input => {
                input.classList.remove('wrong');
                input.classList.add('correct');
            });
        
            // Find the next row excluding paragraph tags
            let nextRow = rowDiv.nextElementSibling;
            while (nextRow && nextRow.tagName === 'P') {
                nextRow = nextRow.nextElementSibling;
            }
        
            // Move focus to the next row input if it exists
            if (nextRow) {
                const nextRowInput = nextRow.querySelector('.answer');
                if (nextRowInput) {
                    nextRowInput.focus();
                    return; // Exit the function to prevent further focusing on the current row
                }
            }
        } else {
          rowDiv.classList.remove('correct');
          rowDiv.classList.add('wrong');
          rowDiv.querySelectorAll('.answer').forEach(input => {
            input.classList.remove('correct');
            input.classList.add('wrong');
          });

          // Focus on the last input of the current row
          this.focus();
        }

        // Check all answers after completing this row
        checkAllAnswers();
      }

      const nextInput = this.parentNode.nextElementSibling.querySelector('input');

      if (this.value !== '') {
        if (nextInput) {
          nextInput.focus();
        } else {
          const nextRow = rowDiv.nextElementSibling;
          if (nextRow) {
            const nextRowInput = nextRow.querySelector('input');
            if (nextRowInput) {
              nextRowInput.focus();
            }
          }
        }
      }
    });

    input.addEventListener('keydown', function(event) {
      if (event.key === 'Backspace') {
        // Allow backspace functionality
        if (this.value === '') {
          const prevInput = this.parentNode.previousElementSibling.querySelector('input');
          if (prevInput) {
            prevInput.focus();
          }
        }
      } else if (event.key === 'Tab') {
        event.preventDefault();
        const nextRow = rowDiv.nextElementSibling;
        if (nextRow) {
          const nextRowInput = nextRow.querySelector('.answer');
          if (nextRowInput) {
            nextRowInput.focus();
          }
        }
      } else if (/^\d$/.test(event.key)) { // Check if the pressed key is an alphabet letter
        // Allow insertion of alphabet characters
        // Prevent default action for other key presses
        return true;
      } else {
        // Prevent default action for other key presses
        event.preventDefault();
      }
    });

    letterBlock.appendChild(input);
    rowDiv.appendChild(letterBlock);
  });

  crosswordContainer.appendChild(rowDiv);
});
