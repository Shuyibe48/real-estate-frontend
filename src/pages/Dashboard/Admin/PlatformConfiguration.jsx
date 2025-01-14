import { useState, useEffect } from "react";
import { Edit, Save } from "lucide-react";
import UploadWidget from "../../../components/UploadWidget/UploadWidget";
import baseUrl from "../../../api/baseUrl";
import Container from "../../../components/Shared/Container";

const PlatformConfiguration = () => {
  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");
  const [developerBanner, setDeveloperBanner] = useState("");
  const [editLogo, setEditLogo] = useState(false);
  const [editBanner, setEditBanner] = useState(false);
  const [editDeveloperBanner, setEditDeveloperBanner] = useState(false);
  const [platformsLogo, setPlatformsLogo] = useState([]);
  const [platformsBanner, setPlatformsBanner] = useState([]);
  const [platformsDeveloperBanner, setPlatformsDeveloperBanner] = useState([]);
  const [platformId, setPlatformId] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await baseUrl.get("/platforms/get-platforms");
        const platformData = res?.data?.data?.[0];
        setLogo(platformData?.logo);
        setBanner(platformData?.banner);
        setDeveloperBanner(platformData?.developerBanner);
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
          developerBanner: platformsDeveloperBanner[0],
        },
      });
      if (res?.data?.data?.success) {
        window.alert("Updated successfully!");
        setEditLogo(false);
        setEditBanner(false);
        setEditDeveloperBanner(false);
      }
    } catch (error) {
      console.error("Error updating", error);
      alert("Failed to update. Please try again.");
    }
  };

  return (
    <div className="my-10">
      <Container>
        <form
          onSubmit={handleImageUpdate}
          className="image-update-component space-y-10"
        >
          <div className="image-section flex justify-start items-start gap-4">
            <h3 className="font-semibold text-lg">Logo</h3>
            <img
              src={platformsLogo[0] || logo}
              alt="Logo"
              className="image-preview h-[60px] w-[150px]"
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
              src={platformsBanner[0] || banner}
              alt="Banner"
              className="image-preview h-[200px] w-[400px]"
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

          <div className="image-section flex justify-start items-start gap-4">
            <h3 className="font-semibold text-lg">Developer Banner</h3>
            <img
              src={platformsBanner[0] || developerBanner}
              alt="Banner"
              className="image-preview h-[200px] w-[400px]"
            />
            {editDeveloperBanner ? (
              <UploadWidget
                uwConfig={{
                  cloudName: "drvj2jdcs",
                  uploadPreset: "realestate",
                  multiple: false,
                  maxImageFileSize: 2000000,
                  folder: "banners",
                }}
                setState={setPlatformsDeveloperBanner}
              >
                {({ open }) => (
                  <button onClick={open}>Upload New Developer Banner</button>
                )}
              </UploadWidget>
            ) : (
              <button onClick={() => setEditDeveloperBanner(true)}>
                <Edit />
              </button>
            )}
          </div>

          {(editLogo || editBanner || editDeveloperBanner) && (
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
