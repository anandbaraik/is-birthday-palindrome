const dobRef = document.querySelector("#dob");
const btnRef = document.querySelector("#chekbtn");
const outputBoxRef = document.querySelector(".outputBox");


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
        showMessage("Woah! your birthdate is palindrome!");
    } else {
        showMessage("missed");
    }
}

function clickHandler() {
    let dobString = dobRef.value;
    if(dobString) {
        let dobArray = dobString.split("-");
        let dob = {
            day: Number(dobArray[2]),
            month: Number(dobArray[1]),
            year: Number(dobArray[0]),
        };
        checkIfDateisPalindrome(dob);
    } else {
        showMessage("Dob is required");
    }
}

btnRef.addEventListener("click", clickHandler);