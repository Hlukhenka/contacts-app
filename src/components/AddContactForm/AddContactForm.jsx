import { useFormik } from 'formik';
import { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { ErorrText, Form, Label } from './AddContactForm.styled';
import ReactInputMask from 'react-input-mask';

const AddContactForm = () => {
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

      const body = {
        email: values.email,
        number: values.number.replace(/-/g, ''),
      };

      try {
        await axios.post(
          'https://contacts-back-ybzt.onrender.com/api/register',
          body
        );
        alert('Contact added');

        setLoading(false);
        setStatus({ success: true });
        formik.resetForm();
      } catch (error) {
        const { response } = error;
        if (response.status === '409') {
          alert('Contact already in use');
        } else if (response.status === '500') {
          alert('Something went wrong try again');
        } else if (response.status === 400) {
          alert('Invalid value');
        }
        setStatus({ success: false });
        setLoading(false);
      }
    },
  });

  return (
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
          <button type="submit">Add Contact</button>
          
          {loading && (<p>Loading...</p>)}
    </Form>
  );
};

export default AddContactForm;
