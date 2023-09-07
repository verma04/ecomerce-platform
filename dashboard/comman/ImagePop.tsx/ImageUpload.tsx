import React, { useState } from "react";

import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";

import ErrorIcon from "@mui/icons-material/Error";
import Skeleton from "react-loading-skeleton";

import { Box, Button } from "@mui/material";
import { getAllMedia } from "@/reactQueryHooks/mutation/media";

const ImageUpload = ({ setstate, set }: any) => {
  const { status, data, error, isLoading: loading } = getAllMedia();
  const defaultImg = "/20211223-6sle4-assa.png";

  const [active, setActive] = useState(null);
  const [img, setImg] = useState(null);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [send, sendImg] = useState({
    path: "/20211223-6sle4-assa.png",
  });

  const onChange = async (e) => {
    await setImage(e.target.files[0]);
    await setImg(URL.createObjectURL(e.target.files[0]));
    const lastDot = await e.target.files[0].name.lastIndexOf(".");
    await setImageName(e.target.files[0].name.substring(0, lastDot));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async () => {
    const data = {
      fileName: imageName,
      alt: imageName,
      file: image,
      caption: imageName,
    };

    mutate({
      variables: data,
    });
  };
  const senddata = () => {
    if (send.url === defaultImg) {
    } else {
      set(send);
    }
  };

  return (
    <Box className="set">
      <Box bgColor="red" width={"100%"} className="modal-image">
        <span
          onClick={() => setstate(false)}
          style={{
            fontSize: "2rem",
          }}
          className="close"
        >
          &times;
        </span>
        <div className="modal-top">
          <div className="modal-top-right">
            <h2
              style={{
                marginBottom: "1.2rem",
                fontWeight: "1000",
              }}
            >
              Media Libaray
            </h2>
          </div>

          <div className="modal-top-left">
            <h2 onClick={() => setActive(!active)} id={active ? "set" : ""}>
              Upload Image
            </h2>

            <h2 onClick={() => setActive(!active)} id={active ? "" : "set"}>
              Image Gallery
            </h2>
          </div>
        </div>
        {active ? (
          <div className="modal-image-1">
            {img ? (
              <div className="conatiner">
                <div className="wrapper-img">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG}${set?.img}`}
                    layout="fill"
                    alt="logo"
                    objectFit="contain"
                  ></img>
                </div>
                <form className="form-upload" onSubmit={handleSubmit(onSubmit)}>
                  {/* register your input into the hook by invoking the "register" function */}
                  <div className="head">
                    <h2> Add Image </h2>
                  </div>

                  {imageName == null ? null : (
                    <>
                      <div className="input-field-upload">
                        <label> Image Name </label>
                        <input
                          value={imageName}
                          placeholder=" Enter Image Name"
                        />
                        {/* errors will return when field validation fails  */}
                        {errors.fileName && (
                          <span>
                            <ErrorIcon />
                            <li>This field is required </li>
                          </span>
                        )}
                      </div>
                      <div className="input-field-upload">
                        <label> Image AltName </label>
                        {/* include validation with required or other standard HTML validation rules */}
                        <input
                          value={imageName === null ? null : imageName}
                          placeholder=" Enter Image AltName"
                        />
                        {/* errors will return when field validation fails  */}
                        {errors.altName && (
                          <span>
                            {" "}
                            <ErrorIcon /> <li>This field is required</li>
                          </span>
                        )}
                      </div>
                    </>
                  )}
                  {/* include validation with required or other standard HTML validation rules */}

                  <div className="input-field-upload">
                    <label>Caption</label>
                    {/* include validation with required or other standard HTML validation rules */}
                    <input placeholder="Enter Caption" />
                    {/* errors will return when field validation fails  */}
                  </div>
                  <div className="btn">
                    <Button
                      variant="contained"
                      onClick={onSubmit}
                      id="submit"
                      type="button"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <input
                  className="image"
                  type="file"
                  accept="image/*"
                  onChange={onChange}
                  id="file-input"
                  style={{
                    display: "none",
                  }}
                />
                <label htmlFor="file-input">
                  <div
                    style={{
                      width: "10rem",
                      position: "relative",
                      height: "10rem",
                      cursor: "pointer",
                    }}
                    className="wrapper-img"
                  >
                    <Image
                      src={"/upload.png"}
                      layout="fill"
                      alt="logo"
                      priority
                      objectFit="contain"
                    ></Image>
                  </div>
                </label>
                <p style={{ textAlign: "center" }}>
                  Rename the image before uploading , according to section
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="modal-image-1">
            <div className="conatiner">
              {loading ? (
                <div className="wrapper-img">
                  <div className="wrapper-images">
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                    <Skeleton height={40} /> <Skeleton height={40} />
                  </div>
                </div>
              ) : (
                <div key={set.imgName} className="wrapper-img">
                  {data.map((set) => (
                    <div
                      onClick={() => sendImg(set)}
                      id={send.path === set.path ? "active" : ""}
                      key={set.imgName}
                      className="wrapper-images"
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={`${process.env.NEXT_PUBLIC_IMG}${set?.path}`}
                        alt={`${process.env.NEXT_PUBLIC_IMG}${set?.alt}`}
                        objectFit="contain"
                      />
                    </div>
                  ))}
                </div>
              )}
              <form className="form-upload" onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="head">
                  <h2> Add Image </h2>
                </div>
                <div
                  style={{
                    height: "30%",
                  }}
                  className="wrapper-img"
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    priority={true}
                    src={`${process.env.NEXT_PUBLIC_IMG}${send?.path}`}
                  />
                </div>
                <div className="btn">
                  <Button
                    variant="outlined"
                    onClick={() => senddata()}
                    id="submit"
                    type="button"
                  >
                    Add
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;
