import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

function NavBar() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [user, setUser] = useState(null);
	const clickedSectionIdRef = useRef<string>();
	useEffect(() => {
		if (clickedSectionIdRef.current) {
			const section = document.getElementById(clickedSectionIdRef.current);
			if (section) {
				section.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [clickedSectionIdRef.current]);
	const handleLinkClick = (sectionId: string) => {
		clickedSectionIdRef.current = sectionId;
	};
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			try {
				const parsedUser = JSON.parse(storedUser);
				setUser(parsedUser);
			} catch (error) {
				console.error("Error parsing user data from local storage:", error);
			}
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("user");
		window.location.href = "/";
	};

	return (
		<div className='navbar'>
			<div className='logo'>
				<h1>
					C<span>hain of trust</span>
				</h1>
			</div>
			<div className='menu-box'>
				<ul className='menu'>
					<li>
						<a href='#home' onClick={() => handleLinkClick("home")}>
							Home
						</a>
					</li>
					<li>
						<a href='#services' onClick={() => handleLinkClick("services")}>
							Services
						</a>
					</li>
					<li>
						<a href='#about' onClick={() => handleLinkClick("about")}>
							About
						</a>
					</li>
				</ul>
				{user ? (
					<div className='dropdown'>
						<button
							className='dropdown-toggle'
							onClick={toggleDropdown}
							style={{ display: "flex", alignItems: "center" }}
						>
							<div
								style={{
									width: "50px",
									height: "50px",
									borderRadius: "50%",
									background: "#1e3942",
									marginRight: "8px",
									marginLeft: "10px",
									marginTop: "10px",
									padding: "20px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<span
									style={{
										fontWeight: "bold",
										fontSize: "30px",
										color: "white",
									}}
								>
									{/* {user.name.charAt(0)} */}
								</span>
							</div>

							{/* <h5> {user.name}</h5> */}
							<FaChevronDown style={{ marginTop: "8px", fontSize: "18px" }} />
						</button>

						{isDropdownOpen && (
							<ul className='dropdown-menu'>
								<li>
									<a href='/profile'>Profile</a>
								</li>
								<li>
									<button onClick={handleLogout}>Logout</button>
								</li>
							</ul>
						)}
					</div>
				) : (
					<a href='/signin' className='signin'>
						{" "}
						Login
					</a>
				)}
			</div>
		</div>
	);
}

export default NavBar;
