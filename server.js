const express = require('express');
const mongoose = require('mongoose');
const Resume = require('./models/resume');
const ejs = require('ejs');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', 'view');



mongoose.connect('mongodb+srv://vanshjais1777:vansh123@cluster0.ym0cwmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB', err);
});

let resumeData;
// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index'); // Renders 'index.ejs' located in the views directory
});


//Route to handle form submissions
app.post('/submit', async (req, res) => {
    try {
        // Creating a new resume document
        const newResume = new Resume(req.body);
        // saving the doc to the database
        await newResume.save();
        res.status(201).send(JSON.stringify(req.body));
        console.log(req.body);

    } catch (err) {
        console.error('Error saving resume', err);
        res.status(500).send('Internal Server Error');
    }
});

// Generate PDF form template
async function generatePDF(resumeData) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const template = await ejs.renderFile('index.ejs', { resumeData });
        await page.setContent(template);
        await page.pdf({ path: 'resume.pdf', format: 'A4' });
        await browser.close();
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
}

app.get('/generate-resume-pdf', async (req, res) => {
    await generatePDF(resumeData);
    res.send('Resume PDF generated successfully!');
});

app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});