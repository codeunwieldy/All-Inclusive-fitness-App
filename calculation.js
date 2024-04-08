
document.addEventListener('DOMContentLoaded', function() {
    const heightFeetInput = document.getElementById('height-feet');
    const heightInchesInput = document.getElementById('height-inches');
    const heightUnitSelect = document.getElementById('height-unit');

    // Hide the inches input initially
    heightInchesInput.style.display = 'none';

    heightUnitSelect.addEventListener('change', function() {
        if (heightUnitSelect.value === 'ft') {
            // Show the inches input
            heightInchesInput.style.display = 'inline-block';
        } else {
            // Hide the inches input
            heightInchesInput.style.display = 'none';
        }
    });
});


const brmBtn = document.getElementById('brmBtn');
brmBtn.addEventListener('click', function() {  
    const weightInput = document.getElementById('weight');
    const heightFeetInput = document.getElementById('height-feet');
    const heightInchesInput = document.getElementById('height-inches');
    const ageInput = document.getElementById('age');
    const unitSelect = document.getElementById('unit');
    const heightUnitSelect = document.getElementById('height-unit');
    const outputInput = document.getElementById('output');
    
    // Convert weight from lbs to kg if necessary
    let WeightCalc;
    if (unitSelect.value === 'lbs') {
        WeightCalc = (parseFloat(weightInput.value) * 0.453592).toFixed(2);
    }

    // Convert height from feet and inches to cm if necessary
    let heightInCm;
    if (heightUnitSelect.value === 'ft') {
        const feet = parseFloat(heightFeetInput.value);
        const inches = parseFloat(heightInchesInput.value);
        heightInCm = (feet * 30.48) + (inches * 2.54);
    } else {
        heightInCm = parseFloat(heightFeetInput.value);
    }
    
    // Calculate BMR
    const output = calorieCalc(parseFloat(WeightCalc), heightInCm, parseFloat(ageInput.value));
    
    // Display output
    console.log(output.toFixed(2));
    outputInput.value = output.toFixed(2);                    
});


function calorieCalc(weight, height, age) {
    return 66.47 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
}
