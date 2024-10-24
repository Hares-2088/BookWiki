import { Nav, Navbar, Container, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function MyNavBar() {
    const links = [
        { to: "", title: "Home" },
        { to: "books", title: "Books" },
        { to: "authors", title: "Authors" }
    ];

    return (
        <Navbar expand="lg" style={{ backgroundImage: 'linear-gradient(to left, #80ced6, #7d7ff3)' }}>
            <Container>
                <LinkContainer to="/" style={{ cursor: 'pointer' }}>
                    <Navbar.Brand className="d-flex align-items-center">
                        <Image
                            src="https://static.vecteezy.com/system/resources/previews/024/044/212/original/book-icon-clipart-transparent-background-free-png.png"
                            alt="Logo"
                            style={{ maxHeight: '3rem', marginRight: '1rem' }}
                        />
                        <span className="fs-3 fw-bold text-white">MyLibrary</span>
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto fs-5">
                        {links.map(link => (
                            <LinkContainer to={`/${link.to}`} key={link.to}>
                                <Nav.Link className="mx-2 text-white" style={{ transition: 'color 0.3s ease' }}>
                                    {link.title}
                                </Nav.Link>
                            </LinkContainer>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
