const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                // Token has expired, you can send an alert message to the user
                res.status(401).json({ message: 'You have been logged out due to inactivity.' });
            } else {
                console.log('Invalid token');
            }
        }


    return req;
  },
  signToken: function({ username, email, _id, isAdmin }) {
    const payload = { username, email, _id, isAdmin };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};
