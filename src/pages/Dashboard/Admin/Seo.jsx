// import { useEffect, useState } from "react";
// import Container from "../../../components/Shared/Container";
// import baseUrl from "../../../api/baseUrl";
// import compromise from 'compromise';
// import wordfreq from 'wordfreq';

// const Seo = () => {
//   const [listings, setListings] = useState([]);
//   const [seoData, setSeoData] = useState([]);

//   useEffect(() => {
//     const fetchProperty = async () => {
//       const res = await baseUrl.get("/properties/get-properties");
//       const responseData = res?.data?.data;

//       const filteredListing = Array.isArray(responseData)
//         ? responseData.filter(
//             (product) =>
//               product?.blocked === false && product?.approved === true
//           )
//         : [];

//       const seoData = filteredListing.map((listing) => {
//         const ctr = listing.views && listing.clicks
//           ? ((listing.clicks / listing.views) * 100).toFixed(2) + "%"
//           : "N/A";

//         return {
//           id: listing.id,
//           keywords: generateKeywords(listing.title, listing.description),
//           performance: {
//             views: listing.views,
//             clicks: listing.clicks,
//             ctr: ctr,
//           },
//         };
//       });

//       setListings(filteredListing);
//       setSeoData(seoData);
//     };

//     fetchProperty();
//   }, []);

//   const generateKeywords = (title, description) => {
//     const text = title + " " + description;
//     const doc = compromise(text);
//     const terms = doc.terms().out('array');
//     const wordFrequency = wordfreq().process(terms.join(" ")).sort((a, b) => b[1] - a[1]);

//     const keywordList = wordFrequency
//       .filter(([word, freq]) => freq > 1)
//       .map(([word]) => word);

//     return Array.from(new Set(keywordList)).join(", ");
//   };

//   return (
//     <div className="mt-10">
//       <Container>
//         <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg shadow-lg">
//           <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
//             SEO Performance Dashboard
//           </h2>
//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//             {seoData.map((data) => (
//               <div key={data.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
//                 <h3 className="text-lg font-bold text-blue-700 mb-3">
//                   {listings.find((listing) => listing.id === data.id)?.title}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-4">
//                   <strong>Keywords:</strong> {data.keywords}
//                 </p>
//                 <div className="text-sm text-gray-700 space-y-2">
//                   <p>
//                     <strong>Views:</strong> {data.performance.views}
//                   </p>
//                   <p>
//                     <strong>Clicks:</strong> {data.performance.clicks}
//                   </p>
//                   <p>
//                     <strong>CTR:</strong> {data.performance.ctr}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Seo;



import { useEffect, useState } from "react";
import Container from "../../../components/Shared/Container";
import Loader from "../../../components/Shared/Loader"; // Assuming you have a Loader component
import baseUrl from "../../../api/baseUrl";
import compromise from 'compromise';
import wordfreq from 'wordfreq';

const Seo = () => {
  const [listings, setListings] = useState([]);
  const [seoData, setSeoData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true); // Set loading to true when starting to fetch data
      const res = await baseUrl.get("/properties/get-properties");
      const responseData = res?.data?.data;

      const filteredListing = Array.isArray(responseData)
        ? responseData.filter(
            (product) =>
              product?.blocked === false && product?.approved === true
          )
        : [];

      const seoData = filteredListing.map((listing) => {
        const ctr = listing.views && listing.clicks
          ? ((listing.clicks / listing.views) * 100).toFixed(2) + "%"
          : "N/A";

        return {
          id: listing.id,
          keywords: generateKeywords(listing.title, listing.description),
          performance: {
            views: listing.views,
            clicks: listing.clicks,
            ctr: ctr,
          },
        };
      });

      setListings(filteredListing);
      setSeoData(seoData);
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchProperty();
  }, []);

  const generateKeywords = (title, description) => {
    const text = title + " " + description;
    const doc = compromise(text);
    const terms = doc.terms().out('array');
    const wordFrequency = wordfreq().process(terms.join(" ")).sort((a, b) => b[1] - a[1]);

    const keywordList = wordFrequency
      .filter(([word, freq]) => freq > 1)
      .map(([word]) => word);

    return Array.from(new Set(keywordList)).join(", ");
  };

  if (loading) {
    return <Loader />; // Render Loader component while loading
  }

  return (
    <div className="mt-10">
      <Container>
        <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
            SEO Performance Dashboard
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {seoData.map((data) => (
              <div key={data.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-bold text-blue-700 mb-3">
                  {listings.find((listing) => listing.id === data.id)?.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Keywords:</strong> {data.keywords}
                </p>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    <strong>Views:</strong> {data.performance.views}
                  </p>
                  <p>
                    <strong>Clicks:</strong> {data.performance.clicks}
                  </p>
                  <p>
                    <strong>CTR:</strong> {data.performance.ctr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Seo;
