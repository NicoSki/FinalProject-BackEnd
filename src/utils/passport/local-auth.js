const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const Email = require("../nodemailer");

const User = require("../../models/userModel");

passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

/*---------------------------------------------
                SIGN IN
----------------------------------------------*/

passport.use("signin-user", new passportLocal({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {

    //*Here we have a possible problem, a repeated email so i will solve this:
    const repeated_email = await User.findOne({ "email": email })
    if (repeated_email) {
        return done(null, false, req.flash("errorMessage", "The Email has been used"));
    } else if (password != req.body.ppassword) {
        return done(null, false, req.flash("errorMessage", "Both passwords must be the same"));
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.hidePassword(password);
        newUser.username = req.body.username;
        newUser.surname = req.body.surname;
        newUser.phone = req.body.phone;
        newUser.address = req.body.address;
        newUser.ppassword = newUser.hidePassword(password);
        await newUser.save();
        done(null, newUser);

        /*-------------------
            NODEMAILER
        --------------------*/
        const newEmail = new Email({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                type: "login",
                user: "odessa35@ethereal.email",
                pass: 'keV8wHBpcB6qJ6CeDs'
            }
        });

        const mailOptions = {
            from: "Automatic Server",
            to: "odessa35@ethereal.email",
            subject: "Welcome to my Quiksilver simulation app",
            html: `
            <h1 style="text-align:center;">Hello name surname!</h1>
            <br>
            <h2 style="text-align:center;">Thanks for being part of this simulation webside</h2>
        
            <p>
                Quiksilver app is a webside where you can surf through 4 differents kind of categories, among them you can find:
        
                <ul>
                    <li><strong>Shits</strong></li>
                    <li><strong>Trousers</strong></li>
                    <li><strong>Shoes</strong></li>
                    <li><strong>Button-Down Shirts</strong></li>
                </ul>
        
        I decided to choose Quiksilver because in my opinion, it is the best place to get new clothes and this clothes has a particular style which make them different
            </p>
        
            <h2 style="text-align:center;">I will tell you a secret...</h2>
            <p style="text-align:center;">
                If you can not find the login form, just go to the main page...
                There you will find a huge Quiksilver Icon, i dare you to click it and watch the magic✨
            </p>
        
            <br>
        
            <h2>New User Data:</h2>
            <ul>
                <li>Name:${req.body.username}</li>
                <li>Surname:${req.body.surname}</li>
                <li>Phone:${req.body.phone}</li>
                <li>Address:${req.body.address}</li>
                <li>Email:${req.body.email}</li>
            </ul>
        
            <p>🔐Do not worry about your password, it is encrypted so nobody else than you will be able to know it🔐</p>
        
        
            <br>
        
            <h2 style="text-align:center;">What about the Author?</h2>
            <blockquote> 
                Hi there! <br>
                Mi name is <mark>💻Nicolas Skibicki💻</mark>, I am a Full Stack Developer from 📍Buenos Aires, Argentina📍 This project is focused in the BackEnd part of the app so the FrontEnd is not very relevant in this case <strong>buuut</strong> i added some efects to the categories cards.. I hope you like it
            </blockquote>
        
            <cite style="text-align:center;">
                <h3>COPYRIGHT: NCSFULLSTACKDEVELOPER</h3>
                <ul style="list-style-type: none;">
                    <li>Linked<strong>In</strong>: <a href="https://www.linkedin.com/in/nicol%C3%A1s-skibicki-056781219/" target="_blank">Nicolas Skibicki</a></li>
                    <li>GitHub: <a href="https://github.com/NicoSki" target="_blank">Nicolas Skibicki</a></li>
                </ul>
            </cite>
        
            <h3>I look forward to your feedback</h3>
            `
        }

        await newEmail.sendEmail(mailOptions);
    }
}));

/*---------------------------------------------
                LOG IN
----------------------------------------------*/
passport.use("login-user", new passportLocal({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    const found_email = await User.findOne({ email: email });

    if (!found_email) {
        return done(null, false, req.flash("errorMessage", "The email was not found"));
    }

    if (!found_email.comparePassword(password)) {
        return done(null, false, req.flash("errorMessage", "Incorrect Password"));
    }

    return done(null, found_email);
}));