import {
	FaArrowCircleRight,
	FaArrowRight,
	FaFacebook,
	FaInstagram,
	FaTelegram,
	FaTwitter,
} from "react-icons/fa";
import { MdEventNote, MdMiscellaneousServices } from "react-icons/md";
import { ImTree } from "react-icons/im";
import { LiaHourglassHalfSolid } from "react-icons/lia";
import { RiAuctionFill } from "react-icons/ri";
import { IoCloudDownload } from "react-icons/io5";
import { BsPersonFillGear } from "react-icons/bs";

import image from "./home.jpeg";
import image2 from "./home2.jpeg";
import "../../../../App.css";
import "../../../../index.css";
import NavBar from "../components/Navbar";
function Home() {
	const services = [
		{
			title: "Tracking proprty",
			icons: <MdEventNote />,
		},
		{
			title: "Managing requests",
			icons: <RiAuctionFill />,
		},
		{
			title: "Managing property",
			icons: <ImTree />,
		},
		{
			title: "Simplifying Work",
			icons: <LiaHourglassHalfSolid />,
		},
	];
	const about = [
		{
			title: "Property Management",
			desc: "The assets that are owned by the company are effectively managed.",
			icons: <IoCloudDownload />,
		},
		{
			title: "Tracking Company Assets",
			desc: "The realtime location of an asset at a fingerytip. ",
			icons: <BsPersonFillGear />,
		},
		{
			title: "Managing requests",
			desc: "Assosciates/ employees of the company can request for an assets in an efecient manner.",
			icons: <MdMiscellaneousServices />,
		},
	];
	const footer = ["Services", "Guidelines", "Community"];
	const footerCol2 = ["Facebook", "Instagram", "LInkedin"];
	return (
		<>
			<NavBar />
			<div className='home' id='home'>
				<div className='content'>
					<div className='part1'>
						<h4> Accelerated solution </h4>
						<ul>
							<li style={{ width: "6em", borderBottomRightRadius: "0" }}>
								Reliable
							</li>
							<li style={{ color: "#001c55", width: "7.3em" }}>
								Property track
							</li>
							<li style={{ width: "34rem", borderTopRightRadius: "0" }}>
								Made simple
							</li>
						</ul>
						<p>
							Struggling to keep tabs on your company's equipment, inventory, or
							even vehicles? Our webapp simplifies asset management, allowing
							you to track everything in one place. From adding detailed
							descriptions and assigning responsible parties to generating
							real-time location data, you'll have complete oversight and
							control over your assets, ensuring their optimal use and
							whereabouts.
						</p>
						<a href='/admin'>
							<button>
								<p>More about us</p>
								<FaArrowCircleRight style={{ fontSize: "50px" }} />
							</button>
						</a>
					</div>
					<div className='part2'>
						<div className='column1'>
							<img src={image2} alt='col' />
						</div>
						<div className='column2'>
							<img src={image} alt='col2' />
						</div>
					</div>
				</div>
				<div className='services' id='services'>
					<div className='title'>
						<h4>
							Evolutionary solutions <h3> For companies </h3>
						</h4>
						<span>
							View services
							<FaArrowRight style={{ marginLeft: "20px", color: "grey" }} />
						</span>
					</div>
					<div className='lists'>
						{services.map((item) => (
							<div className='mapped'>
								<h2> {item.title} </h2>
								<span> {item.icons} </span>
							</div>
						))}
					</div>
					<div className='content'>
						<h2 style={{fontFamily:'"Lobster", cursive',}}> Our Goals</h2>
						<p>
							Eliminate the outdated spreadsheets and endless sticky notes! Our
							web app takes the chaos out of asset management. Consolidate your
							entire inventory, from laptops and tools to vehicles and
							machinery, into a single, user-friendly hub. Effortlessly update
							asset details, assign them to specific users or projects, and gain
							real-time location data at your fingertips. This centralized
							approach simplifies asset management, saving you valuable time and
							streamlining workflows. No more scrambling to locate missing
							equipment or wondering who's responsible for what - our web app
							keeps your assets organized and readily available for optimal
							utilization.
						</p>
					</div>
				</div>

				<h1 className='about-title'> About us </h1>
				<div className='about' id='about'>
					<div className='col'>
						<div className='img-container'>
							<img src={image2} alt='column' />
						</div>
						<p> Solution to management problems</p>
					</div>
					<div className='lists'>
						{about.map((item) => (
							<div className='map'>
								<span> {item.icons} </span>
								<div className='detail'>
									<h2 style={{fontWeight:'bold'}}> {item.title} </h2>
									<p style={{fontWeight:'light'}}>  {item.desc} </p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className='footer'>
					<div className='footerContent'>
						<div className='footerSection1'>
							<div className='footerLogo'>
								<h1> Chain of trust</h1>
							</div>
							<div className='footerlinks'>
								<span>
									<FaInstagram />
								</span>
								<span>
									<FaTelegram />
								</span>
								<span>
									<FaTwitter />
								</span>
								<span>
									<FaFacebook />
								</span>
							</div>
						</div>
						<ul className='footermenu'>
							<li>
								<a href='/'>Home</a>
							</li>
							<li>
								<a href='/services'>Services</a>
							</li>
							<li>
								<a href='/about'>About</a>
							</li>
						</ul>
						<div className='footerSection2'>
							<div className='col'>
								<h2> Info </h2>
								{footer.map((item) => (
									<div className='columns' >
										<div className='col1' > {item}</div>
									</div>
								))}
							</div>
							<div className='col'>
								<h2> Socials </h2>
								{footerCol2.map((item) => (
									<div className='columns'>
										<div className='col1'> {item}</div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className='footerText'style={{fontFamily:'times'}}>
						© 2023 Chain Of turst. All rights reserved.
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
