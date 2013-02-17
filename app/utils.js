exports.redirectNonLoggedInUsers = function (req, res) {
    if (userNotLoggedIn(req)) {
        redirectToLoginPage(res);
    }
};

function userNotLoggedIn(req) {
    return !req.cookies.loggedIn;
}

function redirectToLoginPage(res) {
    res.redirect('/login/');
}