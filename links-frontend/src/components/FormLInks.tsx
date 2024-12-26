import { useCallback, useState } from 'react';
import * as React from 'react';
import {  ILinkSWithoutID } from '../types';
import axiosApi from '../axiosApi.ts';


interface Props {
  onSubmit: (shortUrl: ILinkSWithoutID) => void;
}

const initialState = {
  originalUrl: '',
  shortUrl: '',
};

const FormLInks: React.FC<Props> = ({onSubmit}) => {
  const [link, setLink] = useState(initialState);

  const submitLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!link.originalUrl) {
      alert('Please enter link');
      return;
    }

    onSubmit(link);

    const response = await axiosApi.post('/links', {
      originalUrl: link.originalUrl,
    });

    if (response.data) {
      onSubmit(response.data);
    } else {
      console.error('Failed to shorten the link');
    }

    setLink(initialState);
  };

  const inputChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setLink((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);


  return (
    <div className="container mt-5">
      <h3 className="text-center">Shorten your link!</h3>
      <form onSubmit={submitLink}>
        <div className="input-group mb-3">
          <input
            value={link.originalUrl}
            name="originalUrl"
            onChange={inputChangeHandler}
            type="text"
            className="form-control"
            placeholder="link"
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"/>
        </div>
        <div className="input-group mb-3 d-flex justify-content-center">
          <button className="btn btn-outline-info">Shorten!</button>
        </div>
      </form>
      <hr/>
    </div>
  );
};

export default FormLInks;