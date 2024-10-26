// Select necessary elements
const startingBid = document.getElementById("startingbid");
const education = document.getElementById("education");
const familyWorth = document.getElementById("familyWorth");
const caste = document.getElementById("caste");
const ageRadios = document.getElementsByName("age");
const skills = document.getElementsByClassName("skills"); 
const reputation = document.getElementsByClassName("reputation");
const loveLetter = document.getElementById("loveLetter");
const nameInput = document.getElementById("brideName");
const result = document.getElementById("result");

// Calculate function
const calculate = () => {
    let name = nameInput.value;
    let price = Number(startingBid.value);

    if (!name || !price) {
        alert("Please enter both the name and starting bid.");
        return;
    }

    // Calculate education, family worth, caste, age
    price *= Number(education.value);
    price *= Number(familyWorth.value);
    price += Number(caste.value);

    // Apply age multiplier
    ageRadios.forEach(age => {
        if (age.checked) {
            price *= Number(age.value);
        }
    });

    // Apply skills bonus
    const skillsArray = Array.from(skills).filter(skill => skill.checked);
    const skillsBonus = skillsArray.reduce((acc, skill) => acc + Number(skill.value), 0);
    price += skillsBonus;

    // Apply reputation adjustments
    for (let i = 0; i < reputation.length; i++) {
        if (reputation[i].checked) {
            const repValue = Number(reputation[i].value);
            price = repValue < 1 ? price * repValue : price + repValue;
        }
    }

    // Save as an object and display the result
    let person = {
        bride_name: name,
        bride_price: price,
        letter_to_bride: loveLetter.value
    };

    result.innerHTML = `The price for ${person.bride_name} is $${person.bride_price.toFixed(2)}.<br>Your love letter: "${person.letter_to_bride}"`;
};

// Add event listener for the button
document.getElementById("calculateButton").addEventListener("click", calculate);
