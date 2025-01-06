import { useLoaderData } from "react-router-dom";

const EditPropertyForm = () => {
  const property = useLoaderData();
  console.log(property);

  return <div>
    <h1>Edit property form</h1>

    

  </div>;
};

export default EditPropertyForm;
