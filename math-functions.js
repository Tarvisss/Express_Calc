


function calculateMean(numbers){
    let sum = 0;
    for (let i = 0; i < numbers.length; i++){
       sum += numbers[i];
    }
    return sum / numbers.length;
   }



   function calculateMode(array){
    const frequentNums = {};

    
    // Create frequency table
    array.forEach(number => {
        frequentNums[number] = (frequentNums[number] || 0) + 1;
    });

    // find the modes.

    let modes = [];
    let maxFrequency = 0;

    for (const number in frequentNums){
        if (frequentNums[number] > maxFrequency){
            modes = [number];
            maxFrequency = frequentNums[number];
        } else if (frequentNums[number] === maxFrequency) {
            modes.push(number);
        }
    }

    if (modes.length === Object.keys(frequentNums).length){
        return [];
    }

    return modes;

   }


   function calculateMedian(arr) {
    // Sort the array in ascending order
    arr.sort((a, b) => a - b);
  
    const mid = Math.floor(arr.length / 2);
  
    // Check if the array length is even or odd
    if (arr.length % 2 === 0) {
      // If even, return the average of the two middle elements
      return (arr[mid - 1] + arr[mid]) / 2;
    } else {
      // If odd, return the middle element
      return arr[mid];
    }
  }
  

  module.exports = {
    calculateMean,
    calculateMode,
    calculateMedian
  }
  