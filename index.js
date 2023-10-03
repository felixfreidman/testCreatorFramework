let answerArray = [];
let tempArray = []

// TEST DATA

const testData = {
    slide1: {
        header: `Question 1`,
        answers: ['Answer A', 'Answer B', 'Answer C'],
        key: 1,
        classes: ['']
    },
    slide2: {
        header: `Question 2`,
        answers: ['Answer A', 'Answer B', 'Answer C'],
        key: 2,
        classes: ['']
    },
    slide3: {
        header: `Question 3`,
        answers: ['Answer A', 'Answer B', 'Answer C'],
        key: 3,
        classes: ['']
    },
    slide4: {
        header: `Question 4`,
        answers: ['Answer A', 'Answer B', 'Answer C'],
        key: 4,
        classes: ['']
    },
    slide5: {
        header: `Question 5`,
        answers: ['Answer A', 'Answer B', 'Answer C'],
        key: 5,
        classes: ['']
    },
    slide6: {
        header: `Question 6`,
        answers: ['Answer A', 'Answer B', 'Answer C'],
        key: 6,
        classes: ['']
    },
}

// TEST LOGIC

const testParent = document.querySelector('.test-slide');
const activeButton = document.querySelector('.test-control--forward');
const testHeader = document.querySelector('.slide-header');
const questionCounter = document.getElementById('value');
const questionCounterBlock = document.querySelector('.slide-counter');
const answerContainer = document.querySelector('.answer-container');
const primaryAnswerButtons = document.querySelectorAll('.answer-button');
const backButton = document.querySelector('.test-control--back');
const restartButton = document.querySelector('.restart-button');
const oneQuestionAnswerArray = [];
let activeSlide = 1;
let counter = 1;
let totalSumA = 0;
let totalSumB = 0;
let totalSumC = 0;
const storageOfQuestions = [];
localStorage.setItem('questions', storageOfQuestions)
restartButton.addEventListener('click', () => {
    location.reload();
})

function resetButtons() {
    const allButtons = answerContainer.querySelectorAll('.answer-button');
    allButtons.forEach(button => {
        button.classList.remove('answer-button--active');
    })
}

primaryAnswerButtons.forEach(button => {
    button.addEventListener('click', () => {
        let isButtonChecked = false;
        if (!button.classList.contains('answer-button--active')) {
            resetButtons();
            button.classList.add('answer-button--active');
            activeButton.classList.remove('button--disabled');
            isButtonChecked = true;
        } else {
            button.classList.remove('answer-button--active');
            let savedIndex = -1;
            const innerAnswerButtons = testParent.querySelectorAll('.answer-button');
            innerAnswerButtons.forEach((inner_button, index) => {
                if (inner_button.classList.contains('answer-button--active')) {
                    isButtonChecked = true;
                    savedIndex = index
                    button.classList.remove('answer-button--active');
                }
            });
            if (!isButtonChecked && savedIndex == -1) {
                activeButton.classList.add('button--disabled');
            }
        }
    })

})

activeButton.addEventListener('click', () => {
    const prevAnswers = testParent.querySelectorAll('.answer-button--active');
    oneQuestionAnswerArray.length = 0;
    prevAnswers.forEach(answer => {
        answerArray.push(answer.textContent);
        oneQuestionAnswerArray.push(answer.textContent);
    })
    backButton.classList.remove('js--hidden');
    console.log(answerArray);
    activeButton.classList.add('button--disabled');
    const keys = Object.keys(testData);

    activeSlide += 1;
    if (activeSlide >= 7) {
        checkResult();
    } else {
        const slide = testData[keys[activeSlide - 1]];
        counter += 1;
        answerContainer.setAttribute('data-slide', `slide-${activeSlide}`);
        questionCounter.textContent = counter;
        testHeader.innerHTML = slide.header;
        answerContainer.innerHTML = '';
        slide.answers.forEach(answer => {
            const answerTag = document.createElement('div');
            answerTag.classList.add('answer-button');
            if (slide.classes[0] !== '') {
                answerTag.classList.add(slide.classes[0])
            }
            answerTag.textContent = answer;
            answerTag.addEventListener('click', () => {
                let isButtonChecked = false;
                if (!answerTag.classList.contains('answer-button--active')) {
                    resetButtons();
                    answerTag.classList.add('answer-button--active');
                    activeButton.classList.remove('button--disabled');
                    isButtonChecked = true;
                } else {
                    answerTag.classList.remove('answer-button--active');
                    let savedIndex = -1;
                    const innerAnswerButtons = testParent.querySelectorAll('.answer-button');
                    innerAnswerButtons.forEach((inner_button, index) => {
                        if (inner_button.classList.contains('answer-button--active')) {
                            isButtonChecked = true;
                            savedIndex = index
                            answerTag.classList.remove('answer-button--active');
                        }
                    });
                    if (!isButtonChecked && savedIndex == -1) {
                        activeButton.classList.add('button--disabled');
                    }
                }
            })
            answerContainer.append(answerTag);
        })
        let question = {};
        if (activeSlide == 7) {
            const prevSlide = testData[keys[2]];
            question = {
                header: prevSlide.header,
                answers: prevSlide.answers,
                classes: prevSlide.classes
            }
        } else {
            const prevSlide = testData[keys[activeSlide - 2]];
            question = {
                header: prevSlide.header,
                answers: prevSlide.answers,
                classes: prevSlide.classes
            }
        }
        storageOfQuestions.push(question);
        localStorage.setItem('questions', storageOfQuestions)
    }
})

