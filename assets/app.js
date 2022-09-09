const dobRef = document.querySelector("#dob");
const btnRef = document.querySelector("#chekbtn");
const outputBoxRef = document.querySelector(".outputBox");
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function showMessage(msg) {
    outputBoxRef.innerHTML = msg;
}

function reverseStr(str) {
    let charArr = str.split("");
    let reversedCharArr = charArr.reverse();
    let reversedStr = reversedCharArr.join("");
    return reversedStr
}

function isPalindrome(str) {
    let reversedStr = reverseStr(str);
    return reversedStr === str;
}

function convertDateToStr(date) {
    let dateStr = {
        day: "",
        month: "",
        year: "",
    };

    if(date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if(date.month < 10) {
        dateStr.month = "0"+date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats({day, month, year}) {
    let DDMMYYYY = `${day}${month}${year}`;
    let MMDDYYYY = `${month}${day}${year}`;
    let YYYYMMDD = `${year}${month}${day}`;
    let DDMMYY = `${day}${month}${year.slice(-2)}`;
    let MMDDYY = `${month}${day}${year.slice(-2)}`;
    let YYMMDD = `${year.slice(-2)}${month}${day}`;
    return [
        DDMMYYYY,
        MMDDYYYY,
        YYYYMMDD,
        DDMMYY,
        MMDDYY,
        YYMMDD
    ];
}

function isLeapYear(year) {

    // leap year if perfectly divisible by 400
    if((year%400) == 0) {
        return true;
    }

    // leap year if perfectly divisible by 4
    if((year%4) == 0) {
        return true;
    }

    //not a leap year if perfectly divisible by 100
    if((year % 100) == 0) {
        return false;
    }

    //everything else : not a leap year
    return false;
}

function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    //if feb: check leap year
    if(month == 2){
        if(isLeapYear(year)) {
            if(day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if(day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else { //else rest
        if(day > daysInMonth[month - 1]) {
            day = 1;
            month ++;
        }
    }

    //if month > 12
    if(month > 12) {
        month = 1;
        year ++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindromeDate(date) {
    let nextDate = getNextDate(date);
    let counter = 0;
    while(1) {
        counter++;
        let dateStr = convertDateToStr(nextDate);
        let allDateFormats = getAllDateFormats(dateStr);
        for (let index = 0; index < allDateFormats.length; index++) {
            if(isPalindrome(allDateFormats[index])) {
                return [counter, dateStr];
            }
        }
        nextDate = getNextDate(nextDate);
    }
}

function checkIfDateisPalindrome(dob) {
    let date = convertDateToStr(dob);
    let allDateFormatArr = getAllDateFormats(date);
    let isPalindromeFlag = false;
    for (let index = 0; index < allDateFormatArr.length; index++) {
        if(isPalindrome(allDateFormatArr[index])) {
            isPalindromeFlag = true;
            break;
        }
        
    }
    
    if(isPalindromeFlag) {
        showMessage("Woah! your birthdate is palindrome!✨😊");
    } else {
        let [missedBy, nextDate] = getNextPalindromeDate(dob);
        showMessage(`The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${missedBy} ${(missedBy < 2) ? 'day' : 'days'}.😔😔`);
    }
}

function processingPalindrome(dob) {
    document.querySelector('.anim').style.display = "block";
    setTimeout(() => {
        checkIfDateisPalindrome(dob);
        document.querySelector('.anim').style.display = "none";
    }, 3000);
}

function clickHandler() {
    let dobString = dobRef.value;
    showMessage("");
    if(dobString) {
        let dobArray = dobString.split("-");
        let dob = {
            day: Number(dobArray[2]),
            month: Number(dobArray[1]),
            year: Number(dobArray[0]),
        };
        processingPalindrome(dob);
    } else {
        showMessage("Dob is required 😠😠");
    }
}

function getPreviousDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    if(day == 0) {
        month--;
        if(month == 0) {
            day = 31;
            month = 12;
            year--;
        } else if(month == 2) {
            day = 28;
            if(isLeapYear(year)) {
                day = 29;
            }
        } else {
            day = daysInMonth[month-1];
        }
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

let date = {
    day: 1,
    month: 4,
    year: 2021
}
console.log(date);
console.log(getPreviousDate(date));

btnRef.addEventListener("click", clickHandler);