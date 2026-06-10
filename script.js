// ========================================
// Taylor Swift Era Finder - JavaScript
// ========================================

// Wait for the page to fully load before running our code
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // STEP 1: Get references to HTML elements
    // ========================================
    
    // Get the form element where users answer questions
    const quizForm = document.getElementById('era-quiz');
    
    // Get the section that shows the quiz (we'll hide this when showing results)
    const quizSection = document.getElementById('quiz-section');
    
    // Get the section that shows results (hidden by default)
    const resultSection = document.getElementById('result-section');
    
    // Get the elements where we'll display the results
    const eraNameElement = document.getElementById('era-name');
    const eraDescriptionElement = document.getElementById('era-description');
    const songListElement = document.getElementById('song-list');
    
    // Get the "Try Again" button
    const tryAgainButton = document.getElementById('try-again');

    // ========================================
    // STEP 2: Define the Taylor Swift eras data
    // ========================================
    
    // This object contains all the information about each era
    // Each era has a name, description, and list of songs
    const eras = {
        fearless: {
            name: "✨ Fearless Era ✨",
            description: "You're living in a fairytale! You believe in love, happy endings, and taking chances. Your optimism is contagious, and you see the magic in everyday moments.",
            songs: [
                "🎵 Love Story",
                "🎵 You Belong With Me", 
                "🎵 Fearless"
            ]
        },
        red: {
            name: "❤️ Red Era ❤️",
            description: "You feel everything intensely! Your emotions are a beautiful mess of passion, heartbreak, and hope. You're not afraid to feel deeply and express yourself boldly.",
            songs: [
                "🎵 All Too Well",
                "🎵 Red",
                "🎵 22"
            ]
        },
        nineteen89: {
            name: "💙 1989 Era 💙",
            description: "You're embracing your independence and having the time of your life! You're confident, carefree, and ready to shake off anything that brings you down.",
            songs: [
                "🎵 Shake It Off",
                "🎵 Blank Space",
                "🎵 Style"
            ]
        },
        folklore: {
            name: "🍂 Folklore Era 🍂",
            description: "You're a dreamer with a poetic soul. You find beauty in quiet moments, old stories, and the mysteries of life. Your imagination takes you to enchanted places.",
            songs: [
                "🎵 Cardigan",
                "🎵 August",
                "🎵 The 1"
            ]
        },
        midnights: {
            name: "🌙 Midnights Era 🌙",
            description: "You're introspective and mysterious. Late nights are when your mind comes alive with thoughts, memories, and dreams. You embrace both your light and shadow sides.",
            songs: [
                "🎵 Anti-Hero",
                "🎵 Lavender Haze",
                "🎵 Midnight Rain"
            ]
        }
    };

    // ========================================
    // STEP 3: Create the function to determine the era
    // ========================================
    
    // This function takes the user's answers and returns the matching era
    function determineEra(mood, color, season) {
        
        // We'll use a simple scoring system
        // Each answer adds points to different eras
        // The era with the most points wins!
        
        let scores = {
            fearless: 0,
            red: 0,
            nineteen89: 0,
            folklore: 0,
            midnights: 0
        };

        // Add points based on MOOD
        switch(mood) {
            case 'happy':
                scores.nineteen89 += 2;
                scores.fearless += 1;
                break;
            case 'sad':
                scores.folklore += 2;
                scores.red += 1;
                break;
            case 'romantic':
                scores.fearless += 2;
                scores.red += 1;
                break;
            case 'confident':
                scores.nineteen89 += 2;
                scores.midnights += 1;
                break;
            case 'nostalgic':
                scores.folklore += 2;
                scores.midnights += 1;
                break;
        }

        // Add points based on COLOR
        switch(color) {
            case 'gold':
                scores.fearless += 2;
                break;
            case 'red':
                scores.red += 2;
                break;
            case 'blue':
                scores.nineteen89 += 2;
                break;
            case 'green':
                scores.folklore += 2;
                break;
            case 'purple':
                scores.midnights += 2;
                break;
        }

        // Add points based on SEASON
        switch(season) {
            case 'spring':
                scores.fearless += 1;
                scores.nineteen89 += 1;
                break;
            case 'summer':
                scores.nineteen89 += 2;
                break;
            case 'fall':
                scores.folklore += 2;
                scores.red += 1;
                break;
            case 'winter':
                scores.midnights += 2;
                break;
        }

        // Find the era with the highest score
        let highestScore = 0;
        let winningEra = 'fearless'; // Default era

        // Loop through all the scores to find the winner
        for (let era in scores) {
            if (scores[era] > highestScore) {
                highestScore = scores[era];
                winningEra = era;
            }
        }

        // Return the winning era's data
        return eras[winningEra];
    }

    // ========================================
    // STEP 4: Create the function to display results
    // ========================================
    
    function displayResults(era) {
        // Set the era name
        eraNameElement.textContent = era.name;
        
        // Set the description
        eraDescriptionElement.textContent = era.description;
        
        // Clear any previous songs from the list
        songListElement.innerHTML = '';
        
        // Add each song to the list
        era.songs.forEach(function(song) {
            // Create a new list item
            const listItem = document.createElement('li');
            // Set the song text
            listItem.textContent = song;
            // Add it to the song list
            songListElement.appendChild(listItem);
        });
        
        // Hide the quiz and show the results
        quizSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
    }

    // ========================================
    // STEP 5: Create the function to reset the quiz
    // ========================================
    
    function resetQuiz() {
        // Reset the form (clear all selections)
        quizForm.reset();
        
        // Hide results and show the quiz again
        resultSection.classList.add('hidden');
        quizSection.classList.remove('hidden');
    }

    // ========================================
    // STEP 6: Set up event listeners
    // ========================================
    
    // Listen for form submission
    quizForm.addEventListener('submit', function(event) {
        // Prevent the page from reloading
        event.preventDefault();
        
        // Get the user's answers from the form
        const mood = document.getElementById('mood').value;
        const color = document.getElementById('color').value;
        const season = document.getElementById('season').value;
        
        // Determine which era matches the answers
        const matchedEra = determineEra(mood, color, season);
        
        // Display the results
        displayResults(matchedEra);
    });

    // Listen for "Try Again" button click
    tryAgainButton.addEventListener('click', function() {
        resetQuiz();
    });

});
