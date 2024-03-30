
let newGame = false;
let firstHand, firstHandDealer;
let secondHand, secondHandDealer;
let cards;
let dealerCards;
let dealerSum;
let blackJack = false;
let isAlive = true;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let dealerEl = document.getElementById("dealer-el");
let dealerElSum = document.getElementById("dealer-sum-el");
let moneyEl = document.getElementById("money-el");
let money = 10;
let bet = 0;
let b = 0;
let c = 1;
let betEl = document.getElementById("bet-el");
let yourbetEl = document.getElementById("yourbet-el")
let firstDeal = true;
let win = 0;

document.getElementById("button2").style.display = "none";
document.getElementById("button3").style.display = "none";
document.getElementById("button4").style.display = "none";

function betOne() {
    bet = 1;
    startGame()
    yourbetEl.style.display = "none";
    document.getElementById("yourbet1").style.display = "none";
}
function betTwo() {
    bet = 2;
    startGame()
    yourbetEl.style.display = "none";
    document.getElementById("yourbet1").style.display = "none";
}
function betThree() {
    bet = 3;
    startGame()
    yourbetEl.style.display = "none";
    document.getElementById("yourbet1").style.display = "none";
}
function startGame() {
    if (bet > 0) {
        document.getElementById("button1").style.display = "none";
        messageEl.classList.remove('blink-text')
        firstDeal = true;
        b = 0;
        c = 1;
        money -= bet;
        betEl.textContent = "Your bet:  $" + bet;
        isAlive = true;
        dealerEl.textContent = "";
        cardsEl.innerText = "";
        firstHand = randomCard();
        secondHand = randomCard();
        cards = [firstHand, secondHand]
        firstHandDealer = randomCard();
        secondHandDealer = randomCard();
        blackJack = false;
        dealerCards = [firstHandDealer, secondHandDealer];
        dealerSum = firstHandDealer + secondHandDealer;
        sum = firstHand + secondHand;
        rendertGame()
        dealerEl.textContent = firstHandDealer;
        setTimeout(() => {
            dealerEl.textContent += " - " + secondHandDealer;

        }, (1 * 1000));
        setTimeout(() => {
            dealerElSum.textContent = dealerSum;
        }, (2 * 1000));
        moneyEl.textContent = money;
    } else {
        // betEl.textContent = " Choose the bet!!!!";
        yourbetEl.style.display = "block";

        document.getElementById("yourbet1").style.display = "block";

        document.getElementById("button2").style.display = "none";
        document.getElementById("button3").style.display = "none";
        document.getElementById("button3").style.display = "none";
        message = "Make a Bet !!!";

        messageEl.textContent = message;
        cardsEl.textContent = "";
        dealerElSum.textContent = "";
        dealerEl.textContent = "";
        sumEl.textContent = "";
        betEl.textContent = "";
    }
}

