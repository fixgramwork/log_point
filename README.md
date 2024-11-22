# LogPoint

This project is a web-based application designed to automatically adjust mouse sensitivity for users. The system calculates and fine-tunes sensitivity based on the user's ability to click accurately on randomly displayed circles on the screen.

## Features

- **Dynamic Sensitivity Adjustment**: Automatically increases or decreases mouse sensitivity based on user input accuracy.
- **Random Target Placement**: Displays circles at random positions for unbiased sensitivity testing.
- **User-Friendly Interface**: Simple and intuitive design for ease of use.
- **Real-Time Feedback**: Provides immediate feedback to help users understand their performance.

## How It Works

1. A circle appears at a random position on the screen.
2. The user clicks on the target.
3. The system evaluates the accuracy of the click:
   - If the click is close to the target, the sensitivity remains or slightly decreases.
   - If the click is far from the target, the sensitivity increases.
4. The adjusted sensitivity is applied for the next target.

## Tech Stack

- **Frontend**: React
- **Backend**: Spring
- **Server**: Mac Book(Docker)
- **AI Algorithm**: ChatGPT

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mouse-sensitivity-adjustment.git
