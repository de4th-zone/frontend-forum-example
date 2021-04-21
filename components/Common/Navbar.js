import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import CustomImage from 'components/Common/CustomImage';
import { currentUserRequestedAction, logoutUserRequestedAction } from 'redux/actions/userAction';

const NavBar = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const login = useSelector((state) => state.users.login);

	useEffect(() => {
		dispatch(currentUserRequestedAction());
	}, []);

	const handleLogoutUser = (e) => {
		e.preventDefault();
		dispatch(logoutUserRequestedAction(router));
	};

	return (
		<>
			<Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top" className="shadow-sm">
				<Container>
					<Link href="/" passHref>
						<Navbar.Brand className="d-flex align-items-center">
							<CustomImage
								className="rounded-circle mr-2"
								src="https://avatars1.githubusercontent.com/u/57558120?s=460&u=edcf8c9d01f9f5b76c1c6e30d6c775ec147cc434&v=4"
								width={44}
								height={44}
								alt="Logo"
							/>
							De4thZone
						</Navbar.Brand>
					</Link>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="ml-auto align-items-lg-center">
							<Nav.Item>
								<Link href="/" passHref>
									<Nav.Link>Home</Nav.Link>
								</Link>
							</Nav.Item>
							<Dropdown as={NavItem}>
								<Dropdown.Toggle as={NavLink} id="dropdown-custom-1">
									Categories
								</Dropdown.Toggle>
								<Dropdown.Menu align="right">
									<Link href={`/categories/666/PPP`} passHref>
										<Dropdown.Item eventKey="1">Test</Dropdown.Item>
									</Link>
								</Dropdown.Menu>
							</Dropdown>
							{login.is_authenticated ? (
								<>
									<Nav.Item>
										<Link href="/editor/new" as="/editor/new" passHref>
											<Nav.Link>New Post</Nav.Link>
										</Link>
									</Nav.Item>
									<Dropdown as={NavItem}>
										<Dropdown.Toggle as={NavLink} id="dropdown-custom-2" className="d-flex align-items-center">
											<CustomImage
												className="rounded-circle mr-2"
												src={login.user?.avatar}
												width={35}
												height={35}
												alt={login.user?.user_name}
											/>
											{login.user?.user_name}
										</Dropdown.Toggle>
										<Dropdown.Menu align="right">
											<Link href={`/profile/[pid]`} as={`/profile/${login.user.user_name}`} passHref>
												<Dropdown.Item>Profile</Dropdown.Item>
											</Link>
											<Dropdown.Divider />
											<Dropdown.Item onClick={handleLogoutUser}>Logout</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</>
							) : (
								<>
									<Nav.Item>
										<Link href="/user/register" passHref>
											<Nav.Link>Register</Nav.Link>
										</Link>
									</Nav.Item>
									<Nav.Item>
										<Link href="/user/login" passHref>
											<Nav.Link>Login</Nav.Link>
										</Link>
									</Nav.Item>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavBar;
