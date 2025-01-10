import { useState, useEffect } from "react";
import { Edit, Save } from "lucide-react";
import UploadWidget from "../../../components/UploadWidget/UploadWidget";
import baseUrl from "../../../api/baseUrl";
import Container from "../../../components/Shared/Container";

const PlatformConfiguration = () => {
  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");
  const [editLogo, setEditLogo] = useState(false);
  const [editBanner, setEditBanner] = useState(false);
  const [platformsLogo, setPlatformsLogo] = useState([]);
  const [platformsBanner, setPlatformsBanner] = useState([]);
  const [platformId, setPlatformId] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await baseUrl.get("/platforms/get-platforms");
        const platformData = res?.data?.data?.[0];
        setLogo(platformData?.logo);
        setBanner(platformData?.banner);
        setPlatformId(platformData?._id);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  const handleImageUpdate = async () => {
    try {
      const res = await baseUrl.patch(`/platforms/${platformId}`, {
        platform: {
          logo: platformsLogo[0],
          banner: platformsBanner[0],
        },
      });
      if (res?.data?.data?.success) {
        window.alert("Updated successfully!");
        setEditLogo(false);
        setEditBanner(false);
      }
    } catch (error) {
      console.error("Error updating", error);
      alert("Failed to update. Please try again.");
    }
  };

  return (
    <div className="my-10">
      <Container>
        <form onSubmit={handleImageUpdate} className="image-update-component space-y-10">
          <div className="image-section flex justify-start items-start gap-4">
            <h3 className="font-semibold text-lg">Logo</h3>
            <img
              src={platformsLogo[0] || logo}
              alt="Logo"
              className="image-preview h-[100px]"
            />
            {editLogo ? (
              <UploadWidget
                uwConfig={{
                  cloudName: "drvj2jdcs",
                  uploadPreset: "realestate",
                  multiple: false,
                  maxImageFileSize: 2000000,
                  folder: "logos",
                }}
                setState={setPlatformsLogo}
              >
                {({ open }) => <button onClick={open}>Upload New Logo</button>}
              </UploadWidget>
            ) : (
              <button onClick={() => setEditLogo(true)}>
                <Edit />
              </button>
            )}
          </div>

          <div className="image-section flex justify-start items-start gap-4">
            <h3 className="font-semibold text-lg">Banner</h3>
            <img
              src={platformsBanner[0] || banner }
              alt="Banner"
              className="image-preview h-400px w-3/4"
            />
            {editBanner ? (
              <UploadWidget
                uwConfig={{
                  cloudName: "drvj2jdcs",
                  uploadPreset: "realestate",
                  multiple: false,
                  maxImageFileSize: 2000000,
                  folder: "banners",
                }}
                setState={setPlatformsBanner}
              >
                {({ open }) => (
                  <button onClick={open}>Upload New Banner</button>
                )}
              </UploadWidget>
            ) : (
              <button onClick={() => setEditBanner(true)}>
                <Edit />
              </button>
            )}
          </div>

          {(editLogo || editBanner) && (
            <button
              type="submit"
              className="bg-rose-500 text-white font-semibold py-1 px-4 rounded-md"
            >
              Save
            </button>
          )}
        </form>
      </Container>
    </div>
  );
};

export default PlatformConfiguration;
