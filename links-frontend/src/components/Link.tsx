import * as React from 'react';
import { apiURL } from '../globalConstant.ts';

interface Props {
  shortUrl: string;
}

const Link: React.FC<Props> = ({shortUrl}) => {
  return (
    <div className="mt-3">
      <p>
        Your link now looks like this: <a href={`${apiURL}/${shortUrl}`} target="_blank" rel="noopener noreferrer">{`http://localhost:8000/${shortUrl}`}</a>
      </p>
    </div>
  );
};

export default Link;