backButton.addEventListener('click', () => {
    activeButton.classList.add('button--disabled');
    oneQuestionAnswerArray.forEach(answer => {
        tempArray = answerArray;
        const answerIndex = tempArray.indexOf(answer);
        tempArray.splice(answerIndex, 1)
    })
    answerArray = tempArray;
    const keys = Object.keys(testData);
    activeSlide -= 1;
    counter -= 1;
    answerContainer.setAttribute('data-slide', `slide-${activeSlide}`);
    if (testHeader.textContent == 'Question 2') {
        backButton.classList.add('js--hidden');
    }
    let slide = storageOfQuestions[counter - 1];
    storageOfQuestions.pop();
    questionCounter.textContent = counter;
    testHeader.innerHTML = slide.header;
    answerContainer.innerHTML = '';
    slide.answers.forEach(answer => {
        const answerTag = document.createElement('div');
        answerTag.classList.add('answer-button');
        if (slide.classes[0] !== '') {
            answerTag.classList.add(slide.classes[0])
        }
        answerTag.textContent = answer;
        answerTag.addEventListener('click', () => {
            let isButtonChecked = false;
            if (!answerTag.classList.contains('answer-button--active')) {
                answerTag.classList.add('answer-button--active');
                activeButton.classList.remove('button--disabled');
                isButtonChecked = true;
            } else {
                answerTag.classList.remove('answer-button--active');
                let savedIndex = -1;
                const innerAnswerButtons = testParent.querySelectorAll('.answer-button');
                innerAnswerButtons.forEach((inner_button, index) => {
                    if (inner_button.classList.contains('answer-button--active')) {
                        isButtonChecked = true;
                        savedIndex = index
                        answerTag.classList.remove('answer-button--active');
                    }
                });
                if (!isButtonChecked && savedIndex == -1) {
                    activeButton.classList.add('button--disabled');
                }
            }
        })
        answerContainer.append(answerTag);
    })
})

// TEST RESULTS

let childResult = 0;

const resultContainer = document.querySelector('.result-container');
const resultImg = document.querySelector('.result-container__img');
const resultHeader = document.querySelector('.result-container__header');
const resultCaption = document.querySelector('.result-container__caption');
const resultDisc = document.querySelector('.result-container__disclaimer');

function manipulateTest() {
    testParent.classList.add('result-section');
    activeButton.classList.toggle('js--hidden');
    testHeader.classList.toggle('js--hidden');
    answerContainer.classList.toggle('js--hidden');
    backButton.classList.toggle('js--hidden');
    questionCounterBlock.classList.toggle('js--hidden');
    resultContainer.classList.toggle('js--hidden');
}

function checkResult() {
    if (answerArray[0] === 'Answer A') {
        totalSumA += 1;
    }
    if (answerArray[0] === 'Answer B') {
        totalSumB += 1;
    }
    if (answerArray[0] === 'Answer C') {
        totalSumC += 1;
    }
    if (answerArray[1] === 'Answer A') {
        totalSumA += 1;
    }
    if (answerArray[1] === 'Answer B') {
        totalSumB += 1;
    }
    if (answerArray[1] === 'Answer C') {
        totalSumC += 1;
    }
    if (answerArray[2] === 'Answer A') {
        totalSumA += 1;
    }
    if (answerArray[2] === 'Answer B') {
        totalSumB += 1;
    }
    if (answerArray[2] === 'Answer C') {
        totalSumC += 1;
    }
    if (answerArray[3] === 'Answer A') {
        totalSumA += 1;
    }
    if (answerArray[3] === 'Answer B') {
        totalSumB += 1;
    }
    if (answerArray[3] === 'Answer C') {
        totalSumC += 1;
    }
    if (answerArray[4] === 'Answer A') {
        totalSumA += 1;
    }
    if (answerArray[4] === 'Answer B') {
        totalSumB += 1;
    }
    if (answerArray[4] === 'Answer C') {
        totalSumC += 1;
    }
    if (answerArray[5] === 'Answer A') {
        totalSumA += 1;
    }
    if (answerArray[5] === 'Answer B') {
        totalSumB += 1;
    }
    if (answerArray[5] === 'Answer C') {
        totalSumC += 1;
    }

    // TEST RESULTS
    const testResults = {
        result1: {
            img: `./logo.png`,
            header: `Sorry for template image, here is Array of your answers: ${answerArray}`,
            caption: 'The A result',
            disclaimer: '',
        },
        result2: {
            img: `./result.png`,
            header: `Sorry for template image, here is Array of your answers: ${answerArray}`,
            caption: 'The B result',
            disclaimer: '',
        },
        result3: {
            img: `./result.png`,
            header: `Sorry for template image, here is Array of your answers: ${answerArray}`,
            caption: 'The C result',
            disclaimer: '',
        },
    }

    if (totalSumA === totalSumC) {
        manipulateTest();
        resultImg.src = testResults.result2.img;
        resultHeader.textContent = testResults.result2.header;
        resultCaption.textContent = testResults.result2.caption;
        resultDisc.textContent = testResults.result2.disclaimer;
    } else if (totalSumB >= totalSumA && totalSumB >= totalSumC) {
        manipulateTest();
        resultImg.src = testResults.result2.img;
        resultHeader.textContent = testResults.result2.header;
        resultCaption.textContent = testResults.result2.caption;
        resultDisc.textContent = testResults.result2.disclaimer;
    } else if (totalSumA > totalSumB && totalSumA > totalSumC) {
        manipulateTest();
        resultImg.src = testResults.result1.img;
        resultHeader.textContent = testResults.result1.header;
        resultCaption.textContent = testResults.result1.caption;
        resultDisc.textContent = testResults.result1.disclaimer;
    } else if (totalSumC > totalSumA && totalSumC > totalSumB) {
        manipulateTest();
        resultImg.src = testResults.result3.img;
        resultHeader.textContent = testResults.result3.header;
        resultCaption.textContent = testResults.result3.caption;
        resultDisc.textContent = testResults.result3.disclaimer;
    }
}


