import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
  //* we modify type file here for our use in a better way
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("Not permitted to access this route");
}

const router = Router();

router.get("/login", (req: Request, res: Response) => {
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

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === "test" && password === "test") {
    // mark this person as logged in
    req.session = { loggedIn: true };
    //redirect to home

    res.redirect("/");
  } else {
    res.send("error baby");
  }
});

router.get("/", (req: RequestWithBody, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
    <div>
        <p>You are logged in</p>
        <a href="http://localhost:3000/logout">Log out</a><br>
        <a href="http://localhost:3000/protected">Protected</a>
    </div>
    `);
  } else {
    res.send(`
    <div>
        <p>Login</p>
        <a href="http://localhost:3000/login">Login</a>
    </div>
    `);
  }
});

router.get("/logout", (req: RequestWithBody, res: Response) => {
  req.session = undefined;
  res.redirect("/");
});

router.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.send("protected route with logged in user");
});

export { router };
