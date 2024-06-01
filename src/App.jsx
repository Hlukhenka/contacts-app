import { Route, Routes } from 'react-router-dom';
import SharedLayout from 'components/SharedLayout/SharedLayout';
import SearchContactPage from 'pages/SearchContactPage/SearchContactPage';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import AddContactPage from './pages/AddContactPage/AddContactPage';
import { AppWrapper } from './App.styled';

function App() {
  return (
    <AppWrapper>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/search" element={<SearchContactPage />} />
          <Route path="/add-contact" element={<AddContactPage />}></Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </AppWrapper>
  );
}
export default App;
