const passwordLengthEl = document.getElementById('character-length')
const slider = document.getElementById('slider')
const form = document.querySelector('.form')
const generatedPassword = document.getElementById('generated-password')
const bars = document.querySelectorAll('.bar')

const copyBtn = document.querySelector('.fa-clone')

const includeUppercaseElement = document.getElementById('includeUppercase')
const includeLowercaseElement = document.getElementById('includeLowercase')
const includeNumbersElement = document.getElementById('includeNumbers')
const includeSymbolsElement = document.getElementById('includeSymbols')

const UPPERCASE_CHARCODES = generateArray(65, 90)
const LOWERCASE_CHARCODES = generateArray(97, 122)
const NUMBER_CHARCODES = generateArray(48, 57)
const SYMBOL_CHARCODES = generateArray(58, 64).concat(generateArray(91, 96)).concat(generateArray(123, 125))

let passwordLength = parseInt(slider.value)
passwordLengthEl.textContent = passwordLength

slider.addEventListener('change', () => {
    updatePasswordEl()
})

function updatePasswordEl() {
    passwordLength = parseInt(slider.value)
    passwordLengthEl.textContent = passwordLength
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const includeUppercase = includeUppercaseElement.checked
    const includeLowercase = includeLowercaseElement.checked
    const includeNumbers = includeNumbersElement.checked
    const includeSymbols = includeSymbolsElement.checked
    const password = generatePassword(passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols)
    generatedPassword.textContent = password
    checkPasswordStrength(password)

})

function generatePassword(passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    let charCodes = []
    let finalPassword = ''
    if (includeUppercase === true) {
        charCodes = charCodes.concat(UPPERCASE_CHARCODES)
    }
    if (includeLowercase === true) {
        charCodes = charCodes.concat(LOWERCASE_CHARCODES)
    }
    if (includeNumbers === true) {
        charCodes = charCodes.concat(NUMBER_CHARCODES)
    }
    if (includeSymbols === true) {
        charCodes = charCodes.concat(SYMBOL_CHARCODES)
    }

    const passwordCharactersArray = charCodes.map(charcode => {
        return String.fromCharCode(charcode)
    })
    for (let i = 1; i <= passwordLength; i++) {
        const randomNum = Math.floor(Math.random() * passwordCharactersArray.length)
        finalPassword += passwordCharactersArray[randomNum]
    }
    if (includeLowercase === false && includeUppercase === false && includeNumbers === false && includeSymbols === false) {
        finalPassword = ''
    }
    return finalPassword

}

function generateArray(low, high) {
    const array = []
    for (let i = low; i <= high; i++) {
        array.push(i)
    }
    return array
}

function checkPasswordStrength(password) {
    // Initialize variables
    let strength = 0;

    // Check password length
    if (password.length < 8) {
    } else {
        strength += 1;
    }

    // Check for mixed case
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
        strength += 1;
    }

    // Check for numbers
    if (password.match(/\d/)) {
        strength += 1;
    }

    // Check for special characters
    if (password.match(/[^a-zA-Z\d]/)) {
        strength += 1;
    }

    const passwordStrength = document.getElementById('password-strength')

    let color = 'white'

    if (strength < 2) {
        passwordStrength.textContent = "Very Easy"
        color = 'rgb(230, 0, 0)'
    } else if (strength === 2) {
        passwordStrength.textContent = "Easy"
        color = 'orange'
    } else if (strength === 3) {
        passwordStrength.textContent = "Medium"
        color = 'yellow'
    } else {
        passwordStrength.textContent = "Difficult"
        color = 'rgb(2, 209, 19)'
    }

    bars.forEach(bar => {
        bar.style.backgroundColor = 'rgb(49, 49, 49)'
    })


    for (let i = 0; i < strength; i++) {

        bars[i].style.backgroundColor = color

    }


}

copyBtn.addEventListener('click', () => {
    if (generatedPassword.textContent) {
        const copyMsg = document.querySelector('.copy-msg')
        copyMsg.classList.add('show')

        setTimeout(() => {
            copyMsg.classList.remove('show')
        }, 1500)
        copyToClipboard()
    }
})

function copyToClipboard() {
    const copyText = generatedPassword.textContent
    navigator.clipboard.writeText(copyText);
}