# webpage-demo

A simple marketing webpage running on Node.js server

## Features

- Template UI using [INTERACT FREE CSS TEMPLATE](https://www.free-css.com/free-css-templates/page234/interact)
- Sending email from website using *nodemailer*

## Installation

    npm install

## Usage

Update the code below using your own information in `email.js` to use email feature.<br>
For more information, refer to [nodemailer](https://nodemailer.com/about/).

- service : email service provider
- user : ID of your email service account
- pass : Password of your email service account

- from : sender email address
- to : receiver email address

```
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sender@gmail.com',
        pass: 'password'
    }
});

var mailOptions = {
    from: 'sender@gmail.com',
    to: 'receiver@gmail.com',
    subject: '[Website] ' + name,
    text: '- name : ' + name + '\n\n- email : ' + email + '\n\n- message : ' + message
};
```
