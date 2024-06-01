import { HeaderContainer, Navigation, StyledLink } from './Header.styled';

export const Header = () => {
  return (
    <HeaderContainer>
      <Navigation>
        <StyledLink to="/search">Search</StyledLink>
        <StyledLink to="/add-contact">Add Contact</StyledLink>
      </Navigation>
    </HeaderContainer>
  );
};
