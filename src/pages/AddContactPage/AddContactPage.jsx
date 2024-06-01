import AddContactForm from '../../components/AddContactForm/AddContactForm';
import { Container, Block, Title } from './AddContactPage.styled';

const AddContactPage = () => {
  return (
    <Container>
      <Block>
        <Title>Add Contact</Title>
        <AddContactForm />
      </Block>
    </Container>
  );
};

export default AddContactPage;
