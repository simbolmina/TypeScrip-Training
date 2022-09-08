"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send("Not permitted to access this route");
}
const router = (0, express_1.Router)();
exports.router = router;
router.get("/login", (req, res) => {
    res.send(`
  <form method="post">
    <div>
        <label for="email">Email</label>
        <input name="email"/>
    </div>
    <div>
        <label for="password">Password</label>
        <input type="password" name="password"/>
    </div>
    <button type="submit">Submit</button>
  </form>
  `);
});
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email && password && email === "test" && password === "test") {
        // mark this person as logged in
        req.session = { loggedIn: true };
        //redirect to home
        res.redirect("/");
    }
    else {
        res.send("error baby");
    }
});
router.get("/", (req, res) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
    <div>
        <p>You are logged in</p>
        <a href="http://localhost:3000/logout">Log out</a><br>
        <a href="http://localhost:3000/protected">Protected</a>
    </div>
    `);
    }
    else {
        res.send(`
    <div>
        <p>Login</p>
        <a href="http://localhost:3000/login">Login</a>
    </div>
    `);
    }
});
router.get("/logout", (req, res) => {
    req.session = undefined;
    res.redirect("/");
});
router.get("/protected", requireAuth, (req, res) => {
    res.send("protected route with logged in user");
});
