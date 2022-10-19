import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styles from "../styles/pages/Image.module.css";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import axios from "../config/axios.js";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { gql, useMutation } from "@apollo/client";

const Image = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const [res, setRes] = useState({
    uri: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);
  const {
    url,
    width,
    height,
    type,
    block_ads,
    block_cookies,
    dark_mode,
    retina,
    full_page,
    fresh,
  } = location.state;

  const SAVE_IMG = gql`
    mutation addImage($url: String, $user_id: String) {
      insert_screenshot(objects: { url: $url, user_id: $user_id }) {
        affected_rows
      }
    }
  `;
  const [addImage, { data, loading: load, error }] = useMutation(SAVE_IMG);

  const saveImage = async () => {
    try {
      await addImage({
        variables: {
          url: res.uri,
          user_id: user.id,
        },
      });
      toast.success("Image saved to your collection");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getImage = async () => {
    try {
      const res = await axios.get("", {
        params: {
          url,
          output: "json",
          width,
          height,
          file_type: type,
          block_ads,
          no_cookie_banners: block_cookies,
          dark_mode,
          retina,
          full_page,
          fresh,
          wait_for_event: "load",
        },
      });
      if (res) {
        setRes({
          uri: res.data.screenshot,
          type: res.data.file_type,
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error in capturing image");
    }
  };

  useEffect(() => {
    getImage();
  }, [navigate]);

  const downloadImg = () => {
    saveAs(res?.uri, `image.${res?.type}`);
  };

  if (loading || load) {
    return (
      <>
        <div className={styles.load_con}>
          <Spinner />
        </div>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>App - Shotz</title>
      </Helmet>
      <div className={styles.image_con}>
        <img src={res?.uri} alt="img" />
        <div className={styles.btn_con}>
          <button className={styles.download} onClick={() => downloadImg()}>
            Download
          </button>
          {user && (
            <button className={styles.save} onClick={() => saveImage()}>
              Save
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Image;
