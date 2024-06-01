import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import ReactInputMask from 'react-input-mask';
import { ErorrText, Form, Label } from './SerchForm.styled';

const SearchForm = () => {
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      number: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address'),

      number: Yup.string().matches(
        /^\d{2}-\d{2}-\d{2}$/,
        'Invalid number format'
      ),
    }),
    onSubmit: async (values, { setStatus }) => {
      setLoading(true);

      const params = {};
      if (values.email) params.email = values.email;
      if (values.number) params.number = values.number.replace(/-/g, '');

      try {
        const response = await axios.get('https://contacts-back-ybzt.onrender.com/api/contact', {
          params: params,
        });
        setSearch(response.data);
        setLoading(false);
        setStatus({ success: true });
        formik.resetForm();
      } catch (error) {
        const { response } = error;

        if (response.status === 400) {
          alert('Invalid value');
        } else if (response.status === 500) {
          alert('Something went wrong try again');
        } else if (response.status === 404) {
          alert('Contact not found');
        }
        setStatus({ success: false });
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Form as="form" onSubmit={formik.handleSubmit}>
        <Label>
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </Label>
        {formik.touched.email && formik.errors.email ? (
          <ErorrText>{formik.errors.email}</ErorrText>
        ) : null}

        <Label>
          Number
          <ReactInputMask
            type="text"
            mask="99-99-99"
            maskChar="_"
            name="number"
            placeholder="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.number}
          />
        </Label>
        {formik.touched.number && formik.errors.number ? (
          <ErorrText>{formik.errors.number}</ErorrText>
        ) : null}
        <button type="submit">Search</button>
      </Form>

      {loading ? (
        <p>Loading...</p>
      ) : search ? (
        <ul>
          {search.map((el) => {
            return (
              <li key={el.id}>
                <p>Email: {el.email}</p>
                <p>Number: {el.number}</p>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};

export default SearchForm;
