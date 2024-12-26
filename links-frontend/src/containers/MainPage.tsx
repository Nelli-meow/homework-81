import FormLInks from '../components/FormLInks.tsx';
import Link from '../components/Link.tsx';
import { useState } from 'react';


const MainPage = () => {
  const [shortenedLink, setShortenedLink] = useState('');

  const handleLinkSubmit = (link: { shortUrl: string }) => {
    setShortenedLink(link.shortUrl);
  };

  return (
    <div className="container">
      <FormLInks onSubmit={handleLinkSubmit}/>
      <div className="text-center mt-5">
        {shortenedLink && <Link shortUrl={shortenedLink} />}
      </div>
    </div>
  );
};

export default MainPage;