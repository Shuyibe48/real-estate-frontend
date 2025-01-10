import React, { useEffect } from 'react';

const Ads = () => {
  useEffect(() => {
    // Add Google Ads script dynamically to the page
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1>Blog</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur porro quis consectetur repellendus qui at quisquam. Nihil distinctio ipsa harum. Repellendus sed molestias minima, temporibus qui dolorem? Ducimus doloremque voluptates fugiat quidem amet pariatur rem. Molestias, nisi! Eaque repellat cupiditate quibusdam, vitae doloribus neque! Laboriosam, animi id. Velit, aut asperiores!</p>
      </div>

      {/* Ads section */}
      <div>
        {/* Google AdSense ad code */}
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXX" // Replace with your client ID
             data-ad-slot="XXXXXXX"         // Replace with your ad slot ID
             data-ad-format="auto"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>
    </div>
  );
};

export default Ads;
