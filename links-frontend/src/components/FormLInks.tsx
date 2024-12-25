import { useCallback, useState } from 'react';
import * as React from 'react';
import { LinksProps } from '../../types';

const initialState = {
  link: ''
}

const FormLInks = () => {
  const [link, setLink] = useState<LinksProps>(initialState);

  const submitLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!link.link) {
      alert('Please enter title and content');
      return;
    }

    console.log(link);

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
            value={link.link}
            name="link"
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