function rendertGame() {

    for (let i = b; i < cards.length; i++) {
        setTimeout(() => {
            if ((i > 0) && (i < cards.length)) {

                cardsEl.textContent += " - "

            }
            cardsEl.textContent += cards[i];
        }, (((i + 3) * c) * 1000));
        if (b === 0) {
            b = 0;
        } else {
            b -= 1;
        }

    }
    setTimeout(() => {
        sumEl.innerText = sum;
        if (isAlive === true) {
            document.getElementById("button2").style.display = "block";
            document.getElementById("button3").style.display = "block";
            if (firstDeal === true) {
                document.getElementById("button4").style.display = "block";
            } else {
                document.getElementById("button4").style.display = "none";
            }
        } else {
            document.getElementById("button2").style.display = "none";
            document.getElementById("button3").style.display = "none";
            document.getElementById("button1").style.display = "block";
            document.getElementById("button4").style.display = "none";
            messageEl.classList.add('blink-text');
        }
    }, ((5 * c) * 1000));
    c = 0;
    if (sum < 21) {
        message = "Do you want to draw a new card?";
        messageEl.style = "font-size: 28px;";
        isAlive = true;
        if (dealerSum === 21) {
            message = "Dealer has BlackJack!!!";
            isAlive = false;
            betEl.textContent = "You LOST:  $" + bet;

            bet = 0;
        }
    } else if (sum === 21) {
        message = "You've got Blackjack!!!";
        blackJack = true;
        messageEl.style = "font-size: 42px;";
        money += bet + bet;
        betEl.textContent = "You WIN:  $" + bet;
        moneyEl.textContent = money;
        bet = 0;
        isAlive = false;


    } else if (dealerSum === 21) {
        message = "Dealer has BlackJack!!!";
        isAlive = false;
        betEl.textContent = "You LOST:  $" + bet;

        bet = 0;
    } else if (sum > 21) {
        message = "Bust!!! You're out!";
        betEl.textContent = "You LOST:  $" + bet;

        bet = 0;
        isAlive = false;
    }




    messageEl.innerText = message;

}
function newCard() {
    if ((sum < 21) && (isAlive === true) && (blackJack === false)) {
        let card = randomCard();
        sum += card;
        firstDeal = false;
        b += 2
        // cardsEl.innerText = "";
        cards.push(card);
        console.log(cards);
        rendertGame()
    }
}
function randomCard() {
    let randomCard = Math.floor(Math.random() * 11) + 1;
    return randomCard;
}


function hold() {
    win = bet;
    let number = dealerSum;
    if (((sum < 22) && (dealerSum < 17) && (isAlive === true) && (blackJack === false)) || sum === dealerSum) {

        while (dealerSum < 17) {
            dealerCard = randomCard();
            dealerSum += dealerCard;
            dealerCards.push(dealerCard);
            console.log(dealerSum);
        }
        for (let i = 2; i < dealerCards.length; i++) {
            setTimeout(() => {
                if (i === 0) {
                    dealerEl.textContent = " - ";
                }
                dealerEl.textContent += " - " + dealerCards[i];
                number += dealerCards[i]
                dealerElSum.textContent = number;
            }, (i - 1) * 1000);
        }
    }
    setTimeout(() => {
        if (dealerSum > 21) {
            message = "Dealer Busts, You WIN!!!";
            messageEl.style = "font-size: 42px;";
            money += win + win;
            betEl.textContent = "You WIN:  $" + win;
            moneyEl.textContent = money;
            console.log(money);

        } else if (sum > 21) {
            message = "You Lost!!!";
            messageEl.style = "font-size: 60px;";
            betEl.textContent = "You LOST:  $" + win;

        } else if (dealerSum === 21) {
            message = "Dealer has BlackJack!!!";
            messageEl.style = "font-size: 42px;";
            betEl.textContent = "You LOST:  $" + win;

        } else if (dealerSum > sum) {
            message = "You Lost!!!";
            messageEl.style = "font-size: 60px;";
            betEl.textContent = "You LOST:  $" + win;

        } else if (dealerSum === sum) {
            message = "It's a tie!!!";
            messageEl.style = "font-size: 50px;";
            betEl.textContent = "It's a tie!!!"
            money += win;

        } else if (dealerSum < sum) {
            newGame = true;
            message = "You WIN!!!";
            messageEl.style = "font-size: 60px;";
            betEl.textContent = "You WIN:  $" + win;
            money += win + win;

        }
        isAlive = false;

        messageEl.innerText = message;
        moneyEl.textContent = money;
        document.getElementById("button2").style.display = "none";
        document.getElementById("button3").style.display = "none";
        document.getElementById("button4").style.display = "none";
        document.getElementById("button1").style.display = "block";
        messageEl.classList.add('blink-text');

    }, (dealerCards.length - 1) * 1000);
    bet = 0;
}

function double() {
    money -= bet
    bet += bet
    betEl.textContent = "Your bet:  $" + bet;
    newCard();
    setTimeout(() => {
        hold()
        moneyEl.textContent = money;

    }, ((1) * 1000));
}