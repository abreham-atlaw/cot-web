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
import NavBar from "../components/Navbar";

function Home() {
	const services = [
		{
			title: "Tracking proprty",
			icons: <MdEventNote />,
		},
		{
			title: "Auction and bidding",
			icons: <RiAuctionFill />,
		},
		{
			title: "Managing property",
			icons: <ImTree />,
		},
		{
			title: "Simplifying work",
			icons: <LiaHourglassHalfSolid />,
		},
	];
	const about = [
		{
			title: "Lorem ",
			desc: "Lorem Ipsum is simply dummy text of the printing and typesetting ",
			icons: <IoCloudDownload />,
		},
		{
			title: "Lorem",
			desc: "Lorem Ipsum is simply dummy text of the printing and typesetting ",
			icons: <BsPersonFillGear />,
		},
		{
			title: "Lorem",
			desc: "Lorem Ipsum is simply dummy text of the printing and typesetting ",
			icons: <MdMiscellaneousServices />,
		},
	];
	const footer = ["pointone", "pointtwo", "pointthree", "pointfour"];
	const servicesCategory = [
		{
			title: "Tracking proprty",
			icons: <MdEventNote />,
			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		},
		{
			title: "Auction and bidding",
			icons: <RiAuctionFill />,
			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		},
		{
			title: "Managing property",
			icons: <ImTree />,
			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		},
		{
			title: "Simplifying work",
			icons: <LiaHourglassHalfSolid />,
			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		},
	];
	const explore = [
		{
			title: "Property management",
			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utnim ad minim veniam, quis nostrud exercitation ullamco laboris",
		},
		{
			title: "Placing auction",
			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utnim ad minim veniam, quis nostrud exercitation ullamco laboris",
		},
		{
			title: "Register bidders",
			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utnim ad minim veniam, quis nostrud exercitation ullamco laboris",
		},
		{
			title: "Tracking companies property",
			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utnim ad minim veniam, quis nostrud exercitation ullamco laboris.",
		},
		{
			title: "Managing request",
			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utnim ad minim veniam, quis nostrud exercitation ullamco laboris.",
		},
		{
			title: "Managing employee",
			desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utnim ad minim veniam, quis nostrud exercitation ullamco laboris.",
		},
	];
	return (
		<div className='home' id='home'>
			<NavBar/>
			<div className='content'>
				<div className='part1'>
					<h4> Accelerated solution </h4>
					<ul>
						<li style={{ width: "6em", borderBottomRightRadius: "0" }}>
							Reliable
						</li>
						<li style={{ color: "#001c55", width: "7.3em" }}>Property track</li>
						<li style={{ width: "6.4em", borderTopRightRadius: "0" }}>
							Made simple
						</li>
					</ul>
					<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industryisis. Lorem Ipsum has been the industry's standard dummy
						textinc Lorem Ipsum simply dummy text of the printing and type
						setting industry. Lorem been industry's standard dummy textinc
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
			<div className='description'>
				<h2> Lorem ipsum</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure Lorem ipsum dolor sit
					amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
					labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
					adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
					magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
					irure Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
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

				<h4> Explore services</h4>
				<div className='part-two'>
					{explore.map((item) => (
						<div className='cols'>
							<h2> {item.title} </h2>
							<p> {item.desc} </p>
							<div className='icon-wrapper'>
								<span>
									<LiaHourglassHalfSolid />
								</span>
							</div>
						</div>
					))}
				</div>
				<div className='part-three'>
					<div className='title'>
						<h5>
							Revolutionary solutions <h3> For companies </h3>
						</h5>
						<span>
							All in one place
							<FaArrowRight style={{ marginLeft: "20px", color: "grey" }} />
						</span>
					</div>
					<div className='lists'>
						{servicesCategory.map((item) => (
							<div className='mapped'>
								<h2> {item.title} </h2>
								<p> {item.desc} </p>
								<span> {item.icons} </span>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='about' id='about'>
				<h1 className='title'> About us </h1>
				<div className='part-one'>
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
									<h2> {item.title} </h2>
									<p> {item.desc} </p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className='part-two'>
					<h2>The dynamic of the process</h2>
					<div className='details'>
						<div className='column1'>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure
							</p>
							<p className='content2'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua
							</p>
						</div>
						<div className='column2'>
							<div className='layer'>
								<h2>We are one</h2>
								<h3>Call away</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='footer'>
				<div className='footerContent'>
					<div className='footerSection1'>
						<div className='footerLogo'>
							<img loading='lazy' srcSet='...' alt='Footer Logo' />
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
							<a href='#home'>Home</a>
						</li>
						<li>
							<a href='#services'>Services</a>
						</li>
						<li>
							<a href='#about'>About</a>
						</li>
					</ul>
					<div className='footerSection2'>
						<div className='col1'>
							{footer.map((item) => (
								<div className='columns'>
									<div className='col1'> {item}</div>
								</div>
							))}
						</div>
						<div className='col2 '>
							{footer.map((item) => (
								<div className='columns'>
									<div className='col1'> {item}</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className='footerText'>
					© 2023 Your Company. All rights reserved.
				</div>
			</div>
		</div>
	);
}

export default Home;
