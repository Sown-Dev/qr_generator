import inquirer from 'inquirer';
import qr from 'qr-image';
import { createWriteStream, writeFile } from 'fs';

async function promptUserForUrl() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'Enter the URL to generate a QR code for:',
            validate: input => input.trim().length > 0 ? true : 'Please enter a valid URL.'
        }
    ]);
    return answers.url;
}

function generateQRCode(url) {
    const qrSVG = qr.image(url, { type: 'png' });
    const outputPath = 'QRCode.png';
    qrSVG.pipe(createWriteStream(outputPath));
    console.log(`QR code generated successfully! Check the file at ${outputPath}`);
}

function saveUrlToFile(url) {
    writeFile('urlInput.txt', url, err => {
        if (err) {
            console.error('Failed to save URL to file:', err);
        } else {
            console.log('URL saved to urlInput.txt successfully!');
        }
    });
}

async function main() {
    try {
        const url = await promptUserForUrl();
        generateQRCode(url);
        saveUrlToFile(url); // Save the user input to a text file.
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
