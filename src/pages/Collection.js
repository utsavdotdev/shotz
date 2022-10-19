import React, { useEffect, useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import styles from "../styles/pages/Collection.module.css";
import { FiDownload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useUserData } from "@nhost/react";
import { useAuthenticationStatus } from "@nhost/react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

const GET_IMAGES = gql`
  query getImages($user_id: String!) {
    screenshot(where: { user_id: { _eq: $user_id } }) {
      id
      url
      user_id
    }
  }
`;

const DELETE_IMAGE = gql`
  mutation deleteImage($id: String!) {
    delete_screenshot(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
const Collection = () => {
  const { user } = useOutletContext();
  const { isAuthenticated } = useAuthenticationStatus();
  const [imgs, setImgs] = useState([]);

  const [getImages, { loading: load, error, data }] = useLazyQuery(GET_IMAGES, {
    variables: { user_id: user?.id },
  });

  const [deleteImg, { loading: deleting, error: deleteError }] =
    useMutation(DELETE_IMAGE);

  const fetchImages = async () => {
    try {
      await getImages({
        variables: {
          user_id: user?.id,
        },
      });
      setImgs(data?.screenshot);
    } catch (error) {
      console.log(error);
    }
  };
  const dltImage = async(id) => {
    try {
      await deleteImg({
        id: id,
      });
      toast.success("Image deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete Image");
    }
  };

  useEffect(() => {
    fetchImages();
  }, [data, user]);

  if (deleting || load) {
    return (
      <>
        <div className={styles.load_con}>
          <Spinner />
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  const downloadImage = async () => {};

  if (imgs?.length === 0) {
    return (
      <>
        <div className={styles.load_con}>
          <p>Nop🙂, You haven't Saved any Images</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.collection_con}>
        <h2>Images</h2>
        <div className={styles.images_con}>
          {imgs.map(({ url, id },data) => (
            <div className={styles.image} key={id}>
              <img src={url} />
              <div className={styles.overlay}>
                <a href={url} download target={"_blank"}>
                  <FiDownload />
                </a>
                {console.log(url)}
                <span className={styles.dlt} onClick={() => dltImage(id)}>
                  <MdDelete />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Collection;
