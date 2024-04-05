import { Link } from "react-router-dom";
import image from "./home.jpeg";

function Signin() {
	return (
		<div className='signin-page'>
			<div className='navbar'>
				<div className='logo'>
					<h1>
						C<span>hain of trust</span>
					</h1>
				</div>
				<a href='/signup' className='signin'>
					Signup
				</a>
			</div>
			<div className='content'>
				<div className='image-cont'>
					<img src={image} alt='img' />
					<h1>Next-Gen Property Management</h1>
				</div>
				<div className='fields'>
					<h2> Sign in</h2>
					<h3>Enter your account details below</h3>
					<div className='inputs'>
						<h4>Email</h4>
						<input placeholder='Enter your email' />
						<h4>Password</h4>
						<input placeholder='Enter your password' />
						<button>Sign in</button>
						<span>
							Don't have an account?
							<Link to='/signup'>Signup</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signin;
