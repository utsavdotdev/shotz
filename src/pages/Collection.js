import React, { useRef } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import styles from "../styles/pages/Collection.module.css";
import { FiDownload } from "react-icons/fi";

const Collection = () => {
  const { user } = useOutletContext();
  const downloadRef = useRef(null);

  if (!user) {
    return <Navigate to="/" replace={true} />;
  }
  const uri =
    "https://screenshotapi-dot-net.storage.googleapis.com/google_com_620f61cc88cf.png";

  const downloadImage = async () => {
    const image = await fetch(uri);

    //Split image name
    const nameSplit = uri.split("/");
    const duplicateName = nameSplit.pop();

    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    downloadRef.current.href = imageURL;
    downloadRef.current.download = "" + duplicateName + "";
    downloadRef.current.click();
  };

  return (
    <>
      <div className={styles.collection_con}>
        <h2>Images</h2>
        <div className={styles.images_con}>
          <div className={styles.image}>
            <img src="https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <div className={styles.overlay}>
              <a href={uri} onClick={downloadImage} download ref={downloadRef}>
                <FiDownload />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
