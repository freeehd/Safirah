import { resultsData, OptionKey } from './quiz-data';

export function getQuizResultEmailHtml(name: string, resultKey: OptionKey) {
    const result = resultsData[resultKey];
    const firstName = name.split(' ')[0];

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Quiz Results</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #d4af37; /* Gold-ish color */
            text-decoration: none;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
        }
        .result-box {
            background-color: #fdf8f0; /* Light warm background */
            border: 1px solid #e8dcc5;
            padding: 30px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 30px;
        }
        .result-title {
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 15px;
            font-weight: bold;
        }
        .result-description {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
        }
        .next-step {
            background-color: #fff;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #d4af37;
            margin-bottom: 30px;
        }
        .cta-button {
            display: inline-block;
            background-color: #2c3e50;
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #999;
            margin-top: 40px;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Safirah Coaching</div>
        </div>
        
        <div class="greeting">
            Assalamu Alaikum ${firstName},
        </div>
        
        <p>Thank you for taking the time to reflect on your journey with us. Based on your answers, we've identified your unique blueprint:</p>
        
        <div class="result-box">
            <div class="result-title">${result.title}</div>
            <div class="result-description">
                ${result.description}
            </div>
        </div>
        
        <div class="next-step">
            <strong>Your Next Step:</strong><br>
            ${result.nextStep}
        </div>
        
        <div style="text-align: center;">
            <a href="https://www.hirahsaficoach.com/events" class="cta-button">View Upcoming Events</a>
        </div>
        
        <div class="footer">
            &copy; ${new Date().getFullYear()} Safirah Coaching. All rights reserved.<br>
            <a href="https://www.hirahsaficoach.com" style="color: #999; text-decoration: underline;">Visit our website</a>
        </div>
    </div>
</body>
</html>
    `;
}
