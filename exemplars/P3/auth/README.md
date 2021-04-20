# Auth - Timothy Nguyen

For this part of the project, I built an auth system with passport, JWT, and Google OAuth.

[**Google OAuth**](https://developers.google.com/identity/protocols/oauth2) uses the OAuth 2.0 protocol for authentication and authorization. To begin, we obtain OAuth 2.0 client credentials from the Google API Console. Then your client application requests an access token from the Google Authorization Server, extracts a token from the response, and sends the token to the Google API that you want to access. 

We utilize the Google Login button to get users to login with google login. We supplement this code in the following manner: 

```
<GoogleLogin
    clientId={REACT_APP_GOOGLE_CLIENT_ID}
    buttonText="Sign in with Google"
    className="ct-button ct-button--secondary"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={"single_host_origin"}
/>
```

Above we utilize an environment variable to store the react google client id for our application. Our onSuccess and onFailure are functions utilized to see if we can authenticate properly into our application. It's currently not in Redux, but I'll add it later on for the final sprint.

## Auth Microservice
I created a new microservice to handle our auth. We like to have a separate microservice as in the future, we would like to possibly add our own login/register system. Because of the work done already, it should not take too long to eventually do this. We send our information to the endpoint `auth/googlelogin` to then do the db computations in our database api microservice. We first verify the id token and make sure we send the correct information to our login endpoint in the database api. 

```
router.post('/googlelogin',  async(req, res) => {
    const { tokenId } = req.body;

    client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_LOGIN
    }).then(response => {
      const {email_verified, name, email} = response.payload;
      const new_payload = { email_verified: email_verified, name: name, email: email };
      axios.post('http://nginx:5050/api/v1/database/user/login', new_payload)
        .then((res_info) => {
          const { token, bearer } = res_info.data;
          return res.status(200).json({token: token, bearer:bearer});
        }).catch((err) => {
          console.log(err);
          res.status(400).json({message: err});
        });
      // return result;
    }).catch(err => {
        console.log(err);
        res.status(400).json({ message: err});
    });
});
```

### Auth in our DB API
We then either login or register the data through passport, passport-jwt, and jwt. 

[**Passport**](http://www.passportjs.org/) is authentication middleware for Node.js. It's extremely flexible and modular. It can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.

[**JWT**](https://github.com/auth0/node-jsonwebtoken) is an implementation of JSON Web Tokens from Auth0. You would able to sign a token with an expiration date given below. You also verify the token with a secret key and send it to back to the microservice that called this request.
```
const payload = {
    email: newResponse.data.email,
    name: newResponse.data.name,
}
const token = jwt.sign(payload, 'secret', {
    expiresIn: 31556926, // 1 year in seconds
});
jwt.verify(token, 'secret');
return res.status(200).json({
    success: true,
    token: `bearer ${token}`,
});
```
