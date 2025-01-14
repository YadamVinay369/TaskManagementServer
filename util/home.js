const home = () => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Task Management App</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: Arial, sans-serif;
                    text-align: center;
                    background-color: #ffffff;
                }
                .container {
                    text-align: center;
                }
                img {
                    display: block;
                    margin: 20px auto;
                    max-width: 100%;
                    height: auto;
                }
                a{
                  }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Express application for managing Tasks.</h1>
                <p>Please refer to the <a href="https://github.com/YadamVinay369/TaskManagementServer">documentations</a> for understanding the APIs.</p>
                <img src="/Hello.gif" alt="Task Management GIF">
            </div>
        </body>
        </html>
    `;
};

module.exports = home;
