const { AppBar, Toolbar } = require("@mui/material");
const { default: Link } = require("next/link");

const Navbar = () =>{
    return (
    <AppBar>
        <Toolbar>
            <Link href="/user/signup">Sign Up</Link>
            <Link href="/user/login"> Log in</Link>
            <Link href="/user/test"> Test </Link>
        </Toolbar>
    </AppBar>
    );
}

module.exports = Navbar