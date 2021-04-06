# Auth - Robin

## Logout endpoint
```
app.delete("/auth/logout", async (req, res) => {
    await req.session.destroy();
    res.status(200)
    res.json({
        message: "Logged out successfully"
    })
})
```
## Example authorization check
### Request:
```
const likeMovie = async googleData => {
    const res = await fetch("http://localhost:8000/like", {
      method: "POST",
      body: JSON.stringify({
        like: movieName
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
```

### Endpoint:
```
app.post('/like', async (req, res) => {
    const user = await connectAndRun(db => db.any("SELECT * FROM users where token = $1;", [req.session.userId]));
    if (user.length !== 0){
        const { like } = req.body;
        const { email, token, name } = user;
        await connectAndRun(db => db.none("INSERT INTO users VALUES ($1, $2, $3, $4, $5);", [email, token, name, like, null]));
    }
    else{
        res.status(400).json({
        error: "Please log in to continue"
    })
    }
  });
    
    
```